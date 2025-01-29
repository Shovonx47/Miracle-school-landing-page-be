const express = require('express');
const router = express.Router();
const { getPrincipalData } = require('../controllers/principalController');

router.get('/principal', getPrincipalData);

module.exports = router;
