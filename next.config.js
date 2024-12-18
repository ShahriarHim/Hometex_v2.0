/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/products/:category/:subcategory?/:child?',
        destination: '/products/:category'
      }
    ];
  }
}

module.exports = nextConfig




