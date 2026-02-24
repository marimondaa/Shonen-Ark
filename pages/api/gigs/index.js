export default async function handler(req, res) {
  if (req.method === 'GET') {
    // TODO: Fetch from Supabase
    return res.status(200).json({ gigs: [] });
  }

  if (req.method === 'POST') {
    // TODO: Create in Supabase
    const { title, description, budget } = req.body;
    return res.status(201).json({
      success: true,
      gig: { title, description, budget }
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
