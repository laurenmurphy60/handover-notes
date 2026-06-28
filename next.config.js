/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;