/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.pexels.com", "res.cloudinary.com", "images.unsplash.com"],
      //formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
