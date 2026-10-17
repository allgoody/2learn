---
title: What makes a good unit test
prereqs: []
---

## What it is

A good unit test is a short piece of code that states one expectation about one unit and can fail for exactly one reason: `expect(cart.total()).toBe(900)` fails when the total is not 900 pence, and it cannot fail because a helper inside the unit was renamed. The unit is the code under test — usually one function such as `calculatePrice`, sometimes a class with its collaborators replaced by stand-ins the test controls. The test builds its own state, calls the unit, and asserts on the value the caller receives; it never inspects how that value was produced, which is what lets you refactor the unit afterwards without touching the test.

## Why it matters

A unit test is the cheapest feedback a developer can get, and the arithmetic is why. Take 1 000 tests that touch nothing outside the test process: at 1 millisecond each, one full run costs 1 000 × 1 ms = 1 000 ms, about a second, short enough to run on every save. Point the same 1 000 tests at a real database at 50 milliseconds each and the run costs 1 000 × 50 ms = 50 000 ms — fifty seconds — long enough that people stop running the suite before they save, and a mistake then survives until a deploy. The other half of the cost is trust, and it is invisible until a test is written badly. Rename a method, extract a helper, reorder two lines inside `PriceCalculator`: nothing a caller sees has changed — the one item still costs 1 000 pence, and at the ten percent member rate 1 000 − 100 = 900 pence is still the total — yet a test that asserts which internal methods ran goes red anyway. Five red runs like that in a week teach the team to re-run until green, and from then on the suite reports nothing at all.

## Core ideas

### Test behaviour, not implementation

Assert on what the unit produces, not on how it produced it. The two assertions below are about the same saved order, id 7 with status `saved`, but only the second survives a refactor.

```ts
const item = { sku: "book", pricePence: 1000 };   // one item, 1 000 pence
const saved = { id: 7, status: "saved" };         // the value the caller gets back

// brittle: asserts how — that this collaborator, carrying id 7, was called
expect(repo.save).toHaveBeenCalledWith(expect.objectContaining({ id: 7 }));

// durable: asserts what — the id 7 and status the caller received
expect(result).toEqual({ id: 7, status: "saved" });
```

Batch two saves into one flush, or put a cache in front of the repository, and the first assertion fails, because the method it names is no longer the one that runs — while the caller still receives `{ id: 7, status: "saved" }` for the same 1 000-pence item. The signal to watch for is a test that has to change whenever you refactor the unit: it is describing the implementation, and it will resist every improvement you make.

### One reason to fail

A test that asserts five things at once reports one of them. The framework stops at the first failing assertion, so the four later ones never run, and their outcomes stay unknown until the first is fixed. Keep the setup, the single action and the assertion in view, so a reader can understand the case without scrolling.

```ts
const card = { expires: "2024-01" };    // valid through 31 January 2024
const today = new Date("2024-02-01");   // one day past the end of that month

test("rejects a card once its month has passed", () => {
  expect(isValid(card, today)).toBe(false);
});
```

Here the input is one card and one date, the action is one call to `isValid`, and the expectation is one value, so a red run has one explanation. When a test needs several assertions, ask whether it is really several test cases sharing a setup.

### Name the expectation

The test name is the unit's specification when the suite is read as a list. `applies ten percent to a member` states the input and the expected value; `test calculate price 2` states neither, so a red run at 900 pence sends you back into the code to find out what was expected.

```text
calculatePrice
  - applies no discount to a guest     1000 pence in, 1000 pence out
  - applies ten percent to a member    1000 in, 1000 - 100 = 900 out
  - rounds a half penny up             905 in, 905 - 91 = 814 out

ten percent of 905 is 90.5 pence, which rounds up to 91, and 905 - 91 = 814
```

Read down the three names and a missing case stands out as the line that is not there — say `charges the discount before tax`. Read down a list of `test calculate price 1`, `2`, `3` and nothing stands out, because no line states a behaviour.

### Arrange, act, assert

Give every test the same three-part shape and keep the parts visually separate: the arrangement builds the world, the act performs the one operation under test, the assertion states the outcome.

```ts
const cart = cartWith(item("book", 1000));   // arrange: one item, 1 000 pence
const total = cart.total();                 // act: one call to the unit
expect(total).toBe(1000);                   // assert: 1 000 pence, no discount
```

A test that calls the unit four times and checks once afterwards offers four candidate causes for the one failure it prints, and the message does not say which call went wrong; the same four cases as four tests of one call each name the cause on the failing line. Mixing the parts also lets a test come to depend on the order of its own statements, which fails as soon as someone reorders them.

### Prefer real values to clever setup

A test should read top to bottom without chasing helpers. A factory whose defaults are three plausible fields — sku `book`, price 1 000 pence, quantity 1 — is read in place beside the assertion. The trouble starts when the helper needs a dozen optional fields and a branch for each: `makeOrder({ total: 900 })` is one short line that tells you nothing, because the other eleven fields are decided two files away and a reader who wants the currency or the customer has to go and find them. The seven-field order literal written out in the test is longer and plainer than the same seven values hidden behind an options object. Setup that keeps growing usually means the unit has too many collaborators, which is information about the production code rather than about the test.

## Practice

### Rewrite a brittle test

Find a test that fails whenever you refactor the unit it covers. Rewrite it to assert on observable behaviour — the value a caller receives, not the calls the unit makes. Then refactor the unit: rename one method, or move one step into a helper.

Done when: you changed the unit's internals, the value it returns is unchanged, and the test passes without being edited.

### Read your suite as a specification

Open one test file and read only the test names, top to bottom, skipping the bodies. Write down what the unit's behaviour appears to be from those names alone.

Done when: each name states its input and its expected value — 1 000 pence in, 900 pence out — and every behaviour you know the unit implements appears in the list; add a test for any that does not, then break the unit's value and watch that new test fail.

## Common mistakes

- **Asserting on internal calls** — extract one helper and the assertion fails while the caller's value is still 900 pence for the same 1 000-pence item; fix: assert on the return value or on state a caller can observe.
- **Several unrelated assertions in one test** — five assertions produce one failure message, so four outcomes stay unknown until the first is fixed; fix: split into one test per expectation.
- **Sharing mutable setup between tests** — the failure then depends on which of the two tests ran first, and the suite can report a different test for the same defect; fix: build fresh state inside each test.
- **Testing the framework instead of the code** — asserting that a JSON parser turns `{"a": 1}` into a value of 1 restates the library's guarantee and catches nothing in your code; fix: test the decisions your code makes, such as what 1 000 pence becomes at the member rate.
- **Naming tests after the method** — `test calculate price 2` tells a reader nothing about the 900 pence it expects, so a red run needs a code read to interpret; fix: name the expectation the test demonstrates.

## Go deeper

- **Test doubles and test data** (`01-cs-fundamentals/10-unit-testing/02-test-doubles-and-test-data`) — how to isolate the unit without making the test harder to read than the code.
- **Integration Testing** (`01-cs-fundamentals/21-integration-testing`) — what a unit test cannot tell you, and the boundary where its isolation becomes a problem.
- **Refactoring** (`01-cs-fundamentals/19-refactoring`) — the discipline these tests exist to protect.
