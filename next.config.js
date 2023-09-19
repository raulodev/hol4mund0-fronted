/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ["127.0.0.1", "localhost", "raulcobiellas.pythonanywhere.com"],
  },
};

module.exports = nextConfig;
