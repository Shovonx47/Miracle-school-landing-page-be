const mongoose = require('mongoose');

const curriculumSchema = new mongoose.Schema({
    class: {
        type: String,
        required: [true, 'Please enter the class name'],
        trim: true
    },
    topics: {
        type: String,
        required: [true, 'Please enter the topics'],
        trim: true
    },
    pdfUrl: {
        type: String,
        required: [true, 'Please enter the PDF URL'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Curriculum', curriculumSchema);
