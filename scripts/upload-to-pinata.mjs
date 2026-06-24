import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { appendFile } from "node:fs/promises";
import { PinataSDK } from "pinata";

const OUT_DIR = "out";

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

console.log(`Uploading ${files.length} files from ${OUT_DIR}/ to Pinata...`);

const pinata = new PinataSDK({ pinataJwt: jwt });
const upload = await pinata.upload.public
  .fileArray(files)
  .name(pinName)
  .keyvalues(keyvalues);

const cid = upload.cid;
if (!cid) {
  console.error("Pinata upload succeeded but returned no CID");
  process.exit(1);
}

const previewUrl = `https://gateway.pinata.cloud/ipfs/${cid}/`;

console.log(`CID: ${cid}`);
console.log(`Preview: ${previewUrl}`);

await writeGithubOutput("cid", cid);
