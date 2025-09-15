import type { NextConfig } from "next";
import { GITHUB_URL } from "./lib/constants";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
