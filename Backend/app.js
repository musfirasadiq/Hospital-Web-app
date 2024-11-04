const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Ensure this path is correct
const doctorRoutes = require('./routes/doctorRoutes'); // Ensure this path is correct
const patientRoutes = require('./routes/patientRoutes'); // Ensure this path is correct
const appointmentRoutes = require('./routes/appointmentRoutes'); // Ensure this path is correct
const departmentRoutes = require('./routes/departmentRoutes'); // Ensure this path is correct
const morgan = require('morgan'); // For logging requests
require('dotenv').config(); // Load environment variables from .env

const app = express(); // Create an Express app
app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON bodies
app.use(morgan('dev')); // Log requests in 'dev' format

connectDB(); // Connect to MongoDB

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is running!' });
});

// Define routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/departments', departmentRoutes); // Ensure you have this line for departments

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(500).json({ message: 'Something went wrong!' }); // Send a generic error response
});

module.exports = app; // Export the app for use in server.js
