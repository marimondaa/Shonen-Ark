import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // Verify secret key for security
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${process.env.N8N_WEBHOOK_SECRET}`) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { title, content, category, source, author, tags } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Initialize Supabase client (Service Role for admin access)
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        // Create theory
        const { data, error } = await supabase
            .from('theories')
            .insert([
                {
                    title,
                    content,
                    category: category || 'General',
                    source: source || 'n8n-automation',
                    author_name: author || 'Shonen Ark AI',
                    tags: tags || [],
                    created_at: new Date().toISOString(),
                    status: 'published' // or 'draft' if you want to review first
                }
            ])
            .select()
            .single();

        if (error) throw error;

        return res.status(200).json({ success: true, theory: data });
    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
