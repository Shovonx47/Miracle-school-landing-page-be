const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');
const { protect, authorize } = require('../middleware/auth');

router.get('/scholarship-data', scholarshipController.getScholarshipData);
router.post('/scholarship-data', protect, authorize('admin'), scholarshipController.createScholarshipData);
router.put('/scholarship-data/:id', protect, authorize('admin'), scholarshipController.updateScholarshipData);

module.exports = router; 