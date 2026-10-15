## Example 1 — A handler that survives a second delivery

A queue delivers an order event to a handler that charges the customer and sends a receipt. Queues may deliver the same message more than once, and the platform retries an invocation that failed. The first version is below. Make it safe to run twice, and name the record that proves it did not run twice.

```js
async function handle(event) {
  const order = JSON.parse(event.body);
  await charge(order.customer, order.total);
  await sendReceipt(order.customer, order.id);
}
```

### Solution

```js
async function handle(event) {
  const order = JSON.parse(event.body);
  const first = await seen.putIfAbsent(event.id, { at: event.time });
  if (!first) return { skipped: "duplicate order event" };
  await charge(order.customer, order.total, event.id);
  await sendReceipt(order.customer, order.id);
}
```

`putIfAbsent` writes the event id before any side effect and reports false when the id is already present, so the second delivery charges nothing and sends no receipt; the stored id is the proof. The mistake is recording the work after doing it, because a crash between the charge and the record lets the retry charge again. Key on the event id rather than the order id: the same order may legitimately arrive as two different events.

## Example 2 — A queue in front of a bounded downstream

A function fans out to a downstream service that accepts twenty calls at once. Under a burst the platform throttles invocations rather than queueing them, and the overflow is dropped. The current design is below. Insert the buffer and say what happens to a message that keeps failing.

```text
upload -> function -> 1000 parallel calls -> downstream (limit 20)
                          ^ throttled, overflow dropped
```

### Solution

```text
upload -> queue -> consumer function (at most 20 in flight) -> downstream
                   3 attempts -> dead-letter queue -> alert

burst of 1000: the queue absorbs it; downstream sees at most 20 at once
repeated failure: the message leaves the queue and is visible in the DLQ
```

The queue is the buffer the concurrency limit needs: the burst waits instead of being throttled, and the consumer's configured ceiling keeps the downstream at a rate it can take. A message that fails every attempt lands in a dead-letter queue, where it is visible rather than silently lost. The common mistake is answering a throttled call with more retries, which repeats the same rejected request and still drops the message.
