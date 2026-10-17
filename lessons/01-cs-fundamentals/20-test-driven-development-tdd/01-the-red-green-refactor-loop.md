---
title: The red-green-refactor loop
prereqs: ["01-cs-fundamentals/10-unit-testing"]
---

## What it is

The loop is three steps taken in order, over and over. Red: write a test for the next single behaviour, run it, and watch it fail. Green: write the least code that makes it pass. Refactor: with the test green, improve the code without changing what it does. A round ends when the whole suite is green again, and a round should last a minute or two: at 2 minutes each, 60 / 2 = 30 rounds fit in an hour, and at 1 minute each, 60 / 1 = 60.

## Why it matters

Each step blocks one specific mistake, and each mistake can be counted. Without red, nothing has shown the test can fail: an assertion such as "the result is not null" holds for every implementation, and 1 such assertion can sit unnoticed in a suite of 20 tests. Without green's smallest thing, the module grows branches no test asks for — a rule with 1 case written as 3 branches leaves 2 branches that no test reaches. Without refactor, duplication compounds round on round: 30 rounds that each copy a 3-line block leave 30 copies of it to correct when the rule moves. Run in order, the three steps give code whose every branch was demanded by a test and tests that have each been watched failing once.

## Core ideas

### Red is a test you have watched fail

Write the assertion before the implementation, run it, and confirm it failed for the reason you expected. Every name and number in the test is written down before it can be tested, which is what makes the failure readable:

```text
one case of the discount rule, every value named

price = 100    what the item costs, in whole units
years = 5      the customer's years of custom
rate  = 0.05   the fraction taken off at 5 years: 5 / 100
discount      = price * rate = 100 * 0.05 = 5

test 1: expect(discountFor({ years: 5, price: 100 })).toBe(5)

run it -> FAIL: discountFor is not defined
          1 test failed: the name has no definition yet, which is the point
```

A red printed by a misspelt path looks almost the same and tests nothing, because the runner stops before the assertion runs:

```text
import { discountFor } from "./discout"     one letter dropped from the path

run it -> FAIL: Cannot find module './discout'
          1 suite failed to run, so 0 tests executed
```

Both runs print `FAIL`; only the first says anything about the discount rule. Fixing the path costs a minute and buys the one guarantee the whole loop rests on: the assertion is wired to the code and can genuinely fail.

### Green is the least code that passes

Write the least code that satisfies the test, even when that feels like cheating. For 1 case, a constant is a legitimate green:

```ts
// green for the single case above, and nothing further
export function discountFor(customer) {
  return 5;   // 100 * 0.05 written as a constant: the rule is not here yet
}
```

The next test ends that. Adding the twenty-year case gives the rule a second case, and the constant stops being legitimate the moment a second expected value exists:

```text
test 2: expect(discountFor({ years: 20, price: 100 })).toBe(10)
        the rate rises to 0.10 at 20 years: 100 * 0.10 = 10

run the constant against it
  -> FAIL: expected 10, received 5

green: 2 cases need 2 conditional branches, and that is all they need yet
```

```ts
export function discountFor(customer) {
  const rate = customer.years >= 20 ? 0.10 : 0.05;
  return customer.price * rate;
}
```

A third test, for a customer of 2 years expecting 0, fails against that code for an instructive reason: `years >= 20` is false for 2, so the code takes the 0.05 branch and returns 100 * 0.05 = 5 instead of 0. The generalisation the test demanded is a third branch, not a rewrite. Writing it only when a red asks for it means the shape was known rather than guessed.

### Refactor with the suite green

With the suite passing, improve the names, remove the duplication and split the long functions. These 2 functions are green, and both write out the same rate rule:

```ts
function feeFor(order, tier) {
  const rate = tier === "gold" ? 0.10 : 0.05;    // 1 rate rule
  return order.total * rate;
}
function refundFor(order, tier) {
  const rate = tier === "gold" ? 0.10 : 0.05;    // the same rule, written a second time
  return order.total * rate + order.shipping;
}
// 2 functions, 2 copies of 1 rule, and 2 places to move a rate
```

```ts
const RATE = { gold: 0.10, silver: 0.05 };     // 1 table, 2 lookups
function feeFor(order, tier)    { return order.total * RATE[tier]; }
function refundFor(order, tier) { return order.total * RATE[tier] + order.shipping; }
```

The same 2 tests are green before and after, so a red that appears now has 1 candidate cause: the change just made. Move a rate in the table and both functions move with it, where editing 2 copies of the rule had left 1 of them behind. Refactoring while red offers 2 unknowns instead — the failing assertion and the rewritten code — and no run that separates them.

