/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during production build to allow deployment even with warnings
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 