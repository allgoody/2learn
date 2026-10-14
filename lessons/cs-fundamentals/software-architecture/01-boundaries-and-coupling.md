---
title: Boundaries and coupling
prereqs: ["cs-fundamentals/design-patterns", "cs-fundamentals/clean-code"]
---

## What it is

A boundary is a line in a system where something changes about the cost of crossing it: a function call becomes a network call, a transaction becomes two, or one team's decision becomes another team's dependency. Coupling is how much has to change together when one side changes. Drawing boundaries is the work of choosing where the expensive crossings go, and coupling is the measure of whether the choice was good.

## Why it matters

Every architecture problem you will meet reduces to this. A change that requires editing four modules, a migration and a coordinated release is highly coupled, and no amount of clean code inside each module fixes it. Boundaries also decide who can work independently: two teams on the far sides of a loose boundary ship without talking to each other, and two teams sharing a schema cannot. The decision is made once and then lived with for years, so it is worth more thought than the code it contains.

## Core ideas

### A boundary is where the cost of a call changes

The cheapest boundary is a function call. A module boundary lets you change the internals without touching callers, provided the interface stays put. A process boundary adds serialisation and a failure mode. A network boundary adds latency, partial failure and versioning. Each step costs more and buys more isolation, so place boundaries where that isolation is actually needed.

```text
call -> module boundary -> process boundary -> network boundary
cost:      low                  medium              high
buys:   privacy            crash isolation    independent deploys
```

### Coupling is the number of things that change together

The practical test is change amplification: for the change in front of you, how many files, modules and teams must be touched? Count that number before and after a proposed boundary and you have a measurement rather than an opinion. High coupling is not automatically wrong — sometimes two things genuinely are one concept — but it should be a decision, not an accident.

```text
change "add a field to an order"
touches: orders/ (1 file)             -> loosely coupled
touches: orders/, billing/, reports/ -> shared schema coupling
```

### Depend in one direction

Imports should point from the volatile toward the stable. Business rules should not import the web framework, the ORM or the message broker, because those change more often and for reasons unrelated to the rules. The practical form is that the domain layer defines the interfaces it needs and the outer layer supplies implementations — the same inversion as in SOLID, applied to modules.

```text
http/handler.ts  ->  domain/order.ts  ->  domain/ports.ts
                    (framework never imported by the domain)
```

### Draw boundaries around change, not around nouns

The tempting split is by type of thing — users here, orders there — because it matches the data model. The better split is by what changes together: if a pricing rule changes every quarter and delivery rules change yearly, they belong on opposite sides of a boundary even though both live on an order. Nouns give you a tidy diagram; rates of change give you a system that is cheap to modify.

### Cohesion is the other half

A module should contain things that belong together. If a module's contents have no reason to change at the same time, the module is doing two jobs and every change forks it. High cohesion and low coupling are the same observation from two directions: what belongs together is what changes together.

## Practice

### Count the amplification of one change

Pick a change you made recently — add a field, change a rule, rename a concept — and count every file and module you had to edit. Then find the shared concept that forced each extra edit.

Done when: you can name the coupling that caused the widest edit, or state that the change was genuinely local.

### Test the dependency direction

Choose a module you own and list its imports. For each one, decide whether it points toward something more stable or less stable than the module itself.

Done when: every import either points at something more stable or is an implementation seam you can replace in a test.

## Common mistakes

- **Splitting by noun because the diagram looks tidy** — the parts that change together end up apart and every change spans them; fix: group by rate and reason for change.
- **Letting the framework leak into the domain** — a framework upgrade becomes a rewrite of business rules; fix: keep the domain free of framework types and adapt at the edge.
- **Adding a network boundary for no operational reason** — latency, partial failure and versioning arrive for free; fix: make a service a service only when independent deployment or isolation is required.
- **Sharing a model between two bounded contexts** — one side's field rename breaks the other's behaviour; fix: each context owns its own model and translates at the boundary.
- **Measuring architecture by the number of layers** — layer counts say nothing about coupling; fix: measure how many places a typical change touches.

## Go deeper

- **Design Patterns** (`cs-fundamentals/design-patterns`) — how to shape the seam once a boundary is chosen, so read it first.
- **Clean Code** (`cs-fundamentals/clean-code`) — the naming and structure that make a boundary legible to the people crossing it.
- **Data and state ownership** (`cs-fundamentals/software-architecture/02-data-and-state-ownership`) — the boundary that is hardest to move later, because the data is already on both sides.
