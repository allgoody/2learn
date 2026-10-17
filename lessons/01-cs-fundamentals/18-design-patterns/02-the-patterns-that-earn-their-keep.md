---
title: The patterns that earn their keep
prereqs: ["01-cs-fundamentals/18-design-patterns/01-why-patterns-are-named"]
---

## What it is

Four patterns cover most of the value in day-to-day code: strategy, for swapping an algorithm; adapter, for making an incompatible interface fit; observer, for notifying interested parties without knowing who they are; and factory, for deciding which implementation to construct. They are worth knowing because the problems they solve appear constantly, and because their names let a team agree on a fix quickly. Each one is a shape with a countable cost, so each can be judged rather than recited.

## Why it matters

These four show up in every large codebase, often unnamed, and recognising the shape tells you what the code is trying to achieve and where it is likely to hurt. A hand-rolled conditional that chooses between payment providers is a strategy that has not been named; a wrapper that reshapes a third-party response is an adapter. Naming one turns a redesign discussion into a specific change with a known size: "extract the validation" or "add the missing unsubscribe" is 1 edit in 1 place, while "this is messy" is a conversation with no end. They are also the patterns most often applied prematurely, so knowing their costs is what separates using them from dressing up a direct call — a strategy with 2 implementations costs 1 extra hop on every call, and an adapter costs 1 extra type and 1 hop, which is worth it only when the thing being hidden actually changes.

## Core ideas

### Strategy: vary the algorithm behind one interface

Use it when the caller needs to choose between several ways of doing the same job, and the choice is made from outside. The interface sits at the point of variation; each implementation is one algorithm. The cost is one level of indirection and one more type. Applied prematurely — one implementation, no plan for another — it is a function call with extra steps.

```ts
interface PricingStrategy { price(items): number }
class RetailPricing implements PricingStrategy { /* ... */ }
class WholesalePricing implements PricingStrategy { /* ... */ }
```

The trade is not visible until the number of ways to price and the number of places that choose grow, and then it is arithmetic:

```text
4 ways to price, each a multiplier applied to the order's list price
  retail 1.2, wholesale 1.07, partner 1.1, marketplace 1.0
  a 100 order costs 100 * 1.2 = 120 at retail, and 100 * 1.07 = 107 wholesale
3 call sites that each select a way

conditional at each site: 3 sites * 4 branches = 12 branches to write and keep in step
strategy: 4 implementations + 3 selection sites = 7 places, each with 1 job

adding a 5th way to price
  conditional: 3 branches edited, 1 per site
  strategy:    1 new class + 1 line at each site that offers it = 1 + 3 = 4 edits
  the counts are close; the difference is what was edited. The strategy's new algorithm
  sits in 1 file that tests itself, and the 3 lines only name it, so a site that does
  not need the new way is untouched.
```

### Adapter: make an incompatible interface fit

Use it when you must consume something whose shape you do not control — a third-party client, a legacy module — without letting that shape leak into your code. The adapter translates in both directions. Its value is that the rest of the system depends on your interface, so replacing the underlying library later is a change in one file.

```ts
class StripeGateway implements PaymentGateway {
  charge(order) { return this.stripe.charges.create(toStripePayload(order)); }
}
```

Count what it saves before you decide the extra type is worth it:

```text
the library's charge type is named in the codebase; say 12 call sites read charge.id and charge.outcome

without an adapter: upgrading the library edits 12 call sites + their tests
with one adapter:   1 file translates, and the library's names appear there only

cost of the adapter: 1 extra type and 1 hop per call
the hop pays for itself the first time the library changes, and 12 edits do not
```

### Observer: notify without knowing the listeners

Use it when one event must reach an unknown set of interested parties, and the publisher should not depend on them. Subscribers register, the publisher notifies, and neither holds a reference to the other's type. The cost to watch is lifetime: a subscriber that never unregisters keeps its publisher alive, which is the classic memory leak in user-interface code.

```ts
emitter.on("order-placed", (order) => mailer.sendReceipt(order));
```

Lifetime is where the count matters, because each listener is one retained object:

