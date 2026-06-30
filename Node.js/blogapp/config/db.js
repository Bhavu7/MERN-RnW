// config/db.js
// Handles MongoDB connection using Mongoose
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Stop server if DB fails to connect
  }
};

module.exports = connectDB;
