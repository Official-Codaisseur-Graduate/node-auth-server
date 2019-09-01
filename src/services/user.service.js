// Import required modules
const bcrypt = require('bcryptjs')
const User = require('./../entities/user.entity')
const sequelize = require('sequelize')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const config = require('./../config')

const APP_URL = config.APP.ISSUER
const MAIL_EMAIL_PROVIDER = config.MAIL.EMAIL
const MAIL_PASSWORD_PROVIDER = config.MAIL.PASSWORD
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

// Method that user can request link for forgotten password
const forgetPassword = (req, res, next) => {
    if (!req.body.email) {
        return res.status(400).json('email required')
    }
    return User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user === null) {
                res.status(404).json('email does not exists')
            } else {
                const token = crypto.randomBytes(20).toString('hex')
                user.update({
                    resetPasswordToken: token,
                    resetPasswordExpires: Date.now() + 360000
                })

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: `${MAIL_EMAIL_PROVIDER}`,
                        pass: `${MAIL_PASSWORD_PROVIDER}`,
                    }
                })

                const mailOptions = {
                    from: `${MAIL_EMAIL_PROVIDER}`,
                    to: `${user.email}`,
                    subject: 'Link To Reset Password',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account. \n\n' +
                        'Please click on the following link or paste this into your browser to complete the process within one hour of receiving it: \n\n' +
                        `${APP_URL}/reset/${token}\n\n` +
                        'If you did not request this, please ignore this email and your password will remain unchaged.\n',
                }

                transporter.sendMail(mailOptions, function (err, response) {
                    if (err) {
                        res.status(500).json('there was an error sending an email')
                    } else {
                        res.status(200).json('recovery email sent')
                    }
                })

            }
        })
}

// Method that reset password
const reset = (req, res, next) => {
    return User.findOne({
        where: {
            resetPasswordToken: req.query.params.resetPasswordToken,
            resetPasswordExpires: sequelize.where(
                sequelize.col('resetPasswordExpires'),
                '>',
                new Date().toISOString()
            )
        }
    })
        .then(user => {
            if (user === null) {
                res.json('password reset link is invalid or has expired')
            } else {
                res.status(200).json({
                    email: user.email,
                    message: 'password reset link ok'
                })
            }
        })
}


// Method that 
const BCRYPT_SALT_ROUNDS = 12
const updatePassword = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (user != null) {
            bcrypt
                .hash(req.body.password, BCRYPT_SALT_ROUNDS)
                .then(hashedPassword => {
                    user.update({
                        password: hashedPassword,
                        resetPasswordToken: null,
                        resetPasswordExpires: null,
                    })
                })
                .then(() => {
                    res.status(200).send({
                        message: 'password updated'
                    })
                })
        } else {
            res.status(404).json('no user exists in database to update')
        }
    })
    .catch(() => {
        res.status(404).json('no user exists in database to update')
    })
}


/**
 * Method that returns a list of users and their claims
 */
const getAll = (req, res, next) => {
    return User.findAll({
        include: ["claims"]
    }).then(result => res.status(200).send(result));
}

// Expor the functions
module.exports = { register, getAll, forgetPassword, reset, updatePassword };