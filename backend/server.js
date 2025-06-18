const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');  // Import path module for serving static files
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json()); // Body parser for JSON data

// Routes
app.use('/api/auth', authRoutes);  // Auth routes
app.use('/api/posts', postRoutes); // Post routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Serve index.html for all non-API requests
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
