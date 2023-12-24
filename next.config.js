/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http", // TODO cambiar a https
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
