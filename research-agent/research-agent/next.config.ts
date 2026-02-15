/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  images: {
    domains: ['ayxappnygjghnsciaier.supabase.co'],
  },
  // Optional: Increase timeout for file uploads
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
    responseLimit: '10mb',
  },
}

module.exports = nextConfig