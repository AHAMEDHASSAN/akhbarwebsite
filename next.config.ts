import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'news50.sa',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youm7.com', // Seen in previous logs or likely usage
        pathname: '/**',
      }
    ],
    // Allow high quality which user seems to be using
    qualities: [25, 50, 75, 80, 90, 100], 
  },
};

export default nextConfig;
