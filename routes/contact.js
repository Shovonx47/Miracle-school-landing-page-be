const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route to get contact information
router.get('/contact', contactController.getContactInformation);

module.exports = router;
