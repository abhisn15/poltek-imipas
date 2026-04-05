/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next-cache",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
