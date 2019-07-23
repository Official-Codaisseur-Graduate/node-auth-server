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
router.post('/signup', (req, res, next) => {

    console.log(req.body.data);

    // Check if details retrieved
    const { email, firstName, lastName,
        gender, dateOfBirth, password, passwordConfirmation } = req.body;

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

// Endpoint that retrieves a list of users
// TODO: This endpoing must be protected and only admin can retrieve data
router.get('/', (req, res) => {
    // Define an array of users
    const users = [];

    Object.keys(USERS).map(function (id, index) {
        // Create a new user
        let newUser = { id };

        // Claims object
        let claims = USERS[id];

        // Retrieve all the claims needed
        newUser["email"] = claims["email"] || null;
        newUser["firstName"] = claims["first_name"] || null;
        newUser["lastName"] = claims["last_name"] || null;
        newUser["dateOfBirth"] = claims["dob"] || null;
        newUser["gender"] = claims["gender"] || null;

        // Add the user
        users.push(newUser);
    });


    // // Define what details should be returned
    // // Map through all the users
    // USERS.map((id, claims) => {
    //     // Create a new user
    //     let newUser = { id };
    //     // Retrieve all the claims needed
    //     claims.map((name, value) => newUser[name] = value);
    //     // Push the user to the list
    //     users.push(newUser);
    // });

    res.status(200).send({ users });
})

// Export the router
module.exports = router;