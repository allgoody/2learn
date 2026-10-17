## Example 1 — A test that breaks on every refactor

The test below passes today and fails whenever the internals of `PriceCalculator` change, even when the value a caller receives is identical. The case is one order: a single item priced 1 000 pence, placed by a member whose discount is ten percent, so the correct total is 1 000 − 100 = 900 pence. Say what the assertions are actually about, then rewrite the test so the unit can be refactored freely.

```ts
test("test calculate price 2", () => {
  const cart = cartWith(item("book", 1000), { memberRate: 10 });   // 1 000 pence, 10% off
  const calculator = new PriceCalculator();
  const result = calculator.calculate(cart);
  expect(calculator.rounding).toHaveBeenCalledWith(1000);
  expect(calculator.discounts).toHaveBeenCalledTimes(1);
  expect(result).toBe(900);
});
```

### Solution

```ts
const item = { sku: "book", pricePence: 1000 };   // one item, 1 000 pence
const memberRate = 10;                            // 10% for a member

test("applies ten percent to a member", () => {
  const cart = cartWith(item, memberRate);

  const total = new PriceCalculator().calculate(cart);

  expect(total).toBe(900);   // 1000 - (1000 * 10 / 100) = 1000 - 100 = 900
});
```

The two call assertions describe the current implementation, not the price: move the rounding into a private helper, or fold the discount into the rounding step so no separate call is made, and the test fails while the member still owes 900 pence. `toHaveBeenCalledWith(1000)` also names the item price rather than the behaviour, so it says nothing about what the price should become. The rewritten test asks the one question a caller asks — what does this cost a member — so any refactor that keeps the answer at 900 passes, and the name states the rate the case is about. The trap is that call assertions are easy to add once a collaborator is already replaced by a spy, and they feel like extra safety until the first refactor turns them into a reason to skip the change.

## Example 2 — Five assertions and one failure message

The test below checks a whole expiry rule in one go. The card expires in `2024-01`, which means it is valid through 31 January 2024; the first case asks on 1 February 2024, one day past the end of that month, and the second asks on 15 January 2024, inside the final month, so the rule accepts it. Say what a reader learns from a red run, then rewrite it as tests that fail for one reason each.

```ts
test("expiry", () => {
  const card = { expires: "2024-01" };
  expect(isValid(card, today("2024-02-01"))).toBe(false);
  expect(isValid(card, today("2024-01-15"))).toBe(true);
  expect(isValid(null, today("2024-01-15"))).toBe(false);
});
```

### Solution

```ts
test("rejects a card once its month has passed", () => {
  expect(isValid({ expires: "2024-01" }, today("2024-02-01"))).toBe(false);
});

test("accepts a card during its final month", () => {
  expect(isValid({ expires: "2024-01" }, today("2024-01-15"))).toBe(true);
});

test("rejects a missing card", () => {
  expect(isValid(null, today("2024-01-15"))).toBe(false);
});
```

A red run on the original reports only the first broken expectation, so of its three cases one is named and the other two stay unknown until the first is fixed. Each split test now fails for one reason, and the names read as a specification when the suite is listed: a card one day past its month is rejected, a card inside its final month is accepted, a missing card is rejected. The trap is that the combined version looks tidier — one setup, one test — while quietly making the three cases depend on the order they run in, so a red line at 15 January hides a broken null check.
