## Example 1 — An interface with one implementation

A reviewer sees the shape below and asks whether it should be deleted. Count the implementations today, say what a second would need, and what a direct call would cost.

```ts
interface Notifier { send(user: User, message: string): Promise<void>; }

class EmailNotifier implements Notifier {
  async send(user, message) { await this.mailer.send(user.email, message); }
}

class AlertService {
  constructor(private notifier: Notifier) {}
  async alert(user, message) { await this.notifier.send(user, message); }
}
```

### Solution

```text
implementations today: 1

if a Slack one arrives: add one class and one line where it is chosen. The
interface itself does not change.

direct call instead: AlertService takes EmailNotifier and calls send() on
it. Adding Slack then means editing AlertService and every other class that
sends, along with their tests.
```

The interface costs one type and one constructor parameter; the alternative costs an edit in every caller when the second case appears, and welds the alert logic to a mailer the tests cannot replace. That is the trade-off the name compresses — a seam, whose worth depends on whether variation behind it is likely. The trap is answering with a rule, "delete it, one implementation" or "keep it, we might need Slack", instead of counting what each option costs to change.

## Example 2 — A conditional that was never named

The method below lives in a payment module. Say which pattern it already is, and what would have to change before extracting it is worth doing.

```ts
async function pay(order) {
  if (order.method === "card") {
    const res = await stripe.charges.create(toStripe(order));
    return { id: res.id, state: res.status };
  }
  if (order.method === "invoice") {
    const inv = await ledger.raiseInvoice(toLedger(order));
    return { id: inv.number, state: "open" };
  }
  throw new UnsupportedMethod(order.method);
}
```

### Solution

```text
it is a strategy, unnamed: one interface, pay(order) -> { id, state },
chosen by the caller through order.method. The two branches are the two
implementations, and toStripe and toLedger are adapters for foreign shapes.

not yet worth extracting: two cases at one selection site. Extract when a
third arrives, or when a second place must choose the same way; then
selection moves to a factory.
```

Naming it is worth doing immediately, because the review becomes "this is a strategy with two implementations" instead of an argument about the branches, and the two adapters already show why the foreign types must not leak further. Extracting it is a separate decision whose evidence is a third case or a second selection site, not tidiness. The trap is extracting at two cases, which buys a factory, an interface and two classes to replace six readable lines.
