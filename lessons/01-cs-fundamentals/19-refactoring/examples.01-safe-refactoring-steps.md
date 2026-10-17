## Example 1 — One commit that refactors and changes behaviour

A developer tidies a pricing function and rounds the result differently at the same time. The tests they ran afterwards went red. Decide what the change actually was, then split it.

```ts
// before
function calc(v) { return Math.floor(v.reduce((s, i) => s + i.price, 0)); }

// after — renamed, extracted, and now rounds up
function totalPrice(items) {
  return Math.round(sumPrices(items));
}
```

### Solution

```ts
// step 1: structure only — 2 names changed, 1 body extracted, and the tests unchanged
function calcTotal(items) { return Math.floor(sumPrices(items)); }

// step 2: behaviour only — with its own new test
test("rounds the half up", () => {
  expect(totalPrice([{ price: 12.5 }])).toBe(13);
});
// Math.floor(12.5) = 12 and Math.round(12.5) = 13: the difference is 1
```

Run the tests after step 1: if they fail, the rename or the extraction was wrong. Then run them after step 2: a failure now can only be the rounding, because that is the only behaviour that moved — 1 diff holding both hats opens 2 hypotheses at once, and the reviewer cannot tell which half of the diff was meant to be behaviour-preserving. Wearing one hat at a time is what makes the test run informative.

## Example 2 — Restructuring code that has no tests

You have been asked to break a legacy formatter's one large function into three. Nothing covers it. Show how to earn the right to move the code before moving it.

```ts
function formatLegacy(input) {
  // 80 lines: trims, pads, uppercases, appends a suffix
  // 12 branches; the 3 you are about to move are trim, pad, uppercase
}
// 0 tests; nobody knows which parts are intentional
```

### Solution

```ts
// three characterisation tests, recorded from the current code, 1 per branch being moved
test("pads a short value", () => {
  expect(formatLegacy("ab")).toBe("ab  ");
});
test("handles an empty value", () => {
  expect(formatLegacy("")).toBe("  ");
});
test("uppercases before padding", () => {
  expect(formatLegacy("a b")).toBe("A B ");
});

// then, with the net in place: extract one responsibility, run the tests
```

These tests do not assert the formatter is correct — 1 of the 3 records padding a value nobody wanted padded, so it pins behaviour you would change if you were allowed to. They assert only that whatever it does today, it still does it tomorrow, which is exactly the licence a refactoring needs and why they are written against the current implementation before any code moves. Extracting with no net is not a refactoring; it is a guess with extra confidence.
