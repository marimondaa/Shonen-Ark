import { getSupabaseClient } from './supabase-client';

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

export async function listNews(params: { limit?: number; cursor?: string | null; search?: string } = {}) {
  const { limit = 12, cursor, search } = params;
  const supabaseClient = getSupabaseClient();
  if (!supabaseClient) throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  let query = supabaseClient.from('news').select('*').order('published_at', { ascending: false }).limit(limit);
  if (cursor) query = query.lt('published_at', cursor);
  if (search) query = query.ilike('title', `%${search}%`);
  const { data, error } = await query;
  if (error) throw error;
  return data as NewsItem[];
}

export async function getNewsBySlug(slug: string) {
  const supabaseClient = getSupabaseClient();
  if (!supabaseClient) throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  const { data, error } = await supabaseClient.from('news').select('*').eq('slug', slug).single();
  if (error) throw error;
  return data as NewsItem;
}