### One behaviour per round

A round that takes an hour is not a round, it is a feature with a test attached. The reason is what a red tells you when it appears:

```text
a rule with 6 behaviours, built two ways

6 rounds, 1 behaviour each                 1 round holding all 6
6 reds, each naming 1 missing behaviour   1 red at the end
a red leaves 1 candidate cause             the same red leaves 6 candidate causes
6 rounds * 2 minutes = 12 minutes          12 minutes of writing, plus the search
                                          for which of the 6 is wrong
```

One behaviour per round also decides what belongs in a round. The boundary of a rule needs 2 tests, not 1:

```text
the 5-year rule, pinned at its line
years = 4 -> 0       the case just below the line
years = 5 -> 0.05    the case on the line

1 test alone cannot tell `years >= 5` from `years > 5`
```

### Tests pull the design

If a unit is hard to test, it is usually hard to use, and the difficulty shows up as an input the test cannot choose. A class that reads the clock inside its own method has 1 such hidden input:

```ts
class Trial {
  isExpired(signupAt: Date) {
    return (Date.now() - signupAt.getTime()) / 86400000 > 14;
  }
}
// 86400000 is one day in milliseconds: 24 * 60 * 60 * 1000 = 86 400 000
// 14 days is 14 * 86 400 000 = 1 209 600 000 ms
// the test can pick signupAt, but not the instant `Date.now()` returns
```

```ts
class Trial {
  constructor(private readonly now: () => Date = () => new Date()) {}

  isExpired(signupAt: Date) {
    return (this.now().getTime() - signupAt.getTime()) / 86400000 > 14;
  }
}
// 1 extra constructor argument, 2 inputs the test now chooses:
//   signupAt = new Date("2026-03-05T00:00:00Z")
//   now      = () => new Date("2026-03-20T00:00:00Z")
// 20 March minus 5 March = 15 days apart, which is 15 * 86 400 000 = 1 296 000 000 ms
// 15 > 14, so the trial has expired and the expected value is true
```

TDD surfaces that difficulty at the moment when changing it is cheapest — while the class has 1 caller. The same change after 6 callers exist means 6 call sites to update. This is the largest practical benefit of the loop and the one that a coverage number cannot show.

## Practice

### Take one rule through three rounds

Choose a rule with at least 3 cases — a pricing discount, a validation, a state transition. Write the test for the simplest case and make it pass. Add a second test that forces the rule to generalise, then a third that pins the boundary by covering the case on the line as well as the case just below it: the five-year rule above needs both `years: 5` and `years: 4`, because either one alone still leaves `>=` and `>` indistinguishable.

Done when: 3 tests exist, all 3 were seen failing first, and the final function has no branch that no test demands — count the branches, count the tests that reach each one, and the two lists match.

### Recover a missed red

Take a test you wrote after the code. Break the implementation in the smallest way you can find — change 1 constant, delete 1 branch, return the first value early — and run the suite.

Done when: the suite reports at least 1 failure and the failing test is the one you broke; if the run reports 0 failures, you have found a case the test does not cover, so add that case and break the code again.

## Common mistakes

- **Writing the test after the code and calling it TDD** — the test has run 1 time, against code that already passed it, and no red was ever observed; fix: write the test, run it, watch it fail for the reason you expect, then implement.
- **Implementing more than the test demands** — a rule with 1 case written as 3 branches leaves 2 branches no test reaches, so green stops proving the whole function; fix: write the least code that passes, and let the next red force the generalisation.
- **Refactoring while the test is red** — 2 changes are in flight, the failing assertion and the rewritten code, and no single run separates them; fix: return to green first, then refactor.
- **Rounds so large they are features** — 1 red at the end names 6 candidate causes instead of 1, so 6 * 2 = 12 minutes of cycle time buys a failure that localises nothing; fix: one behaviour per round.
- **Skipping the loop for code you believe is trivial** — the branch you did not consider is the one with no test, and a check that looks like 1 comparison usually has 3 cases: below the line, on it, and above it; fix: use the loop for logic, and be honest about where it genuinely does not fit.

## Go deeper

- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — the assertion craft and test hygiene this loop assumes, so read it first.
- **Where TDD does and does not pay off** (`01-cs-fundamentals/20-test-driven-development-tdd/02-where-tdd-does-and-does-not-pay-off`) — applying the loop where it earns its cost and dropping it where it does not.
- **Refactoring** (`01-cs-fundamentals/19-refactoring`) — the third step expanded into a catalogue of named moves.
