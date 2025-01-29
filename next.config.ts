import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint errors during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript errors during builds
  },
  /* Add other config options here if needed */
  images: {
    // Define domains to allow loading images from external sources
    domains: [
      "example.com",
      "your-cdn-domain.com",
      "cdn-icons-png.flaticon.com",
    ],
  },
  async rewrites() {
    return [
      {
        // Proxy API requests to the backend
        source: "/api/:path*",
        destination: "http://localhost:8080/:path*",
      },
      {
        source: "/auth/:path*",
        destination: "http://localhost:8080/auth/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        // Add CORS headers for all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
