const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Please enter your phone number']
  },
  type: {
    type: String,
    required: [true, 'Please specify feedback type'],
    enum: ['মতামত', 'জিজ্ঞাসা']
  },
  message: {
    type: String,
    required: [true, 'Please enter your message']
  },
  attachments: [{
    type: String // URLs to uploaded files
  }],
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'responded'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema); 