require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const aboutUsRoutes = require('./routes/aboutUsRoutes');
const historyRoutes = require('./routes/historyRoutes');
const administrationRoute = require('./routes/administrationRoute');
const missionVisionRoutes = require('./routes/missionVisionRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const locationRoutes = require('./routes/locationRoutes');
const contact = require('./routes/contact');
const news = require('./routes/news');
const principalRoutes = require('./routes/principalRoutes');
const collegeStatsRoutes = require('./routes/collegeStatsRoutes');
const academicCalendarRoutes = require('./routes/academicCalendar');
const curriculumRoutes = require('./routes/curriculum');
const faq = require('./routes/faq');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://miracle-school-landing-page.vercel.app',
    'https://miracle-school-landing-page-git-main-shovonx47.vercel.app',
    'https://miracle-school-website-fe.vercel.app',
    'https://miracle-school-landing-page-be.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use('/assets', express.static('assets'));

// Connect to MongoDB
let cachedDb = null;

const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }
  try {
    cachedDb = await connectDB();
    return cachedDb;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

// Middleware to ensure DB connection
const withDB = async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      success: false,
      message: 'Database connection failed'
    });
  }
};

// Apply database connection to all routes
app.use(withDB);

// Routes
app.use('/api/mission-vision', missionVisionRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/contact', contact);
app.use('/api/news', news);
app.use('/api/about-us', aboutUsRoutes);
app.use('/api/about-us/administration', administrationRoute);
app.use('/api/history', historyRoutes);
app.use('/api', principalRoutes);
app.use('/api', collegeStatsRoutes);
app.use('/api/v1', academicCalendarRoutes);
app.use('/api/v1', curriculumRoutes);
app.use('/api/v1', faq);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
