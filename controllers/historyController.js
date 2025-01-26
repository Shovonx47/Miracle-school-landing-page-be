const TimelineEvent = require('../models/timelineEventModel');

// CRUD operations for Timeline Events
exports.createTimelineEvent = async (req, res) => {
  const event = new TimelineEvent(req.body);
  await event.save();
  res.status(201).send(event);
};

exports.getTimelineEvents = async (req, res) => {
  const events = await TimelineEvent.find();
  res.status(200).send(events);
};

exports.updateTimelineEvent = async (req, res) => {
  const event = await TimelineEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).send(event);
};

exports.deleteTimelineEvent = async (req, res) => {
  await TimelineEvent.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
