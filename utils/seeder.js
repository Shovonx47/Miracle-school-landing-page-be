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
    process.exit();
  } catch (error) {
    console.error('Error seeding administration data:', error);
    process.exit(1);
  }
};

// Function to seed news data
const seedNewsData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    // Delete existing news data
    await News.deleteMany();
    console.log('Existing news data deleted');

    // Insert new news data
    await News.insertMany(newsData);
    console.log('News data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding news data:', error);
    process.exit(1);
  }
};

// Function to seed notices data
const seedNoticesData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    // Delete existing notices data
    await News.deleteMany({ category: 'Notice' });
    console.log('Existing notices data deleted');

    // Insert new notices data
    await News.insertMany(noticesData);
    console.log('Notices data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding notices data:', error);
    process.exit(1);
  }
};

// Check command line arguments
const [,, command, modelName] = process.argv;

if (command === 'import') {
  switch (modelName) {
    case 'administration':
      seedAdministrationData();
      break;
    case 'news':
      seedNewsData();
      break;
    case 'notices':
      seedNoticesData();
      break;
    default:
      console.error('Please use: node utils/seeder.js import [administration|news|notices]');
      process.exit(1);
  }
} else {
  console.error('Please use: node utils/seeder.js import [administration|news|notices]');
  process.exit(1);
}
