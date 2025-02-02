const mongoose = require('mongoose');

const bannerImageSchema = new mongoose.Schema({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true }
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true }
});

const eventCategorySchema = new mongoose.Schema({
  month: { type: String, required: true },
  events: [eventSchema]
});

const eventCalendarSchema = new mongoose.Schema({
  bannerImages: [bannerImageSchema],
  eventCategories: [eventCategorySchema],
  academicYear: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('EventCalendar', eventCalendarSchema); 