require('dotenv').config();
const mongoose = require('mongoose');
const GoverningBody = require('../models/governingBodyModel');
const AlbumImage = require('../models/albumImageModel');
const administrationData = require('../data/administrationSeeder');

// Function to seed administration data (governing body and album images)
const seedAdministrationData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    // Delete existing data
    await Promise.all([
      GoverningBody.deleteMany(),
      AlbumImage.deleteMany()
    ]);

    // Insert new data
    await Promise.all([
      GoverningBody.insertMany(administrationData.governingBody),
      AlbumImage.insertMany(administrationData.albumImages)
    ]);

    console.log('Administration data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding administration data:', error);
    process.exit(1);
  }
};

// Check command line arguments
const [,, command, modelName] = process.argv;

if (command === 'import' && modelName === 'administration') {
  seedAdministrationData();
} else {
  console.error('Please use: node utils/seeder.js import administration');
  process.exit(1);
}
