// Import required models
const Sequelize = require('sequelize');
const config = require('./config');
const databaseUrl = config.STORES.DATABASE_URL;

// Create a new instance of sequelize
const sequelize = new Sequelize(databaseUrl);

// Sync the data (create schemas)
sequelize
    .sync({ force: false })
    .then(r => {
        // Log success
        console.log('Database schema created!');
    })
    .catch(console.error);

// Export the sequelize instance
module.exports = sequelize;
