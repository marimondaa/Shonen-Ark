const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    animeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime',
        required: true
    },
    episodeNumber: {
        type: Number,
        required: true
    },
    title: {
        type: String
    },
    airDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Episode', episodeSchema);
