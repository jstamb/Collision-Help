/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'cdn.seobotai.com',
      },
    ],
  },
  // Reduce cold start time on Cloud Run
  experimental: {
    serverMinification: true,
  },
}

module.exports = nextConfig