import { createClient } from '@supabase/supabase-js';

export function communityClient(req) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || /your-|placeholder|example\.com/.test(url)) return null;
  const authorization = req.headers.authorization;
  try { return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      headers: authorization ? { Authorization: authorization } : {},
      fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(12000) }),
    },
  }); } catch { return null; }
}

export async function verifiedUser(client, req) {
  const token = req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
  if (!token) return null;
  const { data, error } = await client.auth.getUser(token);
  return error ? null : data.user;
}
