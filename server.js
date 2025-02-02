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
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const eventCalendarRoutes = require('./routes/eventCalendarRoutes');
const campusFacilityRoutes = require('./routes/campusFacilityRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const photoRoutes = require('./routes/photo');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://miracle-school-landing-page.vercel.app',
    'https://miracle-school-landing-page-git-main-shovonx47.vercel.app',
    'https://miracle-school-website-fe.vercel.app',
    'https://miracle-school-landing-page-be.vercel.app',
    // Add your frontend domain here if it's different
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use('/assets', express.static('assets'));

// Connect to MongoDB before handling routes
const withDB = async (req, res, next) => {
  try {
    await connectDB();
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
app.use('/api', scholarshipRoutes);
app.use('/api', eventCalendarRoutes);
app.use('/api', campusFacilityRoutes);
app.use('/api', feedbackRoutes);
app.use('/api/v1', photoRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// For Vercel serverless deployment
module.exports = app;

// Just for commit