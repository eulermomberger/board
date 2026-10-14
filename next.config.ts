import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
