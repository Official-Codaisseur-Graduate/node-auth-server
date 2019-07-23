const { interactionPolicy: { Prompt, base: policy } } = require('oidc-provider');
const RedisAdapter = require('./../adapters/redis_adapter');
const jwks = require('./../support/jwks.json');
const Account = require('./../support/account');
const CLIENTS = require('./../stores/client.store');

// Copies the default policy, already 
// has login and consent prompt policies
const interactions = policy();

// Create a requestable prompt with no implicit checks
const selectAccount = new Prompt({
    name: 'select_account',
    requestable: true,
});

// Add to index 0, order goes select_account > login > consent
interactions.add(selectAccount, 0);

module.exports = {

    // Define the adapter here
    adapter: RedisAdapter,

    // Assign the Clients
    clients: CLIENTS,

    // Oidc-provider only looks up the accounts by their ID when it has to read the claims,
    // passing it our Account model method is sufficient, it should return a Promise that resolves
    // with an object with accountId property and a claims method.
    findAccount: Account.findById,

    // let's tell oidc-provider where our own interactions will be
    // setting a nested route is just good practice so that users
    // don't run into weird issues with multiple interactions open
    // at a time.
    interactionUrl(ctx) {
        return `/interaction/${ctx.oidc.uid}`;
    },
    /**
     * OR THE FOLLOWING
     */
    // // Assign any Iinteractions
    // interactions: {
    //     policy: interactions,
    //     url(ctx, interaction) {
    //         return `/interaction/${ctx.oidc.uid}`;
    //     },
    // },


    // Define Cookies Properties
    cookies: {
        long: { signed: true, maxAge: (1 * 24 * 60 * 60) * 1000 }, // 1 day in ms
        short: { signed: true },
        keys: ['some secret key', 'and also the old rotated away some time ago', 'and one more'],
    },

    // Define all the claims we support
    // The property key is the Scope and the value array is the claims under that scope
    claims: {
        openid: ['sub'],
        address: ['address'],
        email: ['email', 'email_verified'],
        phone: ['phone_number', 'phone_number_verified'],
        profile: ['birthdate', 'family_name', 'gender', 'given_name', 'locale', 'middle_name', 'name',
            'nickname', 'picture', 'preferred_username', 'profile', 'updated_at', 'website', 'zoneinfo'],
    },
    features: {
        devInteractions: { enabled: false }, // defaults to true
        deviceFlow: { enabled: true, ack: 15 }, // defaults to false
        introspection: { enabled: true }, // defaults to false
        revocation: { enabled: true }, // defaults to false
        encryption: { enabled: true }
    },
    extraAccessTokenClaims(ctx, token) { // eslint-disable-line no-unused-vars
        return { 'urn:oidc-provider:example:foo': 'bar' };
    },
    formats: {
        AccessToken: 'jwt',
        // ClientCredentials: 'jwt', not enabled
    },

    // Define the JWKs
    jwks,

    // Define the duration per token type
    ttl: {
        AccessToken: 1 * 60 * 60, // 1 hour in seconds
        AuthorizationCode: 10 * 60, // 10 minutes in seconds
        IdToken: 1 * 60 * 60, // 1 hour in seconds
        DeviceCode: 10 * 60, // 10 minutes in seconds
        RefreshToken: 1 * 24 * 60 * 60, // 1 day in seconds
    },
};