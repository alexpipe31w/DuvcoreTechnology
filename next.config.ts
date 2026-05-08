import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stock-up-ashy.vercel.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
