---
title: Queries and joins
prereqs: ["05-backend-data/07-sql-relational-databases/01-tables-and-relationships"]
---

## What it is

A query selects columns from tables, filters rows, groups them and orders the result. A join combines rows from two tables on a condition, which is how data stored across normalised tables is read back as one result set. The operations compose: a query is a pipeline of stages that can be nested in a subquery or combined with another result using a set operator.

## Why it matters

The join is what makes a normalised schema usable, and it is where the query language's set-based thinking diverges most from ordinary procedural programming. Writing a loop over rows and issuing a query per row produces the same answer and runs thousands of times slower, because the database is designed to combine sets in one pass. Understanding what a join produces — including the multiplication of rows when both sides match several times — is what prevents both wrong results and surprising costs.

## Core ideas

### The query is a pipeline, and the order of stages is fixed

Rows are filtered, then grouped, then having-clauses applied, then selected and ordered. Knowing that grouping happens after filtering explains why an aggregate cannot be used in a where-clause, and knowing that ordering happens last explains why it cannot reduce the number of rows processed. Reading a query as a sequence of set operations rather than as a script removes most confusion.

```text
from -> where -> group by -> having -> select -> order by -> limit
```

### A join matches rows on a condition, and may multiply

An inner join keeps only matching combinations; an outer join keeps unmatched rows from one side with nulls in the other. When one row on the left matches several on the right, the result contains several rows, which is correct and is why a sum over a joined result can exceed the sum over the base table. Recognising that multiplication is the usual explanation for a total that is too large.

### Aggregate functions collapse groups, and nulls need care

Counting, summing, averaging, and taking minimum or maximum all operate per group and produce one row each. The trap is null: an average ignores null values, a count of a column ignores them while a count of rows does not, and comparing anything to null yields null rather than true. Being explicit about which behaviour is wanted prevents totals that are quietly wrong.

### Subqueries and common table expressions make a query readable

A nested query can be used as a value, as a filter or as a table. Naming it with a common table expression turns a deeply nested statement into a sequence of readable steps, and the planner may treat it the same way. This is the standard way to keep a complex query maintainable.

### Set operations combine result sets, not tables

Union, intersection and difference operate on the results of two queries with compatible columns. Union removes duplicates unless it is explicitly told not to, which is a quiet performance and correctness difference. These are the right tool for combining differently sourced rows of the same shape.

### The query you write is not the query that runs

The planner rewrites and reorders, choosing among ways to access each table. That is why a query can be fast or slow depending on statistics and indexes rather than on how it was written, and why the next child — reading the plan — is the way to find out which happened.

## Practice

### Combine three tables into one report

Write a query that lists each order with its customer and the number of items it contains, using joins and grouping.

Done when: the row count matches the number of orders and each item count matches a manual count for one order.

### Find a row-multiplying join

Take a query whose total is larger than expected and explain which join multiplied the rows.

Done when: you can name the one-to-many relationship responsible and describe how to aggregate before joining to correct it.

## Common mistakes

- **Looping over rows and querying per row** — the cost grows with the result size; fix: express the operation as a join or a set-based statement.
- **Assuming a join cannot add rows** — a one-to-many join multiplies the left side; fix: aggregate before joining when the left side must stay one row.
- **Ignoring null semantics** — comparisons return null and aggregates skip values; fix: use explicit null handling and test with null present.
- **Relying on union when duplicates are wanted** — rows are silently removed; fix: use the variant that keeps them.
- **Reading a slow query as a writing problem** — the planner chose a different execution; fix: read the plan before rewriting.

## Go deeper

- **Tables and relationships** (`05-backend-data/07-sql-relational-databases/01-tables-and-relationships`) — the schema these joins read.
- **SQL & Relational Databases** (`05-backend-data/07-sql-relational-databases`) — the language these queries are written in.
- **Indexes and query plans** (`05-backend-data/07-sql-relational-databases/03-indexes-and-query-plans`) — why the same query can be quick or slow.
