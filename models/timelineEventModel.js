const mongoose = require('mongoose');

const timelineEventSchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  // Legacy section data
  heroImage: { type: String, default: '/assets/images/Buildings/low-rise-building.jpg' },
  heroTitle: { type: String, default: 'Our Legacy' },
  heroSubtitle: { type: String, default: 'Seven decades of shaping minds and building futures at Notre Dame College Dhaka' },
  stats: [{
    value: { type: String, required: true },
    label: { type: String, required: true }
  }],
  legacyTitle: { type: String, default: 'A Legacy of Excellence' },
  legacyDescription: { type: String, required: true }
});

module.exports = mongoose.model('TimelineEvent', timelineEventSchema);
