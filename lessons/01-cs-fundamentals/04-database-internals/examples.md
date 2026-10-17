## Example 1 — Why one extra column quadrupled the scan

A nightly report selects two narrow columns from a table of two million rows and runs in 400 ms. Someone adds a long description column to the select list, and the same query takes 1.6 s. The database reads the table in pages of 8192 bytes; a row is `id` at 8 bytes plus `status` at 4 bytes, and the description averages 480 bytes. Say why a query four times slower is doing forty-two times the work.

```text
page size 8192 bytes, the fixed unit the database reads from disk

narrow row: id (8) + status (4)                       =  12 bytes
  8192 / 12  = 682.6  -> 682 whole rows fit in one page
wide row:   id (8) + status (4) + description (480)  = 492 bytes
  8192 / 492 =  16.6  ->  16 whole rows fit in one page

2 000 000 rows / 682 rows per page =   2 933 pages to read
2 000 000 rows /  16 rows per page = 125 000 pages to read
125 000 / 2 933 = 42.6, so the wide scan touches about 42 times as many pages

as bytes:   2 933 * 8192 =    24 027 136 bytes =   24 MB, which fits in memory
          125 000 * 8192 = 1 024 000 000 bytes = 1.02 GB, which does not
```

### Solution

```text
the extra column widened the row, so one page holds 682 / 16 = 42 times fewer rows,
and the scan touches 125 000 / 2 933 = 42 times as many pages

the measured times: 400 ms narrow, 1 600 ms wide, and 1 600 / 400 = 4 times slower —
not 42 times, because the two scans are limited by different things:
  narrow, 24 MB:   served from memory once warm, so the 400 ms is row work:
                   2 000 000 rows / 0.4 s = 5 000 000 rows a second
  wide, 1.02 GB:   read from disk, so the 1.6 s is page work:
                   1 024 000 000 bytes / 1.6 s = 640 000 000 bytes a second

fix: select only the columns you need, so the rows stay narrow
fix: let an index cover the query, so the table's pages are never visited at all
```

A database reads fixed-size pages, and every row sharing a page is free once that page has been loaded, so what sets the cost is how many pages the scan touches — 2 933 against 125 000 — and not the row count, which is the same 2 000 000 either way. Widening the row is what moves that number: 12 bytes per row to 492 bytes is 41 times the width, so each page holds 42 times fewer rows. The trap is reading the plan's row estimate and blaming the rows; the page count is what changed.

## Example 2 — The plan that trusted the wrong number

A customer report runs in 30 ms for a small customer and 9 s for one large one. The plan below is what the database chose. Say which number in it is wrong, and give the two things to try first.

```text
Nested Loop  (cost=0.29..412.55 rows=1 width=64) (actual rows=84000)
  ->  Index Scan on customers  (actual rows=1)
        Index Cond: (id = 42)
  ->  Seq Scan on orders  (rows=20) (actual rows=84000)
        Filter: (customer_id = 42)

the plan's own vocabulary:
  rows        = the planner's estimate of how many rows this step returns
  actual rows = how many it really returned
  Nested Loop = run the step below once for every row from the step above
```

### Solution

```text
the estimate for the inner step is 20 rows and the reality is 84 000,
so the estimate is 84 000 / 20 = 4 200 times too low

a nested loop re-runs the inner step once per outer row, so its work is
  outer rows * inner cost
  1 * 84 000 = 84 000 inner runs here, against the 1 * 20 = 20 runs the planner priced
the two timings are that same 20-row estimate meeting two different customers:
  9 000 ms / 30 ms = 300 times the time for 84 000 / 1 = 84 000 times the rows

try: refresh the statistics on orders, then read the plan again
try: index orders.customer_id, so the inner step seeks instead of scanning the whole table
```

A nested loop re-runs the inner step once per outer row, so its cost is the outer count multiplied by the inner cost — fine for twenty rows, ruinous for eighty-four thousand. The wrong estimate made that choice look cheap: the planner priced `1 * 20 = 20` inner runs and got 84 000. Stale statistics are the usual cause after a large load, because the planner still believes the table looks the way it did before. The trap is rewriting the query text: the same statement runs in 30 ms or 9 s depending on the data behind it, so the plan, and the estimate printed in it, is what to read first.
