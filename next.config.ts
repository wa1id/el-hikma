import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/js/script.js",
        destination: "https://umami.wystudio.be/script.js",
      },
      {
        source: "/js/api/send",
        destination: "https://umami.wystudio.be/api/send",
      },
    ];
  },
};

export default nextConfig;
