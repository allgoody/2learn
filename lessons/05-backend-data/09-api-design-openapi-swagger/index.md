---
title: API Design (OpenAPI / Swagger)
type: skill
topic: 05-backend-data
tier: medium
status: drafted
aliases: ["OpenAPI", "Swagger"]
prereqs: ["05-backend-data/06-restful-api"]
related: []
---

## What it is

A description format for HTTP APIs: a machine-readable document listing the paths, the methods on each, the parameters, the request and response bodies and the status codes. Because it is structured rather than prose, the same document can generate documentation, client libraries, server stubs and tests. OpenAPI is the format; Swagger is the name of the tooling family around it.

## Why it matters

Writing the interface down before implementing it forces the decisions that are otherwise discovered by clients: what a request contains, what a failure looks like, which fields are optional. It also gives one description that several tools consume, so documentation and client code cannot drift from the implementation without the tests noticing. For a team building both sides of a service, the specification is the contract that lets the two proceed in parallel.

## In this track

1. **Writing the specification** (`05-backend-data/09-api-design-openapi-swagger/01-writing-the-specification`) — describing paths, schemas and responses so the document is usable.
2. **Contract testing** (`05-backend-data/09-api-design-openapi-swagger/02-contract-testing`) — checking that the implementation and the description still agree.

## Prerequisites

- **Restful API** (`05-backend-data/06-restful-api`)

## Go deeper

- **Restful API** (`05-backend-data/06-restful-api`) — the conventions a specification describes, so read it first.
- **Authentication & Authorization (OAuth2 / JWT)** (`05-backend-data/10-authentication-authorization-oauth2-jwt`) — the security schemes a specification declares for each endpoint.
- **CI/CD** (`06-cloud-devops/08-ci-cd`) — where contract checks are run on every change.
