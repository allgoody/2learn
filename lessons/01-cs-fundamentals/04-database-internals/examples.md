## Example 1 — Why one extra column quadrupled the scan

A nightly report selects two narrow columns from a table of two million rows and runs in 400 ms. Someone adds a long description column to the select list, and the same query takes 1.6 s. The arithmetic below uses an 8192-byte page.

```text
page size 8192 bytes

narrow row: id (8) + status (4)                   = 12 bytes  -> ~680 rows/page
wide row:   id (8) + status (4) + description 480 = 492 bytes -> ~16 rows/page

2 000 000 rows at 680/page = ~2 940 pages to read
2 000 000 rows at  16/page = ~125 000 pages to read
```

### Solution

```text
the extra column widened the row, so each page holds far fewer rows and
the scan touches about 42 times as many pages.

fix: select only the columns you need, so the rows stay narrow
fix: let an index cover the query, so the table pages are never visited
```

A database reads fixed-size pages, and every row sharing a page is free once it is loaded, so what matters is how many pages the scan touches. Widening the row fits fewer rows per page, and the page count rises far faster than the row count suggests. The trap is reading the row estimate and blaming the rows: the page count is what moved.

## Example 2 — The plan that trusted the wrong number

A customer report runs in 30 ms for a small customer and 9 seconds for one large one. The plan below is what the database chose. Say which number is wrong, and give the two things to try first.

```text
Nested Loop  (cost=0.29..412.55 rows=1 width=64) (actual rows=84000)
  ->  Index Scan on customers  (actual rows=1)
        Index Cond: (id = 42)
  ->  Seq Scan on orders  (rows=20) (actual rows=84000)
        Filter: (customer_id = 42)
```

### Solution

```text
the estimate is 20 rows; the reality is 84 000. A nested loop suits 20
rows and is ruinous for 84 000.

try: refresh the statistics on orders and re-read the plan
try: index orders.customer_id, so the inner step seeks per outer row
```

A nested loop re-runs the inner step once per outer row, so its cost is the outer count multiplied by the inner cost — fine for twenty rows, catastrophic for eighty-four thousand. The wrong estimate made that choice look cheap; stale statistics are the usual cause after a large load. An index on the join column makes the inner step cheap either way. The trap is rewriting the query text: the same statement runs fast or slow depending on the data behind it.
