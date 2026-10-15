---
title: Schema design in a schemaless store
prereqs: ["05-backend-data/18-mongodb/01-documents-and-collections"]
---

## What it is

Designing a document collection means deciding which fields belong together in one document, which relationships are embedded and which are referenced, what indexes the queries will need, and what shape the documents are allowed to take. The store accepts anything, so the design exists in the reading code — and writing it down is what stops a collection accumulating a dozen variants of the same record.

## Why it matters

A schemaless store does not remove the schema; it removes the enforcement. Every field that a reader assumes is a decision that was made and can change without notice. The result of leaving it implicit is a collection where a field is sometimes a string, sometimes a number, sometimes absent, and every piece of code handles the cases it has seen. Defining the shape and validating it at the boundary is far cheaper than repairing that later.

## Core ideas

### Design for the reads, then for the writes

Unlike a relational schema, which is organised around the entities, a document design starts from how the data will be read. A record that is always fetched whole should be one document; one whose parts are queried separately should be split. The unit of atomicity then follows from the read pattern rather than the other way around.

```text
always read whole     -> one document with embedded parts
parts queried separately -> separate collections, referenced
```

### Embedding and referencing are a bounded-size decision

Embedding a related structure is right when the number of related items is bounded and the data is read with its parent. Referencing is right when the related set can grow without limit, is shared between parents, or is updated on its own schedule. The maximum document size makes the first rule a hard constraint rather than a preference.

### Fields should be validated at the boundary and versioned

A document should carry a schema version so that a reader can tell what it is looking at, and the application should reject writes that do not match the current shape. This makes a change to the shape a deliberate migration rather than an accident, and it lets old and new documents coexist during a rollout instead of requiring a single cutover.

### Indexes are built from the queries, and a query without one scans

Every query pattern a collection must support needs a matching index, including the sort order the query uses. Because queries are written in the store's own language, the plan-reading habit still applies: check which index was used and whether the collection was scanned. An index added for a query nobody runs is pure cost.

### Denormalised copies are correct, but must be maintained

Duplicating a value into a document so a read does not need a second query is a legitimate design, and it means every write to the source must update the copies. If that maintenance is forgotten, the copies drift and there is no engine to notice. Where such a copy exists, it should be named as a copy so a later reader knows to look for the update path.

### A collection should hold one kind of thing

Because the store accepts heterogeneous documents, it is tempting to put several entity types in one collection and filter by a type field. This complicates every index and every read, and it loses the ability to describe what the collection contains. One entity type per collection keeps queries and indexes simple, at the cost of more collections.

## Practice

### Design a collection for one entity

Take an entity with a bounded nested part and an unbounded related set, and write the document shape, the indexes the queries need, and the schema version field.

Done when: every query you intend to run has an index and the unbounded part is referenced rather than embedded.

### Add a shape check and a version

Take a write path and add validation of the document shape plus a schema version field, then describe how an old document is read.

Done when: a malformed write is rejected at the boundary and a document written before the change still reads correctly.

## Common mistakes

- **Designing around entities instead of reads** — the common read requires several round trips; fix: start from the access pattern.
- **Embedding a list that can grow without bound** — the document exceeds the size ceiling; fix: reference it and fetch it separately.
- **Treating the missing schema as no schema** — readers cope with every historical shape; fix: validate the shape and record a version.
- **Duplicating a value without an update path** — the copy silently drifts and no engine enforces it; fix: name the copy and maintain it on every write to the source.
- **Putting several entity types in one collection** — indexes and queries become conditional; fix: one kind of document per collection.

## Go deeper

- **Documents and collections** (`05-backend-data/18-mongodb/01-documents-and-collections`) — the model these design rules are applied within.
- **MongoDB** (`05-backend-data/18-mongodb`) — the store this schema belongs to.
- **Database Design** (`05-backend-data/14-database-design`) — the same discipline in a relational setting, where the engine enforces more of it.
