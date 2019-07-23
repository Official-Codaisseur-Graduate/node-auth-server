# Codaisseur OIDC Server

In this project, we will attempt to implement an OIDC (Open ID Connect) Authentication/Authorization Server.

## Plan
In order to properly implement the server, we will have to follow a plan.

- [x] Implement Auth Server and Publish it to Heroku.
- [ ] Create a couple of API (Resource Servers) that need protection.
- [x] Decide if we will use Server Side Rendering (.ejs) or React.js
- [ ] Decide on the supported flows 

**More details TBA...**

## References
1. [OAuth 2.0 & OpenID Connect Lecture/Seminar](https://www.youtube.com/watch?v=996OiexHze0)
2. [Getting start with oidc-provider](https://www.scottbrady91.com/OpenID-Connect/Getting-Started-with-oidc-provider)
3. [Oidc-Provider docs](https://github.com/panva/node-oidc-provider/tree/master/docs) 

## Implicit Flow
When using the implicit flow, oidc-provider has a hardcoded check against the use of http & localhost. We must also ensure that the token endpoint is disabled for the client. Whilst this is a good security feature, it makes demos awkward. So, when integrating with your client application, make sure you are using the https scheme and anything other than localhost (something configured via your hosts file works fine), and set the clients token_endpoint_auth_method property to none.

## TODOS
- [x] Create user database and configure endpoints to perform user manipulations to the database.
- [ ] Save user password hashed
- [ ] Include password salt
- [ ] Create endpoint where admins can edit user claims (Add/Remove)
- [ ] 