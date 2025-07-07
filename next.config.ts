import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/desktop-style-portfolio",
  images: {
    unoptimized: true,
  },
  env:{
    GITHUB_PROFILE: "https://github.com/prateek-mureliya",
    SECRET: "pass123",
  }
};

export default nextConfig;
