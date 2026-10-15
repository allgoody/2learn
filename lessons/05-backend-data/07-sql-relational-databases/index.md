---
title: SQL & Relational Databases
type: skill
topic: 05-backend-data
tier: large
status: drafted
aliases: ["SQL"]
prereqs: []
related: []
---

## What it is

A relational database stores data in tables of rows and columns, relates tables to one another through shared key values, and answers questions with SQL. The engine guarantees that a group of statements either all takes effect or none does, and that concurrent readers and writers do not observe each other's half-finished work. Those two guarantees, plus a query planner that chooses how to execute a question, are what make it the default store for structured data.

## Why it matters

Most applications have data whose correctness matters: an order that must not be charged twice, a balance that must not go negative, a relationship that must not point at a deleted row. A relational engine maintains these properties without the application having to enforce them everywhere, which is why it remains the default after decades of alternatives. It is also the layer where poor decisions are most expensive, because a schema and its indexes outlive the application code that surrounds them.

## In this track

1. **Tables and relationships** (`05-backend-data/07-sql-relational-databases/01-tables-and-relationships`) — rows, columns, keys and the relations between tables.
2. **Queries and joins** (`05-backend-data/07-sql-relational-databases/02-queries-and-joins`) — selecting, filtering, grouping and combining tables.
3. **Indexes and query plans** (`05-backend-data/07-sql-relational-databases/03-indexes-and-query-plans`) — why a query is fast, and how to find out.
4. **Transactions and isolation** (`05-backend-data/07-sql-relational-databases/04-transactions-and-isolation`) — atomicity, concurrency and what one transaction can see of another.

## Prerequisites

None.

## Go deeper

- **Database Design** (`05-backend-data/14-database-design`) — how the schema and indexes for a real application are chosen.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — what happens underneath, once the query language is familiar.
- **Object-Relational Mapping** (`05-backend-data/15-object-relational-mapping`) — the abstraction most application code puts between itself and the SQL here.
