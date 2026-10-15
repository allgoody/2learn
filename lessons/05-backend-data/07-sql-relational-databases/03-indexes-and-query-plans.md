---
title: Indexes and query plans
prereqs: ["05-backend-data/07-sql-relational-databases/02-queries-and-joins"]
---

## What it is

An index is a separate structure that keeps a column's values in an order that allows the engine to find rows without reading the whole table. A query plan is the engine's description of how it intends to answer a query: which table it reads first, which index it uses, how many rows it expects, and whether it sorts, joins or aggregates. Reading a plan is how you find out why a query is slow.

## Why it matters

Performance problems in a database are almost always one of two things: a query reading far more rows than it needs, or a missing index that would have avoided that. Both are visible in the plan and neither is visible in the query text. Adding an index is cheap; adding the wrong index costs storage, slows every write that must maintain it, and gives a false sense of security. Measuring before and after is what makes the difference.

## Core ideas

### An index turns a scan into a lookup

Without an index, finding rows matching a value means reading every row. An index is ordered, so the engine can find the matching values directly and follow pointers to the rows. For a small table a scan may still be cheaper, which is why the planner sometimes ignores an index deliberately rather than making a mistake.

```text
scan:  read every row, test the condition
index: find the value in order, fetch the matching rows
```

### The order of columns in a composite index determines what it can serve

An index on two columns in a given order supports lookups on the first, or on the first and second together. It cannot efficiently answer a query filtering only on the second. This is why column order in a composite index is a design decision tied to the queries actually being run, and why an unused index is often the right index in the wrong order.

### Covering indexes avoid the table entirely

If the index contains every column the query needs, the engine can answer from the index without fetching the rows. That removes a large share of the cost for a narrow, frequently run query. The trade is a wider index that must be maintained on every write.

### Selectivity decides whether an index helps

An index on a column with few distinct values — a status flag, a boolean — rarely helps, because the lookup returns a large fraction of the table and a scan would be cheaper. Indexes pay off where the condition matches a small proportion of rows. Understanding that is what stops the habit of indexing every column mentioned in a query.

### The plan reports estimated rows, and an estimate can be wrong

The planner chooses based on statistics about value distribution. Stale statistics after a large data change can lead to a bad choice and a suddenly slow query. Comparing the estimate with the actual row count in the plan is how that is diagnosed, and refreshing statistics is the fix.

The suspicious signs are a scan on a large table where a lookup was expected, a sort that could have been avoided by an index, and a nested loop whose inner side is scanned once per outer row. Finding one of those and addressing it is usually most of the improvement.

```text
suspicious:  SCAN on orders (estimated 4,200,000 rows)
expected:    INDEX LOOKUP on orders_status_idx
```

### Every index is a cost on writes and storage

An index must be updated whenever its table changes, so a table with many indexes inserts slowly and occupies more disk. Indexes justified by a query nobody runs are pure cost. Reviewing which indexes are actually used, and removing the rest, is as valuable as adding the ones that are missing.

## Practice

### Read a plan for a slow query

Take a query that filters a large table and read its plan, identifying which access method the engine chose and how many rows it estimated.

Done when: you can say whether a scan or a lookup was used and whether the estimate matched the number of rows returned.

### Add an index and measure twice

Add an index for the query's filter and compare the plan and the measured time before and after.

Done when: the plan shows a lookup rather than a scan and you have recorded the change in rows read, not only in elapsed time.

## Common mistakes

- **Indexing every column in a query** — storage and write cost for indexes that do not help; fix: index the columns the planner can actually use and check the plan.
- **Putting the wrong column first in a composite index** — queries filtering the other column cannot use it; fix: order the columns by how the queries filter.
- **Trusting a plan whose estimates are stale** — the choice was made on outdated statistics; fix: refresh statistics after large changes and compare estimates with actuals.
- **Keeping indexes nobody uses** — every write is slower for no benefit; fix: review usage and remove the unused ones.
- **Reading only elapsed time** — a fast machine hides a query that reads a million rows; fix: compare rows read before and after.

## Go deeper

- **Queries and joins** (`05-backend-data/07-sql-relational-databases/02-queries-and-joins`) — the queries these indexes exist to serve.
- **SQL & Relational Databases** (`05-backend-data/07-sql-relational-databases`) — the engine whose planner produces these plans.
- **Transactions and isolation** (`05-backend-data/07-sql-relational-databases/04-transactions-and-isolation`) — the other half of a database's guarantees, and a frequent cause of unexpected locking.
