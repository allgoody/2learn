---
title: Resources, verbs and status codes
prereqs: ["05-backend-data/06-restful-api"]
---

## What it is

The design rules of a RESTful API: name things rather than actions, use the protocol's methods for what they were defined to mean, and report the outcome with an accurate status code. A resource is a noun with an address; a method says what to do with it; a status code says what happened. Following these three consistently is most of what makes an API pleasant to use.

## Why it matters

An API is an interface with a long life, and its conventions are what let a client be written without reading a specification cover to cover. When the rules are followed, the same request shape works for a new resource and the same error handling works for a new failure. When they are broken — a retrieval that deletes, a creation that is a retrieval, an error that returns a success code — clients must special-case every endpoint, and the mistakes are expensive to correct once they are in use.

## Core ideas

### Name resources, not operations

An address should identify a thing, not an action on it. A collection address lists the things; a child address identifies one; a nested address identifies something owned by another thing. Actions that do not map onto a method can be modelled as a subordinate resource, such as a refund on a payment, rather than added as a verb to the path.

```text
GET  /orders            -> list
GET  /orders/42         -> one order
POST /orders            -> create
GET  /orders/42/items   -> the items of one order
```

### Use the methods for their defined meanings

A retrieval is safe and repeatable; creating is not; replacing the whole thing with a given address is repeatable; deleting is repeatable in effect. Intermediaries, retries and pre-fetchers all assume those meanings. An endpoint that changes state on a retrieval will be triggered by a link preview or a crawler, and one that creates a second record on retry will produce duplicates whenever a network hiccup occurs.

### Status codes are the machine-readable outcome

A success means the request was understood and performed; a redirect means look elsewhere; a client error means the request itself is wrong and retrying will not help; a server error means the request may be fine and retrying might. Choosing between the specific codes within a family carries information the client can act on — a validation failure is different from an authentication failure, which is different from a missing resource.

### A creation returns where the thing now lives

A creation that succeeds should identify the new resource in a header and usually return its representation. That is what lets a client proceed without a second request and without guessing an identifier. Returning only a success flag makes every client poll or construct addresses itself.

### Idempotency is a property to design for, not a coincidence

A repeatable operation can be retried safely after a timeout; a non-repeatable one cannot. For creations that must be retried — a payment, an order — the client supplies a key and the server records it, so a second attempt with the same key returns the first result rather than doing the work twice. This is the difference between a system that survives a flaky network and one that charges twice.

### Errors should be uniform and informative

Every failure should use the same shape, name the field or condition that failed, and include a code a client can branch on without parsing prose. A uniform error shape means one handler on the client; a per-endpoint shape means one per endpoint. It also makes logs and dashboards uniform, because the same code appears everywhere.

## Practice

### Model one domain as resources

Take a small domain with three nouns and one operation that does not fit a method, and write the addresses and methods for each.

Done when: every address identifies a thing, every method matches its defined meaning, and the odd operation has a resource of its own.

### Add idempotency to a creation

Take a creation endpoint and add a client-supplied key so a repeated request returns the original result rather than creating a second record.

Done when: sending the same request twice with the same key produces one record and identical responses.

## Common mistakes

- **Putting verbs in the path** — the address stops identifying a thing; fix: model the operation as a resource or use the correct method.
- **Changing state on a retrieval** — crawlers and pre-fetchers perform the change; fix: keep retrievals safe and use a method that means change.
- **Returning a success code for an error** — every client needs a special case; fix: use the status family that matches the outcome.
- **Making a creation non-repeatable without a key** — a retry duplicates the record; fix: accept an idempotency key and return the first result.
- **Inventing an error shape per endpoint** — clients accumulate parsers; fix: one error shape with a branchable code.

## Go deeper

- **Restful API** (`05-backend-data/06-restful-api`) — the style these rules belong to, so read it first.
- **Versioning, pagination and N+1 responses** (`05-backend-data/06-restful-api/02-versioning-pagination-and-n-plus-one`) — what these rules look like once clients and data volume arrive.
- **API Design (OpenAPI / Swagger)** (`05-backend-data/09-api-design-openapi-swagger`) — how to capture these decisions in a specification before building.
