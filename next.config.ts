import type { NextConfig } from "next";
import { GITHUB_URL } from "./lib/constants";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  images: {
    unoptimized: true,
  },
  env:{
    GITHUB_PROFILE: GITHUB_URL,
    SECRET: "pass123",
  }
};

export default nextConfig;
