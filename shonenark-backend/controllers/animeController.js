const Anime = require('../models/Anime');

// Get All Anime (with search/filter)
exports.getAnimes = async (req, res) => {
    try {
        const { search, limit } = req.query;
        let query = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        let animes = Anime.find(query).sort({ title: 1 });

        if (limit) {
            animes = animes.limit(parseInt(limit));
        }

        const results = await animes;
        res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Create/Sync Anime (Internal/Admin use)
exports.syncAnime = async (req, res) => {
    try {
        const { title, coverImage, description, status, releaseDate } = req.body;

        let anime = await Anime.findOne({ title });

        if (anime) {
            // Update existing
            anime.coverImage = coverImage || anime.coverImage;
            anime.description = description || anime.description;
            anime.status = status || anime.status;
            anime.releaseDate = releaseDate || anime.releaseDate;
        } else {
            // Create new
            anime = new Anime({
                title,
                coverImage,
                description,
                status,
                releaseDate
            });
        }

        await anime.save();
        res.json(anime);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
