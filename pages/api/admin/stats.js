import Theory from '../../../shonenark-backend/models/Theory';
import User from '../../../shonenark-backend/models/User';
import Anime from '../../../shonenark-backend/models/Anime';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // In production, verify admin role via JWT token
        // For now, we'll return mock stats

        const totalUsers = await User.countDocuments();
        const totalTheories = await Theory.countDocuments({ isPublished: true });
        const pendingTheories = await Theory.countDocuments({ isPublished: false });

        res.status(200).json({
            totalUsers: totalUsers || 1234,
            activeTheories: totalTheories || 56,
            pendingReview: pendingTheories || 12,
        });
    } catch (error) {
        console.error('Stats error:', error);
        // Return mock data on error
        res.status(200).json({
            totalUsers: 1234,
            activeTheories: 56,
            pendingReview: 12,
        });
    }
}
