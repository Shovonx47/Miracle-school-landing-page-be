const EventCalendar = require('../models/EventCalendar');

const eventCalendarController = {
  // Get all event calendar data
  getEventCalendarData: async (req, res) => {
    try {
      const eventCalendarData = await EventCalendar.findOne()
        .sort({ createdAt: -1 }) // Get the most recent entry
        .lean();
      
      if (!eventCalendarData) {
        return res.status(404).json({ message: 'Event calendar data not found' });
      }

      res.status(200).json(eventCalendarData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching event calendar data', error: error.message });
    }
  },

  // Create new event calendar data
  createEventCalendarData: async (req, res) => {
    try {
      const newEventCalendarData = new EventCalendar(req.body);
      await newEventCalendarData.save();
      res.status(201).json(newEventCalendarData);
    } catch (error) {
      res.status(500).json({ message: 'Error creating event calendar data', error: error.message });
    }
  },

  // Update event calendar data
  updateEventCalendarData: async (req, res) => {
    try {
      const updatedData = await EventCalendar.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!updatedData) {
        return res.status(404).json({ message: 'Event calendar data not found' });
      }

      res.status(200).json(updatedData);
    } catch (error) {
      res.status(500).json({ message: 'Error updating event calendar data', error: error.message });
    }
  }
};

module.exports = eventCalendarController; 