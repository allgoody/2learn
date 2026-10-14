---
title: The patterns that earn their keep
prereqs: ["cs-fundamentals/design-patterns/01-why-patterns-are-named"]
---

## What it is

Four patterns cover most of the value in day-to-day code: strategy, for swapping an algorithm; adapter, for making an incompatible interface fit; observer, for notifying interested parties without knowing who they are; and factory, for deciding which implementation to construct. They are worth knowing because the problems they solve appear constantly, and because their names let a team agree on a fix quickly.

## Why it matters

These four show up in every large codebase, often unnamed, and recognising the shape tells you what the code is trying to achieve and where it is likely to hurt. A hand-rolled conditional that chooses between payment providers is a strategy that has not been named; a wrapper that reshapes a third-party response is an adapter. Naming them turns a redesign discussion into a specific change. They are also the patterns most often applied prematurely, so knowing their costs is what separates using them from dressing up a direct call.

## Core ideas

### Strategy: vary the algorithm behind one interface

Use it when the caller needs to choose between several ways of doing the same job, and the choice is made from outside. The interface sits at the point of variation; each implementation is one algorithm. The cost is one level of indirection and one more type. Applied prematurely — one implementation, no plan for another — it is a function call with extra steps.

```ts
interface PricingStrategy { price(items): number }
class RetailPricing implements PricingStrategy { /* ... */ }
class WholesalePricing implements PricingStrategy { /* ... */ }
```

### Adapter: make an incompatible interface fit

Use it when you must consume something whose shape you do not control — a third-party client, a legacy module — without letting that shape leak into your code. The adapter translates in both directions. Its value is that the rest of the system depends on your interface, so replacing the underlying library later is a change in one file.

```ts
class StripeGateway implements PaymentGateway {
  charge(order) { return this.stripe.charges.create(toStripePayload(order)); }
}
```

### Observer: notify without knowing the listeners

Use it when one event must reach an unknown set of interested parties, and the publisher should not depend on them. Subscribers register, the publisher notifies, and neither holds a reference to the other's type. The cost to watch is lifetime: a subscriber that never unregisters keeps its publisher alive, which is the classic memory leak in user-interface code.

```ts
emitter.on("order-placed", (order) => mailer.sendReceipt(order));
```

### Factory: decide which implementation to construct

Use it when the construction of an object involves a decision — configuration, environment, a feature flag — and that decision should not be spread across every caller. A factory keeps the knowledge in one place and returns the interface. When there is only one implementation and no decision to make, a constructor is simpler and should win.

```ts
function createNotifier(config): Notifier {
  return config.email ? new EmailNotifier(config) : new SlackNotifier(config);
}
```

### Name the alternative before you apply one

For each of these there is usually a simpler version. A strategy can be a function passed as an argument. An adapter can be a function that reshapes data. An observer can be a direct callback when there is exactly one listener. A factory can be a plain constructor. Reach for the full pattern when the simple version has demonstrably stopped being enough, and say why in the commit message.

## Practice

### Replace a conditional with a strategy

Find a conditional that selects between two or three ways of doing one job. Extract each branch into its own implementation behind an interface, then choose between them at the call site.

Done when: adding a fourth case means adding one class and one line at the call site, with no edit inside the existing branches.

### Slim an over-built adapter

Find a wrapper class with more methods than any caller uses. Rewrite it to expose only the operations the callers need, delegating the rest away.

Done when: every method on the wrapper has at least one caller, and the underlying library is referenced from exactly one file.

## Common mistakes

- **Strategy with one implementation** — the indirection solves a variation that does not exist; fix: use a direct call until a second case appears.
- **Adapter that leaks the wrapped type** — the third-party shape escapes into your code through parameters or return values; fix: translate at the boundary and never expose the foreign type.
- **Observer without unsubscription** — listeners accumulate and keep dead objects alive; fix: store the unsubscribe handle and call it wherever the subscriber's lifetime ends.
- **Factory that is a switch over a type string** — every new case edits the factory and the string is not checked by the compiler; fix: prefer an explicit value or a registry the modules add themselves to.
- **Applying a pattern without naming the simpler alternative** — the reader cannot tell whether the complexity was considered; fix: state in the commit or comment what the direct version would have cost.

## Go deeper

- **Why patterns are named** (`cs-fundamentals/design-patterns/01-why-patterns-are-named`) — the cost-and-variation framing that keeps these four from becoming ceremony, so read it first.
- **Software Architecture** (`cs-fundamentals/software-architecture`) — what happens to these collaborations when the pieces are deployed separately.
- **Code Review** (`cs-fundamentals/code-review`) — how to raise "this is a pattern with one implementation" as a useful review comment rather than a taste argument.
