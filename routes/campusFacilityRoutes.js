const express = require('express');
const router = express.Router();
const campusFacilityController = require('../controllers/campusFacilityController');

router.get('/campus-facility', campusFacilityController.getCampusFacilityData);
router.post('/campus-facility', campusFacilityController.createCampusFacilityData);
router.put('/campus-facility/:id', campusFacilityController.updateCampusFacilityData);

module.exports = router; 