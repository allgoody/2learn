---
title: The operational cost
prereqs: ["backend-data/microservices/01-boundaries-and-ownership"]
---

## What it is

The work that arrives with a distributed system: deploying services independently, versioning the interfaces between them, observing a request that crosses several of them, and handling the failures that a single process never had. None of it is optional, and all of it is paid continuously rather than once.

## Why it matters

The design decisions of a service architecture are exciting and the operational consequences are what determine whether it succeeds. Teams that split a system and do not invest in deployment automation, tracing and failure handling end up with more work and less reliability than they started with, and the architecture is blamed for what is really an unfinished platform. Knowing the cost up front is what allows it to be budgeted for rather than discovered.

## Core ideas

### Independent deployment requires a pipeline per service

If deploying one service means rebuilding everything, the independence is theoretical. Each service needs its own build, test and release path, reproducible to the same standard. That is one of the clearest ways to see whether a boundary is real: if the team cannot deploy one service alone within an hour, it is not independently deployable.

```text
service repo -> build -> test -> image -> release   (repeat per service)
```

### Version skew is permanent, not a transition state

At any moment several versions of several services run simultaneously: a rolling deployment, a canary, a service that has not been upgraded. Every interface change must therefore tolerate the previous version for a period, which makes additive change the default and a breaking change a scheduled migration. Designing for this from the start is far cheaper than retrofitting it after the first incident.

### Observability becomes a requirement, not a nicety

A single request now crosses several processes and possibly a queue, and no single service's logs contain the whole story. A correlation identifier propagated through every call, and traces that join the spans, are the only practical way to answer where the time went. Instrumenting before the first incident is much easier than reconstructing the path during one.

### Failure isolation must be deliberate

The reason for separating services is that one can fail without taking the others down, but that only holds if every call has a timeout, a bounded retry and a defined behaviour when the dependency is unavailable. Without those, a slow service propagates its slowness through every caller and the system fails as one. The separation provides the opportunity for isolation, not the isolation itself.

### Configuration and secrets multiply

More services means more configuration, more credentials and more places for them to differ. Managed centrally, with identity rather than stored secrets, this stays tractable; copied by hand into each service it becomes the most common source of environment-specific bugs. The identity-based approach also makes the audit trail meaningful.

### Cost grows with the number of services, not with their size

Each additional service adds a deployment target, a monitoring target, a dependency to keep updated and an interface to version. Whether it also adds a team's worth of independent velocity is the question that decides whether it should exist. A service small enough that nobody owns it is a liability.

Service discovery, load balancing, message delivery, tracing and secrets are infrastructure the architecture assumes. Where that platform does not exist, the team builds it — and that build is the real cost of the decision, arriving before any product benefit. Choosing the architecture and choosing to build the platform are the same decision, and pretending otherwise is how these projects stall.

## Practice

### Time a single-service deploy

Take one service in a system of several and measure how long it takes to go from a merged change to it running in production.

Done when: you can state the time, and whether anything else had to be released for it to ship.

### Enumerate the failure of one dependency

Take a service that calls another and describe what happens to it when the callee is slow rather than down.

Done when: you can name the timeout, the retry behaviour and what the caller returns to its own clients in the meantime.

## Common mistakes

- **Releasing services together "just this once"** — the coupling returns and the independence was never real; fix: finish the per-service pipeline.
- **Treating version skew as temporary** — several versions always run at once; fix: make every interface change additive and tolerate the previous version.
- **Assuming existing logs are enough** — a request crosses processes and cannot be followed; fix: propagate a correlation identifier and trace across services.
- **Adding timeouts without a defined fallback** — the caller fails and its own callers fail in turn; fix: decide what is returned when a dependency is unavailable.
- **Underestimating the platform work** — the cost lands before the benefit; fix: budget for discovery, messaging, tracing and secrets as part of the decision.

## Go deeper

- **Boundaries and ownership** (`backend-data/microservices/01-boundaries-and-ownership`) — the design decisions whose cost this child describes.
- **Microservices** (`backend-data/microservices`) — the architecture this cost belongs to.
- **CI/CD** (`cloud-devops/ci-cd`) — the per-service pipeline that makes independent deployment real.
