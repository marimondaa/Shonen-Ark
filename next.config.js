/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com', 'via.placeholder.com', 'res.cloudinary.com']
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  env: {
    CUSTOM_KEY: 'my-value',
  },
}

module.exports = nextConfig
