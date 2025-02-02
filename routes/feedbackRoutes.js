const express = require('express');
const router = express.Router();
const { submitFeedback, getFeedbacks } = require('../controllers/feedbackController');

// POST /api/feedback - Submit a new feedback
router.post('/feedback', submitFeedback);

// GET /api/feedbacks - Get all feedbacks
router.get('/feedbacks', getFeedbacks);

// GET /api/feedback/:id - Get a single feedback (if needed)
// router.get('/feedback/:id', getSingleFeedback);

module.exports = router; 