import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1", // Use the correct hostname
        port: "1337", // Specify the correct port
        pathname: "/uploads/**", // Match the path structure for the images
      },
    ],
  },
};

export default nextConfig;
