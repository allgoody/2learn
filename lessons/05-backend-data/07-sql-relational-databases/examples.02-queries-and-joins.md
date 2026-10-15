## Example 1 — Three tables, one report

The report needed is every order with its customer's email address and the number of items the order holds. The draft fetches the orders and then counts the items of each one with a second query. Write it as one statement that joins and groups, and say why the row count must equal the number of orders.

```sql
select id, customer_id from orders;
-- then, once for each row returned:
select count(*) from order_items where order_id = 42;
```

### Solution

```sql
select o.id,
       c.email,
       count(i.id) as item_count
from orders o
join customers c on c.id = o.customer_id
left join order_items i on i.order_id = o.id
group by o.id, c.email
order by o.id;
```

The database combines the three sets in one pass instead of returning to it once per order. The outer join keeps an order that has no items, and counting the item's own column returns zero for it rather than one, because a count of a column ignores nulls while a count of rows does not. What usually goes wrong is `count(*)`, which counts the placeholder row of the outer join and reports one item for an empty order.

## Example 2 — The total that got multiplied

A refund total came out three times too large. The query joins orders to their items and then sums; the result below is what the join produced for one order. Name the relationship that multiplied the rows, then write the statement that aggregates before joining.

```text
select o.id, o.total, i.price from orders o
join order_items i on i.order_id = o.id
where o.id = 42;                                 (illustrative)

 id | total | price
 42 | 90.00 | 30.00
 42 | 90.00 | 30.00
 42 | 90.00 | 30.00
```

### Solution

```sql
-- the many side is reduced to one row per order before the join
select o.id, o.total, t.items_total
from orders o
join (select order_id, sum(price) as items_total
      from order_items
      group by order_id) t on t.order_id = o.id;
```

The subquery returns one row per order, so joining it cannot repeat an order, and the two totals now agree. The draft selected the right columns and summed the wrong one: a one-to-many join repeats each order once per item, which is correct behaviour and the usual explanation for a figure that is too large. What usually goes wrong is dividing by the item count, which is wrong as soon as one order has a different number of items from another.
