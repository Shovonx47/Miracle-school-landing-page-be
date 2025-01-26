const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// Timeline Events routes
router.post('/timeline-events', historyController.createTimelineEvent);
router.get('/timeline-events', historyController.getTimelineEvents);
router.put('/timeline-events/:id', historyController.updateTimelineEvent);
router.delete('/timeline-events/:id', historyController.deleteTimelineEvent);

module.exports = router;
