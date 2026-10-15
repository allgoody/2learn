---
title: Express.js
type: skill
topic: 05-backend-data
tier: small
status: drafted
aliases: ["Express"]
prereqs: ["05-backend-data/02-nodejs"]
related: []
---

## What it is

Express.js is a small web framework for Node. It maps an incoming request to a handler by method and path, runs a stack of middleware functions in order, and gives the handler a request object and a way to send a response. That is most of it: the framework is deliberately unopinionated, so structure, validation, error handling and database access are decisions the application makes rather than ones the framework makes for it.

## Why it matters

Its size is its virtue. Because there is no framework-specific way to do most things, an Express application is mostly ordinary JavaScript, which makes it easy to read and hard to become trapped in. Middleware is a genuinely good abstraction for the things every request needs — parsing, logging, authentication, rate limiting — and its ordering is explicit rather than hidden. The same absence of opinion is the drawback: two Express projects can share almost no structure, and a team that wants conventions must invent and enforce them.

## Core ideas

### A handler is selected by method and path

Routes are matched in the order they are declared, and a path can contain parameters extracted for the handler. Order matters because the first match wins, so a broad pattern declared early shadows a specific one declared later. That is a common source of routes that appear to be ignored.

```text
get  /orders/:id   -> order detail
post /orders       -> create
use  /orders       -> runs for any method under that prefix
```

### Middleware is a chain, and order is the whole design

Each middleware receives the request, may modify it, and either ends the response or passes control onward. Authentication, body parsing, logging and error handling are all middleware, and their order decides what each can rely on. Placing the authentication middleware after the route it is meant to protect is the classic mistake.

### Errors travel down a separate chain

A middleware that takes four arguments is an error handler, and it runs when any earlier middleware passes an error onward. Thrown exceptions in asynchronous handlers do not reach it unless they are caught and forwarded, which is why the error path must be written explicitly for each asynchronous route. A centralised error handler is worth having, but it only receives what it is given.

### Structure is the application's responsibility

Because the framework is unopinionated, a project's shape — where routes live, how services are injected, how configuration is read — comes from the team. The pattern that scales best keeps route definitions thin, moves logic into testable functions, and injects dependencies rather than importing singletons. Testing a handler directly, without starting a server, depends on having done that.

### The request object is a shared place to attach context

Middleware commonly attaches the authenticated user, a request identifier or a parsed body to the request. Later middleware and handlers then read it. It is convenient and it is also implicit coupling: a handler that assumes a field was set by middleware fails when the route is mounted without it. Keeping the set small and documented is what stops that.

### It is a thin layer over the built-in server

The framework does not replace the runtime's HTTP server, and anything the runtime offers — streams, headers, raw sockets — remains available. That is useful when a response needs to be streamed or a non-standard method handled, and it is a reminder that the framework is a convenience rather than a platform.

## Practice

### Order a middleware chain deliberately

Build a server with request logging, body parsing, an authenticated route and a public route, and a central error handler. Place each middleware so that nothing runs earlier than it needs to.

Done when: an unauthenticated request to the protected route is rejected before the body is parsed, and a thrown error returns a structured response rather than a stack trace.

### Test a handler without a server

Take one route and extract its logic into a function that takes a request and returns a result, then test it directly.

Done when: the route's behaviour is covered by tests that never bind a port.

## Common mistakes

- **Declaring a broad route before a specific one** — the specific one never matches; fix: order routes from specific to general.
- **Placing authentication after the routes it protects** — the protected handler runs unauthenticated; fix: mount the check before the route.
- **Letting an asynchronous error escape** — the central handler never sees it and the request hangs; fix: catch and forward errors from every asynchronous route.
- **Putting business logic in route handlers** — the logic cannot be tested without a server; fix: move it into functions and keep handlers thin.
- **Assuming middleware ran** — a handler reads a request field that is not always set; fix: keep the attached fields few and documented.

## Go deeper

- **Node.JS** (`05-backend-data/02-nodejs`) — the runtime this framework sits on, so read it first.
- **Restful API** (`05-backend-data/06-restful-api`) — the resource and status-code conventions these routes should follow.
- **API Design (OpenAPI / Swagger)** (`05-backend-data/09-api-design-openapi-swagger`) — how to specify these endpoints before implementing them.
