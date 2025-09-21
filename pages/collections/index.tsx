import { useEffect, useState } from 'react';
import Head from 'next/head';
import { getSupabaseClient } from '../../src/lib/supabase-client';

interface Collection {
  id: string;
  title: string;
  description?: string | null;
  cover_image?: string | null;
  created_at?: string;
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.error('Supabase client is not configured.');
      return;
    }
    const { data, error } = await supabase.from('collections').select('*').order('created_at', { ascending: false });
    if (!error && data) setCollections(data as any);
  }

  async function createCollection() {
    if (!title.trim()) return;
    setIsSaving(true);
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.error('Supabase client is not configured.');
      setIsSaving(false);
      return;
    }
    const { data: userData } = await supabase.auth.getUser();
    const ownerId = userData?.user?.id;
    if (!ownerId) {
      setIsSaving(false);
      alert('Please log in to create a collection.');
      return;
    }

    const { data, error } = await supabase
      .from('collections')
      .insert({ title, description, owner_id: ownerId })
      .select('*')
      .single();
    setIsSaving(false);
    if (!error && data) {
      setCollections((prev) => [data as any, ...prev]);
      setIsOpen(false);
      setTitle('');
      setDescription('');
    }
  }

  return (
    <div className="min-h-screen transition-colors dark:bg-background dark:text-text-light">
      <Head>
        <title>Collections - Shonen Ark</title>
      </Head>

  <section className="manga-panel mx-4 mt-4 dark:bg-gradient-to-r dark:from-dark-purple dark:to-purple dark:text-white py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Collections</h1>
            <p className="text-gray-600 dark:text-purple-200">Curate and share themed sets of items.</p>
          </div>
          <button onClick={() => setIsOpen(true)} className="bg-purple text-white px-4 py-2 rounded-lg hover:bg-dark-purple">New Collection</button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((c) => (
            <article key={c.id} className="bg-white border border-gray-200 rounded-xl p-4 dark:bg-dark-purple/20 dark:border-purple/30">
              <div className="w-full h-40 rounded-lg bg-gray-100 dark:bg-black/30 mb-3" />
              <h3 className="text-lg font-semibold text-black dark:text-white">{c.title}</h3>
              {c.description && <p className="text-sm text-gray-600 dark:text-grey mt-1 line-clamp-3">{c.description}</p>}
            </article>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-full max-w-lg bg-white border border-gray-200 rounded-xl p-6 dark:bg-background dark:border-purple/30">
            <h2 className="text-xl font-semibold">Create Collection</h2>
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm text-gray-700 dark:text-grey mb-1">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple dark:bg-dark-purple/20 dark:text-white dark:border-purple/30 border"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-grey mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple dark:bg-dark-purple/20 dark:text-white dark:border-purple/30 border"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-black dark:text-white dark:border-purple/30">Cancel</button>
              <button onClick={createCollection} disabled={isSaving} className="px-4 py-2 rounded-lg bg-purple text-white hover:bg-dark-purple disabled:opacity-50">{isSaving ? 'Saving…' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
