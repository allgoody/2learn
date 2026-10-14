---
title: Object-Relational Mapping
type: skill
topic: backend-data
tier: small
status: drafted
aliases: ["ORM"]
prereqs: ["backend-data/sql-relational-databases"]
related: []
---

## What it is

An object-relational mapper translates between the objects an application works with and the rows a relational database stores. It generates the queries for loading and saving, tracks which objects have changed, and often provides a query interface in the application language. The abstraction is genuinely useful and it is also genuinely leaky: the two models do not line up, and the places where they do not are where the bugs live.

## Why it matters

Most application code uses an ORM, so most performance and correctness problems in data access appear through one. The mapper saves an enormous amount of repetitive code and it hides three things that matter: when queries are issued, what a relationship traversal costs, and how much data is loaded. A developer who knows where the abstraction leaks can use the mapper for what it is good at and drop to explicit queries where it is not, which is what separates a fast application from one that issues a query per row.

## Core ideas

### The impedance mismatch is real and structural

Objects have identity, references and inheritance; rows have keys, foreign keys and no inheritance. A reference from one object to another becomes a join or a second query; an inheritance hierarchy becomes a discriminator column or several tables. The mapper chooses a translation, and the choice has consequences for query count and shape that the application code does not show.

```text
order.customer.name   -> may be one join, or one extra query per order
```

### Lazy loading is the leak that hurts most

A relationship is typically loaded only when accessed, which is convenient and means a traversal in a loop issues one query per iteration. The code reads like a property access and behaves like a network call, and the resulting N+1 query pattern is the most common performance defect in ORM-based applications. Loading the relationship as part of the original query, or batching, is the remedy.

### The unit of work decides when statements run

A mapper usually tracks changes and flushes them at a boundary. That means a write may be issued later than the line that caused it, outside the application's control, which matters when an explicit transaction or an ordering is required around it. Knowing where the flush happens and what triggers it is what allows the work to be placed inside the transaction deliberately.

Within a session, the mapper returns the same object for the same row and remembers its state. That identity is useful and it means the session must be ended, or the cached objects grow without limit and stale data is reused. The scope of a session — one request, one operation — is a design decision with correctness consequences.

### The query interface is a separate language with its own pitfalls

Many mappers provide a way to build queries in the host language. It is convenient and it can produce exactly the SQL intended, or it can produce one query per item depending on how the results are consumed.

### Escape hatches are part of the design

Every mapper offers a way to run an explicit statement or a hand-written query. Using it for the few operations where the generated query is wrong is not a defeat; it is the correct use of a leaky abstraction. Keeping those escapes in one layer means the rest of the application is unaware of them.

### Schema and code change together, and a migration is required

The mapper's model is a second description of the schema, and the two can disagree. A migration that changes the schema must be accompanied by the model change and a deployment that tolerates both during the transition.

## Practice

### Count the queries a traversal issues

Take a list view that displays a related value for each item, and count how many statements the mapper issues.

Done when: you can say whether the count grows with the number of items and point at the generated statement that repeated.

### Move a flush inside its transaction

Find a place where a change is flushed at a boundary rather than at the line that caused it, and make the write happen inside the transaction that must contain it.

Done when: committing the transaction persists exactly the intended changes and a failure before the commit persists none.

## Common mistakes

- **Traversing a relationship inside a loop** — the code reads as a property access and issues a query per iteration; fix: load the relationship with the original query.
- **Assuming a write happens at the line that caused it** — the flush occurs at a boundary that may be outside the transaction; fix: know the flush point and place it deliberately.
- **Never looking at the generated statement** — the abstraction is trusted blindly; fix: enable statement logging during development and review.
- **Keeping a session alive for too long** — the identity map grows and stale objects are reused; fix: scope the session to one request or operation.
- **Treating the mapper's model as the schema** — a hand-written migration is needed and the model is out of date; fix: keep migrations explicit and the model in step with them.

## Go deeper

- **SQL & Relational Databases** (`backend-data/sql-relational-databases`) — the model this abstraction hides, so read it first.
- **Prisma ORM** (`backend-data/prisma-orm`) — a concrete mapper for Node and TypeScript, and its own version of these leaks.
- **Indexes and query plans** (`backend-data/sql-relational-databases/03-indexes-and-query-plans`) — how to check what the generated statements actually do.
