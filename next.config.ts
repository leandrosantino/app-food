import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: false,
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  images: {
    remotePatterns: [{ hostname: "xpmrmuypbgnnknxjsjpe.supabase.co" }],
  },
};

export default nextConfig;
