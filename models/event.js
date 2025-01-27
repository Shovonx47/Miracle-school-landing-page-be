const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter event title'],
        trim: true,
        maxLength: [100, 'Event title cannot exceed 100 characters']
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: [true, 'Please enter event date']
    },
    time: {
        type: String,
        required: [true, 'Please enter event time']
    },
    location: {
        type: String,
        required: [true, 'Please enter event location']
    },
    image: {
        type: String,
        required: [true, 'Please enter event image']
    },
    description: {
        type: String,
        required: [true, 'Please enter event description']
    },
    highlights: [{
        type: String
    }],
    schedule: [{
        time: {
            type: String,
            required: true
        },
        activity: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', eventSchema);
