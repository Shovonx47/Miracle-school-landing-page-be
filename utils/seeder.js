require('dotenv').config();
const mongoose = require('mongoose');
const Faculty = require('../models/Faculty');
const MissionVision = require('../models/MissionVision');
const Location = require('../models/Location');
const GoverningBody = require('../models/governingBodyModel');
const TimelineEvent = require('../models/timelineEventModel');
const AlbumImage = require('../models/albumImageModel');
const Contact = require('../models/contactModel'); // Assuming you have a contact model
const facultyData = require('../data/seedData');
const missionVisionData = require('../data/missionVisionData');
const locationData = [
  {
    name: "Notre Dame College",
    coordinates: {
      lat: 23.738636,
      lng: 90.395491,
    },
    address: "2 Arambagh, Motijheel, Dhaka 1000, Bangladesh",
    phone: "+880 2-7192027",
    email: "info@notredamecollege-dhaka.com",
  },
];

// Import external seeders
const seedTimelineEvents = require('../data/timelineEventsSeeder');
const seedGoverningBodyMembers = require('../data/governingBodySeeder');
const seedAlbumImages = require('../data/albumImagesSeeder');
const seedContactData = require('../data/contactSeeder');

// Utility function to import data
const importData = async (Model, data, modelName) => {
  try {
    await Model.deleteMany({});
    if (Array.isArray(data)) {
      await Model.insertMany(data);
    } else if (typeof data === 'function') {
      await data(); // Execute seeder function
    }
    console.log(`${modelName} data imported successfully`);
  } catch (error) {
    console.error(`Error importing ${modelName} data:`, error.message);
    process.exit(1);
  }
};

// Utility function to destroy data
const destroyData = async (Model, modelName) => {
  try {
    await Model.deleteMany({});
    console.log(`${modelName} data destroyed successfully`);
  } catch (error) {
    console.error(`Error destroying ${modelName} data:`, error.message);
    process.exit(1);
  }
};

// Run all seeders
const runSeeders = async () => {
  try {
    await seedTimelineEvents();
    await seedGoverningBodyMembers();
    await seedAlbumImages();
    await seedContactData(); // Call the seed function
    console.log('All seeders executed successfully!');
  } catch (error) {
    console.error('Error running seeders:', error.message);
    process.exit(1);
  }
};

// Main function to handle all actions
const runSeeder = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    const action = process.argv[2];
    const modelName = process.argv[3]?.toLowerCase();

    if (!action) {
      console.error('Please provide an action: import, destroy, or run-seeders');
      process.exit(1);
    }

    if (action === 'run-seeders') {
      await runSeeders();
      process.exit(0);
    }

    if (!modelName) {
      console.error('Please provide a model name for import or destroy actions');
      process.exit(1);
    }

    let Model, data;
    switch (modelName) {
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
      case 'governingbody':
        Model = GoverningBody;
        data = seedGoverningBodyMembers;
        break;
      case 'timelineevent':
        Model = TimelineEvent;
        data = require('../data/timelineEventsSeeder');
        break;
      case 'albumimage':
        Model = AlbumImage;
        data = seedAlbumImages;
        break;
      case 'contact':
        Model = Contact;
        data = seedContactData;
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
      console.error('Invalid action. Use "import", "destroy", or "run-seeders"');
      process.exit(1);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

runSeeder();
