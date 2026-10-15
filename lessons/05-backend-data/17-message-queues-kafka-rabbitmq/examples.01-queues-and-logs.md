## Example 1 — A queue for the charge, a log for the event

Two workloads arrive together: a task that must charge one order's card exactly once, and an event three systems react to, with a fourth joining next month. Choose a model for each and name the property that decides it.

```text
workload A: charge the card for order 8842, once.
workload B: order.placed events that billing, analytics and fulfilment each react to.
```

### Solution

```text
A -> queue
  [charge order 8842] -> one consumer -> acknowledged -> gone
  a second consumer re-reading the task is not required and would double-charge.

B -> log, retained
  [order.placed 8841][order.placed 8842][order.placed 8843] ...
  billing reads from position 120, analytics from 98, fulfilment from 141
  the fourth system starts at 0 next month and replays what it missed.
```

The deciding property is whether anyone needs to read the item again: an acknowledgement ends a queue message, while a log keeps the record and gives each consumer a position. The task is addressed to whoever is available; the event is a fact several readers consume at their own pace. What usually goes wrong is choosing a queue because it is the simpler mental model, and discovering later that the history a new consumer needed was acknowledged away.

## Example 2 — The same event delivered twice

The order-placed handler sets the order to paid and sends a receipt. The broker redelivers whenever an acknowledgement is lost, so the same event can arrive twice and two receipts are sent. Make the second processing harmless by recording the message identifier before applying the effect.

```js
async function onOrderPlaced(msg) {
  await db.query("update orders set status = 'paid' where id = $1", [msg.orderId]);
  await mailer.send(msg.customerEmail, "receipt");
}
// a lost acknowledgement brings the same message again: two receipts.
```

### Solution

```js
async function onOrderPlaced(msg) {
  const first = await db.query(
    "insert into processed_messages (message_id) values ($1) on conflict do nothing",
    [msg.id]
  );
  if (first.rowCount === 0) return;         // this event was already handled

  await db.query("update orders set status = 'paid' where id = $1", [msg.orderId]);
  await mailer.send(msg.customerEmail, "receipt");
}
// the consumer position is committed after the work, so a crash replays the
// message rather than losing it.
```

Redelivery is normal in any broker that guarantees no loss, so the handler must be safe to run twice, and the recorded identifier stops the second run before the receipt. Committing the position after the work accepts duplicates in exchange for ruling out loss. The usual mistake is making the handler idempotent for the database write but not for the side effect that leaves the system.
