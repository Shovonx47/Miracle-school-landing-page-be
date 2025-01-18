const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
    enum: [
      'Principal',
      'Vice Principal',
      'Professor',
      'Associate Professor',
      'Assistant Professor',
      'Senior Lecturer',
      'Lecturer'
    ]
  },
  department: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  education: [{
    type: String,
  }],
  experience: [{
    type: String,
  }],
  classes: [{
    type: String,
  }],
  biography: {
    type: String,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Faculty', facultySchema); 