## Example 1 — An interface with one implementation

A reviewer sees the shape below and asks whether it should be deleted. Say how many implementations exist today, what a second one would need, and what a direct call would cost in its place.

```ts
interface Notifier { send(user: User, message: string): Promise<void>; }

class EmailNotifier implements Notifier {
  async send(user, message) { await this.mailer.send(user.email, message); }
}

class AlertService {
  constructor(private notifier: Notifier) {}
  async alert(user, message) { await this.notifier.send(user, message); }
}

// 4 classes construct an AlertService; each one names the Notifier type
```

### Solution

```text
implementations today: 1

hops from a caller to the send() body:
  direct call:  AlertService -> EmailNotifier.send                1 hop
  interface:    AlertService -> Notifier -> EmailNotifier.send   2 hops

if a Slack notifier arrives:
  with the interface: 1 new class + 1 line where it is chosen
                      = 2 edits in 2 files, and Notifier itself does not change
  with a direct call: AlertService holds EmailNotifier, so all 4 classes that
                      construct it must name the new type and choose
                      = 4 edits in 4 files + 4 test updates

1 implementation means the 2 hops have no second destination to reach,
which is the whole complaint. 2 implementations turn those hops into the price
of a choice the caller needed anyway.
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
it is a strategy, unnamed: 1 operation, pay(order) -> { id, state },
chosen by the caller through order.method. The 2 branches are its 2 implementations,
and toStripe and toLedger are adapters for foreign shapes.

not yet worth extracting:
  2 cases at 1 selection site, 8 lines of branch and 1 throw
  extracting now adds 1 interface + 2 classes + 1 factory = 4 types,
  and every call gains 1 hop

extract when either count changes:
  a 3rd payment method arrives, or
  a 2nd selection site must choose the same way
```

Naming it is worth doing immediately, because the review becomes "this is a strategy with two implementations" instead of an argument about the branches, and the two adapters already show why the foreign types must not leak further. Extracting it is a separate decision whose evidence is a third case or a second selection site, not tidiness. The trap is extracting at two cases, which buys a factory, an interface and two classes to replace eight readable lines.
