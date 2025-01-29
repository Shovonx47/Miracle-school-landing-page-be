const express = require('express');
const router = express.Router();
const { getCollegeStats } = require('../controllers/collegeStatsController');

router.get('/college-stats', getCollegeStats);

module.exports = router;
