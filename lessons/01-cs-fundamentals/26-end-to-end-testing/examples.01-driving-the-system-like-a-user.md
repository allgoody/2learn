## Example 1 — A suite of one test per screen

A team wrote a test for each screen and asserts on values only the application can see. The suite is slow and misses the failures that matter. Say what these tests are actually checking, then rewrite one as a journey.

```ts
test("dashboard renders", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.locator("#user-count")).toHaveText("1");   // internal flag
});
```

### Solution

```ts
test("a new account reaches the dashboard", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Create account" }).click();
  await page.getByLabel("Email").fill("new@example.test");
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});
```

The old test proves that a component rendered; it cannot fail when the sign-up route is registered under the wrong path or a cookie is set on the wrong domain, because it starts after those things happened. A journey test crosses the wiring that nothing else sees, and it asserts on an outcome a user could describe. Selecting by role and label rather than a generated id makes the test fail only when the interface genuinely changes, and it forces the control to be reachable by name — which is also what a screen reader needs.

## Example 2 — One long test that performs three journeys

A single test signs up, orders and recovers a password in sequence, with a fixed delay between the steps. When it fails, the first broken step hides the others. Restructure it without losing the coverage.

```ts
test("the whole product", async ({ page }) => {
  await signUp(page);
  await page.waitForTimeout(3000);      // hope the account is ready
  await placeOrder(page);
  await recoverPassword(page);
});
```

### Solution

```ts
test("places an order", async ({ page }) => {
  await signInAs(page, "buyer@example.test");      // shared setup, extracted
  await placeOrder(page);
  await expect(page.getByText("Order confirmed")).toBeVisible({ timeout: 15_000 });
});

// the other journeys become their own tests, sharing the same setup helper
```

One journey per test means a failure names the user goal that broke, and the fix is obvious from the title; five journeys in one test fail for five possible reasons and stop at the first. Extracting the shared beginning keeps the setup in one place without chaining the assertions. Replacing the fixed wait with an assertion that waits for the expected state also removes the gamble: the test returns as soon as the page is ready and fails with a clear message when it never is.
