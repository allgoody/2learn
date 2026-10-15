## Example 1 — A page size the server enforces

The orders collection returns everything the account owns, and a client has started asking for a very large page. Give the collection a maximum the server enforces, an ordering, and a way to reach the next page, and show the request and the response as the client will see them.

```text
GET /orders?limit=5000

200 OK
[ ... 41,208 orders in one body ... ]        (illustrative)
```

### Solution

```text
GET /orders?limit=5000&order=placed_at,desc
(the server clamps limit to 100)

200 OK
{
  "items": [ ... 100 orders, newest first ... ],
  "next": "/orders?limit=100&cursor=page-3"
}
```

The maximum belongs to the server, so a request asking for 5000 is clamped rather than believed, and no single call can exhaust memory. The ordering is stated because the cursor is only meaningful against it, and following next twice returns each order exactly once even while new orders are arriving — which offset paging could not promise on a moving collection. What usually goes wrong is validating the limit by rejecting the whole request, which breaks the client that was a little optimistic, or leaving it unenforced.

## Example 2 — Two queries instead of fifty-one

The order list now shows each customer's name. The endpoint issues one query for the page and one more per order; the log below is from a page of fifty. Make the query count independent of the number of rows returned.

```text
GET /orders?page=1                       (50 orders, illustrative)
select * from orders order by placed_at desc limit 50;
select * from customers where id = 7;   ... 50 times, one per order
query count: 51
```

### Solution

```text
select * from orders order by placed_at desc limit 50;
select * from customers where id in (7, 9, 12, ...);   one query, for the page
query count: 2
```

Both statements are bounded by the page, so the cost stops growing with the result. The rule that keeps it that way is the response shape: the collection carries identifiers, and a related collection such as an order's items is its own address. What usually goes wrong is building the response item by item and letting each one fetch its related record, which restores the per-item query on the first code path that touches the field.
