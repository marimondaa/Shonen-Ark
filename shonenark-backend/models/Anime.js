const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    releaseDate: {
        type: Date
    },
    sourceUrl: {
        type: String,
        trim: true
    },
    description: {
        type: String
    },
    coverImage: {
        type: String
    },
    status: {
        type: String,
        enum: ['RELEASING', 'FINISHED', 'NOT_YET_RELEASED', 'CANCELLED', 'HIATUS'],
        default: 'NOT_YET_RELEASED'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Anime', animeSchema);
