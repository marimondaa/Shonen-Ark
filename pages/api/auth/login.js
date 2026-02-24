export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password' });
    }

    // TODO: Connect to Supabase auth in Phase 6
    res.status(200).json({
        success: true,
        message: 'Login endpoint ready (backend not yet connected)',
        email
    });
}
