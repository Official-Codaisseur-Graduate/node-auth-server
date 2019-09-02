// Import required modules
const assert = require('assert');

const { localhost } = require('./hosts');

const port = process.env.PORT || 5000;

// Export the configuration module
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    APP: {
        APP_NAME: process.env.HEROKU_APP_NAME || 'auth-server',
        PORT: port,
        ISSUER:
            process.env.NODE_ENV === 'production'
                ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
                : `http://${localhost}:${port}`
    },
    MAIL: {
        EMAIL: process.env.EMAIL_ADDRESS
            ? `${process.env.EMAIL_ADDRESS}`
            : 'codaisseurclass28@gmail.com',
        PASSWORD: process.env.PASSWORD
            ? `${process.env.PASSWORD}`
            : 'c0d@!ss3ur'
    },
    SECURITY: {
        SECURE_KEY:
            process.env.SECURE_KEY ||
            '1C281FFC0280B7A04F4237A397B55542F2D8B9A0365FBB6D8B9D9CB899C69687,E901DF3944E93756738090BA2362419CF609155FA8AC544FDE2400618F181D68'
    },
    STORES: {
        TYPE: 1, // 0: MongoDB, 1: Redis
        REDIS_URL:
            process.env.REDIS_URL ||
            'redis://h:paab295f6e314d1bd943a836a4ca879dae40f749a53107c57c99da3f397180a0e@ec2-3-210-129-46.compute-1.amazonaws.com:27459',
        MONGODB_DB: process.env.MONGODB_URI,
        DATABASE_URL:
            process.env.DATABASE_URL ||
            'postgresql://postgres:secret@localhost:5432/postgres'
        // 'postgres://wcsbtdqwmfkpno:d5160fdab36771845230f82def5364ddbe36b012d0b20263f03efffdf1f4c88d@ec2-174-129-226-234.compute-1.amazonaws.com:5432/diqj28rhkq6f'
    }
};
