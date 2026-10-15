---
title: NoSQL
type: skill
topic: 05-backend-data
tier: medium
status: drafted
aliases: []
prereqs: ["05-backend-data/07-sql-relational-databases"]
related: []
---

## What it is

NoSQL is a collective name for stores that gave up one or more of the relational model's properties in exchange for something else: documents instead of rows, key-value lookups instead of queries, graphs instead of joins, or relaxed consistency instead of distributed transactions. Each family exists because a particular access pattern or scale is awkward in a relational engine, and each is a trade rather than an upgrade.

## Why it matters

The useful question is never "relational or NoSQL" but "which store fits the way this data is read". A session cache, a product catalogue with heterogeneous fields and a social graph have little in common, and choosing one non-relational store for all three repeats the mistake of choosing one relational store for all three. The cost of choosing wrongly is high in both directions: a relational schema that must support a flexible document shape becomes a table of nullable columns, and a document store used for data with real relationships becomes a joins problem solved by application code.

## In this track

1. **When a relational store fits badly** (`05-backend-data/13-nosql/01-when-a-relational-store-fits-badly`) — the shapes and access patterns that motivate the alternatives.
2. **The families of non-relational stores** (`05-backend-data/13-nosql/02-the-families-of-non-relational-stores`) — document, key-value, wide-column and graph, and what each is for.

## Prerequisites

- **SQL & Relational Databases** (`05-backend-data/07-sql-relational-databases`)

## Go deeper

- **SQL & Relational Databases** (`05-backend-data/07-sql-relational-databases`) — the model these alternatives are compared against, so read it first.
- **MongoDB** (`05-backend-data/18-mongodb`) — the most common document store, as a concrete case.
- **Caching (Redis)** (`05-backend-data/16-caching-redis`) — a key-value store whose most common use is not a primary store at all.
