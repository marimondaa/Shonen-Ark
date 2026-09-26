export default async function handler(req, res) {
  if (req.method === 'GET') {
    // TODO: Fetch from Supabase
    return res.status(200).json({ gigs: [] });
  }

  if (req.method === 'POST') {
    // TODO: Create in Supabase
    return res.status(503).json({ error: 'Gig publishing is not configured. No gig was saved.' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
