export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Placeholder: will connect to Supabase in Phase 6
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    return res.status(503).json({ error: 'Registration is not configured yet. No account was created.' });
}
