## Example 1 — The traversal that becomes a query per row

An operations screen lists every open order and emails a reminder to its customer. The code reads like two statements, but the second runs once per order and the screen slows down as the list grows. Remove the repeated statement and show the evidence that it is gone.

```py
orders = session.all("select * from orders where status = 'open'")

for order in orders:
    send_reminder(order.customer.email)
```

### Solution

```py
orders = session.all(
    "select o.id, c.email from orders o"
    " join customers c on c.id = o.customer_id"
    " where o.status = 'open'"
)

for order in orders:
    send_reminder(order.email)

# statement log
# select o.id, c.email from orders o join customers c ... -> 1 statement, 214 rows
```

The relationship is loaded as part of the original query, so the statement count no longer grows with the size of the list; the log line is what proves it, since the code would look much the same either way. Enabling statement logging in development is the habit that finds this class of defect before production does. What usually goes wrong is moving the loop rather than the load — the traversal hides inside a helper or a serialiser, and the extra query appears in a place the screen's code does not mention.

## Example 2 — Moving a write inside its transaction

Placing an order adds the order row, reserves stock and records a ledger entry. The three are meant to succeed or fail together, but the mapper's flush happens before two of them and the commit happens after the function returns. Put the boundary where the code says it is.

```py
def place_order(cart):
    session.add(Order(cart.id))
    session.flush()              # the insert is issued here

    stock.reserve(cart.items)
    ledger.record(cart.total)

# the caller commits much later, after the response has been sent
```

### Solution

```py
def place_order(cart):
    with session.transaction():  # the flush below sits inside this block
        session.add(Order(cart.id))
        session.flush()          # insert issued, not yet committed

        stock.reserve(cart.items)
        ledger.record(cart.total)
    # commit on leaving the block; a failure anywhere above persists none of the three

# the session ends with the request, so the identity map does not outlive it
```

The explicit block means the reservation and the ledger entry cannot be committed without the order, and a failure before the end of the block leaves no partial state. Scoping the session to one request matters for the same reason: a long-lived session reuses stale objects and grows without limit. The thing that usually goes wrong is assuming the flush coincides with the line that caused it, so a transaction is placed around code that has already written.
