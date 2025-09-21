import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import serverSupabase from '../../../src/lib/supabase-server';
import { allowMethods } from '../../../src/lib/api-helpers';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    const uid = (session as any)?.user?.id;
    if (!uid) return res.status(401).json({ error: 'Unauthorized' });

    const { data: userRow, error: userErr } = await serverSupabase
      .from('users')
      .select('id, account_type')
      .eq('id', uid)
      .single();
    if (userErr) return res.status(500).json({ error: 'User lookup failed' });
    if (!userRow || userRow.account_type !== 'admin') return res.status(403).json({ error: 'Forbidden' });

    if (req.method === 'POST') {
      const { title, slug, cover_image, content, tags, published_at } = req.body || {};
      if (!title || !slug) return res.status(400).json({ error: 'Missing title or slug' });
      const { data, error } = await serverSupabase
        .from('news')
        .insert({ title, slug, cover_image, content, tags, published_at })
        .select('*')
        .single();
      if (error) return res.status(500).json({ error: 'Insert failed' });
      return res.status(200).json({ data });
    }

    if (req.method === 'PUT') {
      const { id, ...patch } = req.body || {};
      if (!id) return res.status(400).json({ error: 'Missing id' });
      const { data, error } = await serverSupabase
        .from('news')
        .update(patch)
        .eq('id', id)
        .select('*')
        .single();
      if (error) return res.status(500).json({ error: 'Update failed' });
      return res.status(200).json({ data });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (e) {
    console.error('admin/news error', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default allowMethods(['POST', 'PUT'], handler);
