const express = require('express');
const router = express.Router();
const eventCalendarController = require('../controllers/eventCalendarController');

router.get('/event-calendar', eventCalendarController.getEventCalendarData);
router.post('/event-calendar', eventCalendarController.createEventCalendarData);
router.put('/event-calendar/:id', eventCalendarController.updateEventCalendarData);

module.exports = router; 