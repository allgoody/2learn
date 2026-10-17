---
title: Software Architecture
type: skill
topic: 01-cs-fundamentals
tier: large
status: drafted
aliases: []
prereqs: ["01-cs-fundamentals/18-design-patterns", "01-cs-fundamentals/08-clean-code"]
related: []
---

## What it is

Software architecture is the set of decisions that are expensive to change later: where the boundaries between the parts of a system are drawn, who owns which data, how the pieces are deployed, and which trade-offs were chosen knowingly. It is not a diagram of boxes and it is not a choice of framework; it is the small number of choices — the 4 this track covers — that everything else has to live with. The test of "expensive" is a count — how many files, services and release windows move when the decision is reversed — which is why every idea in this track ends in a number you can take.

## Why it matters

Most of the pain in a mature system is structural rather than local. A change that should touch 1 file touches 12, because 3 modules read the same schema: 3 files in `orders/`, 4 in `billing/`, 5 in `reports/`, and 3 + 4 + 5 = 12. A fix waits for the 2 other services, because the code was split across 3 services but they still share 1 release. A page takes 10 ms longer than it should, because 10 calls cross a network boundary per request at about 1 ms each — one millisecond, a thousandth of a second — and 10 * 1 ms = 10 ms of waiting, against 10 * 1 µs = 10 µs if the same 10 calls stayed inside one process, where a call costs one microsecond, a millionth of a second. Each of those costs is invisible in the commit that caused it and obvious a year later, which is exactly why nobody challenges it. Making the decisions deliberately, and writing down the reasoning, is what keeps a system changeable after the people who built it have moved on.

## In this track

1. **Boundaries and coupling** (`01-cs-fundamentals/25-software-architecture/01-boundaries-and-coupling`) — where to split a system, and how to count whether the split helped.
2. **Data and state ownership** (`01-cs-fundamentals/25-software-architecture/02-data-and-state-ownership`) — giving every piece of data one owner, and what a second writer costs.
3. **Deployment shape** (`01-cs-fundamentals/25-software-architecture/03-deployment-shape`) — what has to ship together, what can ship separately, and how far one failure spreads.
4. **Documenting decisions** (`01-cs-fundamentals/25-software-architecture/04-documenting-decisions`) — recording context, options and consequences so the next reader knows why.

## Prerequisites

- **Design Patterns** (`01-cs-fundamentals/18-design-patterns`)
- **Clean Code** (`01-cs-fundamentals/08-clean-code`)

## Go deeper

- **Microservices** (`05-backend-data/12-microservices`) — the named architectural style this entry deliberately leaves out, for when a boundary is also a deployment unit.
- **Concurrency & Async Programming** (`01-cs-fundamentals/05-concurrency-async-programming`) — why shared mutable state is the boundary that matters most, and what changes when 2 writers touch it at once.
- **SOLID Principles** (`01-cs-fundamentals/09-solid-principles`) — the same rules of coupling at the scale of a single class, where the counts are files rather than services.
