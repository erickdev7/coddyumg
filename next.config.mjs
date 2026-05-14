/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => `coddyumg-${Date.now()}`,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
