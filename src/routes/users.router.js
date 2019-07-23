// Import required modules
const { Router } = require('express');
const userService = require('./../services/user.service');
const USERS = require('./../stores/user.store');

// Create a new router
const router = new Router();

// Generates a new random UUID (GUID) for a user.
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Logs in an existing user or creates a new one
router.post('/signup', userService.register);

// Endpoint that retrieves a list of users
// TODO: This endpoing must be protected and only admin can retrieve data
router.get('/', userService.getAll);

// Export the router
module.exports = router;