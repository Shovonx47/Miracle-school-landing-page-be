const Location = require('../models/Location');

// @desc    Get school location
// @route   GET /api/location
// @access  Public
const getLocation = async (req, res) => {
  try {
    const location = await Location.findOne();
    
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.status(200).json(location);
  } catch (error) {
    console.error('Error in getLocation:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getLocation
}; 