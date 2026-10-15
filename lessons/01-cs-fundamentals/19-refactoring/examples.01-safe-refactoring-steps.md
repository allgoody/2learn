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
// step 1: structure only — tests unchanged, and green
function calcTotal(items) { return Math.floor(sumPrices(items)); }

// step 2: behaviour only — with its own new test
test("rounds to the nearest penny", () => {
  expect(calcTotal([{ price: 1.005 }])).toBe(1.01);
});
```

Run the tests after step 1: if they fail, the rename or the extraction was wrong. Then run them after step 2: a failure now can only be the rounding. Wearing one hat at a time is what makes the test run informative. Mixing the two leaves both hypotheses open, and the reviewer cannot tell which half of the diff was meant to be behaviour-preserving.

## Example 2 — Restructuring code that has no tests

You have been asked to break a legacy formatter's one large function into three. Nothing covers it. Show how to earn the right to move the code before moving it.

```ts
function formatLegacy(input) {
  // 80 lines: trims, pads, uppercases, appends a suffix
}
// no tests; nobody knows which parts are intentional
```

### Solution

```ts
// three characterisation tests, recorded from the current code
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

These tests do not assert the formatter is correct — one of them records padding a value nobody wanted padded. They assert only that whatever it does today, it still does it tomorrow. That is exactly the licence a refactoring needs, and it is why they are written against the current implementation before any code moves. Extracting with no net is not a refactoring; it is a guess with extra confidence.
