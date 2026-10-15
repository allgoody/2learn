---
title: Writing the specification
prereqs: ["05-backend-data/09-api-design-openapi-swagger"]
---

## What it is

A specification document describes each path, the methods available on it, the parameters each accepts, and the shape of every request and response. Schemas are defined once and referenced, so a type used in several places is described once and stays consistent. The document is written in a structured format, which means it can be validated, diffed and rendered rather than read as prose.

## Why it matters

Describing the interface before building it is the cheapest way to find the ambiguities. A field whose nullability is undecided, a failure whose status code is unspecified, a parameter that is optional in one place and required in another — all of these are obvious in a schema and invisible in a codebase until a client hits them. The document also becomes the single source for documentation and client code, which removes the maintenance burden that makes hand-written API documentation go stale.

## Core ideas

### Describe resources, then reference schemas

The document is organised by path and method, and the shapes are defined in a shared section and referenced by name. One schema used in a request and a response keeps them consistent; duplicating the shape in both places is how they drift. Names for schemas should be domain nouns, so a reader learns the vocabulary from the document.

```text
paths:      /orders, /orders/{id}
schemas:    Order, OrderItem, Error
```

### Every response should be described, not only the success

A specification that lists only the successful response leaves the client to guess the failure shape. Describing the error response, and reusing a common error schema, is what allows a client to be generated with sensible error handling. The status codes listed should be the ones the endpoint can actually produce.

### Required and optional must be explicit, and nullability stated

Whether a field may be absent, may be present and null, or is always present with a value are three different contracts, and clients behave differently in each case. Making that explicit in the schema is the difference between a client that handles a missing field and one that crashes on it. It also forces the server-side decision about what absence means.

### Parameters carry their validation rules

Page sizes, sort orders, filters and identifiers each have a type, a range and a default. Describing those in the specification means the validation is checked once and the client is generated with the right types, instead of the server accepting anything and the client passing strings.

### The specification lives in the repository and is reviewed like code

A specification kept in a wiki or a design tool drifts from the implementation within weeks. Kept beside the code, changed in the same pull request as the behaviour, and reviewed by the same people, it stays true. The diff of a specification is also a clear review artefact: the interface changed, here is how.

### Examples make the document usable

A realistic example for each request and response communicates more than the schema alone, particularly for nested structures and enumerated values. Examples are also what most rendered documentation displays first, so a poor example is a poor first impression of the API.

## Practice

### Specify one endpoint fully

Take an existing endpoint and write its path, parameters, request body, success response and each error response as a specification with referenced schemas.

Done when: validating the document reports no errors, and the failure responses reference a shared error schema.

### Use the document to generate a client

Generate a client for a language you do not use from the specification and try to call the endpoint with it.

Done when: the generated client compiles and reaches the endpoint, or you can name exactly which omission in the document prevented it.

## Common mistakes

- **Describing only successful responses** — clients cannot handle failures correctly; fix: describe the error responses and reuse a common schema.
- **Leaving required and optional implicit** — a client cannot tell whether a field will be present; fix: state required fields and nullability explicitly.
- **Duplicating a schema instead of referencing it** — the two copies drift; fix: define each shape once and reference it.
- **Keeping the specification outside the repository** — it is stale within weeks; fix: version it with the code and review changes to it.
- **Omitting examples** — the rendered documentation is hard to use; fix: supply realistic examples for each operation.

## Go deeper

- **API Design (OpenAPI / Swagger)** (`05-backend-data/09-api-design-openapi-swagger`) — the format this document is written in, so read it first.
- **Contract testing** (`05-backend-data/09-api-design-openapi-swagger/02-contract-testing`) — how to check the implementation still matches what is written here.
- **Restful API** (`05-backend-data/06-restful-api`) — the resource and status-code conventions the schemas describe.
