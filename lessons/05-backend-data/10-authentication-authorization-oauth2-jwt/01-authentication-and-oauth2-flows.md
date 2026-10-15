---
title: Authentication and OAuth2 flows
prereqs: ["05-backend-data/10-authentication-authorization-oauth2-jwt"]
---

## What it is

Authentication establishes who the caller is. In a modern API, the caller usually presents a token issued by an identity provider rather than a password, and OAuth2 describes how that token is obtained: which party asks, who authenticates the user, how the client proves its own identity, and what the resulting grant permits. The flows differ by the kind of client asking and by whether a user is present.

## Why it matters

Choosing the wrong flow is how a system ends up shipping a secret in a mobile application, or asking users to type their password into a third-party service. Each flow exists because a particular kind of client cannot keep a secret or cannot redirect a browser. Understanding why they exist makes the correct choice obvious and makes the insecure shortcuts recognisable as shortcuts rather than configurations.

## Core ideas

### The parties are distinct, and so are their secrets

A resource owner is the user; a client is the application asking for access; an authorization server issues tokens; a resource server accepts them. The critical question for any flow is which of those can keep a secret. A server-side application can; a browser page and a mobile application cannot, which is exactly what the flow choice encodes.

```text
user -> client -> authorization server -> token -> resource server
```

### Authorization code with a redirect is the default for user-facing clients

The user is sent to the authorization server, authenticates there, and returns to the client with a short-lived code that the client exchanges for tokens. The user's password is never seen by the client, and the code is useless without the client's own credentials. This shape works for server-rendered applications and, with an additional proof step, for clients that cannot hold a secret.

### The client credentials flow is for services with no user

When one backend calls another with no user involved, the calling service authenticates as itself and receives a token for its own identity. There is no consent step and no user, which makes it much simpler — and it is only appropriate where the caller genuinely acts as itself rather than on behalf of someone.

### Secrets cannot be kept in a browser or a mobile binary

Anything shipped to a user's device can be read. A client of that kind must therefore be treated as public, and any flow that requires it to hold a secret is broken by construction. This is the reasoning behind the additional proof step and the reason an implicit-grant-style flow that returns a token directly to the browser was superseded.

### Tokens should be short-lived, and refresh is a separate grant

An access token is presented on every request and is the thing most likely to be copied, so it should expire quickly. A refresh token, held more carefully and used only against the authorization server, obtains a new access token without another user interaction. Long-lived access tokens remove the safety margin that makes a leak recoverable.

### Scopes express the grant, not the user's role

A scope says what the client asked permission to do — read orders, write payments — and the user consented to it. It is not a statement about the user's authority inside the application. Keeping the two separate is what allows a grant to be narrow without constraining what the user may do in a different context.

## Practice

### Choose a flow for three clients

For a server-rendered web application, a single-page application and a nightly batch job, state which flow each uses and where its secret is kept.

Done when: each choice names the party that holds a secret, and no client that cannot keep one is required to.

### Trace a token's lifetime

Describe the sequence from a user's first request to an expired access token being refreshed, naming which party holds each credential at each step.

Done when: you can say how long an access token remains valid and what happens to an in-flight request when it expires.

## Common mistakes

- **Storing a client secret in a browser or mobile application** — anyone can read it; fix: treat the client as public and use a flow that does not require a secret.
- **Using a long-lived access token** — a leak cannot be contained by expiry; fix: keep access tokens short and refresh them.
- **Using the client credentials flow on behalf of a user** — the service's identity replaces the user's; fix: use a flow that involves the user.
- **Treating a scope as a role** — a narrow grant is mistaken for limited authority; fix: keep authorization decisions separate from the grant.
- **Handling a user's password in the client** — it is exposed to the client's own bugs; fix: send the user to the authorization server.

## Go deeper

- **JWT verification and authorization** (`05-backend-data/10-authentication-authorization-oauth2-jwt/02-jwt-verification-and-authorization`) — what happens to the token once it has been issued.
- **Authentication & Authorization (OAuth2 / JWT)** (`05-backend-data/10-authentication-authorization-oauth2-jwt`) — the pair of problems this child is the first half of.
- **Web Security (OWASP Top 10)** (`07-security/01-web-security-owasp-top-10`) — the attacks that target the redirect and session handling around these flows.
