/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'no-referrer' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
      { key: 'Content-Security-Policy', value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'" },
    ] }];
  },
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ]
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      { source: '/theories/new', destination: '/submit-theory', permanent: false },
      { source: '/discovery/:category', destination: '/discovery', permanent: false },
      { source: '/manga-showcase', destination: '/discovery', permanent: false },
    ]
  },
  async rewrites() {
    return { beforeFiles: [
      { source: '/shrine', destination: '/integrations' },
      { source: '/submit-video', destination: '/integrations' },
      { source: '/news/:path*', destination: '/integrations' },
      { source: '/admin/:path*', destination: '/integrations' },
      { source: '/account/onboarding', destination: '/account/fan' },
    ] };
  },
}

module.exports = nextConfig
