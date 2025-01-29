const mongoose = require('mongoose');

const principalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Principal', principalSchema);
