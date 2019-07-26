// Import required modules
const { Router } = require('express');
const userService = require('./../services/user.service');

// Create a new router
const router = new Router();

// Logs in an existing user or creates a new one
router.post('/signup', userService.register); // <=== edit:users

// Endpoint that retrieves a list of users
// TODO: This endpoing must be protected and only admin can retrieve data
router.get('/', userService.getAll); // <=== read:users

// Export the router
module.exports = router;