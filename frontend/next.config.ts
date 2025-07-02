import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all external images
      },
      {
        protocol: "http",
        hostname: "**", // Allow all external images
      },
    ],
  },
};

export default nextConfig;
