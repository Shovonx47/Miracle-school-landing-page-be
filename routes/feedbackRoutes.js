const express = require('express');
const router = express.Router();
const { submitFeedback, getFeedbacks } = require('../controllers/feedbackController');

router.post('/feedback', submitFeedback);
router.get('/feedbacks', getFeedbacks);

module.exports = router; 