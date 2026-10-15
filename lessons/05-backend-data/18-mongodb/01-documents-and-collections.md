---
title: Documents and collections
prereqs: ["05-backend-data/18-mongodb"]
---

## What it is

A document is a nested structure of fields and values, addressed by a key, stored in a collection alongside other documents of broadly similar shape. A query selects documents by matching field values, optionally using an index on the field. A write is atomic within one document, so a change to several fields of one record happens all at once.

## Why it matters

The model removes two things application code usually does by hand. Reading a nested record with its lines, addresses and tags is one operation rather than several with a join or several round trips. And a change to one record's fields is atomic without an explicit transaction, which is the common case in an application that updates one entity at a time. Both properties come from the document being the unit, and understanding that is what tells you when the model stops helping.

## Core ideas

### The document is the unit of atomicity

Everything inside one document changes together or not at all, without a transaction. Everything outside it does not. This single fact decides most design questions: data that must change together belongs in one document, and data that does not may be spread across several.

```text
one document: order with its items     -> one atomic update
two documents: order, its audit trail  -> two writes, not atomic together
```

### Embedding keeps a record whole, at the cost of a bounded size

Nesting a related structure inside its parent means one read returns the whole thing, which is why an address or an order's lines belong there. The costs are that the parent grows, that there is a maximum document size, and that querying the nested data for its own sake is awkward. The rule is to embed what is read with the parent and is bounded in number.

### Referencing moves the relationship into application code

Storing another document's identifier instead of its contents keeps the documents small and avoids duplication, but reading the related data now requires a second query, and enforcing the reference requires the application. This is the join the relational engine used to perform, and it has moved. Referencing is right when the related data is large, shared or updated independently.

### Indexes and queries are the store's own language

A query matches fields and can use an index if one exists for the fields and order in question. Without an index the collection is scanned, which is the same cost as a table scan. Because the query interface is not the standard one, the habits of reading a query plan and checking which index is used still apply, but the tools and the vocabulary differ.

### Projection controls payload as well as cost

A query may return only selected fields, which reduces the bytes sent and the work of deserialising. For a document with several large embedded structures, returning the whole thing for a single field is a real cost. Requesting only what the caller needs is the same discipline as selecting columns.

### Updating nested fields needs a path and an operator

A write can replace the document, change a specific nested field, or push to and pull from an array. The operators exist so that two concurrent updates to different fields of the same document do not overwrite each other wholesale. Replacing the document instead is the common source of lost updates.

## Practice

### Decide embed or reference

Take three relationships — an order's lines, a user's address, and a user's organisation — and decide for each whether to embed or reference, giving the reason.

Done when: each decision names whether the related data is bounded, shared and updated independently.

### Show why nested updates need operators

Read a document into your program, modify one nested field and write the whole document back while another session modifies a different field.

Done when: you can describe the update that was lost and the operator that would have prevented it.

## Common mistakes

- **Embedding an unbounded list** — the document grows without limit and hits the size ceiling; fix: reference the related documents once the count is not bounded.
- **Replacing a whole document to change one field** — a concurrent update to another field is lost; fix: use the operator that changes just that path.
- **Assuming a write is atomic across documents** — it is not, without a transaction; fix: keep data that must change together in one document.
- **Querying a field with no index** — the collection is scanned; fix: add the index and check the plan.
- **Returning the whole document for one field** — payload and work grow with the embedded data; fix: project only the fields needed.

## Go deeper

- **MongoDB** (`05-backend-data/18-mongodb`) — the store this model belongs to, so read it first.
- **Schema design in a schemaless store** (`05-backend-data/18-mongodb/02-schema-design-in-a-schemaless-store`) — how these modelling decisions are made for a whole collection.
- **Documents and collections** (`05-backend-data/18-mongodb/01-documents-and-collections`) — this child, as the foundation of the next one.
