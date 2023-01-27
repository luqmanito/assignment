/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    baseUrl: process.env.NEXT_PUBLIC_HOST_KEY,
 },
}

module.exports = nextConfig
