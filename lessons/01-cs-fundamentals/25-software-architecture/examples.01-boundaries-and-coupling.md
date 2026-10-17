## Example 1 — The framework imported by the rules

A domain function computes an order total from a whole framework `Request` object, to read one number out of it. The framework is already named in 40 of the repository's 60 files, and it ships 4 releases a year, so each of those releases puts 40 files in front of a reviewer. Say which direction the dependency should point, then cut that count down.

```ts
// domain/order.ts
import type { Request } from "express";

export function total(order: Order, req: Request): number {
  return order.items.length ? order.sum * req.user.tierRate : 0;
}
```

### Solution

```ts
// domain/order.ts — plain values, no framework
export function total(order: Order, tierRate: number): number {
  return order.items.length ? order.sum * tierRate : 0;
}

// http/handler.ts — the only file that names the framework
router.get("/orders/:id", (req, res) => res.json(total(order, req.user.tierRate)));
```

Imports should point from the volatile towards the stable, and a web framework changes more often, and for reasons less related to the rules, than the rules do. Taking `req` made the framework a type inside the domain, so each of the framework's 4 yearly releases put a possible change to pricing logic in the review: 4 * 40 = 160 file-checks a year. Passing a plain `tierRate` moves the adaptation into the handler, where the framework already lives, so the files that name it fall from 40 to the 2 in the fence above and the yearly count falls from 160 to 4 * 2 = 8. What usually goes wrong is moving the import and leaving the type in the signature — the seam then looks clean while the framework still reaches the rule.

## Example 2 — A change that reaches twelve modules

A team splits its code by noun, so everything about an order sits under `orders/`. The wholesale pricing rule in that folder changes 4 times a year, the delivery rule once, and 12 files import the folder. Count the amplification over 2 years, then redraw the boundary around what changes together.

```text
orders/
  order.ts        order shape
  pricing.ts      wholesale and retail rates   (changes 4 times a year)
  delivery.ts     delivery windows             (changes once a year)
  invoice.ts      invoice layout

change "raise the wholesale rate" -> pricing.ts plus 12 importing files
2 years of changes: 4 * 2 = 8 pricing changes, 1 * 2 = 2 delivery changes
file edits as the folders stand: (8 + 2) * 12 = 10 * 12 = 120
```

### Solution

```text
pricing/    the rate rules          (changes 4 times a year)
delivery/   the delivery rules      (changes once a year)
orders/     imports both; owns only the order's own shape

change "raise the wholesale rate" -> pricing/ alone

file edits after the split: 8 * 1 + 2 * 1 = 8 + 2 = 10
120 / 10 = 12, so the noun split cost twelve times the edits over those 2 years
```

Splitting by noun produces a diagram that matches the data model, but it groups things whose reasons to change are unrelated, so 10 changes spread over 2 years drag 12 files each while only 1 of those files holds the rule being changed. Boundaries drawn around rates of change give each rule one home, which turns the 120 edits into 10 and makes the coupling countable: the files a typical pricing change touches should be 1. What usually goes wrong next is a split by name alone — `pricing/` and `delivery/` keep importing each other's types, and the count stays at 12.
