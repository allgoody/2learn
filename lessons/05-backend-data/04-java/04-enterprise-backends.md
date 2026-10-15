---
title: Enterprise backends
prereqs: ["05-backend-data/04-java/03-builds-and-dependencies"]
---

## What it is

Most Java server applications follow a shared shape: a framework starts the process, an inversion-of-control container constructs and wires the objects, incoming requests are dispatched to annotated methods, and data access goes through a repository layer over a relational database. The conventions are strong and consistent across projects, which is why an experienced Java developer can find their way in an unfamiliar codebase quickly.

## Why it matters

The conventions encode solutions to problems that every server application faces: lifecycle, dependency wiring, transaction boundaries, request handling. Adopting them means not solving those problems from scratch, and the consistency is worth a great deal when a team grows or a contractor is added. The cost is that the conventions absorb decisions the application should make — transaction scope, error mapping, where validation lives — and a project can end up following the framework rather than designing a system.

## Core ideas

### The container constructs the object graph

Instead of each class creating its collaborators, the framework builds them once at startup from declared components and injects them where needed. Because construction happens centrally, lifecycle, scopes and configuration are decided in one place. The consequence to watch is a container so permissive that the dependency graph becomes invisible; keeping construction explicit and the graph shallow keeps it readable.

```text
container -> builds OrderService(Database db, PaymentGateway gateway)
          -> injects it into the request handler
```

### A request is handled within a defined scope

A framework typically creates one instance per request, one per application, and injects the request-scoped object into whatever handles that request. Knowing the scope is what stops the classic mistake of storing request state in an application-scoped object, where one user's data leaks into another's request.

### Transaction boundaries are a design decision the framework encourages you to make casually

An annotation can begin and commit a transaction around a method, which is convenient and determines what is atomic. Placing the boundary too low makes several related writes non-atomic; placing it too high holds locks for the duration of unrelated work. Where the boundary sits is a correctness decision, not a configuration detail.

### The repository layer isolates persistence, and its leaks are the interface

A repository translates between the domain's objects and the database's rows or tables. When it is thin, the abstraction holds; when queries and lazy loading leak through, callers start to depend on the persistence mechanism. The honest position is that the repository is an interface over a mapping, and any behaviour that depends on how rows are fetched should be made explicit rather than accidental.

### Framework annotations make behaviour invisible to the reader

A method's transaction, security and caching behaviour can be declared by an annotation the body never mentions. That is convenient and it means reading a method in isolation can mislead. Keeping the annotated surface small and the annotations near the top of the call path makes the behaviour legible to someone tracing a request.

### Convention over invention is the value, and also the risk

The framework's way of doing things is nearly always a reasonable default, which is why it spread. The risk is adopting it without deciding what the application actually needs: validation in the controller when it belongs in the domain, entities exposed through the API, and a test suite that starts the whole container to check one branch. Taking the conventions as a starting point rather than as architecture keeps the design visible.

## Practice

### Trace a request through the layers

Take one endpoint of an existing application and trace it from the dispatcher to the database, naming the scope and transaction boundary in force at each step.

Done when: you can state where the transaction begins and commits, and which objects are shared across requests.

### Move a validation rule to the right layer

Find a validation rule enforced in the request handler and decide whether it belongs in the domain, then move it and adjust the tests.

Done when: the rule is enforced regardless of which entry point reaches it, and a test covers the domain behaviour directly.

## Common mistakes

- **Storing request state in an application-scoped object** — one user's data appears in another's request; fix: keep request-scoped state in a request-scoped object.
- **Letting the transaction boundary fall wherever the annotation was convenient** — related writes are not atomic or locks are held too long; fix: place the boundary deliberately.
- **Exposing persistence entities through the API** — the schema becomes the public contract; fix: map to a separate representation at the boundary.
- **Relying on annotations nobody reading the method can see** — behaviour is invisible and surprises the next maintainer; fix: keep the annotated surface small and traceable.
- **Starting the whole container to test one branch** — tests are slow and failures are ambiguous; fix: test domain logic directly and reserve integration tests for the wiring.

## Go deeper

- **Builds and dependencies** (`05-backend-data/04-java/03-builds-and-dependencies`) — how the framework and its dependencies arrive in the artifact.
- **Java** (`05-backend-data/04-java`) — the language these backends are written in.
- **Microservices** (`05-backend-data/12-microservices`) — the alternative to one application containing all of this, and when it is the right shape.
