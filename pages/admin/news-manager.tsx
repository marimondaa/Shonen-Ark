import { useEffect, useState } from 'react';

type NewsItem = {
  id: string;
  title: string;
  slug: string;
  cover_image?: string | null;
  content?: string | null;
  published_at?: string | null;
};

export default function NewsManager() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/news');
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setItems(json.data || []);
      } catch (e: any) {
        setError(e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const create = async () => {
    if (!title || !slug) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Create failed');
      setItems([json.data, ...items]);
      setTitle('');
      setSlug('');
    } catch (e: any) {
      setError(e?.message || 'Create failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-light p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mystical-title text-accent-pink mb-6">News Manager</h1>
        {error && <div className="mb-4 text-red-400">{error}</div>}
        <div className="mb-6 space-y-3">
          <input
            className="w-full bg-dark-purple border border-purple/30 rounded px-3 py-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full bg-dark-purple border border-purple/30 rounded px-3 py-2"
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          <button
            onClick={create}
            disabled={loading}
            className="px-4 py-2 rounded bg-purple text-white disabled:opacity-50"
          >
            Create
          </button>
        </div>
        <ul className="space-y-3">
          {items.map((n) => (
            <li key={n.id} className="p-3 border border-purple/30 rounded">
              <div className="font-semibold">{n.title}</div>
              <div className="text-sm text-text-muted">/{n.slug}</div>
            </li>
          ))}
        </ul>
        {loading && <div className="mt-4 text-text-muted">Loading…</div>}
      </div>
    </div>
  );
}
