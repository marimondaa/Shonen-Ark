const mongoose = require('mongoose');

const theorySchema = new mongoose.Schema({
    animeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    theoryText: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        maxLength: 500
    },
    category: {
        type: String,
        enum: ['Plot Twist', 'Character Analysis', 'World Building', 'Prediction', 'Other'],
        default: 'Other'
    },
    isAiGenerated: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Theory', theorySchema);
