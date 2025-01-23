/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Add Cloudinary as a trusted source
      },
      {
        protocol: 'https',
        hostname: 'www.dropbox.com',
        pathname: '/scl/fi/**',
      },
    ]
    },
};

module.exports = nextConfig;