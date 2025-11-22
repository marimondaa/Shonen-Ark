const express = require('express');
const router = express.Router();
const theoryController = require('../controllers/theoryController');
const auth = require('../middlewares/auth');

// @route   GET api/theories
// @desc    Get all theories
// @access  Public
router.get('/', theoryController.getTheories);

// @route   GET api/theories/:id
// @desc    Get theory by ID
// @access  Public
router.get('/:id', theoryController.getTheory);

// @route   POST api/theories
// @desc    Create a theory
// @access  Private
router.post('/', auth, theoryController.createTheory);

// @route   POST api/theories/webhook
// @desc    Webhook for n8n to create theories
// @access  Public (Should be protected by API Key in prod)
router.post('/webhook', theoryController.webhookCreateTheory);

module.exports = router;
