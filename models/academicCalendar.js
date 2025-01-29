const mongoose = require('mongoose');

const academicCalendarSchema = new mongoose.Schema({
    section: {
        type: String,
        required: [true, 'Please enter the section (primary/middle/high)'],
        enum: ['primary', 'middle', 'high']
    },
    title: {
        type: String,
        required: [true, 'Please enter the section title'],
        trim: true
    },
    events: [{
        date: {
            type: String,
            required: [true, 'Please enter the event date'],
            trim: true
        },
        day: {
            type: String,
            required: [true, 'Please enter the event day'],
            trim: true
        },
        event: {
            type: String,
            required: [true, 'Please enter the event name'],
            trim: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Ensure proper encoding for Bengali text
academicCalendarSchema.set('toJSON', {
    transform: function(doc, ret) {
        return ret;
    }
});

module.exports = mongoose.model('AcademicCalendar', academicCalendarSchema);
