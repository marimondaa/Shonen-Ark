const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    theoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theory',
        required: true
    },
    type: {
        type: String,
        enum: ['image', 'video'],
        required: true
    },
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Media', mediaSchema);
