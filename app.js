const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ruleRoutes = require('./routes/rules');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS middleware
app.use(cors());

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/invoices', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Test route
app.get('/api/test', (req, res) => {
  console.log('Test route hit');
  res.json({ message: 'Test route working' });
});

// Routes
app.use('/api/rules', ruleRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});