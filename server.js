const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db'); // We'll create this next

// Load env vars
dotenv.config();

// Route files
const villages = require('./src/routes/villages');
const characters = require('./src/routes/characters');

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount routers
app.use('/api/v1/villages', villages);
app.use('/api/v1/characters', characters);

// Define routes here (to be added later)
// app.use('/api/v1/authors', require('./src/routes/authors'));
// app.use('/api/v1/books', require('./src/routes/books'));


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
}); 