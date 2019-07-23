/**
 * Array of objects representing client metadata. These clients are referred to as static, they don't expire, 
 * never reload, are always available. If the client metadata in this array is invalid the Provider 
 * instantiation will fail with an error. In addition to these clients the provider will use your adapter's 
 * find method when a non-cached client_id is encountered. If you only wish to support statically configured 
 * clients and no dynamic registration then make it so that your adapter resolves client find calls with a 
 * falsy value (e.g. return Promise.resolve()) and don't take unnecessary DB trips. Client's metadata is 
 * validated as defined by the respective specification they've been defined in.
 */
const CLIENTS = [
    {
        client_id: 'foo',
        redirect_uris: ['https://example.com'],
        response_types: ['id_token'],
        grant_types: ['implicit'],
        token_endpoint_auth_method: 'none',
    },
    // {
    //   client_id: 'oidcCLIENT',
    //   client_secret: '...',
    //   grant_types: ['refresh_token', 'authorization_code'],
    //   redirect_uris: ['http://sso-client.dev/providers/7/open_id', 'http://sso-client.dev/providers/8/open_id'],
    // }
];

// Export the array of clients
module.exports = CLIENTS;