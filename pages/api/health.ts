import type { NextApiRequest, NextApiResponse } from 'next';
export default function health(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return res.status(405).json({ error: 'Method not allowed.' }); }
  const configured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !/your-|placeholder|example\.com/.test(process.env.NEXT_PUBLIC_SUPABASE_URL);
  res.setHeader('Cache-Control', 'no-store');
  return res.json({ app: 'ok', community: configured ? 'configured-not-probed' : 'not-configured', catalog: 'AniList (external)', timestamp: new Date().toISOString() });
}
