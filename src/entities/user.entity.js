// Import required modules
const Sequelize = require('sequelize');
const db = require('./../db');

// Import linked entities
const Claim = require('./claim.entity');

// Define a user model
const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emailConfirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        tableName: 'users',
        timestamps: false
    }
);

// Define relationships
User.hasMany(Claim);
Claim.belongsTo(User);

// Export the user entity model
module.exports = User;