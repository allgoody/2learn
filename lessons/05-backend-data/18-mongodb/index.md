---
title: MongoDB
type: skill
topic: 05-backend-data
tier: medium
status: drafted
aliases: []
prereqs: ["05-backend-data/13-nosql"]
related: []
---

## What it is

MongoDB is a document database: it stores JSON-like documents in collections, indexes fields inside them, and answers queries against those indexes. Documents related to each other can be embedded in one another, which is what makes reading a record a single lookup rather than a join. Its interface is its own query language rather than SQL, and its guarantees — atomicity per document, and transactions across documents where the deployment supports them — are the ones the previous entry described for this family.

## Why it matters

It is the most widely used document store, so it is the concrete case against which the abstract trade-offs are tested. Its strengths are real: a naturally nested record is one document, reading it is one operation, and the shape can change without a migration. Its costs are equally concrete: relationships that are referenced rather than embedded require application-side joins, and a schema enforced only by reading code accumulates variants. Learning where those costs land is what turns the family choice from a preference into a judgement.

## In this track

1. **Documents and collections** (`05-backend-data/18-mongodb/01-documents-and-collections`) — the data model and how it differs from tables and rows.
2. **Schema design in a schemaless store** (`05-backend-data/18-mongodb/02-schema-design-in-a-schemaless-store`) — embedding, referencing and keeping the shape under control.

## Prerequisites

- **NoSQL** (`05-backend-data/13-nosql`)

## Go deeper

- **NoSQL** (`05-backend-data/13-nosql`) — the family this store belongs to, so read it first.
- **The families of non-relational stores** (`05-backend-data/13-nosql/02-the-families-of-non-relational-stores`) — how this store's guarantees compare with the others.
- **Caching (Redis)** (`05-backend-data/16-caching-redis`) — the in-memory store often used alongside it.
