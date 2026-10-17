---
title: Refactorings you will actually use
prereqs: ["01-cs-fundamentals/19-refactoring/01-safe-refactoring-steps"]
---

## What it is

Most real improvements come from a small set of named transformations: extract a function, rename something honestly, move code to the module that owns it, replace a conditional chain with a clear dispatch, and delete what nothing uses. Five moves cover most of what you will do in a week of cleaning, and each one has a shape you can apply mechanically — which is what makes them safe. You are not inventing a design; you are applying a known move with a known effect.

## Why it matters

Naming a move turns a vague intention ("this is messy") into a sequence of concrete steps you can perform in any codebase, in any language, without a design session. It also gives the step a size: extract 1 function of 12 lines out of an 80-line file, rename 1 symbol in 40 places, delete 1 branch with 0 callers. That is the vocabulary people use in review, and it is why "extract the validation" tells a colleague exactly what to change while "this is messy" gives them neither a target nor a size. Knowing the handful that carry most of the weight means you can improve code in ten-minute gaps rather than waiting for a quiet week that never arrives.

## Core ideas

### Extract and inline functions

Extracting takes a fragment that needs a name and turns it into a function with a name that says what it does. It is the most useful move there is, and the one to reach for when a function is hard to summarise. Its inverse, inlining, is just as legitimate: when a function no longer earns its name, folding it back removes a hop with no meaning.

```text
an 80-line function; its first 12 lines trim and validate the input

extract: the 12 lines become 1 named function, and 68 lines stay behind
         3 call sites of that work now name it, so the 12 lines are
         written once instead of 3 times
inline:  a 3-line function with 1 call site disappears
         1 hop removed, 0 names lost
```

```ts
// before
const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

// after
const total = calculateTotal(items);
```

### Rename and move code

A rename costs nothing when the tools are honest and pays back on every read: 1 better name, 40 occurrences updated by the compiler, and every future reader saved the translation. Moving code to the module that owns the concept is the same idea at a larger scale, and it is usually the fix when a dependency points the wrong way — the code is in the wrong place, so the import that should be allowed looks forbidden.

```text
invoice/pricing.ts      the rule lives with the concept
orders/order.ts         imports it, rather than owning it

before the move: orders/pricing.ts, so the invoice module reaches into
                 orders/ to calculate its own prices
after the move: 3 import lines across 2 files change to point at invoice/pricing.ts
                the wrong-way dependency is gone, and the layering holds
                without a lint rule to enforce it
```

### Dispatch instead of a conditional chain

A long chain of conditions testing the same value is a signal that the variation has a name. Replacing it with a table lookup, a small map from case to handler, or a polymorphic type makes adding the next case a one-line change in one place instead of an edit in the middle of a chain. The chain also grows a default arm, and a default arm is where an unrecognised case quietly gets the wrong answer.

```ts
// base = 100, the order's list price, in its own currency
// rates maps each sales channel to the multiplier applied to base
const base = 100;
const rates = { retail: 1.2, wholesale: 1.07 };
const price = base * (rates[channel] ?? 1);

// retail:    100 * 1.2  = 120
// wholesale: 100 * 1.07 = 107
// unknown:   100 * 1    = 100 — the silent default this table must not keep
```

With the fence above scaled to 6 channels, the chain holds 6 branches and 1 default arm, while the table holds 6 entries and 1 lookup. Adding the 7th channel is 1 entry in the table, against a branch that must be placed before the default and a default that has to be re-read to be sure it still means "unknown".

### A value object for related values

When several parameters travel together — an amount and its currency, a start and an end, a host and a port — they usually want to be one thing. The value object gives the group a name, gives validation one home, and removes the risk of the two parts being passed in the wrong order: with N parameters of the same type there are N! orderings and only 1 of them is right, where N! means N * (N - 1) * ... * 1. So 2 same-typed arguments have 2! = 2 * 1 = 2 orderings with 1 wrong, and 4 of them have 4! = 4 * 3 * 2 * 1 = 24 orderings with 23 wrong.

```ts
// 2 dates, 2 orderings, 1 correct; the constructor rejects the other with 1 comparison
class DateRange {
  constructor(readonly start: Date, readonly end: Date) {
    if (end < start) throw new Error("end before start");
  }
}
```

### Delete what nothing uses

The most valuable refactoring is often deletion: dead code, unused parameters, a branch that can no longer be reached, a flag that is always true. Deletion is safe exactly when the tests are green and the tools report no callers, and it is the change that most reliably makes a file easier to read. Prefer removing to adding when both are possible.

```text
grep for callers -> none -> delete -> tests still green

1 function, 0 callers, 40 lines         delete 40 lines, fix 0 imports
1 parameter, never read, 7 call sites  delete 1 name from 7 call sites
1 branch, unreachable, 2 tests on it   delete the branch, and the 2 tests with it
```

## Practice

### Make a change local

Find a function with a chain of conditions on the same value. Count the branches and the selection sites, replace the chain with a table or a small dispatch, then add a new case and confirm it took one line.

Done when: a new case needs one addition and no edits to the existing branches.

### Delete something

Find a parameter, branch or exported function with no callers. Remove it and run the full test suite and the type checker.

Done when: nothing fails, nothing imports the removed name, and the file is shorter.

## Common mistakes

- **Extracting a fragment that is used once and unnamed** — an extra hop with no meaning, and the reader has 1 more name to follow for no gain; fix: extract when the fragment has a name worth saying.
- **Renaming without updating the string references** — reflection, configuration and tests keep the old name, and the failure surfaces at runtime instead of in the 1 compile run that would have caught it; fix: search the whole repository, not just the code.
- **Replacing conditionals with a dispatch table that hides validation** — an invalid key silently falls through to the default and prices an unknown channel at 100; fix: keep the explicit failure case, or throw on an unknown key.
- **Moving code without fixing the dependency direction** — the layering looks right and the cycles remain, so the same wrong-way import reappears at the next feature; fix: decide which module owns the concept, then move the calls.
- **Refactoring and adding a feature in the same step** — the test run no longer distinguishes the two, and a red test has 2 candidate causes; fix: finish the structural change first, then add the behaviour.

## Go deeper

- **Safe refactoring steps** (`01-cs-fundamentals/19-refactoring/01-safe-refactoring-steps`) — the procedure these moves are performed under, so read it first.
- **Clean Code** (`01-cs-fundamentals/08-clean-code`) — the quality bar that tells you when to stop.
- **Code Reusability** (`01-cs-fundamentals/16-code-reusability`) — when an extraction should be shared rather than kept local.
