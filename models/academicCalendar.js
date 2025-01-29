const mongoose = require('mongoose');

const academicCalendarSchema = new mongoose.Schema({
    section: {
        type: String,
        required: [true, 'Please enter the section (primary/middle/high)'],
        enum: ['primary', 'middle', 'high']
    },
    title: {
        type: String,
        required: [true, 'Please enter the section title']
    },
    events: [{
        date: {
            type: String,
            required: [true, 'Please enter the event date']
        },
        day: {
            type: String,
            required: [true, 'Please enter the event day']
        },
        event: {
            type: String,
            required: [true, 'Please enter the event name']
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AcademicCalendar', academicCalendarSchema);
