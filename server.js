require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://miracle-school-landing-page-be.vercel.app/'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB before handling routes
const withDB = async (req, res, next) => {
  try {
    const mongoose = await connectDB();
    req.mongoose = mongoose;
    return next();
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    return res.status(500).json({ 
      error: 'Database connection failed',
      message: error.message 
    });
  }
};

// Apply database connection to all routes
app.use(withDB);

// Routes
app.use('/api/mission-vision', require('./routes/missionVisionRoutes'));
app.use('/api/faculty', require('./routes/facultyRoutes'));
app.use('/api/location', require('./routes/locationRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
