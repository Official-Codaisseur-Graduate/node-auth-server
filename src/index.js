// see previous example for the things that are not commented

const assert = require('assert');
const Provider = require('oidc-provider');

assert(process.env.HEROKU_APP_NAME, 'process.env.HEROKU_APP_NAME missing');
assert(process.env.PORT, 'process.env.PORT missing');
assert(process.env.SECURE_KEY, 'process.env.SECURE_KEY missing, run `heroku addons:create securekey`');
assert.equal(process.env.SECURE_KEY.split(',').length, 2, 'process.env.SECURE_KEY format invalid');
assert(process.env.REDIS_URL, 'process.env.REDIS_URL missing, run `heroku-redis:hobby-dev`');

const jwks = require('./jwks.json');

// require the redis adapter factory/class
const RedisAdapter = require('./redis_adapter');

const oidc = new Provider(`https://${process.env.HEROKU_APP_NAME}.herokuapp.com`, {
  // configure Provider to use the adapter
  adapter: RedisAdapter,
  clients: [
    // reconfigured the foo client for the purpose of showing the adapter working
    {
      client_id: 'foo',
      redirect_uris: ['https://example.com'],
      response_types: ['id_token'],
      grant_types: ['implicit'],
      token_endpoint_auth_method: 'none',
    },
  ],
  jwks,
  formats: {
    AccessToken: 'jwt',
  },
  features: {
    encryption: { enabled: true },
    introspection: { enabled: true },
    revocation: { enabled: true },
  },
});

oidc.proxy = true;
oidc.keys = process.env.SECURE_KEY.split(',');
oidc.listen(process.env.PORT);
