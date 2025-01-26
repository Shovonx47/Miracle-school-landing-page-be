const contactData = require('../data/contactData');

// Controller to get contact information
exports.getContactInformation = (req, res) => {
    res.json(contactData);
};
