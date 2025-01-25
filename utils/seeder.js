require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Faculty = require('../models/Faculty');
const MissionVision = require('../models/MissionVision');
const Location = require('../models/Location');
const facultyData = require('../data/seedData');
const missionVisionData = require('../data/missionVisionData');

const locationData = [
  {
    name: "Notre Dame College",
    coordinates: {
      lat: 23.738636,
      lng: 90.395491
    },
    address: "2 Arambagh, Motijheel, Dhaka 1000, Bangladesh",
    phone: "+880 2-7192027",
    email: "info@notredamecollege-dhaka.com"
  }
];

// Connect to database
connectDB();

// Utility function to import data
const importData = async (Model, data, modelName) => {
  try {
    // Clear existing data
    await Model.deleteMany();

    // Insert new data
    await Model.insertMany(data);

    console.log(`${modelName} Data imported successfully`);
    process.exit();
  } catch (error) {
    console.error(`Error importing ${modelName} data: ${error.message}`);
    process.exit(1);
  }
};

// Utility function to destroy data
const destroyData = async (Model, modelName) => {
  try {
    await Model.deleteMany();

    console.log(`${modelName} Data destroyed successfully`);
    process.exit();
  } catch (error) {
    console.error(`Error destroying ${modelName} data: ${error.message}`);
    process.exit(1);
  }
};

// Determine which action to perform
const action = process.argv[2];
const modelName = process.argv[3]; // Pass "Faculty", "MissionVision", or "Location" as the third argument

if (!modelName || (modelName !== 'Faculty' && modelName !== 'MissionVision' && modelName !== 'Location')) {
  console.error('Please specify a valid model: Faculty, MissionVision, or Location');
  process.exit(1);
}

const Model = modelName === 'Faculty' 
  ? Faculty 
  : modelName === 'MissionVision' 
    ? MissionVision 
    : Location;

const data = modelName === 'Faculty' 
  ? facultyData 
  : modelName === 'MissionVision' 
    ? missionVisionData 
    : locationData;

if (action === '-d') {
  destroyData(Model, modelName);
} else {
  importData(Model, data, modelName);
}
