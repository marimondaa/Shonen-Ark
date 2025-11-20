import serverSupabase from '../../../../src/lib/supabase-server';
import { getServerSession } from 'next-auth/next';
import authOptions from '../../auth/[...nextauth]';
import { allowMethods } from '../../../../src/lib/api-helpers';

async function handler(req, res) {
    const { id } = req.query;
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    const userId = session.user.id;

    try {
        // Check if user already liked the theory
        // We assume 'votes' table is used for likes as per database.sql
        // votable_type = 'theory', vote_type = 'upvote'

        const { data: existingVote, error: fetchError } = await serverSupabase
            .from('votes')
            .select('id')
            .eq('user_id', userId)
            .eq('votable_id', id)
            .eq('votable_type', 'theory')
            .single();

        if (existingVote) {
            // If exists, remove it (unlike)
            const { error: deleteError } = await serverSupabase
                .from('votes')
                .delete()
                .eq('id', existingVote.id);

            if (deleteError) throw deleteError;

            return res.status(200).json({ liked: false });
        } else {
            // If not exists, create it (like)
            const { error: insertError } = await serverSupabase
                .from('votes')
                .insert({
                    user_id: userId,
                    votable_id: id,
                    votable_type: 'theory',
                    vote_type: 'upvote'
                });

            if (insertError) throw insertError;

            return res.status(200).json({ liked: true });
        }

    } catch (error) {
        console.error('Error toggling like:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export default allowMethods(['POST'], handler);
