require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

// Import all models
const GoverningBody = require('../models/governingBodyModel');
const AlbumImage = require('../models/albumImageModel');
const News = require('../models/news');
const Contact = require('../models/contactModel');
const TimelineEvent = require('../models/timelineEventModel');
const Principal = require('../models/Principal');
const CollegeStats = require('../models/CollegeStats');
const AcademicCalendar = require('../models/academicCalendar');
const Curriculum = require('../models/curriculum');
const FAQ = require('../models/faqModel');
const ScholarshipPage = require('../models/Scholarship');
const scholarshipData = require('../data/scholarshipData');
const connectDB = require('../config/db');
const EventCalendar = require('../models/EventCalendar');
const eventCalendarData = require('../data/eventCalendarData');
const CampusFacility = require('../models/CampusFacility');
const campusFacilityData = require('../data/campusFacilityData');
const Photo = require('../models/photo');
const photos = require('../data/photos.json');

// Model mapping
const modelMap = {
    'news.json': { model: News, type: 'json' },
    'notices.json': { model: News, type: 'json' },
    'events.json': { model: News, type: 'json' },
    'academicCalendar.json': { model: AcademicCalendar, type: 'json' },
    'curriculum.json': { model: Curriculum, type: 'json' },
    'administrationSeeder.js': { 
        models: [GoverningBody, AlbumImage],
        collections: ['governingBody', 'albumImages'],
        type: 'js'
    },
    'albumImagesSeeder.js': { model: AlbumImage, type: 'js' },
    'contactSeeder.js': { model: Contact, type: 'js' },
    'governingBodySeeder.js': { model: GoverningBody, type: 'js' },
    'timelineEventsSeeder.js': { model: TimelineEvent, type: 'js' },
    'principalSeeder.js': { model: Principal, type: 'js' },
    'collegeStatsSeeder.js': { model: CollegeStats, type: 'js' },
    'faqs.json': { model: FAQ, type: 'json' },
    'eventCalendarData.js': { model: EventCalendar, type: 'js' },
    'campusFacilityData.js': { model: CampusFacility, type: 'js' },
    'photos.json': { model: Photo, type: 'json' }
};

// Function to get all seeder files
const getSeederFiles = async () => {
    const dataDir = path.join(__dirname, '../data');
    const files = await fs.readdir(dataDir);
    return files.filter(file => file.endsWith('.json') || file.endsWith('Seeder.js') || file === 'eventCalendarData.js');
};

// Function to seed data
const seedData = async (fileName) => {
    try {
        // Connect to MongoDB if not connected
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('MongoDB Connected...');
        }

        const seederConfig = modelMap[fileName];
        if (!seederConfig) {
            console.log(`No configuration found for ${fileName}, skipping...`);
            return true;
        }

        if (fileName === 'eventCalendarData.js') {
            // Handle event calendar data specifically
            await EventCalendar.deleteMany();
            await EventCalendar.create(eventCalendarData);
            console.log('Event calendar data seeded successfully');
            return true;
        }

        if (fileName === 'campusFacilityData.js') {
            // Handle campus facility data specifically
            await CampusFacility.deleteMany();
            await CampusFacility.create(campusFacilityData);
            console.log('Campus facility data seeded successfully');
            return true;
        }

        if (seederConfig.type === 'json') {
            // Handle JSON files
            const data = require(`../data/${fileName}`);
            await seederConfig.model.deleteMany();
            await seederConfig.model.insertMany(data);
            console.log(`${fileName} data seeded successfully`);
        } else {
            // Handle JS seeder files
            const seederData = require(`../data/${fileName}`);
            
            if (seederConfig.models) {
                // Handle multiple models (like administrationSeeder)
                await Promise.all(seederConfig.models.map(model => model.deleteMany()));
                await Promise.all(seederConfig.collections.map((collection, index) => 
                    seederConfig.models[index].insertMany(seederData[collection])
                ));
            } else {
                // Handle single model seeders
                await seederConfig.model.deleteMany();
                await seederConfig.model.insertMany(seederData);
            }
            console.log(`${fileName} data seeded successfully`);
        }

        return true;
    } catch (error) {
        console.error(`Error seeding ${fileName}:`, error);
        return false;
    }
};

// Function to seed all data
const seedAllData = async () => {
    try {
        const files = await getSeederFiles();
        
        for (const file of files) {
            await seedData(file);
        }
        
        // Specifically seed event calendar data
        await EventCalendar.deleteMany();
        await EventCalendar.create(eventCalendarData);
        console.log('Event calendar data seeded successfully');
        
        // Specifically seed campus facility data
        await CampusFacility.deleteMany();
        await CampusFacility.create(campusFacilityData);
        console.log('Campus facility data seeded successfully');
        
        // Close connection after all operations
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
        }
        return true;
    } catch (error) {
        console.error('Error in seedAllData:', error);
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
        }
        return false;
    }
};

// Check command line arguments
const [,, command, fileName] = process.argv;

if (command === 'import') {
    if (fileName && fileName !== 'all') {
        // Seed specific file
        seedData(fileName).then(success => {
            if (mongoose.connection.readyState === 1) {
                mongoose.connection.close();
            }
            process.exit(success ? 0 : 1);
        });
    } else {
        // Seed all files
        seedAllData().then(success => {
            process.exit(success ? 0 : 1);
        });
    }
} else if (command === 'destroy') {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            return Promise.all([
                // ... other model deletions ...
                EventCalendar.deleteMany(),
                CampusFacility.deleteMany()
            ]);
        })
        .then(() => {
            console.log('All data destroyed successfully'.red.inverse);
            process.exit();
        })
        .catch(error => {
            console.error('Error:', error);
            process.exit(1);
        });
} else {
    console.error('Please use: node utils/seeder.js import [filename|all]');
    process.exit(1);
}

const seedScholarshipData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await ScholarshipPage.deleteMany();
    
    // Insert new data
    await ScholarshipPage.create(scholarshipData);
    
    console.log('Scholarship data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding scholarship data:', error);
    process.exit(1);
  }
};

const seedPhotos = async () => {
  try {
    await connectDB();
    
    // Delete existing photos
    await Photo.deleteMany();
    console.log('Photos deleted');

    // Insert new photos
    await Photo.insertMany(photos);
    console.log('All photos added');

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

module.exports = { seedScholarshipData, seedPhotos };

if (require.main === module) {
  seedScholarshipData();
  seedPhotos();
}
