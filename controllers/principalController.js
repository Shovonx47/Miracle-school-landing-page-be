const Principal = require('../models/Principal');

// Get principal data
exports.getPrincipalData = async (req, res) => {
  try {
    const principalData = await Principal.findOne().sort({ createdAt: -1 });
    
    if (!principalData) {
      return res.status(404).json({
        success: false,
        message: 'Principal data not found'
      });
    }

    res.status(200).json({
      success: true,
      data: principalData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};
