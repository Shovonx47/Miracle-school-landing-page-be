const MissionVision = require('../models/MissionVision');
const asyncHandler = require('express-async-handler');

// @desc    Get mission and vision content
// @route   GET /api/mission-vision
// @access  Public
const getMissionVision = asyncHandler(async (req, res) => {
  const missionVision = await MissionVision.findOne();
  res.status(200).json(missionVision);
});

// @desc    Create mission and vision content
// @route   POST /api/mission-vision
// @access  Private (you'll need to add auth middleware later)
const createMissionVision = asyncHandler(async (req, res) => {
  const missionVision = await MissionVision.create(req.body);
  res.status(201).json(missionVision);
});

// @desc    Update mission and vision content
// @route   PUT /api/mission-vision/:id
// @access  Private
const updateMissionVision = asyncHandler(async (req, res) => {
  const missionVision = await MissionVision.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!missionVision) {
    res.status(404);
    throw new Error('Mission Vision content not found');
  }

  res.status(200).json(missionVision);
});

module.exports = {
  getMissionVision,
  createMissionVision,
  updateMissionVision
}; 