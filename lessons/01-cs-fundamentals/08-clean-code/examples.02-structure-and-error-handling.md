## Example 1 — A failure that reached the customer as a zero

The function below charges a card and falls back to a zero total when the gateway fails. The trace is what the operator saw. Say what the customer received, then rewrite the failure path so the cause survives.

```ts
async function charge(order) {
  try {
    return await gateway.charge(order);
  } catch (e) {
    console.log("charge failed");
    return { total: 0, status: "ok" };
  }
}

trace:
  gateway.charge(order) -> 502 from the provider
  log line: "charge failed"
  caller: order #4471 confirmed for 0.00
```

### Solution

```ts
async function charge(order) {
  try {
    return await gateway.charge(order);
  } catch (cause) {
    throw new PaymentFailed(`charge failed for order ${order.id}`, { cause });
  }
}
```

A zero total with an `ok` status is a plausible value for a broken operation, so the failure continues disguised as data and surfaces two systems later as a wrong invoice. Rethrowing with the order id and the original cause attached keeps the detail where only this layer has it, and lets the caller decide whether to retry or abandon. The trap is that the catch was written to keep the request alive: the intent was resilience, and the effect was to make a failure look like a success.

## Example 2 — Guards instead of four levels of nesting

The function below computes a discount, and every rule sits nested inside the previous one. Say what the reader must hold in their head, then rewrite it with the invalid cases guarded at the top.

```ts
function discountFor(customer, order) {
  if (customer) {
    if (customer.active) {
      if (order && order.total > 0) {
        if (customer.years > 1) {
          return order.total * customer.years * 0.01;
        }
      }
    }
  }
  return 0;
}
```

### Solution

```ts
function discountFor(customer, order) {
  if (!customer || !customer.active) return 0;
  if (!order || order.total <= 0) return 0;
  if (customer.years <= 1) return 0;
  return order.total * customer.years * 0.01;
}
```

Every guard returns the same zero, so the nesting carried no extra information — it only forced the reader to track four conditions at once. Flattened, the conditions read as a list of reasons for no discount, and the single return at the end is unmistakably the ordinary case. The trap is that nesting feels safer because it groups the rules, when in fact the outer conditions are unrelated to each other, which is exactly what the shape was hiding.
