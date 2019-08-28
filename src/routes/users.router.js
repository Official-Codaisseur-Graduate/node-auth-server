// Import required modules
const { Router } = require('express');
const userService = require('./../services/user.service');
const User = require('../entities/user.entity')

// Create a new router
const router = new Router();

// Logs in an existing user or creates a new one
router.post('/signup', userService.register);

// Endpoint that retrieves a list of users
// TODO: This endpoing must be protected and only admin can retrieve data
router.get('/', userService.getAll);


// Endpoint that admin delete a user from the list
router.delete('/users/:uid', userService.deleteUser)


// Export the router
module.exports = router
