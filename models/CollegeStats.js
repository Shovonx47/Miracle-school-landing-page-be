const mongoose = require('mongoose');

const collegeStatsSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CollegeStats', collegeStatsSchema);
