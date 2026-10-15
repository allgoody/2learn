## Example 1 — A test that breaks on every refactor

The test below passes today and fails whenever the unit's internals change, even when the outcome a caller sees is identical. Say what it asserts and why that is the wrong thing, then rewrite it so the unit can be refactored freely.

```ts
test("test calculate price 2", () => {
  const calculator = new PriceCalculator();
  const result = calculator.calculate(memberCart);
  expect(calculator.rounding).toHaveBeenCalledWith(1000);
  expect(calculator.discounts).toHaveBeenCalledTimes(1);
  expect(result).toBe(900);
});
```

### Solution

```ts
test("applies ten percent to a member", () => {
  const cart = cartWith(item("book", 1000), member);

  const total = new PriceCalculator().calculate(cart);

  expect(total).toBe(900);
});
```

The original asserts that two collaborators were called, which describes the current implementation: extract a helper, inline the rounding, or reorder the discount application and it fails while the price is still correct. Asserting on the returned total tests the decision the unit makes, so any refactor keeping the answer at 900 passes. The trap is that call assertions are easy to add once the collaborator is already a spy, and they feel like extra safety until the first refactor turns them into a reason to skip the change.

## Example 2 — Five assertions and one failure message

The test below checks a whole expiry rule at once. Only the first failing assertion is reported, and the name describes no behaviour. Say what a reader learns from a red run, then rewrite it as tests that fail for one reason each.

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

A red run on the original reports only the first broken expectation, so a second bug in the same test stays hidden until the first is fixed. Each split test now fails for exactly one reason, and the names read as a specification when the suite is listed. The trap is that the combined version looks tidier, one setup and one test, while quietly making the cases depend on each other's order.
