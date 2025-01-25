require('dotenv').config();
const mongoose = require('mongoose');
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

// Utility function to import data
const importData = async (Model, data, modelName) => {
  try {
    await Model.deleteMany();
    await Model.create(data);
    console.log(`${modelName} data imported successfully`);
  } catch (error) {
    console.error(`Error importing ${modelName} data:`, error.message);
    process.exit(1);
  }
};

// Utility function to destroy data
const destroyData = async (Model, modelName) => {
  try {
    await Model.deleteMany();
    console.log(`${modelName} data destroyed successfully`);
  } catch (error) {
    console.error(`Error destroying ${modelName} data:`, error.message);
    process.exit(1);
  }
};

const runSeeder = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    const action = process.argv[2];
    const modelName = process.argv[3];

    if (!action || !modelName) {
      console.error('Please provide both action and model name');
      process.exit(1);
    }

    let Model, data;
    switch (modelName.toLowerCase()) {
      case 'faculty':
        Model = Faculty;
        data = facultyData;
        break;
      case 'missionvision':
        Model = MissionVision;
        data = missionVisionData;
        break;
      case 'location':
        Model = Location;
        data = locationData;
        break;
      default:
        console.error('Invalid model name');
        process.exit(1);
    }

    if (action === 'import') {
      await importData(Model, data, modelName);
    } else if (action === 'destroy') {
      await destroyData(Model, modelName);
    } else {
      console.error('Invalid action. Use "import" or "destroy"');
      process.exit(1);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

runSeeder();
