/**
 * Object that holds a list of scopes and claims available from the provider.
 * Each scope property defined contains a list of strings that define the available claims for this scope
 * For example, if we have an Offic Administration API that requires the custom claim: office_number,
 * we would define a scope like this:
 * officeApi: [ "office_number" ]
 */
const SCOPES = {
    openid: ['sub'],
    address: ['address'],
    email: ['email', 'email_verified'],
    phone: ['phone_number', 'phone_number_verified'],
    profile: ['birthdate', 'family_name', 'gender', 'given_name', 'locale', 'middle_name', 'name',
        'nickname', 'picture', 'preferred_username', 'profile', 'updated_at', 'website', 'zoneinfo'],
    foo: ["read:products", "edit:products"]
}

module.exports = SCOPES;