const mongoose = require('mongoose');

const timelineEventSchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('TimelineEvent', timelineEventSchema);
