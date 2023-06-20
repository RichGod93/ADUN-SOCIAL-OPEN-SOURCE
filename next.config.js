/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: ["bit.ly", "firebasestorage.googleapis.com"],
  },
}, nextConfig;