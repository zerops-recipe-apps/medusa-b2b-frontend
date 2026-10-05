const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MEDUSA_BACKEND_URL:
      process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || process.env.API_URL || "",
    NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ||
      process.env.MEDUSA_PUBLISHABLE_KEY ||
      process.env.CHANNEL_PUBLISHABLE_KEY ||
      "",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.prg1.zerops.app",
      },
      {
        protocol: "https",
        hostname: "storage.prg1.zerops.app",
      },
    ],
  },
}

module.exports = nextConfig
