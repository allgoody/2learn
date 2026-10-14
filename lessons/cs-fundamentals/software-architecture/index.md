---
title: Software Architecture
type: skill
topic: cs-fundamentals
tier: large
status: drafted
aliases: []
prereqs: ["cs-fundamentals/design-patterns", "cs-fundamentals/clean-code"]
related: []
---

## What it is

Software architecture is the set of decisions that are expensive to change later: where the boundaries between parts of a system are drawn, who owns which data, how the pieces are deployed, and what trade-offs were chosen knowingly. It is not a diagram of boxes, and it is not a choice of framework. It is the small number of choices that everything else has to live with.

## Why it matters

Most of the pain in a mature system is structural rather than local. A change that should touch one file touches six because two modules share a schema; a bug fix requires a coordinated release because two services were deployed as one; a feature is slow to add because nobody remembers why a boundary exists. These costs appear slowly and are invisible in any single commit, which is exactly why they go unchallenged. Making the boundary decisions deliberately, and writing down the reasoning, is what keeps a system changeable after the people who built it have moved on.

## In this track

1. **Boundaries and coupling** (`cs-fundamentals/software-architecture/01-boundaries-and-coupling`) — where to split a system, and how to measure whether the split helped.
2. **Data and state ownership** (`cs-fundamentals/software-architecture/02-data-and-state-ownership`) — giving every piece of data one owner, and what shared state really costs.
3. **Deployment shape** (`cs-fundamentals/software-architecture/03-deployment-shape`) — what has to ship together, what can ship separately, and what failure isolation buys.
4. **Documenting decisions** (`cs-fundamentals/software-architecture/04-documenting-decisions`) — recording context, options and consequences so the next reader knows why.

## Prerequisites

- **Design Patterns** (`cs-fundamentals/design-patterns`)
- **Clean Code** (`cs-fundamentals/clean-code`)

## Go deeper

- **Microservices** (`backend-data/microservices`) — the named architectural style this entry deliberately leaves out, for when a boundary is also a deployment unit.
- **Concurrency & Async Programming** (`cs-fundamentals/concurrency-async-programming`) — why shared mutable state is the boundary that matters most.
- **SOLID Principles** (`cs-fundamentals/solid-principles`) — the same rules of coupling at the scale of a single class.
