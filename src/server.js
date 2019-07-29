// Import requirements
const Provider = require('oidc-provider');
const http = require('http');
const app = require('./app');
const config = require('./config');
const configuration = require('./support/oidc.config');
const routes = require('./routes/interactions.routes');

// Import the entities
const UserEntity = require('./entities/user.entity');
const ClaimEntity = require('./entities/claim.entity');

// Define a server variable
let server;

(async () => {

    let adapter;

    // Check if a mongo db URI exists
    // If so, define our adapter to be mongo
    if (config.STORES.TYPE === 0) {
        // Retrieve the adapter
        adapter = require('./adapters/mongodb');
        // Await connection
        await adapter.connect();
    } else {
        // Retrieve the redis adapter
        adapter = require('./adapters/redis_adapter');
        // Await connection
        // await adapter.connect();
    }

    // Create a new provider 
    const provider = new Provider(config.APP.ISSUER, { adapter, ...configuration });

    // Check if we are currently on production
    if (config.NODE_ENV === 'production') {
        // During production mode we need to enable some
        // additional variables
        app.enable('trust proxy'); // or app.set('trust proxy', true);
        provider.proxy = true;
        set(configuration, 'cookies.short.secure', true);
        set(configuration, 'cookies.long.secure', true);

        // Check if secured protocols are used
        app.use((req, res, next) => {
            // Check if request is serued
            if (req.secure) {
                next(); // If it is, proceed to interaction
            } // Otherwise check if method is of type HEAD or GET
            else if (req.method === 'GET' || req.method === 'HEAD') {
                // Reformat the request to use HTTPS (secure) protocol
                res.redirect(url.format({
                    protocol: 'https',
                    host: req.get('host'),
                    pathname: req.originalUrl,
                }));
            } // In any other case, inform client to use secure protocols 
            else {
                res.status(400).json({
                    error: 'invalid_request',
                    error_description: 'do yourself a favor and only use https',
                });
            }
        });
    }

    // Set the routes using current app and provider   
    routes(app, provider);

    // Set app to use the provider callback for all requests
    app.use(provider.callback);

    // Create the server
    server = http.createServer(app);

    // Start listening at specified port
    server.listen(config.APP.PORT, (e) => {
        // Check if there are any errors
        if (e) {
            throw new Error('Internal Server Error');
        }

        // Log server is running
        console.log(`${config.APP.APP_NAME} running on ${config.APP.PORT}`);
    });

    // Catch any errors in the server
})().catch((err) => {
    // Close server if error occures and if server is running
    if (server && server.listening) server.close();
    // Log the error
    console.error(err);
    // Define the exit code
    process.exitCode = 1;
});
