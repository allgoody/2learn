---
title: Database Internals
type: skill
topic: 01-cs-fundamentals
tier: small
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

A database stores data on disk and answers queries about it without losing anything or lying about what it holds: a committed write survives a crash, and a query returns what was committed. Underneath the SQL sit three mechanisms — a storage engine that decides how rows are laid out, an index that finds them without reading everything, and a planner that chooses which index to use. Read the entry on relational databases first if that vocabulary is unfamiliar.

## Why it matters

Query performance is decided here, not in the query text. A missing index turns the lookup of one row into a scan of the table: the rows average 492 bytes — an 8-byte id, a 4-byte status and a 480-byte description — so a page of 8192 bytes holds 8192 / 492 = 16 of them, and 2 000 000 rows are 2 000 000 / 16 = 125 000 pages to read: 125 000 × 8192 = 1 024 000 000 bytes, 1.02 GB, about 1.6 s of disk time. An index reaches the same row in a few page reads rather than 125 000, but an index the planner refuses to use leaves you paying for the scan while the schema looks correct. Understanding pages and buffers explains why one extra column in a select list changes a query from 400 ms to 1.6 s, and why the second run of a query is fast while the first is slow. It also tells you which optimisations are worth attempting and which are wishes.

## Core ideas

### The page as the unit of I/O

A database reads and writes in fixed-size pages, 8192 bytes in the arithmetic here, never row by row, and each read brings the whole page and everything sharing it. Every row on a loaded page is free, and every page that is not loaded costs one read, so a scan's cost is set by its page count and not by its row count. The rows used throughout this entry are 12 bytes narrow — an 8-byte `id` and a 4-byte `status` — so 8192 / 12 = 682 whole rows fit on one page, and the same rows widened by a 480-byte description to 492 bytes fit 8192 / 492 = 16: 2 000 000 rows are 2 000 000 / 682 = 2 933 pages in the first case and 2 000 000 / 16 = 125 000 in the second, which is 125 000 / 2 933 = 42.6 times the pages for 492 / 12 = 41 times the width. Row width therefore matters, and so does the index-only scan, where the answer comes out of the index pages and the table is never visited at all.

```text
page = 8192 bytes, the unit the engine reads and writes

narrow row  id 8 + status 4             =  12 bytes -> 8192 /  12 = 682 whole rows per page
wide row    id 8 + status 4 + text 480  = 492 bytes -> 8192 / 492 =  16 whole rows per page

2 000 000 rows / 682 rows per page =   2 933 pages to read
2 000 000 rows /  16 rows per page = 125 000 pages to read

125 000 / 2 933 = 42.6 times the pages, for 492 / 12 = 41 times the row width
```

### The B-tree index

An index is a tree of pages sorted by key, with every leaf the same distance from the root, so a lookup by key follows one path from the root down to a leaf. That path is as long as the tree is tall, and the height grows with the number of children a page can hold: if one page holds 256 keys and pointers, then one level addresses 256 keys, two levels 256² = 65 536, and three levels 256³ = 16 777 216, which covers our 2 000 000 rows — so a lookup reads at most 3 pages instead of the 125 000 a scan reads. A range query finds its first key along that path and then walks the linked leaves in key order, which is why one ordered index serves both equality and ranges. Updates happen in place, so a write touches the pages on one root-to-leaf path: cheap and predictable.

```text
          [ 50 | 100 ]
         /      |      \
   [10|30]   [60|80]   [120|200]
leaves linked left to right, so a range scan walks them in key order

fan-out: one page holds 256 keys and pointers
  height 1: 256^1 =            256 keys
  height 2: 256^2 =         65 536 keys
  height 3: 256^3 =     16 777 216 keys, and 16 777 216 >= 2 000 000 rows
so any key of a 2 000 000-row table is 3 page reads away, against 125 000 for the scan
```

### Log-structured storage

Some engines never update a page in place. They append every change to a log, keep an in-memory sorted table in front of the log, write that table out when it fills, and merge the resulting files in the background, where a key's newest version wins over its older copies. Writes become sequential appends, which disks and flash both prefer, and reads may then have to check one file per older copy of the key. The trade is write speed bought with read amplification, and it is the design behind many key-value stores and several modern relational engines.

