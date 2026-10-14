---
title: Versioning, pagination and N+1 responses
prereqs: ["backend-data/restful-api/01-resources-verbs-and-status-codes"]
---

## What it is

The problems that appear once an API has users and data. A published field cannot be removed without breaking somebody, so the interface must be able to change; a collection grows past what can be returned in one response, so it must be paged; and a response that nests related resources tempts the server into issuing one query per parent, so its cost grows with the result. None of these show up on the first day of an API, and all of them are much cheaper to design for early.

## Why it matters

These three account for a large share of the complaints against an API that was correct when it shipped. A breaking change forces every client to update at once, which for a public API is effectively impossible; an unpaged collection eventually times out or exhausts memory; and an endpoint whose query count grows with the number of rows works in testing and falls over in production with the first substantial account. Each is a design decision with a window in which it is cheap.

## Core ideas

### Additive change is safe, subtractive change is not

Adding an optional field or a new endpoint breaks no existing client; removing or renaming a field, changing a type or altering the meaning of a value does. Most of what looks like versioning pressure is really a failure to make changes additive. Where a breaking change is unavoidable, a version in the address or a header gives old clients an unchanged path while new ones move.

```text
add a field            -> safe
make a field required  -> breaking
widen a type            -> safe if old values still mean the same
```

### Deprecation is a schedule, not an announcement

A field to be removed should be marked, documented, monitored for actual use, and only then removed. The monitoring is the part usually skipped, and it is the part that tells you whether anyone would break. Sending deprecation headers and observing traffic for a full cycle of the slowest client is what makes the removal safe.

### Pagination belongs in the response as well as the request

A paged collection should say how to get the next page, and ideally how large the collection is. Offset paging is simple and becomes inaccurate as the underlying data changes, while cursor paging stays stable and is preferable for large or fast-moving collections. The choice matters most where duplicates and skips are unacceptable, such as a feed.

### A page must be bounded, always

An API that accepts an unbounded page size is one request away from exhausting the server's memory. The limit should have a maximum the server enforces rather than one the client promises to respect. This is a one-line decision that prevents an entire class of incident.

### N+1 queries come from the shape of the response

Serialising a list of items and, for each, fetching its related records issues one query per item. It is invisible on ten rows and fatal on ten thousand, and it is a consequence of where the data is loaded rather than of the database. The remedies are to load the related records for the whole page in one query, or to return identifiers and let the client request the related collection separately.

### The response shape is a contract about cost

Including every related object in every response makes one call convenient and makes the endpoint expensive for clients that need only the identifiers. A predictable rule — the collection includes identifiers, the detail includes the object, related collections are their own endpoints — keeps both the payload and the query count under control.

## Practice

### Design a paging contract

Take a collection endpoint and give it a bounded page size, a next-page link and a stated ordering.

Done when: requesting a page larger than the maximum is clamped, and following the next link twice returns every item exactly once even as new items are added.

### Find and fix an N+1 query

Take an endpoint that returns a list with related data and count the queries it issues, then change it to load the related records in one query for the whole page.

Done when: the query count no longer grows with the number of items on the page.

## Common mistakes

- **Removing or renaming a field in place** — every existing client breaks at once; fix: add the replacement, deprecate the old one, monitor its use, then remove.
- **Accepting an unbounded page size** — one request can exhaust the server; fix: enforce a maximum server-side.
- **Offset paging over fast-moving data** — items are skipped or duplicated between pages; fix: use a cursor for unstable collections.
- **Serialising nested data per item** — the query count grows with the page; fix: batch the related load.
- **Returning everything in every response** — payloads and query costs grow together; fix: define what each endpoint includes.

## Go deeper

- **Resources, verbs and status codes** (`backend-data/restful-api/01-resources-verbs-and-status-codes`) — the design rules these failure modes stress.
- **Restful API** (`backend-data/restful-api`) — the style this child is the operational half of.
- **SQL & Relational Databases** (`backend-data/sql-relational-databases`) — the query model that explains why N+1 responses are expensive.
