import type { NextConfig } from "next";

const web2Config: NextConfig = {};

const ipfsConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  assetPrefix: "./",
};

const nextConfig: NextConfig =
  process.env.BUILD_TARGET === "ipfs" ? ipfsConfig : web2Config;

export default nextConfig;
