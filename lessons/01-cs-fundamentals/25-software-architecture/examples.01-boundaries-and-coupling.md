## Example 1 — The framework imported by the rules

A domain function computes an order total from the request object. A framework upgrade would now mean editing business rules. Say which direction the dependency should point, then move the boundary.

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

Imports should point from the volatile toward the stable, and a web framework changes more often, and for reasons less related to the rules, than the rules do. Taking `req` made the framework a type inside the domain, so every framework release became a possible change to pricing logic. Passing a plain `tierRate` moves the adaptation into the handler, where the framework already lives. The dependency now points one way, and the domain can be tested without constructing a request at all.

## Example 2 — A change that reaches twelve modules

A team splits its code by noun: everything about an order sits under `orders/`. A quarterly pricing change keeps forcing edits across the module. Count the amplification, then redraw the boundary around what changes together.

```text
orders/
  order.ts        order shape
  pricing.ts      wholesale and retail rates   (changes quarterly)
  delivery.ts     delivery windows             (changes yearly)
  invoice.ts      invoice layout

change "raise the wholesale rate" -> pricing.ts plus 12 importing files
```

### Solution

```text
pricing/    the rate rules          (changes quarterly)
delivery/   the delivery rules      (changes yearly)
orders/     imports both; owns only the order's own shape

change "raise the wholesale rate" -> pricing/ only
```

Splitting by noun produces a tidy diagram that matches the data model, but it groups things whose reasons to change are unrelated, so a pricing edit drags delivery and invoice code along and every future change spans the same seam. The useful question is not what a thing is but what changes with it. Boundaries drawn around rates of change give each rule one home, and the coupling becomes visible as the number of files a typical change touches rather than as a layer count on a diagram.
