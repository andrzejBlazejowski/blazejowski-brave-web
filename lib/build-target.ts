export function isIpfsBuild(): boolean {
  return process.env.BUILD_TARGET === "ipfs";
}

export function publicAssetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (isIpfsBuild()) {
    return `.${normalized}`;
  }

  return normalized;
}
