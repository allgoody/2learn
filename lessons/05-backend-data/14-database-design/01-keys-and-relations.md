---
title: Keys and relations
prereqs: ["05-backend-data/14-database-design"]
---

## What it is

Choosing what identifies each row and how the tables refer to one another. A primary key is the row's identity for as long as the row exists; a foreign key is a reference that the engine can enforce; a unique constraint records which natural values must not repeat. Together they are the skeleton of the schema, and most later problems either come from them or are protected by them.

## Why it matters

A key choice is effectively permanent. Changing a primary key after a table has grown means rewriting the table and every reference to it, usually with downtime. A natural key such as an email address or an order number looks convenient until the value has to change, at which point the change propagates into every table that stored it. The decisions made here also determine whether relationships are enforced by the database or merely assumed by the application.

## Core ideas

### A generated identifier is a stable identity

An arbitrary value that carries no meaning cannot be invalidated by a business change, so references to it stay valid. Integers are compact and orderable; random identifiers avoid collisions across systems and hide record counts, at the cost of size and locality. Either is defensible; a mutable business value as the primary key is not.

```text
id           bigint generated     -> compact, sequential
public_id    uuid generated        -> opaque, safe to expose
email        text unique          -> constrain unique, do not identify with it
```

### Expose an identifier that is safe to expose

If the primary key is a sequential integer, it is a useful identifier internally and a bad one in a URL: it reveals volume and invites enumeration. A separate opaque public identifier keeps the internal key out of the interface and allows it to change without affecting clients. This is a small design addition that removes an entire category of concern.

### Every relationship has a shape, and the shape decides the schema

A one-to-many relationship puts a foreign key on the many side. A many-to-many relationship needs a table of its own, whose primary key is usually the pair of references, and which gives a natural place for attributes of the relationship itself. Recognising which shape is present is most of the modelling work.

```text
one customer -> many orders        orders.customer_id
many orders  <-> many products     order_items(order_id, product_id, quantity)
```

### Enforce the relationship, then decide what deletion means

A declared foreign key stops a reference pointing at a nonexistent row. The same declaration says what happens when the referenced row is deleted: refuse, delete the dependents, or clear the reference. Each expresses a different meaning — an order line without its order is meaningless, a customer without orders is meaningful — and choosing it at declaration time is clearer than handling it in code.

### Natural uniqueness belongs in a constraint, not in a check

An email address must be unique; the place to say so is a unique constraint, because it holds under concurrency. Two application threads that both check and then both insert will produce a duplicate regardless of how careful the check is. The constraint converts a race into an error the application can handle.

### Composite keys are useful and easy to get wrong

A table expressing a many-to-many relationship is naturally identified by its pair of references, and that pair also prevents duplicate rows. The order of columns in that key and in any index on it decides which lookups are fast, so the key is doing double duty as identity and as access path. Where the two aims conflict, it is worth adding a separate identifier and indexing the pair explicitly.

## Practice

### Choose keys for three tables

Design keys for a customer, an order and an order line, deciding for each whether the identity is generated or natural and whether a separate public identifier is needed.

Done when: you can state which value could ever change and confirm that no reference depends on it.

### Express a many-to-many relationship

Model products and tags so that a product may have many tags and a tag many products, with no duplicate pairing.

Done when: inserting the same product and tag twice is refused by the database, and a tag with no products can still exist.

## Common mistakes

- **Using a mutable business value as the primary key** — every reference breaks when it changes; fix: use a generated identifier and constrain the business value as unique.
- **Exposing a sequential key in a public interface** — volume is revealed and records can be enumerated; fix: use a separate opaque identifier.
- **Storing a many-to-many relationship as a list in one row** — queries and constraints become awkward; fix: add a join table.
- **Checking uniqueness in application code only** — concurrent inserts produce duplicates; fix: declare the unique constraint.
- **Leaving relationships unenforced** — orphaned rows accumulate; fix: declare foreign keys and choose the delete behaviour deliberately.

## Go deeper

- **Database Design** (`05-backend-data/14-database-design`) — the discipline these decisions are part of, so read it first.
- **Designing for the queries you run** (`05-backend-data/14-database-design/02-designing-for-the-queries-you-run`) — how these keys and relations become fast access paths.
- **Tables and relationships** (`05-backend-data/07-sql-relational-databases/01-tables-and-relationships`) — the engine features these decisions use.
