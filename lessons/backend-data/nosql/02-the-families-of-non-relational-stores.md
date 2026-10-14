---
title: The families of non-relational stores
prereqs: ["backend-data/nosql/01-when-a-relational-store-fits-badly"]
---

## What it is

Four families cover most non-relational stores. A key-value store maps a key to an opaque value. A document store maps a key to a structured document and can query inside it. A wide-column store maps a key to a sorted collection of columns and is built for very large write volumes. A graph store keeps relationships as first-class objects and traverses them directly. Each gives up something the relational model provides.

## Why it matters

The names hide the differences that matter. Two stores both called document databases may differ entirely in how they index, whether they support transactions across documents, and how they distribute data. Choosing by category rather than by the specific guarantees a product offers leads to a system that cannot perform an operation the application assumes is atomic. Knowing what each family trades away is what allows the question "does anything else need this?" to be asked before the choice is made.

## Core ideas

### Key-value is the smallest possible interface

The store knows only that a key exists and has a value; the value is opaque. That makes it extremely fast and extremely simple, and it means every query beyond lookup-by-key must be built by the application. Session state, caches and simple counters are its natural uses.

```text
key: "session:8f2a"   value: opaque bytes
```

### Document stores add structure and secondary indexes

A document is a self-contained nested record, and the store can index fields inside it and answer queries over them. This fits data that is naturally read as a whole — a user profile, an order with its lines — and it removes the need to join for a nested structure. What it does not give is the arbitrary relational query, and transactions spanning several documents are either absent or more expensive than a single-document write.

### Wide-column stores optimise for enormous write volume

Data is partitioned by key and stored in sorted order within a partition, so a range of related rows can be read in one pass and appends are cheap. The trade is that reads are efficient only along the designed key order, and ad-hoc queries are not the point. Time-series and event data are the canonical case.

### Graph stores make traversal the primitive

Nodes and edges are stored directly, so a query that walks relationships several levels deep is a short expression rather than a sequence of joins. The trade is that the store is poor at the aggregate queries a relational engine handles well, so a graph is usually a complement to a primary store rather than a replacement.

### Consistency across nodes is the hard guarantee

Stores that distribute data across machines must choose between requiring agreement before a write is acknowledged and acknowledging immediately and propagating afterwards. The first is slower and simpler to reason about; the second is faster and means a read may return stale data. Which is acceptable depends on whether the application can tolerate reading yesterday's value for a moment, and for a bank balance the answer differs from a social feed.

### The query language is the interface, and it is not portable

Relational stores share a standard query language, so a query written for one often runs on another. Non-relational stores each have their own interface, so the application's data access is tied to the product. That is a real cost of adoption, and it argues for confining access to a small layer rather than spreading it through the code.

## Practice

### Match four workloads to four families

Take a session store, an event log with heavy append volume, a user profile read as a whole, and a recommendation graph, and assign each a family with a stated reason.

Done when: each assignment names the property that made the other three unsuitable, not merely less optimal.

### Identify the consistency requirement

For a shopping cart and for a follower count, state whether a read may return a value that is a moment out of date, and why.

Done when: the answer for each is justified by what the user would notice, not by what the store defaults to.

## Common mistakes

- **Choosing a family by reputation rather than by guarantees** — two stores in one category can differ on transactions and indexing; fix: read the specific guarantees of the product.
- **Using a key-value store and rebuilding a query layer over it** — the machinery being avoided has been reimplemented worse; fix: use a store that can query if querying is needed.
- **Expecting relational-style queries from a wide-column store** — access is efficient only along the designed key order; fix: design the key for the reads that exist.
- **Adding a graph store for relationships that are one level deep** — a foreign key already answers that; fix: reserve a graph for traversal that is genuinely deep.
- **Spreading a store's interface through the application** — every caller is coupled to the product; fix: keep data access behind a small layer.

## Go deeper

- **When a relational store fits badly** (`backend-data/nosql/01-when-a-relational-store-fits-badly`) — the mismatches these families address.
- **NoSQL** (`backend-data/nosql`) — the collective category these four families make up.
- **MongoDB** (`backend-data/mongodb`) — one document store in detail, including its guarantees.
