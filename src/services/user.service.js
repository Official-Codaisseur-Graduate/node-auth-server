// Import required modules
const bcrypt = require('bcryptjs');
const User = require('./../entities/user.entity');
const Claim = require('../entities/claim.entity');

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

                // Hash password
                const hashedPassword = bcrypt.hashSync(password, 10);

                // Create user
                const createNewUserObj = { email, firstName, lastName, gender, password: hashedPassword, dateOfBirth, emailConfirmed: false };

                // User not found, create a new one
                User.create(createNewUserObj)
                    .then(u => {
                        // Set status 201 :: user created
                        return res.status(201).send({
                            // Return only the user without password
                            id: u.id
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
/**
 * Method that returns a list of users and their claims
 */
const getAll = (req, res, next) => {
    return User.findAll({
        include: ["claims"]
    }).then(result => res.status(200).send(result));
}

// Method that admin can remove a user from the list
const deleteUser = (req, res, next) => {
    // get the requester user id
    // query claims if the requester id has claim with name = role ?, value = admin ?
    return Claim.findOne({ where: { 
        id: req.params.uid,
        name: 'role',
        value: 'admin'
    } }).then(resultUser => {
        if(resultUser) {
            return User
                .destroy({
                    where: {
                    id: req.params.uid
                    }
                })
                .then(userDeleted => {
                    if (userDeleted) {
                    return res.status(204).end()
                    }
                    return res.status(404).end()
                })
                .catch(e => next(e))
        } else{
            //
            return res.status(403).end()
        }
    }).catch(e => next(e))
}


// Export the functions
module.exports = { register, getAll, deleteUser };