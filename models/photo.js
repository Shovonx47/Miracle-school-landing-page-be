const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter photo title'],
    trim: true,
    maxLength: [100, 'Photo title cannot exceed 100 characters']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please enter photo URL']
  },
  altText: {
    type: String,
    required: [true, 'Please enter alternative text for the photo']
  },
  category: {
    type: String,
    required: [true, 'Please enter photo category']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Photo', photoSchema); 