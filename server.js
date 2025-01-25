require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://school-website-full-stack.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB before handling routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database Connection Error:', {
      path: req.path,
      method: req.method,
      error: error.message
    });
    res.status(500).json({ 
      error: 'Database connection failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Routes
app.use('/api/mission-vision', require('./routes/missionVisionRoutes'));
app.use('/api/faculty', require('./routes/facultyRoutes'));
app.use('/api/location', require('./routes/locationRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', {
    path: req.path,
    method: req.method,
    error: err.message
  });
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

// Only listen if not running in Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
