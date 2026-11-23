import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
      remotePatterns:[
        {hostname:"encrypted-tbn0.gstatic.com"}
      ]
  },
  
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
