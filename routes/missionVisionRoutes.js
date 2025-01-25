const express = require('express');
const router = express.Router();
const {
  getMissionVision,
  createMissionVision,
  updateMissionVision
} = require('../controllers/missionVisionController');

router.route('/')
  .get(getMissionVision)
  .post(createMissionVision);

router.route('/:id')
  .put(updateMissionVision);

module.exports = router; 