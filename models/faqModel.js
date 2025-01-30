const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Please enter the question'],
        trim: true
    },
    answer: {
        type: String,
        required: [true, 'Please enter the answer'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FAQ', faqSchema);
