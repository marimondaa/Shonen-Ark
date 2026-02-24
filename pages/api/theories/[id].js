export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        // TODO: Fetch from Supabase
        return res.status(200).json({ theory: { id } });
    }

    if (req.method === 'PUT') {
        // TODO: Update in Supabase
        return res.status(200).json({ success: true, id });
    }

    if (req.method === 'DELETE') {
        // TODO: Delete from Supabase
        return res.status(200).json({ success: true, deleted: id });
    }

    res.status(405).json({ error: 'Method not allowed' });
}
