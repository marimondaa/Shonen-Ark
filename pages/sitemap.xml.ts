import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://shonen-ark.vercel.app';
  const urls = ['/', '/theories', '/news', '/collections'];
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls
      .map(
        (u) =>
          `<url><loc>${base}${u}</loc><changefreq>daily</changefreq><priority>0.7</priority></url>`,
      )
      .join('') +
    `</urlset>`;
  res.setHeader('Content-Type', 'application/xml');
  res.write(body);
  res.end();
  return { props: {} };
};

export default function SiteMap() {
  return null;
}
