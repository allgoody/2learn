---
title: Database Internals
type: skill
topic: cs-fundamentals
tier: small
status: drafted
aliases: []
prereqs: ["backend-data/sql-relational-databases"]
related: []
---

## What it is

A database stores data on disk and answers queries about it without losing anything or lying about what it has. Underneath the SQL sit three mechanisms: a storage engine that decides how rows are laid out, an index that finds them without reading everything, and a planner that chooses which index to use. Read the entry on relational databases first if that vocabulary is unfamiliar.

## Why it matters

Query performance is decided here, not in the query text. A missing index turns a lookup into a full scan, and an index the planner refuses to use does the same while looking correct in the schema. Understanding pages and buffers explains why one extra column in a select changes a query from milliseconds to seconds, and why the second run of a query is fast while the first is slow. It also tells you which optimisations are worth attempting and which are wishes.

## Core ideas

### The page is the unit of I/O

Databases read and write in fixed-size pages, often a few kilobytes, not row by row. Every row sharing a page is free once that page is in memory, and every page that does not fit costs a read. Row width therefore matters: wide text columns fit fewer rows per page, so a scan touches more pages. It is also why an index-only scan is fast — the answer is in the index pages and the table is never visited.

```text
page 8192 bytes
rows of 200 bytes -> ~40 rows per page
rows of 800 bytes -> ~10 rows per page   (4x the pages to scan)
```

### B-trees keep order, so ranges are cheap

The default index is a balanced tree of pages, sorted by key, where every leaf is the same distance from the root. Lookup by key follows one path. A range lookup finds the start and walks the leaves in order, which is why one ordered index serves both equality and range queries. Updates are in place, so a write touches a handful of pages — cheap and predictable.

```text
              [ 50 | 100 ]
             /      |      \
     [10|30]    [60|80]    [120|200]
leaves linked left to right -> range scan walks them
```

### Log-structured storage trades reads for writes

Some engines never update a page in place. They append every change to a log, keep an in-memory sorted table, flush it to disk when it grows, and merge the resulting files in the background. Writes become sequential, which disks and flash prefer, and reads may have to check several files. This is the design behind many key-value stores and several modern relational engines; the trade-off is write speed bought with read amplification.

### The planner picks a path, sometimes wrongly

The query planner estimates how many rows each step will produce and chooses the cheapest plan. Those estimates come from statistics that can be stale or too coarse. When the estimate is wrong, the plan is wrong: a nested loop that suits twenty rows is catastrophic for two million. Reading the plan for a slow query is the most useful diagnostic in this layer, because it shows the estimate next to reality.

```text
Seq Scan on orders  (rows=1000000) (actual rows=2)
  Filter: customer_id = 42
```

### Buffers and the write-ahead log

Frequently used pages live in a buffer pool in memory, which is why a warm database is faster than a cold one. A change reaches the log before the data pages, and the log is flushed on commit. If the machine dies, the log replays forward and the database recovers to the last committed state. That is the mechanism behind the word durable, and it is the reason a committed write is slower than a write to a page cache.

## Practice

### Read one query plan

Take a query you run often. Ask the database to explain the plan and find the step with the largest row estimate. Check whether the filtered column is indexed.

Done when: you can say whether the query scans or seeks, and what the planner expected the row count to be.

### Measure an index you created

Pick a filtered column with no index. Record the query time on a table large enough to matter, create the index, and record it again.

Done when: the second measurement is faster and the plan has changed from a scan to an index lookup.

## Common mistakes

- **Adding an index for every column** — writes slow down and the planner has more bad options; fix: index the columns your queries actually filter and order by.
- **Selecting more columns than needed** — wide rows push fewer records per page and defeat covering indexes; fix: name the columns you use.
- **Ignoring stale statistics** — the planner estimates from data that no longer matches; fix: refresh statistics after a large load and check estimates in the plan.
- **Blaming the query text for a bad plan** — the same query can run two ways depending on the data; fix: read the plan before rewriting the query.
- **Assuming commit means the disk has the bytes** — durability depends on the log being flushed and on the storage configuration beneath it; fix: know which guarantee you are relying on before you promise it.

## Go deeper

- **SQL & Relational Databases** (`backend-data/sql-relational-databases`) — the query language and modelling this entry sits underneath, and the right place to start.
- **Operating Systems** (`cs-fundamentals/operating-systems`) — pages, buffers and flushes are this layer wearing a database's clothes.
- **Data Structures** (`cs-fundamentals/data-structures`) — the tree and the log are the two shapes every storage engine chooses between.
