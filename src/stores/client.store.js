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
const CLIENTS = [
    {
        client_id: 'foo',
        client_name: 'Example Backend',
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