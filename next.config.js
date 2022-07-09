/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.pexels.com", "res.cloudinary.com"],
    //domains: ['res.cloudinary.com'],
    //formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
