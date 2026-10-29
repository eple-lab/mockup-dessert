import type { NextConfig } from "next";

// GitHub Actions에서 NEXT_PUBLIC_STATIC_EXPORT=true로 빌드하면 GitHub Pages용 정적 파일(out/)을 만듭니다.
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  // 정적 빌드(output: "export")는 부분 사전 렌더링(PPR)을 지원하지 않아 두 옵션을 끕니다.
  cacheComponents: !isStaticExport,
  partialPrefetching: !isStaticExport,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  ...(isStaticExport && {
    output: "export",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    trailingSlash: true,
  }),
};

export default nextConfig;
