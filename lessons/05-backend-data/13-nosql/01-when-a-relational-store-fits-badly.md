---
title: When a relational store fits badly
prereqs: ["05-backend-data/13-nosql"]
---

## What it is

The situations where a relational engine is the wrong tool: data whose shape varies per record and cannot be described by a stable set of columns; access that is always by a single key and never by a query; volumes or write rates beyond what one server can absorb; and data whose natural representation is a graph of relationships traversed many levels deep. Each of these is a genuine mismatch rather than a preference.

## Why it matters

Recognising a mismatch is what prevents both of the standard mistakes: forcing a relational schema onto data that does not have one, and adopting a non-relational store for data that does. A schema with forty nullable columns is usually a document model crammed into rows; a document store queried with application-side joins is usually a relational model crammed into documents. Naming the mismatch first makes the store choice follow from the data rather than from fashion.

## Core ideas

### A stable set of columns is an assumption worth checking

The relational model assumes every row of a table has the same attributes. When records genuinely differ — a catalogue mixing books, downloads and courses, each with different fields — the schema either grows nullable columns or moves the varying part into an untyped blob. If most columns are empty for most rows, the assumption does not hold.

```text
row 1: title, author, pages              (a book)
row 2: title, duration, resolution      (a download)
one table -> mostly null columns, or an untyped blob
```

### Always fetching by one key is a different problem

A relational engine is built to answer questions it has not seen before, which requires maintaining indexes and a planner. A workload that only ever asks "give me the value for this key" pays for machinery it does not use, and a key-value store answers it with less overhead. This is the case for session data, feature flags and caches.

### Write volume can outgrow one machine

When writes must be distributed across many machines, the relational guarantee that a transaction spans all of them becomes expensive or unavailable. Stores that relax that guarantee can distribute much more easily, at the cost of the application having to reason about eventual consistency. This is a real constraint at scale and an unnecessary one at the sizes most systems reach.

### Deep traversal is a graph problem

Finding friends of friends of friends is a join repeated an unknown number of times, which a query language expresses awkwardly and a graph store expresses directly. Where the relationships are the data rather than a way of connecting it, the graph model is a better fit and the queries are simpler.

### Flexible schema moves the decision, it does not remove it

A document store accepts any shape, which is convenient during development and means every reader must cope with every shape ever written. The schema still exists — it is enforced by reading code rather than by the store. Treating flexibility as free is how a document collection accumulates a dozen variants of the same record.

### The mismatch is about access patterns, not about size

The common justification for a non-relational store is scale, and the common reality is that the workload is small and the schema is awkward. The mismatch to look for is how the data is shaped and read, not how much of it there is. A relational database holds far more than most systems ever store.

## Practice

### Classify three datasets

Take a session store, a product catalogue with varying attributes, and a social graph, and state for each whether a stable schema, single-key access or deep traversal describes it.

Done when: each dataset is matched to the property that decides its store, and none is justified by size alone.

### Find a nullable-column table

Look for a table where most columns are null for most rows and describe what document shape it is imitating.

Done when: you can name the varying attributes and say whether they are genuinely variable or merely sparse.

## Common mistakes

- **Choosing a non-relational store for scale that has not been reached** — the relational guarantees are given up for nothing; fix: base the decision on access patterns, not on anticipated volume.
- **Forcing variable data into nullable columns** — constraints become meaningless and queries grow complicated; fix: consider a document shape, or split the varying part into its own table.
- **Assuming a schemaless store has no schema** — readers must handle every historical shape; fix: define and validate the shape at the boundary.
- **Using a document store to model relationships** — joins move into application code and lose the engine's guarantees; fix: keep relationships where traversal is the point.
- **Treating the families as interchangeable** — key-value, document, wide-column and graph solve different problems; fix: name the problem before naming the store.

## Go deeper

- **NoSQL** (`05-backend-data/13-nosql`) — the families these mismatches motivate, so read it first.
- **The families of non-relational stores** (`05-backend-data/13-nosql/02-the-families-of-non-relational-stores`) — what each family offers in exchange.
- **SQL & Relational Databases** (`05-backend-data/07-sql-relational-databases`) — the assumptions being checked here.
