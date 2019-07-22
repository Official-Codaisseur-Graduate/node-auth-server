// Import required modules
const assert = require('assert');

// Export the configuration module
module.exports = ({
    APP: {
        APP_NAME: process.env.HEROKU_APP_NAME || 'localhost',
        PORT: process.env.PORT || 5000,
        ISSUER: (HEROKU_APP_NAME !== 'localhost' ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` : `http://localhost:${PORT}`)
    },
    SECURITY: {
        SECURE_KEY: process.env.SECURE_KEY,

    },
    STORES: {
        REDIS_URL: assert(process.env.REDIS_URL, 'process.env.REDIS_URL missing, run `heroku-redis:hobby-dev`');

    }
});
