import type { NextConfig } from "next";
const pages = process.env.GITHUB_PAGES === "true";
const config: NextConfig = {
  poweredByHeader: false,
  ...(pages
    ? {
        output: "export",
        basePath: "/EVO-GROUP",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};
export default config;
