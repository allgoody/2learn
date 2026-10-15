---
title: Boundaries and ownership
prereqs: ["05-backend-data/12-microservices"]
---

## What it is

A service boundary is a line where a function call becomes a network call, and drawing it means deciding what belongs on each side. Alongside the boundary goes ownership: one team is accountable for each service, and each service owns its data. The line is drawn around something that changes together, so that a change of a particular kind touches exactly one service and one team.

## Why it matters

A boundary in the wrong place produces the worst of both worlds: the coordination cost of a distributed system and the coupling of a monolith. Two services that must be deployed together, or that read each other's tables, have a boundary in name only, and every change still requires both teams. Getting the boundary right is the actual engineering work; the container and the pipeline are administration afterwards.

## Core ideas

### Draw the boundary around a reason to change

The useful question is which parts of the system change together and for the same reason. If a pricing rule changes every quarter and a delivery rule yearly, they belong on opposite sides of a boundary. Splitting by technical layer — one service for the database, one for the rules — produces services that must change together on every feature, which is the opposite of independence.

```text
billing service: pricing rules, invoices, payment records
catalogue service: products, availability
```

### Each service owns its data, and nobody else reads it

A shared database is a hidden coupling: a schema change by one service breaks another, and neither team can deploy alone. The rule that each service owns its storage and is reached only through its interface is what makes independent deployment real. Where two services need the same data, one owns it and the other asks or caches a copy it can tolerate.

### A boundary is also a team boundary

Ownership means one team can change the service without asking permission. If two teams must both approve every change, the boundary has not divided anything. This is why the split should follow how the organisation actually works rather than a diagram drawn independently of it, and why reorganising teams without moving boundaries leaves the coordination cost in place.

### Contracts are what cross the boundary, and they need versioning

Only the interface crosses, so only the interface needs agreeing. That makes the interface the thing to keep stable and to change additively, with the older shape supported while clients migrate. A network boundary that people treat as an internal one produces breaking changes shipped as routine edits.

### A distributed system is a different problem, not a bigger one

Once part of the system is remote, a call can be slow, fail, or succeed without the caller learning the result. Reasoning about that requires idempotent operations, timeouts, retries and a plan for partial failure — concerns that do not exist inside a single process. The work of handling them is the price of the boundary and it does not decrease with the size of the service.

The atomicity that a database provides inside one service is gone between two. A change spanning both needs a compensating action, a saga with steps and a defined rollback, or a deliberate decision that eventual consistency is acceptable. Pretending otherwise produces a system that looks atomic in testing and duplicates a charge in production.

### Splitting is easy and merging is hard

Once two services are separate, their interfaces and their data are separate, and rejoining them means a migration. A modular monolith — one deployable with clear internal boundaries — gets most of the design benefit, and a boundary can be extracted later when its independence starts to matter. The reverse move is much more expensive.

## Practice

### Draw a boundary and justify it

Take a small system with three areas of responsibility and draw one service boundary, naming the kind of change that will touch only one side.

Done when: you can describe a change that requires editing one service and deploying it alone.

### Find a shared database

Take two services that read the same tables and describe what happens to each when the other changes the schema.

Done when: you can name one concrete change that would break the other service, and say which one should own the data.

## Common mistakes

- **Splitting by technical layer** — every feature change touches several services; fix: split by the reason the code changes.
- **Sharing a database between services** — independent deployment is impossible in practice; fix: give each service ownership of its data and expose it through the interface.
- **Splitting a system smaller than the team that owns it** — the operational cost is paid for no organisational gain; fix: prefer a modular monolith until the independence is needed.
- **Treating an internal call as reliable** — partial failure is unhandled; fix: design for timeouts, retries and idempotent operations.
- **Expecting one transaction across two services** — consistency is silently lost; fix: use a compensating step or accept eventual consistency explicitly.

## Go deeper

- **Microservices** (`05-backend-data/12-microservices`) — the architecture these boundaries define, so read it first.
- **The operational cost** (`05-backend-data/12-microservices/02-the-operational-cost`) — what these boundaries cost to run.
- **Software Architecture** (`01-cs-fundamentals/25-software-architecture`) — boundaries and coupling as a general discipline.
