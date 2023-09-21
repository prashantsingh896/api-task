const express = require('express');
const authRoutes = require('./routes/auth');
const countriesRoutes = require('./routes/countries');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route handling
app.use('/api/auth', authRoutes);
app.use('/api/countries', countriesRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
