---
title: Tables and relationships
prereqs: ["backend-data/sql-relational-databases"]
---

## What it is

A table is a collection of rows with the same columns, each column having a declared type. A primary key identifies a row uniquely; a foreign key is a column whose values must exist as a key in another table. Relations are expressed by storing a key value rather than by nesting one row inside another, which is what makes the model both compact and enforced.

## Why it matters

Declared types and constraints push correctness into the store, where every writer must satisfy them. An application that validates an email format in three code paths will eventually miss one; a column that is declared not-null and a key that must reference an existing row cannot be violated by any path, including a migration script run by hand. That single property — correctness enforced at the point of storage — is the reason to prefer this model for data that has rules.

## Core ideas

### A row is a fact; a column is an attribute of that fact

Each row should describe one thing, and each column one attribute of it. A table mixing two kinds of thing cannot be constrained cleanly, because a constraint that applies to one kind also applies to the other. Splitting it is what allows a column to be not-null for all rows rather than merely for the rows where it is meaningful.

```text
customers: id, email, created_at
orders:    id, customer_id -> customers.id, total, placed_at
```

### The primary key identifies a row for the life of the database

A natural key such as an email address looks convenient and changes when the customer changes it, which forces updates through every relationship. A generated identifier never changes meaning, so references stay valid. Where a natural value must be unique, declare it as an additional unique constraint rather than as the identifier.

### Foreign keys are the relationship, and the engine enforces them

Storing a related row's key expresses the relationship; declaring it as a foreign key makes the engine refuse a value that does not exist. The same declaration can specify what happens when the referenced row is deleted — refusing, cascading or nulling the reference — which is a real design decision about what the data means.

### Normalisation removes duplicated facts, and denormalisation is a measured exception

Storing the customer's name on every order means a rename must update all of them and any missed copy is now wrong. Keeping it in one place removes the anomaly. Deliberately duplicating a value to avoid a join is a legitimate optimisation once a query is measured to need it, and the duplication should be recorded so a later reader knows it is intentional.

### Constraints are documentation the database enforces

Not-null, unique, check and foreign-key constraints describe the rules of the domain in a place every writer must obey. An application-level check is a convention; a declared constraint is a guarantee. Where a rule matters, expressing it as a constraint removes the possibility of a code path that forgets.

Choosing a numeric type for money, a fixed-precision decimal rather than a binary float, and a date type rather than a formatted string all prevent classes of error. The wrong type is often invisible until arithmetic, comparison or time zone handling produces a result nobody expected.

### Keys are also the connection to performance

A primary key is usually also the physical ordering of the rows and the structure every lookup uses, so its choice affects both storage and speed. This is the point where the modelling decision and the performance decision meet, and it is why the next two children build on this one.

## Practice

### Model a small domain with constraints

Design tables for customers, orders and order items with primary keys, foreign keys, appropriate types and at least one uniqueness constraint.

Done when: attempting to insert an order for a nonexistent customer is refused by the database, not by the application.

### Remove a duplicated fact

Find a table that repeats an attribute belonging to another table and move it to its owner.

Done when: updating the attribute once changes what every reader sees, and no query returns a stale copy.

## Common mistakes

- **Using a mutable natural key as the primary key** — every reference must change when the value changes; fix: use a generated identifier and add a unique constraint on the natural value.
- **Omitting foreign keys** — orphaned rows accumulate and nothing stops them; fix: declare the relationship and choose the delete behaviour deliberately.
- **Storing money or dates in loosely typed columns** — arithmetic and comparison go wrong in ways that are hard to trace; fix: choose types that express the value.
- **Validating only in the application** — some code path eventually skips the check; fix: express the rule as a constraint.
- **Duplicating data without recording why** — a later reader treats it as a bug, or trusts it as the truth; fix: comment the reason and keep one authoritative copy.

## Go deeper

- **SQL & Relational Databases** (`backend-data/sql-relational-databases`) — the model these tables are the unit of, so read it first.
- **Queries and joins** (`backend-data/sql-relational-databases/02-queries-and-joins`) — how these related tables are read back together.
- **Database Design** (`backend-data/database-design`) — the discipline of choosing these tables for a real application rather than an exercise.
