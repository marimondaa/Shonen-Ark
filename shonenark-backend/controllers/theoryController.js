const Theory = require('../models/Theory');
const Anime = require('../models/Anime');
const User = require('../models/User');

// Get All Theories
exports.getTheories = async (req, res) => {
    try {
        const { category, sort, limit } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }

        // Only show published theories unless admin
        // For simplicity, we show all for now, or filter by isPublished: true
        query.isPublished = true;

        let theories = Theory.find(query)
            .populate('userId', 'username')
            .populate('animeId', 'title coverImage');

        if (sort === 'newest') {
            theories = theories.sort({ createdAt: -1 });
        } else if (sort === 'popular') {
            // Placeholder for popularity logic
            theories = theories.sort({ createdAt: -1 });
        }

        if (limit) {
            theories = theories.limit(parseInt(limit));
        }

        const results = await theories;
        res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get Single Theory
exports.getTheory = async (req, res) => {
    try {
        const theory = await Theory.findById(req.params.id)
            .populate('userId', 'username')
            .populate('animeId', 'title coverImage');

        if (!theory) {
            return res.status(404).json({ message: 'Theory not found' });
        }

        res.json(theory);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Theory not found' });
        }
        res.status(500).send('Server error');
    }
};

// Create Theory
exports.createTheory = async (req, res) => {
    try {
        const { title, theoryText, animeId, category, summary } = req.body;

        const newTheory = new Theory({
            title,
            theoryText,
            animeId,
            userId: req.user.id,
            category,
            summary,
            isPublished: true // Auto-publish for now
        });

        const theory = await newTheory.save();
        res.json(theory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Webhook for n8n (AI Generated)
exports.webhookCreateTheory = async (req, res) => {
    try {
        const { title, theoryText, animeTitle, isAiGenerated } = req.body;

        // Find or Create Anime
        let anime = await Anime.findOne({ title: animeTitle });
        if (!anime) {
            anime = new Anime({ title: animeTitle });
            await anime.save();
        }

        // Find AI User (or create system user)
        let aiUser = await User.findOne({ email: 'ai@shonenark.com' });
        if (!aiUser) {
            // Create a dummy AI user if not exists
            // In prod, this should be seeded
            return res.status(500).json({ message: 'System AI user not found. Please seed database.' });
        }

        const newTheory = new Theory({
            title,
            theoryText,
            animeId: anime.id,
            userId: aiUser.id,
            category: 'Prediction',
            summary: theoryText.substring(0, 150) + '...',
            isAiGenerated: isAiGenerated === 'true' || isAiGenerated === true,
            isPublished: false // Require admin approval for AI content
        });

        await newTheory.save();
        res.json({ message: 'Theory generated and saved for review', theoryId: newTheory.id });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
