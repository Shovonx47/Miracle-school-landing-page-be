const express = require('express');
const router = express.Router();

const { 
    getEvents, 
    newEvent, 
    getSingleEvent, 
    updateEvent, 
    deleteEvent 
} = require('../controllers/eventController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// Public routes
router.route('/events').get(getEvents);
router.route('/event/:slug').get(getSingleEvent);

// Admin routes
router.route('/admin/event/new').post(isAuthenticatedUser, authorizeRoles('admin'), newEvent);
router.route('/admin/event/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateEvent)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteEvent);

module.exports = router;
