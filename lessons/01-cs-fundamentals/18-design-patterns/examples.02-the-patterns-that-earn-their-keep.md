## Example 1 — An adapter that leaks what it wraps

The class below is meant to keep a third-party client out of the codebase. The call site shows what actually reached the rest of the system. Say how the foreign type escaped, then rewrite the boundary.

```ts
class PaymentAdapter {
  constructor(private stripe: StripeClient) {}

  async charge(order: Order): Promise<StripeCharge> {
    return this.stripe.charges.create({
      amount: order.total, currency: order.currency,
    });
  }
}

// call site
const charge = await gateway.charge(order);
if (charge.outcome === "requires_action") { ... }   // the library's vocabulary

// 3 more call sites read charge.outcome, and 2 map over the library's status union
```

### Solution

```ts
// our own type; nothing from the library crosses it
interface ChargeResult { id: string; needsCustomerAction: boolean }

class PaymentAdapter implements PaymentGateway {
  constructor(private stripe: StripeClient) {}

  async charge(order: Order): Promise<ChargeResult> {
    const res = await this.stripe.charges.create({
      amount: order.total, currency: order.currency,
    });
    return {
      id: res.id,
      needsCustomerAction: res.outcome === "requires_action",
    };
  }
}

// the library's names now appear in 1 file, and 4 call sites read ours
```

The adapter translated the request but returned the library's own object, so its field names and status vocabulary travelled into the caller — 4 call sites in this codebase read `charge.outcome` or map over its status union, and every one must change when the library does. Returning our own `ChargeResult` leaves the foreign type named in exactly one file, and puts the translation where its meaning is decided. The trap is that returning the library response is less code and looks like a faithful pass-through; it is faithful, which is the problem.

## Example 2 — A subscriber that was never removed

A screen registers a listener on a long-lived emitter. The trace shows what happens after the screen is closed and reopened four times. Say what is being retained, then rewrite the subscription.

```ts
function openOrderScreen(emitter, orderId) {
  emitter.on("order-placed", (order) => {
    if (order.id === orderId) render(order);
  });
}

// open and close the screen 4 times
// listeners after 4 cycles: 4
// each listener closes over its own screen and orderId, so 4 screens stay reachable
```

### Solution

```ts
function openOrderScreen(emitter, orderId) {
  const onPlaced = (order) => {
    if (order.id === orderId) render(order);
  };

  emitter.on("order-placed", onPlaced);

  return () => emitter.off("order-placed", onPlaced);   // the handle
}

// close: const dispose = openOrderScreen(emitter, id); ... dispose();
// 4 opens and 4 closes now leave 0 listeners; the trace reads listeners: 0
```

The emitter holds a reference to every listener, and each listener closes over the screen's state, so no closed screen can be collected and each reopened one adds a callback that renders into a dead view — 4 cycles, 4 retained screens. Returning the unsubscribe handle ties the listener's lifetime to the screen's, and the piece observer implementations usually leave out is the removal, not the registration. The trap is that nothing leaks in a session that opens the screen once, and the symptom appears only to whoever leaves the app open all day.
