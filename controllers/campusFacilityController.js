const CampusFacility = require('../models/CampusFacility');

const campusFacilityController = {
  // Get all campus facility data
  getCampusFacilityData: async (req, res) => {
    try {
      const facilityData = await CampusFacility.findOne()
        .sort({ createdAt: -1 }) // Get the most recent entry
        .lean();
      
      if (!facilityData) {
        return res.status(404).json({ message: 'Campus facility data not found' });
      }

      res.status(200).json(facilityData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching campus facility data', error: error.message });
    }
  },

  // Create new campus facility data
  createCampusFacilityData: async (req, res) => {
    try {
      const newFacilityData = new CampusFacility(req.body);
      await newFacilityData.save();
      res.status(201).json(newFacilityData);
    } catch (error) {
      res.status(500).json({ message: 'Error creating campus facility data', error: error.message });
    }
  },

  // Update campus facility data
  updateCampusFacilityData: async (req, res) => {
    try {
      const updatedData = await CampusFacility.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!updatedData) {
        return res.status(404).json({ message: 'Campus facility data not found' });
      }

      res.status(200).json(updatedData);
    } catch (error) {
      res.status(500).json({ message: 'Error updating campus facility data', error: error.message });
    }
  }
};

module.exports = campusFacilityController; 