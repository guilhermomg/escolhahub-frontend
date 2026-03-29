/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/escolhahub-frontend',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
