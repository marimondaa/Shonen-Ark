export default async function handler(req, res) {
  if (req.method === 'GET') {
    // TODO: Fetch from Supabase
    return res.status(200).json({ theories: [] });
  }

  if (req.method === 'POST') {
    // TODO: Create in Supabase
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Missing title or content' });
    }
    return res.status(201).json({
      success: true,
      message: 'Theory endpoint ready',
      theory: { title, content }
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
