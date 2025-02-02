const mongoose = require('mongoose');

const facilitySlideSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true }
});

const facilitySchema = new mongoose.Schema({
  iconName: { type: String, required: true }, // Store icon name as string
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }]
});

const campusFacilitySchema = new mongoose.Schema({
  facilitySlides: [facilitySlideSchema],
  facilities: [facilitySchema]
}, { timestamps: true });

module.exports = mongoose.model('CampusFacility', campusFacilitySchema); 