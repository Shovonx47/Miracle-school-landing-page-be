const mongoose = require('mongoose');
const Principal = require('../models/Principal');
const principalData = require('./principalData');

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Principal.deleteMany({});
    
    // Seed principal data
    await Principal.create(principalData);
    
    console.log('Principal data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedDatabase;
