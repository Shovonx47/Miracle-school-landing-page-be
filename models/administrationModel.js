const mongoose = require('mongoose');

const administrationSchema = new mongoose.Schema({
    governingBody: [{
        name: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }],
    albumImages: [{
        url: {
            type: String,
            required: true
        }
    }],
    contact: {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Administration', administrationSchema);
