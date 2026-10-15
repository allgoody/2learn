---
title: Refactorings you will actually use
prereqs: ["01-cs-fundamentals/19-refactoring/01-safe-refactoring-steps"]
---

## What it is

Most real improvements come from a small set of named transformations: extract a function, rename something honestly, move code to the module that owns it, replace a conditional chain with a clear dispatch, and delete what nothing uses. Each has a shape you can apply mechanically, which is what makes them safe — you are not inventing a design, you are applying a known move with a known effect.

## Why it matters

Named moves turn a vague intention ("this is messy") into a sequence of concrete steps you can perform in any codebase, in any language, without a design session. They are also the vocabulary people use in review: "extract the validation" tells a colleague exactly what to change and how big the change is. Knowing the handful that carry most of the weight means you can improve code in ten-minute gaps rather than waiting for a quiet week that never arrives.

## Core ideas

### Extract and inline functions

Extracting takes a fragment that needs a name and turns it into a function with a name that says what it does. It is the most useful move there is, and the one to reach for when a function is hard to summarise. Its inverse, inlining, is just as legitimate: when a function no longer earns its name, folding it back removes a hop with no meaning.

```ts
// before
const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

// after
const total = calculateTotal(items);
```

### Rename and move

A rename costs nothing when the tools are honest and pays back on every read. Moving code to the module that owns the concept is the same idea at a larger scale, and it is usually the fix when a dependency points the wrong way: the code is in the wrong place, so the import that should be allowed looks forbidden.

```text
invoice/pricing.ts      <- the rule lives with the concept
orders/order.ts         <- imports it, rather than owning it
```

### Replace conditional chains with dispatch

A long chain of conditions testing the same value is a signal that the variation has a name. Replacing it with a table lookup, a small map from case to handler, or a polymorphic type makes adding the next case a one-line change in one place instead of an edit in the middle of a chain.

```ts
const rates = { retail: 1.2, wholesale: 1.07 };
const price = base * (rates[channel] ?? 1);
```

### Introduce a value object for related values

When several parameters travel together — an amount and its currency, a start and an end, a host and a port — they usually want to be one thing. The value object gives the group a name, gives validation one home, and removes the risk of the two parts being passed in the wrong order.

```ts
class DateRange {
  constructor(readonly start: Date, readonly end: Date) {
    if (end < start) throw new Error("end before start");
  }
}
```

### Delete, and lean on the tests

The most valuable refactoring is often deletion: dead code, unused parameters, a branch that can no longer be reached, a flag that is always true. Deletion is safe exactly when the tests are green and the tools report no callers, and it is the change that most reliably makes a file easier to read. Prefer removing to adding when both are possible.

```text
grep for callers -> none -> delete -> tests still green
```

## Practice

### Make a change local

Find a function with a chain of conditions on the same value. Replace the chain with a table or a small dispatch, then add a new case and confirm it took one line.

Done when: a new case needs one addition and no edits to the existing branches.

### Delete something

Find a parameter, branch or exported function with no callers. Remove it and run the full test suite and the type checker.

Done when: nothing fails, nothing imports the removed name, and the file is shorter.

## Common mistakes

- **Extracting a fragment that is used once and unnamed** — an extra hop with no meaning, which makes the caller harder to follow; fix: extract when the fragment has a name worth saying.
- **Renaming without updating the string references** — reflection, configuration and tests keep the old name and break at runtime; fix: search the whole repository, not just the code.
- **Replacing conditionals with a dispatch table that hides validation** — invalid input silently falls through to a default; fix: keep the explicit failure case, or throw on an unknown key.
- **Moving code without fixing the dependency direction** — the layering looks right and the cycles remain; fix: decide which module owns the concept, then move the calls.
- **Refactoring and adding a feature in the same step** — the test run no longer distinguishes the two; fix: finish the structural change first, then add the behaviour.

## Go deeper

- **Safe refactoring steps** (`01-cs-fundamentals/19-refactoring/01-safe-refactoring-steps`) — the procedure these moves are performed under, so read it first.
- **Clean Code** (`01-cs-fundamentals/08-clean-code`) — the quality bar that tells you when to stop.
- **Code Reusability** (`01-cs-fundamentals/16-code-reusability`) — when an extraction should be shared rather than kept local.
