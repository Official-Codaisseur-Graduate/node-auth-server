// Import requirements
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');
const logger = require('morgan');

// Import routes
const userRoutes = require('./routes/users.router');

// Instantiate app
const app = express();

// Apply middlewares
app.use(cors());
app.use(jsonParser);
app.use(logger('dev'));

// Define Interaction Definitions
app.set('view engine', 'ejs');
console.log('DIRECTORY NAME', __dirname);
app.use(express.static(__dirname + '/assets'));
app.set('views', path.resolve(__dirname, 'views'));

// Forward requests to specified routes
app.use('/users', userRoutes);

// Export app
module.exports = app;
