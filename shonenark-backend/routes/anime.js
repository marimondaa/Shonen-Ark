const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');
const auth = require('../middlewares/auth');

// @route   GET api/anime
// @desc    Get all anime
// @access  Public
router.get('/', animeController.getAnimes);

// @route   POST api/anime/sync
// @desc    Sync anime data (from scraper)
// @access  Private (Admin/Scraper)
router.post('/sync', animeController.syncAnime);

module.exports = router;
