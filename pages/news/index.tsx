import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { listNews, NewsItem } from '../../src/lib/news';

export default function NewsIndexPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load(nextCursor?: string | null) {
    setIsLoading(true);
    try {
      const data = await listNews({ cursor: nextCursor ?? cursor, limit: 12 });
      setItems(prev => (nextCursor ? [...prev, ...data] : data));
      if (data.length > 0) setCursor(data[data.length - 1].published_at ?? null);
      setHasMore(data.length === 12);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!loaderRef.current) return;
    const el = loaderRef.current;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) load(cursor ?? null);
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [cursor, hasMore, isLoading]);

  return (
    <div className="min-h-screen transition-colors dark:bg-background dark:text-text-light">
      <Head>
        <title>News - Shonen Ark</title>
      </Head>

  <section className="manga-panel mx-4 mt-4 dark:bg-gradient-to-r dark:from-dark-purple dark:to-purple dark:text-white py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold">News</h1>
          <p className="text-gray-600 dark:text-purple-200">Latest updates from the anime & manga world</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((n) => (
            <Link key={n.id} href={`/news/${n.slug}`} className="block">
              <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition dark:bg-dark-purple/20 dark:border-purple/30">
                {n.cover_image ? (
                  <img src={n.cover_image} alt={n.title} className="w-full h-44 object-cover" />
                ) : (
                  <div className="w-full h-44 bg-gray-100 dark:bg-black/30" />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-black dark:text-white">{n.title}</h3>
                  {n.excerpt && <p className="text-sm text-gray-600 dark:text-grey mt-1 line-clamp-3">{n.excerpt}</p>}
                  <div className="text-xs text-gray-500 dark:text-grey mt-2">{n.published_at ? new Date(n.published_at).toLocaleDateString() : ''}</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        {hasMore && <div ref={loaderRef} className="text-center text-gray-500 py-10">Loading…</div>}
      </div>
    </div>
  );
}
