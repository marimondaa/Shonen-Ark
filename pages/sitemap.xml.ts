import type { GetServerSideProps } from 'next';

// Minimal, static sitemap to avoid dynamic data/env deps during build/runtime
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shonen-ark.vercel.app';

const staticPaths: string[] = [
  '/',
  '/about',
  '/contact',
  '/theories',
  '/discovery',
  '/calendar',
  '/gigs',
  '/manga-showcase',
  '/shrine',
  '/terms',
  '/login',
  '/register',
];

function generateSiteMap(urls: string[]): string {
  const urlSet = urls
    .map((path) => {
      const loc = `${BASE_URL}${path}`;
      return `<url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSiteMap(staticPaths);
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return { props: {} };
};

// Default export is required by Next.js, but not used because we write directly to the response
export default function SiteMap() {
  return null;
}
