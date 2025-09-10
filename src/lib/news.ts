import { supabase, supabaseClient } from './supabase';

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  cover_image?: string | null;
  tags?: string[] | null;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

// Client-safe listing using anon key
export async function listNews(params: { limit?: number; cursor?: string | null; search?: string } = {}) {
  const { limit = 12, cursor, search } = params;
  let query = supabaseClient.from('news').select('*').order('published_at', { ascending: false }).limit(limit);
  if (cursor) query = query.lt('published_at', cursor);
  if (search) query = query.ilike('title', `%${search}%`);
  const { data, error } = await query;
  if (error) throw error;
  return data as NewsItem[];
}

// Server-side detail using service role (via getServerSideProps or API route)
export async function getNewsBySlug(slug: string) {
  const { data, error } = await supabase.from('news').select('*').eq('slug', slug).single();
  if (error) throw error;
  return data as NewsItem;
}
