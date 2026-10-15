---
title: Prisma ORM
type: skill
topic: 05-backend-data
tier: small
status: drafted
aliases: ["Prisma"]
prereqs: ["05-backend-data/15-object-relational-mapping", "05-backend-data/02-nodejs"]
related: []
---

## What it is

Prisma is an object-relational mapper for Node and TypeScript in which the schema is the source of truth. A single schema file describes the models and their relations; from it the tool generates a typed client whose methods reflect that schema, and generates migrations that move the database to match. A query written against the client is type-checked at compile time and translated into a statement at runtime.

## Why it matters

The generated types are the distinctive benefit: a query that selects a field that does not exist, or passes the wrong type, is a compile error rather than a runtime surprise. In a language with an optional type system, that is a meaningful improvement over mappers that discover such mistakes in production. The schema file also gives a team one place to look for the data model, and the generated migration history makes schema change a reviewable artefact. The costs are the same as any mapper's — the generated statement is still hidden, and a relationship traversal can still issue a query per item — plus a generation step that must run before the code compiles.

```text
schema file -> generated types + migration -> typed client -> SQL
```

## Core ideas

### The schema file is the source of truth for both code and database

Models, fields and relations are declared once, and everything else is derived. Changing the schema changes the generated types and produces a migration, so the two cannot drift the way a hand-written model and a hand-edited database can. This is the central design decision and the reason the tool's workflow differs from mappers that read the database.

### Generated types move errors to compile time

A query's result type is derived from the schema, including the shape of included relations. Renaming a field breaks every query that used it at build time, which is exactly the behaviour a statically typed language is for. It also means an editor can complete field names, which reduces the need to consult the schema while writing a query.

```ts
const order = await db.order.findUnique({
  where: { id },
  include: { items: true },
});
// order.items is typed; order.missing would not compile
```

### The client is a query builder, and the statement is still generated

A query is assembled from method calls that read like the intended result rather than the SQL that will run. That is a readability gain and it preserves the mapper's central leak: whether a traversal results in a join, a second query or a query per row depends on how the query is written. Logging the generated statements and reading them is the only reliable way to know.

### Migrations are generated and then reviewed

The tool can derive a migration from a schema change, and the derived statement should be read before it is applied, particularly for a rename that the tool may express as a drop and a create. Treating a generated migration as reviewable code rather than as an artefact is what prevents data loss on an ordinary change.

### The client needs to be generated and kept in step

The typed client is produced by a generation step, so a build that skips it compiles against a stale client or fails outright. This belongs in the project's standard scripts and in continuous integration rather than in a note in the readme.

### Connection handling and transactions are explicit

The client manages a connection pool, and a group of operations can be run in a transaction by calling one. Because the mapper buffers nothing indefinitely, the transaction boundary is written where the code says it is, which is a genuine improvement over mappers whose flush point is implicit.

## Practice

### Follow a relation from the generated type

Write a query that returns a record with one of its relations, and determine from the type and the logged statements whether the relation was fetched in the same statement.

Done when: you can quote the generated statement and say whether one or two were issued.

### Review a generated migration

Change a field's name in the schema, generate the migration, and read what it will do to existing data.

Done when: you can state whether the change preserved the column's data or dropped and recreated it, and you have adjusted the migration if not.

## Common mistakes

- **Skipping the generation step in a build** — the client is stale or the build fails; fix: put generation in the standard scripts and in continuous integration.
- **Applying a generated migration without reading it** — a rename can be expressed as a drop and a create; fix: review every migration as code.
- **Including relations in a loop** — the generated statements multiply with the result size; fix: include the relation in the original query or batch it.
- **Assuming the schema file alone changes the database** — a migration must be applied; fix: treat schema change and migration as one change.
- **Leaving transactions to the mapper's discretion** — a group of writes that must be atomic is written as separate calls; fix: state the transaction boundary explicitly.

## Go deeper

- **Object-Relational Mapping** (`05-backend-data/15-object-relational-mapping`) — the abstraction and its leaks, so read it first.
- **Node.JS** (`05-backend-data/02-nodejs`) — the runtime this client runs in.
- **SQL & Relational Databases** (`05-backend-data/07-sql-relational-databases`) — the statements the client generates.
