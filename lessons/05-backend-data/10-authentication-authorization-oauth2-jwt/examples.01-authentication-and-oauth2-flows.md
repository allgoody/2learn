## Example 1 — Three clients, one flow proposed for all

Every client would obtain tokens the same way. The sketch shows the proposal and where each client would keep its secret. Rewrite it so each flow suits its client, naming which party holds a secret.

```text
proposal: every client uses the authorization code flow
  web frontend (server-rendered)   client secret in the server configuration
  single-page application          client secret in the application bundle
  nightly import job               no user involved
```

### Solution

```text
client                holds a secret   flow
server-rendered web   yes, on server   authorization code, code exchanged with its own credentials
single-page app       no               authorization code plus the additional proof step
nightly import job    yes, as itself   client credentials, no user and no consent step
```

Every flow answers which party can keep a secret, and a browser page cannot: anything shipped to a device can be read, so a flow requiring that client to hold one is broken by construction. The additional proof step exists for exactly that client. Client credentials is equally specific — using it on behalf of a user replaces the user's identity with the service's. The secret in the bundle is the mistake that survives longest, because nothing fails until someone opens the developer tools.

## Example 2 — How long a stolen token stays useful

A leaked access token was still being accepted six days later. Rewrite the timeline below so the leak's effect is bounded, and say what decides whether the support path may be used.

```text
day 1  sign in, access token issued, valid 7 days
day 3  token presented to the resource server, accepted
day 6  user loses the support role
day 7  token expires
```

### Solution

```text
day 1   sign in: access token valid 15 minutes, refresh token kept against the authorization server
        each request: access token presented to the resource server
+15 min client exchanges the refresh token for a new access token, without the user
        refund request: permitted only if the user's role allows it now;
        the read:orders scope says what the client may ask for, not what the user may do
```

The access token travels on every request, so it is the credential most likely to be copied; a short life bounds the damage, and the refresh token — held more carefully, used only against the authorization server — avoids asking the user again. That is what makes the six-day window impossible: the role changed on day six, so the next authorisation decision refuses the refund even though the token is still valid. Treating a scope as a role is the mistake being avoided here.
