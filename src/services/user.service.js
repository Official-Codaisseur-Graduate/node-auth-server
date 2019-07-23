// Import required modules
const userRepository = require('./../repositories/user.repository');

/**
 * Method that registers a new user
 */
const register = (req, res, next) => {
    // Retrieve the user data
    const { email, firstName, lastName,
        gender, dateOfBirth, password, passwordConfirmation
    } = req.body;

    // Check if user exists in the database
    return User.findOne({ where: { email: email } })
        .then(user => {
            // Check if user was not found
            if (!user) {

                // Confirm password is valid
                if (password !== passwordConfirmation) return res.status(400).send({
                    message: "Password and password confirmation do not match!"
                });

                // Create user
                const createNewUserObj = { email, firstName, lastName, gender, dateOfBirth, password };

                // User not found, create a new one
                User.create(createNewUserObj)
                    .then(u => {
                        // Define the retrieved data
                        const { password, ...rest } = u;
                        // Set status 201 :: user created
                        return res.status(201).send({
                            // Return only the user without password
                            newUser: rest
                        });
                    })
                    .catch(err => {
                        // User not created, return error
                        return res.status(500).send({
                            message: "Cannot create user. Please try again later"
                        })
                    });
            } else {
                // Valid user exists, return error
                return res.status(400).send({
                    // Email already exists
                    message: "Unable to create this user"
                });
            }
        })
        .catch(e => next(e));
}

// Expor the functions
module.exports = { register };