## Example 1 — A reported bug, fixed test-first

Support reports that a coupon is applied to gift cards, which should always sell at face value. The fix is a one-branch guard. Show the order the work happens in, and what the finished test leaves behind.

```ts
// the report, and the code where the bug lives
// "gift cards get the SAVE10 discount"
const SAVE10 = { rate: 0.10 };          // 0.10 is ten per cent off
function priceOf(item, coupon) {
  return item.price * (1 - coupon.rate);
}
// the gift card: 50 * (1 - 0.10) = 50 * 0.90 = 45, where 50 is the correct price
```

### Solution

```ts
// 1. red: reproduce the report before touching the code
test("ignores coupons on gift cards", () => {
  expect(priceOf(giftCard(50), SAVE10)).toBe(50);
});
// FAIL: expected 50, received 45    <- the defect, confirmed on demand
// 45 is 50 * (1 - 0.10), the discounted price the report was complaining about

// 2. green: the smallest guard that turns that red into a pass
function priceOf(item, coupon) {
  if (item.kind === "gift-card") return item.price;   // 1 branch, 1 case
  return item.price * (1 - coupon.rate);
}
```

Writing the test first is what turns the report into a confirmed diagnosis: the run printed 45 where 50 belongs, exactly as support described, so the guard that follows addresses a defect that demonstrably exists. A test written after the fix would still be a regression guard — it will catch the next change that reintroduces the discount — but it would never have shown the wrong number, and a guard added without a reproduced failure is a guess about which condition mattered. What usually goes wrong is fixing the reported case only: here the guard checks `kind === "gift-card"` and nothing else, so a second item kind with the same exemption needs its own red before the code is extended again.

## Example 2 — Glue that unit tests only make brittle

A router registers handlers at start-up, and a reviewer asks for unit tests on the registration order. Show what such a test would have to assert, and why the suite is better covered elsewhere.

```ts
export function registerRoutes(router, handlers) {
  for (const h of handlers) router.add(h.method, h.path, h.fn);
}

// 12 routes, 3 arguments each = 36 values the function forwards and decides nothing about
// proposed test: expect(router.add).toHaveBeenNthCalledWith(1, "GET", "/health", fn)
```

### Solution

```ts
// the integration test: start 1 system, send 1 request, assert 1 status code
test("GET /health answers 200", async () => {
  const app = await startApp({ handlers: handlersForTest });
  const res = await app.request("/health");
  expect(res.status).toBe(200);
});
```

The registration function has no behaviour of its own: it forwards 3 arguments per route and makes 0 decisions, so a unit test can only assert the order in which the 36 forwarded values arrived. Reorder 2 of the 12 routes and that test fails while the router keeps working — 0 of its 36 assertions would tell you whether a request reaches its handler. Starting the system and sending one request does tell you: it crosses the seam the router actually sits behind, and its single assertion breaks only when 1 of the 12 routes is genuinely unreachable. What usually goes wrong is measuring a function by its existence rather than by the decisions it makes; test-first is a tool for rules and calculations, not a tax on every function in the file.
