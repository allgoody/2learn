---
title: Database Design
type: skill
topic: 05-backend-data
tier: medium
status: drafted
aliases: []
prereqs: ["05-backend-data/07-sql-relational-databases"]
related: []
---

## What it is

Database design is choosing the tables, keys, relationships and indexes that make an application's data correct and its queries fast. It is the point where the domain model meets the engine: which facts deserve their own table, what identifies a row, which relationships need enforcing, and which access paths need an index behind them.

## Why it matters

Application code is replaced every few years; the schema usually is not. A missing constraint or a badly chosen key outlives the team that chose it, and migrating it later means moving live data with the application running. At the same time, a design that satisfies every rule and serves no query well produces a system that is correct and slow, so design is a balance rather than a checklist. Getting the balance right early is one of the highest-leverage things a team can do.

## In this track

1. **Keys and relations** (`05-backend-data/14-database-design/01-keys-and-relations`) — what identifies a row and how the relationships between them are expressed.
2. **Designing for the queries you run** (`05-backend-data/14-database-design/02-designing-for-the-queries-you-run`) — shaping the schema and its indexes from the access patterns.

## Prerequisites

- **SQL & Relational Databases** (`05-backend-data/07-sql-relational-databases`)

## Go deeper

- **SQL & Relational Databases** (`05-backend-data/07-sql-relational-databases`) — the model these designs are built in, so read it first.
- **Indexes and query plans** (`05-backend-data/07-sql-relational-databases/03-indexes-and-query-plans`) — the mechanism behind the second child.
- **Object-Relational Mapping** (`05-backend-data/15-object-relational-mapping`) — how application code maps onto whatever schema is chosen.
