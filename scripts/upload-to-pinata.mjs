import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { appendFile } from "node:fs/promises";

const OUT_DIR = "out";
const V3_UPLOADS_BASE = "https://uploads.pinata.cloud/v3";
const SIGNED_URL_TTL_SECONDS = 600;

async function collectFiles(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath, base)));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const content = await readFile(fullPath);
    const relPath = relative(base, fullPath).replace(/\\/g, "/");
    files.push(new File([content], relPath));
  }

  return files;
}

async function writeGithubOutput(key, value) {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (!outputPath) {
    return;
  }

  await appendFile(outputPath, `${key}=${value}\n`);
}

async function createDirectorySignedUploadUrl(jwt, pinName, keyvalues) {
  const date = Math.floor(Date.now() / 1000);

  const response = await fetch(`${V3_UPLOADS_BASE}/files/sign`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date,
      network: "public",
      expires: SIGNED_URL_TTL_SECONDS,
      filename: pinName,
      keyvalues,
      allow_mime_types: ["directory"],
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create signed upload URL (${response.status}): ${await response.text()}`,
    );
  }

  const payload = await response.json();
  const signedUrl = payload?.data;

  if (!signedUrl || typeof signedUrl !== "string") {
    throw new Error("Pinata did not return a signed upload URL");
  }

  return signedUrl;
}

async function uploadDirectoryViaV3(jwt, signedUrl, files, pinName, keyvalues) {
  const formData = new FormData();

  for (const file of files) {
    formData.append("file", file, file.name);
  }

  formData.append("network", "public");
  formData.append("name", pinName);

  if (Object.keys(keyvalues).length > 0) {
    formData.append("keyvalues", JSON.stringify(keyvalues));
  }

  const response = await fetch(signedUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(
      `Pinata V3 upload failed (${response.status}): ${await response.text()}`,
    );
  }

  const payload = await response.json();
  return payload?.data ?? payload;
}

const jwt = process.env.PINATA_JWT;
if (!jwt) {
  console.error("PINATA_JWT is not set");
  process.exit(1);
}

try {
  const outStat = await stat(OUT_DIR);
  if (!outStat.isDirectory()) {
    console.error(`${OUT_DIR}/ is not a directory`);
    process.exit(1);
  }
} catch {
  console.error(`${OUT_DIR}/ does not exist — run build:ipfs first`);
  process.exit(1);
}

const files = await collectFiles(OUT_DIR);
if (files.length === 0) {
  console.error(`${OUT_DIR}/ is empty`);
  process.exit(1);
}

const pinName = process.env.PINATA_PIN_NAME ?? "ipfs-deploy";
const keyvalues = {
  commit: process.env.GITHUB_SHA ?? "",
  branch: process.env.PINATA_PIN_NAME ?? "",
  repository: process.env.GITHUB_REPOSITORY ?? "",
};

console.log(
  `Uploading ${files.length} files from ${OUT_DIR}/ to Pinata (V3 API)...`,
);

try {
  const signedUrl = await createDirectorySignedUploadUrl(jwt, pinName, keyvalues);
  const upload = await uploadDirectoryViaV3(
    jwt,
    signedUrl,
    files,
    pinName,
    keyvalues,
  );

  const cid = upload?.cid;
  if (!cid) {
    console.error("Pinata upload succeeded but returned no CID");
    console.error(JSON.stringify(upload, null, 2));
    process.exit(1);
  }

  const previewUrl = `https://gateway.pinata.cloud/ipfs/${cid}/`;

  console.log(`CID: ${cid}`);
  console.log(`Preview: ${previewUrl}`);

  await writeGithubOutput("cid", cid);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
