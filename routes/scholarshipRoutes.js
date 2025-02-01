const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');

// Remove auth middleware for now
router.get('/scholarship-data', scholarshipController.getScholarshipData);
router.post('/scholarship-data', scholarshipController.createScholarshipData);
router.put('/scholarship-data/:id', scholarshipController.updateScholarshipData);

module.exports = router; 