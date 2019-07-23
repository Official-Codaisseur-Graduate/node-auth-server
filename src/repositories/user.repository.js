// Import required modules
const User = require('./../entities/user.entity');

/**
 * THE USER REPOSITORY
 * Will be used to retrieve users and their claims and will be converting these into a USER model
 * This user model will only be used by the ADMIN who will be managing users.
 */
module.exports = {

    /**
     * Method that returns a list of all available users
     */
    getAll: async () => User.find(),

    /**
     * Method that creates a new user 
     */
    create: async (userData) => User.create(userData)
}