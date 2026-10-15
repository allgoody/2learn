---
title: What makes a good unit test
prereqs: []
---

## What it is

A good unit test is a short piece of code that states one expectation about one unit and fails for exactly one reason. It sets up its own state, calls the unit, and asserts on an outcome the caller could observe. It does not know how the unit is implemented, and it does not care — which is what lets you refactor the unit afterwards without touching the test.

## Why it matters

Tests are code you maintain forever, and a badly written test is worse than none: it fails for unrelated reasons, it pins an implementation detail that blocks improvement, and it teaches the team to ignore red. The difference between a suite people trust and a suite people skip is not coverage. It is whether a failure means something. Getting that requires a few specific habits, and they are cheap to adopt while the suite is small.

## Core ideas

### Test behaviour, not implementation

Assert on what the unit produces, not on how it produced it. A test that asserts a specific sequence of internal calls passes today and breaks tomorrow when you extract a helper — even though nothing a caller can see has changed. The signal to watch for is a test that needs to change whenever you refactor: it is describing the implementation, and it will resist every improvement you make.

```ts
// brittle: asserts how
expect(repo.save).toHaveBeenCalledWith(expect.objectContaining({ id: 7 }));

// durable: asserts what
expect(result).toEqual({ id: 7, status: "saved" });
```

### One reason to fail

A test that asserts five things at once gives one failure message and hides the other four problems. Keep the setup, the single action and the assertion in view, so a reader can understand the case without scrolling. When a test needs several assertions, ask whether it is really several test cases sharing a setup.

```ts
test("rejects expiry in the past", () => {
  expect(isValid(cardExpiredYesterday)).toBe(false);
});
```

### Name the expectation

The test name is the documentation of the unit's behaviour when read as a list. "returns the discounted price for a member" tells you what the system does; "test calculate price 2" tells you nothing on a failing run. Read the names in your suite as a specification and you will find both untested behaviour and tests that assert nothing meaningful.

```text
calculatePrice
  - applies no discount to a guest
  - applies ten percent to a member
  - rounds halves up to the nearest penny
```

### Arrange, act, assert

Give every test the same three-part shape, and keep the parts visually separate. The arrangement builds the world, the act performs the one operation under test, the assertion states the outcome. Mixing them makes a test that calls the unit four times and checks afterwards impossible to diagnose, because you cannot tell which call produced the failure.

```ts
const cart = cartWith(item("book", 1000));   // arrange
const total = cart.total();                 // act
expect(total).toBe(1000);                   // assert
```

### Prefer real values to clever setup

A test should be readable top to bottom without chasing helpers. Small factory functions with sensible defaults are fine — a hundred-line builder is not. When setup grows, it usually means the unit has too many collaborators, which is information about the production code rather than the test.

## Practice

### Rewrite a brittle test

Find a test that fails whenever you refactor the unit it covers. Rewrite it to assert only on observable behaviour, then refactor the unit and confirm the test still passes.

Done when: you changed the unit's internals and the test did not need to change.

### Read your suite as a specification

Open one test file and read only the test names, top to bottom. Write down what the unit's behaviour appears to be.

Done when: you can see at least one gap in the specification, and you have added a test for it.

## Common mistakes

- **Asserting on internal calls** — the test breaks on every refactor and blocks improvement; fix: assert on the return value or on state a caller can observe.
- **Multiple unrelated assertions in one test** — the first failure hides the rest and the name describes no single behaviour; fix: split into one test per expectation.
- **Sharing mutable setup between tests** — test order starts to matter and failures depend on which ran first; fix: build fresh state in each test.
- **Testing the framework instead of the code** — the test restates what the library already guarantees; fix: test the decisions your code makes.
- **Naming tests after the method** — a failing run gives no clue what behaviour broke; fix: name the expectation the test demonstrates.

## Go deeper

- **Test doubles and test data** (`01-cs-fundamentals/10-unit-testing/02-test-doubles-and-test-data`) — how to isolate the unit without making the test harder to read than the code.
- **Integration Testing** (`01-cs-fundamentals/21-integration-testing`) — what a unit test cannot tell you, and the boundary where its isolation becomes a problem.
- **Refactoring** (`01-cs-fundamentals/19-refactoring`) — the discipline these tests exist to protect.
