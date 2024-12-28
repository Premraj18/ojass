module.exports = {
  reactStrictMode: true,
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
    ]
    },
  };