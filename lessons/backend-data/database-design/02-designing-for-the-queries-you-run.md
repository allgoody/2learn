---
title: Designing for the queries you run
prereqs: ["backend-data/database-design/01-keys-and-relations"]
---

## What it is

Shaping a schema around the access patterns an application actually has. The tables and keys come from the domain, but the indexes, the choice of which relationships to keep and where a value is stored also depend on how the data is read and written. This is where a design that is merely correct becomes one that is fast, and where a design that satisfies every rule can still fail under load.

## Why it matters

A schema with no indexes is correct and unusable at scale; a schema with the wrong indexes is correct, slow, and expensive to write to. Both problems are invisible until the data grows, which means the feedback arrives months after the decision. Working from the queries rather than from the entity diagram is what closes that gap, because the queries are known before the data volume is.

## Core ideas

### Write down the queries before finalising the schema

The entities suggest tables; the queries suggest indexes, and often changes to the tables. Listing the handful of queries the application actually runs — the detail read, the list view, the filter, the report — and checking each against the design finds the missing index before there is any data to be slow on. This is the single most effective habit in the discipline.

```text
list orders for a customer, newest first
  -> index on (customer_id, placed_at desc)

find an order by its public identifier
  -> unique index on (public_id)
```

### Every index is chosen for a query, and costs every write

An index makes a read fast and makes every insert, update and delete slightly slower and every row slightly larger. A table with six indexes is cheap to read in six ways and expensive to write. The set should be the smallest that covers the real queries, and each should be traceable to one of them.

### Denormalise only what a measurement justifies

Storing a computed total on the parent row removes an aggregation from a frequent read and introduces the requirement to keep it correct on every write. That is a real trade and it is sometimes the right one, but the case for it should be a measured query, not an anticipated one. Where it is done, naming the column as a derived value stops a later reader from treating it as the source of truth.

### A read-heavy view may deserve its own table

Reporting queries that aggregate across joins can be answered from a denormalised table kept up to date on write, or refreshed on a schedule. This moves the cost from every read to every write or every refresh, and keeps the aggregate query away from the tables that serve the application. Materialised views and summary tables are the standard forms.

### Partitioning and archiving are design decisions, not afterthoughts

A table that only ever grows will eventually be too large to index and alter comfortably. Deciding which rows are hot and which are history, and whether that split is by time or by tenant, allows the hot table to stay small. Doing it later requires a migration on the biggest table in the system.

### The schema should make the wrong thing hard

Constraints expressed in the schema act as documentation that cannot go stale, and they are what stop a new code path or a manual script from violating a rule. Where a business rule is important, expressing it as a constraint converts a convention into a guarantee, and the resulting error is a clear one rather than silent corruption.

## Practice

### Index the queries for one application

Take a small application's five most important queries and specify the index each needs, then check that every index you have written is justified by one of them.

Done when: running one of the queries after adding its index reads materially fewer rows, and no index in the list lacks a query that needs it.

### Decide a hot and cold split

Take a table that grows monotonically and describe how to split it into recent and historical parts, including how each query reaches both.

Done when: the common query touches only the small part and the historical data is still reachable by the queries that need it.

## Common mistakes

- **Designing from the entity diagram and indexing later** — the missing index is discovered at production volume; fix: list the queries first and derive the indexes.
- **Adding an index per column mentioned anywhere** — write throughput and storage pay for indexes nothing uses; fix: justify each index with a query.
- **Denormalising on a hunch** — a derived value drifts and there is no engine to catch it; fix: denormalise only what a measurement justifies, and label the copy.
- **Letting a table grow without a plan** — the eventual migration is on the largest table in the system; fix: decide the hot and cold split while the table is small.
- **Enforcing important rules only in application code** — a new path or a manual script bypasses them; fix: express the rule as a constraint.

## Go deeper

- **Keys and relations** (`backend-data/database-design/01-keys-and-relations`) — the keys and relationships these queries are built on.
- **Database Design** (`backend-data/database-design`) — the discipline this child completes.
- **Indexes and query plans** (`backend-data/sql-relational-databases/03-indexes-and-query-plans`) — how to verify that the indexes chosen here are actually used.
