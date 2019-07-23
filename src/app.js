// Import requirements
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');

// Import routes

// Instantiate app
const app = express();

// Apply middlewares
app.use(cors());
app.use(jsonParser);

// Define Interaction Definitions
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

// Export app
module.exports = app;