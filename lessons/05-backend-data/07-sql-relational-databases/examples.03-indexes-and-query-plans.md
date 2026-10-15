## Example 1 — A lookup instead of a scan

The order list filters by customer and sorts by date, and it has been getting slower as the table grew. The plan below is what the engine chose for that query. Identify the access method and write the index that replaces it, then say how you would prove the change.

```text
select id, total from orders
where customer_id = 7 order by placed_at desc limit 20;

QUERY PLAN                                        (illustrative)
 Sort  (rows=4200000)
   ->  Seq Scan on orders  (rows=4200000)
         Filter: (customer_id = 7)
         Rows Removed by Filter: 4199994
```

### Solution

```sql
create index orders_customer_placed_idx
  on orders (customer_id, placed_at desc);

-- equality on customer_id first, then the column that is sorted
```

The engine read every row and discarded almost all of them; the index keeps one customer's orders in the order the query asks for, so it seeks to that customer and reads twenty rows, and the sort stage disappears with them. Prove it by comparing rows read before and after rather than elapsed time, because a fast machine hides a scan on a large table. What usually goes wrong is adding the index and keeping another one that no query can use, which is a cost on every write.

## Example 2 — The index in the wrong order

A composite index was added for the orders screen, and a date-range report still scans the whole table. Write the index the reports can actually use, and say what happens to the one that was added.

```sql
create index orders_status_placed_idx on orders (status, placed_at);

-- the report:
select id, total from orders
where placed_at >= date '2026-01-01'
order by placed_at;
```

### Solution

```sql
create index orders_placed_idx on orders (placed_at);

drop index orders_status_placed_idx;   -- after checking nothing uses it
```

An index on two columns in that order can serve a filter on the first column, or on both together, and cannot efficiently answer the report's filter on the second alone; the status column also has few distinct values, so a lookup on it would return a large share of the table anyway. Reviewing which indexes are still used and removing the rest is as valuable as adding the one that was missing, because each index slows every insert. What usually goes wrong is adding index after index until the planner has something to choose, which costs writes and gives a false sense of safety.
