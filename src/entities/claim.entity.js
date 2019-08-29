// Import required modules
const Sequelize = require('sequelize');
const db = require('./../db');

// Define a claim entity
const Claim = db.define(
    'claim',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        value: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'claims',
        timestamps: false
    }
);

// Export the claim entity model
module.exports = Claim;
