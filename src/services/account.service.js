const User = require('./../entities/user.entity');

const getClaimsById = async (id) => {
    return User.findOne({
        include: ["claims"],
        where: { id: id }
    })
        .then(userWithClaims => {
            // Check if user was found 
            if (userWithClaims) {

                // Define an object with all the user claims
                const userClaimsObject = {
                    sub: id,
                    email_verified: true //userClaimsObject.emailConfirmed
                };

                // Map through all the claims
                userWithClaims.claims.map(claim => {
                    userClaimsObject[claim.name] = claim.value;
                });
                // Return the object
                return userClaimsObject;
            }
            return [];
        })
        .catch(err => {
            return [];
        })
}

const authenticate = async (email, password) => {
    return User.findOne({
        where: { email: email }
    }).then(user => {
        // check if user was retrieved
        if (user) {
            // Check if password is correct
            //if (user.password === password)
            return user.id;
        }
        // Otherwise return undefined
        return null;
    })
}

module.exports = { getClaimsById, authenticate };