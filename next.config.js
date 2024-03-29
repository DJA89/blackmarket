/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 's3.us-east-1.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
