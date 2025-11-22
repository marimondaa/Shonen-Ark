const express = require('express');
const router = express.Router();
const Media = require('../models/Media');
const upload = require('../middlewares/upload');
const auth = require('../middlewares/auth');

// @route   POST api/media/upload
// @desc    Upload media file
// @access  Private
router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { theoryId } = req.body;
        const fileType = req.file.mimetype.startsWith('image/') ? 'image' : 'video';

        const media = new Media({
            theoryId,
            type: fileType,
            url: `/uploads/${fileType === 'image' ? 'photos' : 'videos'}/${req.file.filename}`,
            publicId: req.file.filename
        });

        await media.save();
        res.json(media);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/media/:id
// @desc    Get media by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }
        res.json(media);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
