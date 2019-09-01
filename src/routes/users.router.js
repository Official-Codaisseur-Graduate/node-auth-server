// Import required modules
const { Router } = require('express');
const userService = require('./../services/user.service');
const User = require('../entities/user.entity');

// Create a new router
const router = new Router();

// Logs in an existing user or creates a new one
router.post('/signup', userService.register);

// endpoint that request link to reset password
router.post('/forgetPassword', userService.forgetPassword)

// endpoint that check token to reset password
router.get('/reset', userService.reset)

//  endpoint that update new password 
router.put('/updatePassword', userService.updatePassword)

// Endpoint that retrieves a list of users
// TODO: This endpoing must be protected and only admin can retrieve data
router.get('/', userService.getAll);

// Endpoint that admin delete a user from the list
router.delete('/users/:userId', async (req, res, next) => {
    try {
        await User.destroy({ where: { id: req.params.userId } });
        return res.status(204).end();
    } catch (error) {
        next(error);
    }
});

// Export the router
module.exports = router;
