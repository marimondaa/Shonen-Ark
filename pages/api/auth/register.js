export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Placeholder: will connect to Supabase in Phase 6
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    // TODO: Connect to Supabase auth in Phase 6
    res.status(200).json({
        success: true,
        message: 'Registration endpoint ready (backend not yet connected)',
        email
    });
}
