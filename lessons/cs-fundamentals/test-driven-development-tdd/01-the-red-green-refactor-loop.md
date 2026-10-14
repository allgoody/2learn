---
title: The red-green-refactor loop
prereqs: ["cs-fundamentals/unit-testing"]
---

## What it is

The loop is three steps taken in order, repeatedly. Red: write a test that expresses the next small piece of behaviour, and watch it fail. Green: write the simplest code that makes it pass, no more. Refactor: with the test passing, improve the code without changing behaviour. Then start again. One cycle should take a minute or two, and each ends with the whole suite green.

## Why it matters

Each step exists to prevent a specific mistake. Red proves the test is wired to the code and can actually fail — without it, a test that passes vacuously gives lasting false confidence. Green forces the smallest implementation, which keeps speculation out of the design. Refactor keeps the design healthy while the tests stay green, so improvements happen continuously rather than in a risky session months later. Taken together they produce code whose every line was demanded by a test and whose every test has been seen to fail.

## Core ideas

### Red first, and watch it fail

Write the assertion before the implementation, run it, and confirm it fails for the reason you expect — not because of a typo or a missing import. That check is the whole justification for the step. A test you have never seen fail is a test you cannot trust, and the failure message also tells you whether it will be understandable to whoever meets it next.

```text
test: expect(discountFor(customerWith(years: 5))).toBe(0.05)
run -> fails: discountFor is not defined          (expected)
```

### Green: the simplest thing that passes

Write the least code that satisfies the test, even if that feels like a cheat — a hard-coded value is a legitimate green when the test only needs one case. The next test will force the generalisation, and by then the shape of the generalisation is known rather than guessed. This step is deliberately small: the smaller it is, the more certain you can be that it did not break anything else.

```ts
function discountFor(customer) {
  return 0.05;   // green for one case; the next test demands the rule
}
```

### Refactor under green

With the suite passing, improve names, remove duplication and split functions. Because the tests are green before and after, any breakage is attributable to the last change. Resist the temptation to refactor while the test is red — you then have two unknowns, a broken test and a changed design, and no way to tell which caused what.

```text
red -> green -> refactor (tests stay green) -> red ...
```

### Keep the cycle small

A cycle that takes an hour is not a cycle, it is a feature with a test. Aim for a single behaviour per cycle: one branch, one rule, one boundary case. Small cycles mean the test failure is unambiguous, the implementation is trivial, and the design emerges from a sequence of decisions rather than one large guess.

### Let the tests pull the design

If a unit is hard to test, it is usually hard to use: hidden dependencies, too many responsibilities, an awkward interface. TDD surfaces that difficulty immediately, at the moment when changing it is cheapest, rather than after six callers exist. This is often the largest practical benefit, and it is invisible if you only count test coverage.

## Practice

### Take one rule through three cycles

Choose a small rule — a pricing discount, a validation, a state transition. Write a test for the simplest case and make it pass. Add a second test that forces the rule to generalise, then a third for a boundary case.

Done when: each of the three tests was seen failing first, and the final implementation has no branch that no test demands.

### Recover a missed red

Take a test you wrote after the code and deliberately break the implementation in the smallest way you can. Run the suite.

Done when: you have seen the test fail, and if it did not, you have found the case it was missing.

## Common mistakes

- **Writing the test after the code and calling it TDD** — the design benefit is lost and the test may never be able to fail; fix: write the test, run it, see it fail, then implement.
- **Implementing more than the test demands** — untested branches and speculative generality accumulate; fix: write the simplest code that passes and let the next test force the generalisation.
- **Refactoring while the test is red** — two changes are in flight and the failure is unattributable; fix: get back to green first.
- **Cycles so large they are features** — the test failure is ambiguous and the design is one big guess; fix: one behaviour per cycle.
- **Skipping the loop for code you believe is trivial** — the trivial code acquires the edge case you did not consider; fix: use the loop for logic, and be honest about where it genuinely does not fit.

## Go deeper

- **Unit Testing** (`cs-fundamentals/unit-testing`) — the assertion craft and test hygiene this loop assumes, so read it first.
- **Where TDD does and does not pay off** (`cs-fundamentals/test-driven-development-tdd/02-where-tdd-does-and-does-not-pay-off`) — applying the loop where it works and dropping it where it does not.
- **Refactoring** (`cs-fundamentals/refactoring`) — the third step expanded into a full discipline.
