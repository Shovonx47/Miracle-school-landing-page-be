const Faculty = require('../models/Faculty');

// Get all faculty members
exports.getAllFaculty = async (req, res) => {
  try {
    const { department, search } = req.query;
    
    let query = {};
    
    if (department && department !== 'all') {
      query.department = new RegExp(department, 'i');
    }
    
    if (search) {
      query.name = new RegExp(search, 'i');
    }
    
    const faculty = await Faculty.find(query);
    res.status(200).json({
      success: true,
      data: faculty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get single faculty member
exports.getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({
        success: false,
        error: 'Faculty member not found'
      });
    }
    res.status(200).json({
      success: true,
      data: faculty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create new faculty member
exports.createFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.status(201).json({
      success: true,
      data: faculty
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update faculty member
exports.updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!faculty) {
      return res.status(404).json({
        success: false,
        error: 'Faculty member not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: faculty
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete faculty member
exports.deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    
    if (!faculty) {
      return res.status(404).json({
        success: false,
        error: 'Faculty member not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; 