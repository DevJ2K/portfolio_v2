import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // devj2k.com/ACT. serves the same smart link as devj2k.com/ACT.
      { source: "/ACT.", destination: "/ACT" },
    ];
  },
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
