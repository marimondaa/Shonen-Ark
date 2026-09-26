import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;
  if (!url || !anon || /your-|placeholder|example\.com/.test(url)) {
    // Do not throw at import/build time. Return null and let callers handle it at runtime.
    return null;
  }
  try {
    cachedClient = createClient(url, anon, { global: { fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(12000) }) } });
  } catch {
    return null;
  }
  return cachedClient;
}

