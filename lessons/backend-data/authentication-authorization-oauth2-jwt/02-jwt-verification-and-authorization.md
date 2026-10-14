---
title: JWT verification and authorization
prereqs: ["backend-data/authentication-authorization-oauth2-jwt/01-authentication-and-oauth2-flows"]
---

## What it is

A JSON Web Token is a signed, compact representation of claims: who the subject is, who issued the token, when it expires, and what it grants. Because it is signed, a service can verify it without asking the issuer, which is what makes it useful for stateless APIs. Verification means checking the signature and then the claims, and authorization means turning verified claims into a decision about this specific request.

## Why it matters

A token that is not verified is a claim written by the caller; a token that is verified but whose claims are not checked is a valid credential for the wrong audience. Both mistakes are common because a library will decode a token without verifying it, and because the difference between decoding and verifying is one option in one call. Since a token grants access to everything its scopes cover, an error here is an access-control failure rather than a formatting one.

## Core ideas

### Verification has several steps, and all of them matter

The signature must be checked against the issuer's published keys, the algorithm must be the expected one rather than whichever the token declares, the issuer and audience must be the ones you expect, and the expiry must be in the future. A library that decodes without verifying returns the claims of an unsigned token, which any caller can write.

```text
signature ok -> algorithm expected -> issuer expected -> audience expected -> not expired
```

### The algorithm must be chosen by the verifier, not by the token

If the verifier honours the algorithm named in the token's own header, an attacker can name a weaker one or the "none" algorithm and bypass the signature entirely. Pinning the expected algorithm in the verification call removes the possibility. This is the single most important line in a token check.

### Claims are inputs to an authorization decision, not the decision

A valid token with a subject identifier does not mean the subject may read this particular record. That requires a check against the record's owner or the caller's role. Confusing a valid token with authorization is how a service ends up letting any authenticated user read any other user's data by changing an identifier in the path.

### Audience and issuer prevent token confusion

A token issued for one service is not automatically valid at another. Checking the audience means a token minted for a different application cannot be replayed here, and checking the issuer means a token from an untrusted issuer is rejected even with a valid-looking signature. Both are one field each and both are frequently omitted.

### Expiry needs a leeway and a revocation story

Comparing expiry times requires a small tolerance for clock skew, and a short lifetime bounds the damage of a leaked token. Because a verified token needs no call to the issuer, revocation cannot be immediate; a denylist for high-value or long-lived cases, or short lifetimes and refresh, are the practical answers. Choosing which is appropriate is a decision, not a default.

The payload is readable by anyone holding the token, so it must not contain secrets. It should also contain only what the resource server needs, because every claim is another field to keep in sync and another to consider when authorizing. Roles and scopes belong in the claim only if the resource server is meant to act on them.

### Store tokens where the client cannot leak them

Where the client keeps its token determines how it can be stolen: a browser's persistent storage is readable by any script running on the page, which makes cross-site scripting an account takeover. A server-side session or a hardened cookie limits that. The token's lifetime bounds the damage, which is why the two decisions belong together.

## Practice

### Write a verification checklist

Take a token-checking function and write down each check it performs, then mark which ones a decode-only call would perform.

Done when: the list names the algorithm, issuer, audience and expiry checks, and you can say which single option turns a decode into a verification.

### Find a missing authorization check

Take an endpoint that reads a record by identifier and add a check that the verified subject is permitted to read that record.

Done when: changing the identifier in the request is refused for a caller who does not own the record, with a status code that does not reveal whether the record exists.

## Common mistakes

- **Decoding a token without verifying the signature** — any caller can write any claims; fix: verify against the issuer's keys.
- **Honouring the algorithm named in the token header** — the "none" algorithm and downgrades become possible; fix: pin the expected algorithm.
- **Skipping the audience and issuer checks** — a token minted for another application is accepted; fix: assert both.
- **Treating a valid token as authorization** — any authenticated user reads any record; fix: check the subject against the resource.
- **Putting secrets in the payload** — anyone holding the token can read them; fix: keep confidential data server-side and reference it by identifier.

## Go deeper

- **Authentication and OAuth2 flows** (`backend-data/authentication-authorization-oauth2-jwt/01-authentication-and-oauth2-flows`) — where this token came from.
- **Authentication & Authorization (OAuth2 / JWT)** (`backend-data/authentication-authorization-oauth2-jwt`) — the pair of problems this child completes.
- **Web Security (OWASP Top 10)** (`security/web-security-owasp-top-10`) — broken access control, of which a missing authorization check is the classic case.
