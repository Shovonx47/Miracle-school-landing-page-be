require('dotenv').config();
const mongoose = require('mongoose');
const GoverningBody = require('../models/governingBodyModel');
const AlbumImage = require('../models/albumImageModel');
const News = require('../models/news');
const administrationData = require('../data/administrationSeeder');
const newsData = require('../data/news.json');
const noticesData = require('../data/notices.json');

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
    
    // Close the connection instead of exiting
    await mongoose.connection.close();
    return true;
  } catch (error) {
    console.error('Error seeding administration data:', error);
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    return false;
  }
};

// Function to seed news data
const seedNewsData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    // Delete all existing news data (including notices)
    await News.deleteMany();
    console.log('All existing news data deleted');

    // First insert news data
    await News.insertMany(newsData);
    console.log('News data seeded successfully');

    // Then insert notices data
    await News.insertMany(noticesData);
    console.log('Notices data seeded successfully');
    
    // Close the connection instead of exiting
    await mongoose.connection.close();
    return true;
  } catch (error) {
    console.error('Error seeding news data:', error);
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    return false;
  }
};

// Check command line arguments
const [,, command, modelName] = process.argv;

if (command === 'import') {
  switch (modelName) {
    case 'administration':
      seedAdministrationData().then(success => {
        process.exit(success ? 0 : 1);
      });
      break;
    case 'news':
      seedNewsData().then(success => {
        process.exit(success ? 0 : 1);
      });
      break;
    default:
      console.error('Please use: node utils/seeder.js import [administration|news]');
      process.exit(1);
  }
} else {
  console.error('Please use: node utils/seeder.js import [administration|news]');
  process.exit(1);
}
