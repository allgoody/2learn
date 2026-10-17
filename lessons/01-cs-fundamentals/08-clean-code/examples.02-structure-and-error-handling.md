## Example 1 — A failure that reached the customer as a zero

The function below charges order #4471 and falls back to a zero total when the gateway fails. Its input is the order, and its output is what the caller receives as a completed charge; the trace underneath is what the operator saw. Say what the customer was billed, then rewrite the failure path so that the cause survives the layer.

```ts
async function charge(order) {
  try {
    return await gateway.charge(order);
  } catch (e) {
    console.log("charge failed");
    return { total: 0, status: "ok" };
  }
}
```

```text
gateway.charge(order #4471) -> the provider answers 502, its upstream service is down
log line: "charge failed" — no order id, no status code
caller:     order #4471 confirmed for 0.00
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

A total of 0.00 is a valid total, so the broken operation hands the caller 2 fields that both look normal — `total: 0` and `status: "ok"` — and the invoice goes out wrong. The old catch logged 1 fact that names neither the order nor the cause; the rewrite carries 3, the operation (`charge failed`), the order (`4471`) and the provider's `502` inside `cause`, which is the error object it was thrown from. The trap is that the catch was written to keep the request alive: the intent was resilience, and the effect was to make a failure look like a success.

## Example 2 — Guards instead of four levels of nesting

The function below computes a discount on an order of total = 250.00 for a customer with years = 4, using the rate 0.01 — one percent of the order for each year. Every rule sits nested inside the previous one, so the reader must hold 4 conditions at once to know when the arithmetic runs. Say what that costs the reader, then rewrite the function with the invalid cases guarded at the top.

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

For the input above the paying return is 250.00 * 4 * 0.01 = 10.00, and both versions compute it; the difference is what the reader does first. Nested, the 4 conditions give 2^4 = 2 * 2 * 2 * 2 = 16 true-or-false combinations, and the reader has to hold all 16 to be sure the return is reached only when it should be. Guarded, the 4 conditions are answered on 3 lines, each exiting on its own, so the reader tracks 1 at a time. Every guard returns the same zero, so the nesting carried no extra information. The trap is that nesting feels safer because it groups the rules, when in fact the outer conditions are unrelated to each other, which is exactly what the shape was hiding.
