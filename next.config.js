/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: process.env.DEV ? "http" : "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
