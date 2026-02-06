/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    qualities: [25, 50, 75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