```text
1 screen, opened and closed 4 times, 1 registration per open
listeners after 4 cycles: 4, each holding its screen alive through its closure
without a handle: 4 registrations and 0 removals, so 4 dead screens stay reachable
with the handle: 4 registrations and 4 removals, so 0 dead screens stay reachable
```

### Factory: decide which implementation to construct

Use it when the construction of an object involves a decision — configuration, environment, a feature flag — and that decision should not be spread across every caller. A factory keeps the knowledge in one place and returns the interface. When there is only one implementation and no decision to make, a constructor is simpler and should win.

```ts
function createNotifier(config): Notifier {
  return config.email ? new EmailNotifier(config) : new SlackNotifier(config);
}
```

The decision is worth centralising exactly when it has more than one case, and the two common spellings differ in the edits a new case costs:

```text
3 notifier types chosen from a config value: email, slack, sms

a switch over 1 string with 3 arms
  adding "teams": 1 arm + 1 class + 1 test = 3 edits, all inside the factory file
  a misspelled value is not checked by the compiler: "emial" compiles and fails at runtime
a registry the modules add themselves to
  adding "teams": 1 module + 1 registration = 2 edits, with the factory file untouched
a constructor with 1 implementation and no decision
  changing the type: 1 edit at 1 call site
```

### Name the alternative before you apply one

For each of these there is usually a simpler version, and the simpler version is the right answer until the pattern's own problem is measurably present. State what the simple version would cost, in types and hops, and let that decide. Reach for the full pattern when the simple version has demonstrably stopped being enough, and say why in the commit message.

```text
pattern    simple alternative       its cost while 1 implementation or 1 listener exists

strategy   a function parameter     0 extra types, 1 hop, 1 site to change
adapter    a reshape function       0 extra types, 1 hop, 1 site to change
observer   a direct callback        0 extra types, 0 hops, but it holds only 1 listener
factory    a plain constructor      0 extra types, 1 call site to edit

every row of the pattern column costs at least 1 extra type, and either a hop per call
(strategy, adapter, factory) or a lifetime to manage (observer).
The column that decides is the one the simple version cannot serve.
```

## Practice

### Replace a conditional with a strategy

Find a conditional that selects between two or three ways of doing one job. Extract each branch into its own implementation behind an interface, then choose between them at the call site. Count the branches and the selection sites first, so you can say afterwards whether the extraction removed repetition or only moved it.

Done when: adding a fourth case means adding one class and one line at the call site, with no edit inside the existing branches.

### Slim an over-built adapter

Find a wrapper class with more methods than any caller uses. Rewrite it to expose only the operations the callers need, delegating the rest away.

Done when: every method on the wrapper has at least one caller, and the underlying library is referenced from exactly one file.

## Common mistakes

- **Strategy with one implementation** — the indirection solves a variation that does not exist, and every call pays 1 extra hop for it; fix: use a direct call until a second case appears.
- **Adapter that leaks the wrapped type** — the third-party shape escapes into your code through parameters or return values, so 1 library upgrade reaches every call site that named it; fix: translate at the boundary and never expose the foreign type.
- **Observer without unsubscription** — listeners accumulate and keep dead objects alive, 1 retained screen per open-and-close cycle; fix: store the unsubscribe handle and call it wherever the subscriber's lifetime ends.
- **Factory that is a switch over a type string** — every new case edits the factory, and the string is not checked by the compiler, so 1 typo compiles and fails at runtime; fix: prefer an explicit value or a registry the modules add themselves to.
- **Applying a pattern without naming the simpler alternative** — the reader cannot tell whether the complexity was considered, and the 1 sentence that would have said so is missing; fix: state in the commit or comment what the direct version would have cost.

## Go deeper

- **Why patterns are named** (`01-cs-fundamentals/18-design-patterns/01-why-patterns-are-named`) — the cost-and-variation framing that keeps these four from becoming ceremony, so read it first.
- **Software Architecture** (`01-cs-fundamentals/25-software-architecture`) — what happens to these collaborations when the pieces are deployed separately.
- **Code Review** (`01-cs-fundamentals/17-code-review`) — how to raise "this is a pattern with one implementation" as a useful review comment rather than a taste argument.