```text
change k -> v1:  append to the log, put k -> v1 in the in-memory table
change k -> v2:  append to the log, overwrite inside the table: now k -> v2
table full:      write it out as file 1, sorted by key, and trim the log
change k -> v3:  append to the log, put k -> v3 in a fresh table
table full:      write file 2; a background merge rewrites file 1 and file 2 as one

a read of k checks the new table, then file 2, then file 1:
  3 places to look until the merge finishes, 1 afterwards
cost of one change: 1 append, in order, however many files the table has
```

### Plans and estimates

The planner estimates how many rows each step of a query returns, prices the possible orders of those steps, and takes the cheapest. Its estimates come from statistics that can be stale or coarse, and an error in either direction buys the wrong plan: a step the planner believes returns 1 000 000 rows looks far too expensive to run first, so a better order is never tried, while a step it believes returns 20 rows looks cheap enough to re-run per outer row. Reading the plan of a slow query is the most useful diagnostic in this layer, because the plan prints the estimate beside the reality.

```text
Seq Scan on orders  (rows=1000000) (actual rows=2)
  Filter: (customer_id = 42)

rows        = the planner's estimate for this step: 1 000 000
actual rows = what the step really returned: 2
the estimate is 1 000 000 / 2 = 500 000 times too high

the same error the other way, in a nested loop that re-runs its inner step once per
outer row: priced at 20 outer rows and given 84 000, it runs 84 000 / 20 = 4 200 times
more often than the plan priced, and 20 rows against 84 000 is the whole of the
difference between 30 ms and 9 s
```

### Buffers and the write-ahead log

Frequently used pages live in a buffer pool in memory, which is why a warm database is faster than a cold one: the 2 933 pages of the narrow scan above are 2 933 × 8192 = 24 027 136 bytes, 24 MB, small enough to stay resident, so a second run of that query reads memory instead of disk. A change reaches the log before the data pages, and the log is flushed when the transaction commits, so a crash can lose data pages but never a committed change. On restart the engine replays the log forward to the last commit record, which is the mechanism behind the word durable — and it is why a committed write is slower than a write into a page cache, because one append and one flush have to reach the disk before the commit returns.

```text
the narrow scan above: 2 933 * 8192 = 24 027 136 bytes = 24 MB
a 256 MB buffer pool holds all of it, so a second run reads no data pages at all

commit: 1. append the change to the log   2. flush the log   3. reply to the client
crash:  replay the log forward to the last flushed commit record
```

## Practice

### Read one query plan

Take a query you run often. Ask the database to explain the plan and find the step whose row estimate is largest, then check whether the column it filters on is indexed.

Done when: you can say whether the query scans or seeks, quote the step's estimate against the rows it actually returned, and explain the ratio — `1 000 000 / 2 = 500 000` means the planner priced that step 500 000 times too highly.

### Measure an index you created

Pick a filtered column with no index, on a table large enough to matter: at 682 rows per page, 2 000 000 narrow rows are 2 933 pages. Record the query time, create the index, and record it again.

Done when: the plan has changed from a scan to an index lookup, and you can state both timings and why a tree 3 levels deep reads 3 pages where the scan reads 2 933.

## Common mistakes

- **Adding an index for every column** — each index is one more tree to maintain on every write, so ten indexes turn one insert into eleven page updates; fix: index only the columns your queries filter and order by.
- **Selecting more columns than needed** — wide rows fit fewer rows per page, 8192 / 12 = 682 against 8192 / 492 = 16, and the scan touches 42 times as many pages; fix: name the columns you use.
- **Ignoring stale statistics** — the planner estimates from data that no longer matches the table, and a 20-row estimate for 84 000 rows makes a nested loop look cheap; fix: refresh statistics after a large load and check the estimate printed in the plan.
- **Blaming the query text for a bad plan** — the same statement can take 30 ms or 9 s depending on the data behind it; fix: read the plan before rewriting the query.
- **Assuming commit means the disk holds the bytes** — durability depends on the log being flushed and on the storage below it, one append and one flush per commit; fix: know which guarantee you are relying on before you promise it.

## Go deeper

- **SQL & Relational Databases** (`05-backend-data/07-sql-relational-databases`) — the query language and modelling this entry sits underneath, and the right place to start.
- **Operating Systems** (`01-cs-fundamentals/15-operating-systems`) — pages, buffers and flushes are this layer wearing a database's clothes.
- **Data Structures** (`01-cs-fundamentals/02-data-structures`) — the tree and the log are the two shapes every storage engine chooses between.
