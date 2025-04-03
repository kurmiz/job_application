// backend/src/server.js

require('dotenv').config(); // Load environment variables
const app = require('./app');
const mongoose = require('mongoose');

// Get port from environment variables
const PORT = process.env.PORT || 5000;

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start server after successful DB connection
  const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error.message);
  process.exit(1); // Exit process with failure
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  // Fix: 'server' was not defined in the original code
  process.exit(1);
});