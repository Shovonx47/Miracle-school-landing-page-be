const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Anonymous'
  },
  email: {
    type: String,
    default: 'Not provided'
  },
  phone: {
    type: String,
    default: 'Not provided'
  },
  type: {
    type: String,
    default: 'General'
  },
  message: {
    type: String,
    default: 'No message provided'
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