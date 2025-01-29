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

// Model mapping
const modelMap = {
    'news.json': { model: News, type: 'json' },
    'notices.json': { model: News, type: 'json' },
    'events.json': { model: News, type: 'json' },
    'administrationSeeder.js': { 
        models: [GoverningBody, AlbumImage],
        collections: ['governingBody', 'albumImages'],
        type: 'js'
    },
    'albumImagesSeeder.js': { model: AlbumImage, type: 'js' },
    'contactSeeder.js': { model: Contact, type: 'js' },
    'governingBodySeeder.js': { model: GoverningBody, type: 'js' },
    'timelineEventsSeeder.js': { model: TimelineEvent, type: 'js' },
    'principalSeeder.js': { model: Principal, type: 'js' }
};

// Function to get all seeder files
const getSeederFiles = async () => {
    const dataDir = path.join(__dirname, '../data');
    const files = await fs.readdir(dataDir);
    return files.filter(file => file.endsWith('.json') || file.endsWith('Seeder.js'));
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
} else {
    console.error('Please use: node utils/seeder.js import [filename|all]');
    process.exit(1);
}
