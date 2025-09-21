import type { NextApiRequest, NextApiResponse } from 'next';
import serverSupabase from '../../../src/lib/supabase-server';
import { allowMethods } from '../../../src/lib/api-helpers';
import { getSession } from 'next-auth/react';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    const userId = (session as any)?.user?.id as string | undefined;
    if (!session || !userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify admin via database (users.account_type === 'admin')
    const { data: adminRecord, error: adminErr } = await serverSupabase
      .from('users')
      .select('id, account_type')
      .eq('id', userId)
      .eq('account_type', 'admin')
      .single();

    if (adminErr || !adminRecord) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (req.method === 'POST') {
      const { title, slug, cover, content, published_at } = req.body || {};
      if (!title || !slug) {
        return res.status(400).json({ error: 'Missing required fields: title, slug' });
      }
      const { data, error } = await serverSupabase
        .from('news')
        .insert({ title, slug, cover: cover ?? null, content: content ?? null, published_at: published_at ?? new Date().toISOString() })
        .select('*')
        .single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json({ news: data });
    }

    if (req.method === 'PUT') {
      const { id, title, slug, cover, content, published_at } = req.body || {};
      if (!id) return res.status(400).json({ error: 'Missing required field: id' });
      const { data, error } = await serverSupabase
        .from('news')
        .update({ title, slug, cover, content, published_at })
        .eq('id', id)
        .select('*')
        .single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ news: data });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    console.error('Admin news API error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default allowMethods(['POST', 'PUT'], handler);
