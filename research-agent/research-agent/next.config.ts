/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse'],
  },
  // Increase timeout for large file uploads
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  // SWC minification for faster builds
  swcMinify: true,
}

module.exports = nextConfig