// Import required modules
const { Router } = require('express');
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
router.post('/signup', (req, res, next) => {

    console.log(req.body.data);

    // Check if details retrieved
    const { email, firstName, lastName,
        gender, dateOfBirth, password, passwordConfirmation } = req.body.data;

    // Generate a new user ID
    const id = uuidv4();

    // Add user to the db (in this case )
    USERS[id] = {
        email,
        email_verified: false,
        first_name: firstName,
        last_name: lastName,
        gender,
        dob: dateOfBirth,
        password
    }

    // Return a response
    return res.status(201).send({
        id: id
    })
});

// Export the router
module.exports = router;