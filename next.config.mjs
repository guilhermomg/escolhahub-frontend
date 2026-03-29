/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/alunio-frontend',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
