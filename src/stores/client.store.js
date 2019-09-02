/**
 * Array of objects representing client metadata. These clients are referred to as static, they don't expire,
 * never reload, are always available. If the client metadata in this array is invalid the Provider
 * instantiation will fail with an error. In addition to these clients the provider will use your adapter's
 * find method when a non-cached client_id is encountered. If you only wish to support statically configured
 * clients and no dynamic registration then make it so that your adapter resolves client find calls with a
 * falsy value (e.g. return Promise.resolve()) and don't take unnecessary DB trips. Client's metadata is
 * validated as defined by the respective specification they've been defined in.
 */

/**
 * AVAILABLE CLIENT METADATA
 * application_type,
 * client_id,
 * client_name,
 * client_secret,
 * client_uri,
 * contacts,
 * default_acr_values,
 * default_max_age,
 * grant_types,
 * id_token_signed_response_alg,
 * initiate_login_uri,
 * jwks,
 * jwks_uri,
 * logo_uri,
 * policy_uri,
 * post_logout_redirect_uris,
 * redirect_uris,
 * require_auth_time,
 * response_types,
 * scope,
 * sector_identifier_uri,
 * subject_type,
 * token_endpoint_auth_method,
 * tos_uri,
 * userinfo_signed_response_alg
 *
 * The following metadata is available but may not be recognized depending on your provider's configuration.
 * authorization_encrypted_response_alg,
 * authorization_encrypted_response_enc,
 * authorization_signed_response_alg,
 * backchannel_logout_session_required,
 * backchannel_logout_uri,
 * frontchannel_logout_session_required,
 * frontchannel_logout_uri,
 * id_token_encrypted_response_alg,
 * id_token_encrypted_response_enc,
 * introspection_encrypted_response_alg,
 * introspection_encrypted_response_enc,
 * introspection_endpoint_auth_method,
 * introspection_endpoint_auth_signing_alg,
 * introspection_signed_response_alg,
 * request_object_encryption_alg,
 * request_object_encryption_enc,
 * request_object_signing_alg,
 * request_uris,
 * revocation_endpoint_auth_method,
 * revocation_endpoint_auth_signing_alg,
 * tls_client_auth_san_dns,
 * tls_client_auth_san_email,
 * tls_client_auth_san_ip,
 * tls_client_auth_san_uri,
 * tls_client_auth_subject_dn,
 * tls_client_certificate_bound_access_tokens,
 * token_endpoint_auth_signing_alg,
 * userinfo_encrypted_response_alg,
 * userinfo_encrypted_response_enc,
 * web_message_uris
 */
const { localhost } = require('../hosts');

const CLIENTS = [
    // This is the Admin Client that manages users in the oidc-provider
    {
        client_id: 'admin-client',
        logo_uri:
            'https://d33wubrfki0l68.cloudfront.net/aabea2f28875b44f8712954d3af83f4873d00417/1a57e/static/7973e0827e9a95d808efc18665e7ea4a/94286/ed69318a26037fc8e0a008e061d9e3bd81b8cc3f_thumb_codaisseur-logo-png-77b7ecd336360d5d6a1c96421da8395d.png',
        client_name: 'Auth Admin',
        redirect_uris: [
            'https://auth-admin-client.herokuapp.com/',
            'https://auth-admin-client.herokuapp.com/signin-oidc',

            // MAIN SERVER
            `https://${localhost}:3000`,
            `https://${localhost}:3000/signin-oidc`

            //// examples
            // 'https://172.16.31.138:3000',
            // 'https://172.16.31.138:3000/signin-oidc',

            // 'https://172.16.31.140:3000',
            // 'https://172.16.31.140:3000/signin-oidc',

            // 'https://172.16.29.134:3000',
            // 'https://172.16.29.134:3000/signin-oidc'
        ],
        post_logout_redirect_uris: [
            'https://auth-admin-client.herokuapp.com/logout/callback',

            // MAIN SERVER
            `https://${localhost}:3000/logout/callback`

            //// examples
            // 'https://172.16.29.134:3000/logout/callback',

            // 'https://172.16.31.138:3000/logout/callback',

            // 'https://172.16.31.140:3000/logout/callback'
        ],
        response_types: ['id_token'],
        grant_types: ['implicit'],
        token_endpoint_auth_method: 'none'
    }
];

// Export the array of clients
module.exports = CLIENTS;
