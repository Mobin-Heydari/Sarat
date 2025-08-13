import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SERVER_BASE_API_URL: process.env.NEXT_PUBLIC_SERVER_BASE_API_URL,
    NEXT_PUBLIC_MEDIA_URL: process.env.NEXT_PUBLIC_MEDIA_URL,
  },

  images: {
    domains: ['127.0.0.1', 'localhost'],
  }
};

export default nextConfig;
