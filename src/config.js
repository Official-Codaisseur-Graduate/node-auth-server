// Import required modules
const assert = require('assert');

// Export the configuration module
module.exports = ({
    NODE_ENV: process.env.NODE_ENV || "development",
    APP: {
        APP_NAME: process.env.HEROKU_APP_NAME || 'localhost',
        PORT: process.env.PORT || 5000,
        ISSUER: (HEROKU_APP_NAME !== 'localhost' ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` : `http://localhost:${PORT}`)
    },
    SECURITY: {
        SECURE_KEY: process.env.SECURE_KEY || '1C281FFC0280B7A04F4237A397B55542F2D8B9A0365FBB6D8B9D9CB899C69687,E901DF3944E93756738090BA2362419CF609155FA8AC544FDE2400618F181D68',

    },
    STORES: {
        TYPE: 0, // 0: MongoDB, 1: Redis
        REDIS_URL: assert(process.env.REDIS_URL, 'process.env.REDIS_URL missing, run `heroku-redis:hobby-dev`'),
        MONGODB_DB: process.env.MONGODB_URI
    }
});
