---
title: Data and state ownership
prereqs: ["01-cs-fundamentals/25-software-architecture/01-boundaries-and-coupling"]
---

## What it is

Every piece of data in a system should have exactly one owner: the one place that decides what the data means and what may change it, and the only writer. Everything else either asks the owner or keeps a copy that it knows may be out of date. Ownership is a boundary decision, and it is the hardest one to revise, because data accumulates on both sides of a line long before anyone notices the line was wrong.

## Why it matters

Shared databases and shared mutable state are the most common reason two parts of a system cannot ship independently. When two modules write to the same table, a schema change is a change to both, and a transaction that spans them either becomes one transaction — coupling their deployment — or stops being atomic, which is a correctness change nobody asked for. The cost is countable: a table that obeys 6 rules, each kept by the writers that touch it, is 6 rules in one code path when there is one writer and 2 * 6 = 12 rule implementations, free to disagree, when there are two. Deciding ownership early makes the alternative visible; leaving it undecided means the decision gets made by whoever writes first.

## Core ideas

### One writer, many readers

The rule that prevents the most trouble is simple: exactly one component may write a given piece of state. Others may read a copy, but they do not change the source. With a single writer, the invariants for that data live in one place and the rest of the system can be reasoned about as consumers; with two writers, every invariant becomes an agreement between teams, and the agreements have to be re-checked on every change.

```text
a table that obeys 6 rules: r = 6
  total equals the sum of the items
  status only moves forward
  a cancelled order has no open lines
  ... and 3 more

one writer, orders-service:
  r = 6   rule implementations to keep right, all in one place
  a change to any rule touches 1 service

two writers, orders-service and reports-service:
  2 * r = 2 * 6 = 12   rule implementations, and any pair of them may disagree
  a change to any rule touches 2 services

what the second writer did: corrected a total at 02:00, and the nightly sync
wrote the old figure back over it before 03:00
```

The useful habit is to answer one question for each store: who is allowed to write this? If the answer names two components, you have not removed the coupling, you have only stopped looking at it.

### A shared schema is a shared deploy

Sharing a database couples the deployments, however separate the services are. A column rename, a new constraint or a migration window requires everyone who touches the table to coordinate, and the coordination does not shrink when the code is tidy.

```text
service A  --\
              +--> one schema --> every migration is a joint release
service B  --/

services that read the table:            s = 3
deploys that must be coordinated:        s = 3
a migration that takes 2 minutes and locks the table:
  behind one owner: 2 minutes of one service's release
  behind the shared schema: 3 release windows that must not overlap, so the
  migration is scheduled against 3 calendars and the 2 minutes sit inside the
  longest of them
```

This is why "we split the services but kept the database" produces services that still cannot be released independently: the operational shape changed and the coupling did not. Treat the schema as part of the boundary, and the count of coordinations falls with the count of owners.

### Transactions stop at the boundary

A transaction is a promise that a set of writes either all happen or none do, and that promise is only available inside one store. The moment state lives in two places, the promise is gone, and you are choosing between a distributed transaction, which couples the availability of both stores, and a saga, which compensates after the fact and leaves a window where the two disagree. Both are design decisions made for you by the boundary, so it is worth knowing which one you have chosen.

```text
each store answers 99.9% of writes: p = 0.999
one write must land in both stores:
  both succeed: p * p = 0.999 * 0.999 = 0.998001
  failures: 1 - 0.998001 = 0.001999, about 2 writes in 1000
one store alone: 1 - 0.999 = 0.001, about 1 write in 1000
the second store therefore costs about 1 extra failed write per 1000

with three stores: 0.999 * 0.999 * 0.999 = 0.997003
  about 3 failed writes in 1000, one per store
```

The arithmetic is a model, not a measurement — put your own `p` in and it holds — but the shape of it does not change: each store you add multiplies the chance of success by less than 1, so a distributed transaction is always slightly worse at accepting a write than any single store it spans.

### Consistency becomes a question of time

Once a copy exists, it is stale from the moment it is made. The design question is not whether that happens but what the system does during the window: does a read of the copy need to be current, or is "recent enough" acceptable? Putting a number on the window turns a class of confusing bugs into a documented property.

```text
the copy's lag, measured from the owner's commit to the copy reflecting it

  t = 0.0 s   orders-service commits the rename, old name -> new name
  t = 0.2 s   the event carrying the rename reaches the log
  t = 1.5 s   the projector, the component that reads the event and writes the copy, has applied it, so the copy now shows the new name
  lag = 1.5 s - 0.0 s = 1.5 s

a read of the copy at t = 0.4 s returns the old name
the same read sent to the owner returns the new name
```

Deciding which reads may tolerate a lag of up to 1.5 s, and which must go to the owner, gives you a place to put retries, version numbers or a read-your-own-writes path — a route that sends a user's own reads to the owner for the first seconds after that user writes. Without the number, every stale read looks like a new bug.

### Copy data deliberately, not accidentally

Denormalising — keeping a copy of another owner's data beside your own — is legitimate and common: a report needs a join across three owners, so it keeps a materialised view, a table holding the result of a query, refreshed as the source changes. What makes the copy safe is that it is derived, rebuildable from the source, and labelled as such. A copy that nobody can rebuild is a second source of truth wearing a different name, and the test of the difference is a rebuild, which has a cost you can estimate.

```text
materialised view, rebuilt from the owner's table
  rows in the view:                        n          = 1 000 000
  rows the rebuild can insert per second: throughput = 5 000 rows/s
  rebuild time: n / throughput = 1 000 000 / 5 000 = 200 s, about 3 minutes 20 s

if the view were a second source of truth instead, those 1 000 000 rows would
exist in two places and no rebuild could say which one is current
```

## Practice

### Find the second writer

Pick a table or a state store in your system and list every component that writes to it. Count them. For each writer beyond the first, write down the rules it assumes hold and which of them the others do not enforce.

Done when: you can name every writer with its rule list, and either exactly 1 writer remains or you have written out the agreement that keeps the rest consistent.

### Rebuild a derived store

Take a read model or a cache derived from a source of truth. Delete it, rebuild it from the source, and time the rebuild.

Done when: the rebuilt store serves the same answers, its rebuild time is written down beside it, and nothing is found that existed only in the copy.

## Common mistakes

- **Two services writing the same table** — the table's 6 rules are implemented twice, so a change to 1 rule is a change to 2 services; fix: pick 1 writer and make the other a reader or a copy.
- **Splitting a service while keeping its database** — the coupling is unchanged, so 1 migration still waits on 3 coordinated deploys, and the deploy story is worse; fix: treat the schema as part of the boundary.
- **Assuming a distributed transaction is free** — two stores that each answer 99.9% of the time accept 0.999 * 0.999 = 0.998001 of writes, about 2 failures per 1000 against 1 for a single store; fix: choose compensation or an acceptable window deliberately.
- **Treating a stale copy as current** — a read taken inside the copy's 1.5 s lag returns data that contradicts the write the user just made; fix: state the lag each read tolerates and route reads that need freshness to the owner.
- **Keeping an undocumented second source of truth** — two versions of the data exist and drift, and no rebuild can say which is right; fix: make every copy derived, rebuildable and labelled as such.

## Go deeper

- **Boundaries and coupling** (`01-cs-fundamentals/25-software-architecture/01-boundaries-and-coupling`) — the boundary decision that ownership follows from, so read it first.
- **Deployment shape** (`01-cs-fundamentals/25-software-architecture/03-deployment-shape`) — what ownership lets you ship separately, and what it still forces together.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — what a transaction can and cannot promise once the data is no longer in one store.
