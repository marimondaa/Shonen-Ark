// API route for managing gigs/jobs
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return handleGetGigs(req, res);
    case 'POST':
      return handleCreateGig(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}

async function handleGetGigs(req, res) {
  try {
    const { type, status, limit = 10, offset = 0 } = req.query;

    let query = supabase
      .from('gigs')
      .select(`
        *,
        poster:users!gigs_poster_id_fkey(username, avatar_url),
        applications_count
      `)
      .eq('status', status || 'open')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (type) {
      query = query.eq('type', type);
    }

    const { data: gigs, error } = await query;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ gigs });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch gigs' });
  }
}

async function handleCreateGig(req, res) {
  try {
    const {
      title,
      description,
      type,
      budget_min,
      budget_max,
      deadline,
      tags,
      poster_id
    } = req.body;

    // Validate required fields
    if (!title || !description || !type || !poster_id) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, description, type, poster_id' 
      });
    }

    // Insert new gig
    const { data: gig, error } = await supabase
      .from('gigs')
      .insert({
        title,
        description,
        type,
        budget_min,
        budget_max,
        deadline,
        tags,
        poster_id,
        status: 'open'
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ gig });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create gig' });
  }
}
