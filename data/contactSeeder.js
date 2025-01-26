const contactData = require('./contactData');

const seedContactData = () => {
    // This function will seed the contact data into the database
    console.log('Seeding contact data...');
    console.log(contactData);
};

module.exports = seedContactData;
