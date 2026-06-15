process.env.BUILD_TARGET = "ipfs";
process.env.NEXT_PUBLIC_BUILD_TARGET = "ipfs";

import { spawnSync } from "node:child_process";

const result = spawnSync("next", ["build"], {
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 1);
