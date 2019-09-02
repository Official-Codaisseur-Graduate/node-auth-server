# Codaisseur OIDC Server

In this project, we will attempt to implement an OIDC (Open ID Connect) Authentication/Authorization Server. The project consists of the following three repos:
- [Auth Server](https://github.com/Official-Codaisseur-Graduate/node-auth-server)
    The authorization server that tracks the users and clients that are protected by it.
- [Admin React App](https://github.com/Official-Codaisseur-Graduate/react-auth-server-admin) 
    The admin react app used to manage users and clients protected by the auth server.
- [Resource Provider Example](https://github.com/Official-Codaisseur-Graduate/node-resource-server-example) 
    A resource provider example that demonstrates how to protect an API.
- [Wiki](https://github.com/Official-Codaisseur-Graduate/node-auth-server/wiki) 
    Extensive documentation and explanations as well as tutorials on how OAuth 2.0 and OIDC works. 
- [Project Board](https://github.com/orgs/Official-Codaisseur-Graduate/projects/1) 
    The project board that tracks the progress of all projects.
- [Well Known Config](https://codaisseur-auth-provider.herokuapp.com/.well-known/openid-configuration) 
    The current well known configuration of the OIDC server.

# Set up the server
1. Change the DATABASE_URL, make sure that it point to the right database
2. On the client.store.js add your ip address


## Plan
In order to properly implement the server, we will have to follow a plan.

- [x] Implement Auth Server and Publish it to Heroku.
- [x] Create an API (Resource Server) that need protection.
- [ ] Decide on the supported flows 

**More details TBA...**


## References
1. [OAuth 2.0 & OpenID Connect Lecture/Seminar](https://www.youtube.com/watch?v=996OiexHze0)
2. [Getting start with oidc-provider](https://www.scottbrady91.com/OpenID-Connect/Getting-Started-with-oidc-provider)
3. [Oidc-Provider docs](https://github.com/panva/node-oidc-provider/tree/master/docs) 
4. [Default OIDC Configurations](https://github.com/panva/node-oidc-provider/blob/master/docs/README.md) 
5. **Add your own...**

> ### Note on Implicit Flow
> When using the implicit flow, oidc-provider has a hardcoded check against the use of http & localhost. We must also ensure that the token endpoint is disabled for the client. Whilst this is a good security feature, it makes demos awkward. So, when integrating with your client application, make sure you are using the https scheme and anything other than localhost (something configured via your hosts file works fine), and set the clients token_endpoint_auth_method property to none.

### Note on Forget Password Flow
> When using Forget password, we need to setup an email account in google.
> Disable 2-Step Verification on security settings.
> Allow less secure apps must be toggle on.
> After setting up the email, update the config file variable for the apps email.

## TODOS
- [x] Create user database and configure endpoints to perform user manipulations to the database.
- [x] Save user password hashed
- [ ] Include password salt
- [ ] Create endpoint where admins can edit user claims (Add/Remove)

