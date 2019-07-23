const assert = require('assert');
const _ = require('lodash');
const accountService = require('./../services/account.service');
const USERS = require('./../stores/user.store');

class Account {

  constructor(id) {
    this.accountId = id; // the property named accountId is important to oidc-provider
  }

  claims = () => {
    return accountService.getClaimsById(this.accountId).then(c => c);
  }

  static async findById(ctx, id) {
    return new Account(id);
  }

  // Authenticates the user
  static async authenticate(email, password) {
    try {
      // Perform assertions
      assert(password, 'password must be provided');
      assert(email, 'email must be provided');
      const lowercased = String(email).toLowerCase();
      const id = _.findKey(USERS, { email: lowercased });

      // Perform authentication
      return accountService
        .authenticate(lowercased, password)
        .then(result => {
          // Assert result to validate credentials
          assert(result, 'invalid credentials provided');
          return new Account(result);
        })
    }
    catch (err) {
      // Return undefined
      return undefined;
    }
  }

  // static async authenticate(email, password) {
  //   try {
  //     assert(password, 'password must be provided');
  //     assert(email, 'email must be provided');
  //     const lowercased = String(email).toLowerCase();
  //     const id = _.findKey(USERS, { email: lowercased });
  //     assert(id, 'invalid credentials provided');

  //     // this is usually a db lookup, so let's just wrap the thing in a promise
  //     return new this(id);
  //   }
  //   catch (err) {
  //     return undefined;
  //   }
  // }
}

module.exports = Account;
