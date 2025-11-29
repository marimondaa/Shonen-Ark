export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // In production, verify admin role via JWT token
        // For now, we'll return mock stats as we shouldn't import from the separate backend app directly

        res.status(200).json({
            totalUsers: 1234,
            activeTheories: 56,
            pendingReview: 12,
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
