/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during production build to allow deployment even with warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during production build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 