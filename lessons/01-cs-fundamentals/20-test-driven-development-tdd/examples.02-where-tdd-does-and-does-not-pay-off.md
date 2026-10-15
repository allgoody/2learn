## Example 1 — A reported bug, fixed test-first

Support reports that a coupon is applied to gift cards, which should always sell at face value. The fix is a two-line guard. Show the order the work should happen in, and what it leaves behind.

```ts
// the report, and the code where the bug lives
// "gift cards get the SAVE10 discount"
function priceOf(item, coupon) {
  return item.price * coupon.rate(item);
}
```

### Solution

```ts
// 1. red: reproduce it before touching the code
test("ignores coupons on gift cards", () => {
  expect(priceOf(giftCard(50), SAVE10)).toBe(50);
});
// FAIL: expected 50, received 45     <- the defect, confirmed

// 2. green: the smallest guard
function priceOf(item, coupon) {
  if (item.kind === "gift-card") return item.price;
  return item.price * coupon.rate(item);
}
```

The failing test is the only proof the bug existed and the only guard against its return, which is why bug fixes are the strongest case for the loop. Writing the test after the fix would still catch a regression, but it would never confirm the diagnosis — and a guard added without a reproduced failure is a guess about which condition mattered. The loop here is not ceremony; it is what turns a report into a named, permanent case.

## Example 2 — Glue that unit tests only make brittle

A router registers handlers at start-up. A reviewer asks for unit tests on the registration order. Show what the test would assert and why the suite is better covered elsewhere.

```ts
export function registerRoutes(router, handlers) {
  for (const h of handlers) router.add(h.method, h.path, h.fn);
}
// proposed test: expect(router.add).toHaveBeenNthCalledWith(1, "GET", "/health", fn)
```

### Solution

```ts
// the integration test: start the system and cross the real seam
test("GET /health answers 200", async () => {
  const app = await startApp({ handlers: handlersForTest });
  const res = await app.request("/health");
  expect(res.status).toBe(200);
});
```

The registration function has almost no behaviour of its own — it forwards arguments. A unit test can only assert the call order, an implementation detail that breaks whenever the wiring is reorganised, while proving nothing about whether a request reaches the handler. Start the system and make a request: that is the level at which the wiring's correctness is actually observable. Test-first is a tool for rules and calculations, not a tax on every function that exists.
