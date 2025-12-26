const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');  // ADD THIS LINE
const connectToMongo = require('./db');
const app = express();

app.set('view engine','ejs')
app.use(express.static('public'))

const PORT = process.env.PORT || 8181;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToMongo();

// API Routes
app.use('/api/auth', require('./routes/auth'));

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// All other routes serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
