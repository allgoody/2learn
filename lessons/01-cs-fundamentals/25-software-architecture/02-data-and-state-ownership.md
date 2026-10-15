---
title: Data and state ownership
prereqs: ["01-cs-fundamentals/25-software-architecture/01-boundaries-and-coupling"]
---

## What it is

Every piece of data in a system should have exactly one owner: the place that decides what it means and what may change it. Everything else either asks the owner or keeps a copy it knows may be out of date. Ownership is a boundary decision, and it is the one hardest to revise, because data tends to accumulate on both sides of a line long before anyone notices the line was wrong.

## Why it matters

Shared databases and shared mutable state are the most common reason two parts of a system cannot ship independently. When two modules write to the same table, a schema change is a change to both, and a transaction that spans them either becomes one transaction — coupling their deployment — or stops being atomic, which is a correctness change nobody asked for. Deciding ownership early makes the alternative visible; leaving it undecided means the decision gets made by whoever writes first.

## Core ideas

### One writer, many readers

The rule that prevents the most trouble is simple: exactly one component may write a given piece of state. Others may read a copy, but they do not change the source. With a single writer, the invariants for that data live in one place, and the rest of the system can be reasoned about as consumers. The moment two writers exist, every invariant is a distributed agreement.

```text
orders service: writes orders, owns the ordering rules
reports service: keeps a read model, never writes orders
```

### A shared schema is a shared deploy

Sharing a database couples the deployments, however separated the services are. A column rename, a new constraint or a migration window requires everyone who touches the table to coordinate. This is why "we split the services but kept the database" produces services that still cannot be released independently — the operational shape changed and the coupling did not.

```text
service A --\
             +--> one schema --> every migration is a joint release
service B --/
```

### Transactions stop at the boundary

A transaction is a promise that a set of writes either all happen or none do, and that promise is only available inside one store. The moment state lives in two places, you must choose between a distributed transaction that couples availability, a saga with compensation, or accepting a window where the two disagree. This is a design decision made for you by the boundary, so it is worth knowing which one you have chosen.

### Consistency becomes a question of time

Once a copy exists, it is stale from the moment it is made. The design question is not whether that happens but what the system does during the window: does a read of the copy need to be current, or is "recent enough" acceptable? Making the answer explicit turns a class of confusing bugs into a documented property, and it tells you where to put retries, version numbers or a read-your-own-writes path.

```text
write owner -> event -> projector -> read model   (lag: milliseconds to seconds)
```

### Copy data deliberately, not accidentally

Denormalising for performance is legitimate and common: a report needs a join across three owners, so it keeps a materialised view. What makes it safe is that the copy is derived, rebuildable from the source, and marked as such. A copy that nobody can rebuild is a second source of truth wearing a different name.

## Practice

### Find the second writer

Pick a table or a state store in your system. List everything that writes to it. If more than one component writes, write down what invariant each one assumes.

Done when: you can name every writer, and either one owner remains or you have written out the agreement that keeps them consistent.

### Rebuild a derived store

Take a read model or cache that is derived from a source of truth. Delete it and rebuild it from the source.

Done when: the rebuilt store serves the same answers, and you have confirmed nothing is only present in the copy.

## Common mistakes

- **Two services writing the same table** — every invariant needs a cross-team agreement; fix: pick one writer and make the other a reader or a copy.
- **Splitting a service while keeping its database** — the coupling is unchanged and the deploy story is worse; fix: treat the schema as part of the boundary.
- **Assuming a distributed transaction is free** — it couples availability and latency across the boundary; fix: choose compensation or an acceptable window deliberately.
- **Treating a stale copy as current** — reads return data that contradicts a write the user just made; fix: state the consistency requirement and route reads that need freshness to the owner.
- **Keeping an undocumented second source of truth** — two versions of the data exist and they drift; fix: make the copy derived, rebuildable and labelled as such.

## Go deeper

- **Boundaries and coupling** (`01-cs-fundamentals/25-software-architecture/01-boundaries-and-coupling`) — the boundary decision that ownership follows from, so read it first.
- **Deployment shape** (`01-cs-fundamentals/25-software-architecture/03-deployment-shape`) — what ownership lets you ship separately, and what it still forces together.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — what a transaction can and cannot promise once the data is no longer in one store.
