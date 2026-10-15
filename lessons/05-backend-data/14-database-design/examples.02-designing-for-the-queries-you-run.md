## Example 1 — Indexes derived from the query list

Before adding anything, the team writes down the four reads the orders feature performs. The orders table carries no index beyond its primary key. Name the index each query needs, and say which query no index on this table can serve.

```text
1. the account page: one customer's orders, newest first
2. "find my order": one order by the identifier in the confirmation message
3. the warehouse screen: open orders for one warehouse, oldest first
4. the monthly report: revenue totalled per product across all orders
```

### Solution

```sql
create index orders_customer_recent on orders (customer_id, placed_at desc);
create unique index orders_public_id on orders (public_id);
create index orders_warehouse_open on orders (warehouse_id, placed_at)
  where status = 'open';
-- query 4 is answered from a summary table refreshed nightly, not by an index.
```

Each index names the query that pays for it, and the ordering column is included so the sort is not a separate step. The report is the query no index can help: it aggregates across every order, so the answer is a summary table written on a schedule rather than derived on every read. What usually goes wrong is adding one index per column mentioned anywhere in these queries and then paying for all of them on every insert.

## Example 2 — Two changes that do not earn their cost

Two changes are proposed after the feature ships: a stored total on the customer row and an index on order status. One is justified by measurement, the other is not. Decide each on the evidence given.

```text
proposal A
  alter table customers add column orders_total numeric not null default 0;
proposal B
  create index orders_status_idx on orders (status);

evidence
  the account page reads a customer's total on every request   (measured)
  the open-orders screen filters by warehouse and status        (measured)
  no query filters by status alone                              (found none)
```

### Solution

```sql
-- A: kept, because a measured read needs it, and named as derived
alter table customers add column orders_total_derived numeric not null default 0;

-- B: dropped, because no query needs it
drop index orders_status_idx;
```

The stored total removes an aggregation from the most frequent read, so it earns the obligation to keep it correct on every write, and the `_derived` suffix stops a later reader treating it as the source of truth. The status index has no query behind it, so it only adds work to every insert, while the open-orders query is already served by its own compound index. The mistake is keeping both: an unjustified index costs every insert, and an unlabelled derived column is quietly trusted.
