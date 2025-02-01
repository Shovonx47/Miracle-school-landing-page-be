const ScholarshipPage = require('../models/Scholarship');

const scholarshipController = {
  // Get all scholarship page data
  getScholarshipData: async (req, res) => {
    try {
      const scholarshipData = await ScholarshipPage.findOne()
        .sort({ createdAt: -1 }) // Get the most recent entry
        .lean();
      
      if (!scholarshipData) {
        return res.status(404).json({ message: 'Scholarship data not found' });
      }

      res.status(200).json(scholarshipData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching scholarship data', error: error.message });
    }
  },

  // Create new scholarship page data
  createScholarshipData: async (req, res) => {
    try {
      const newScholarshipData = new ScholarshipPage(req.body);
      await newScholarshipData.save();
      res.status(201).json(newScholarshipData);
    } catch (error) {
      res.status(500).json({ message: 'Error creating scholarship data', error: error.message });
    }
  },

  // Update scholarship page data
  updateScholarshipData: async (req, res) => {
    try {
      const updatedData = await ScholarshipPage.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!updatedData) {
        return res.status(404).json({ message: 'Scholarship data not found' });
      }

      res.status(200).json(updatedData);
    } catch (error) {
      res.status(500).json({ message: 'Error updating scholarship data', error: error.message });
    }
  }
};

module.exports = scholarshipController; 