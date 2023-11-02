/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "cdn2.rcstatic.com",
      "encrypted-tbn0.gstatic.com",
    ],
  },
};

module.exports = nextConfig;
