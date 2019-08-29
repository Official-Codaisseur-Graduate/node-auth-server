const assert = require('assert');
const _ = require('lodash');
const accountService = require('./../services/account.service');

class Account {

  constructor(id) {
    this.accountId = id; // the property named accountId is important to oidc-provider
  }

  
  claims = async () => {
    console.log('hjashdiuashdi', claims)
    const c = await accountService.getClaimsById(this.accountId);
    return c;
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
