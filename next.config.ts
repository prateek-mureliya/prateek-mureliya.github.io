import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/desktop-style-portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
