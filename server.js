require('dotenv').config(); // Load environment variables at the very top

const connectDB = require('./db'); // Import DB connection function
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const passwordRoutes = require('./routes/passwords');
const pinRoutes = require('./routes/pins');

// Validate required environment variables
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is not defined. Please set it in your environment variables.');
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.warn('⚠️  JWT_SECRET is not defined. Using default secret (not recommended for production).');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);
app.use('/api/pins', pinRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Note: Render does NOT read local .env files. Set environment variables in the Render dashboard under "Environment".