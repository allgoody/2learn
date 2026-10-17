## Example 1 — A suite of one test per screen

A team wrote one test per screen: 40 screens, 40 tests, each opening a single page and asserting on a value only the application can see. The suite costs 40 * 2 = 80 s, and not one test crosses from a new account to the dashboard, so a sign-up route registered under the wrong path escapes it. Say what these tests are really checking, then rewrite one as a journey.

```ts
test("dashboard renders", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.locator("#user-count")).toHaveText("1");   // a count only the code can see
  // 40 screens tested this way: 40 * 2 = 80 s, and no journey from sign-up to dashboard
});
```

### Solution

```ts
test("a new account reaches the dashboard", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Create account" }).click();
  await page.getByLabel("Email").fill("new+e2e-20260301-7f3a@example.test");
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});
```

The old test proves that a page rendered after its own setup; it cannot fail when the sign-up route is registered under the wrong path or a session cookie is set on the wrong domain, because it starts after those things have already happened. The journey test costs about 20 s against the screen test's 2 s, and buys the 4 screens it crosses, each one a step the user performs. Selecting by role and label rather than a generated id makes the test fail only when the interface genuinely changes, and it forces the control to be reachable by name, which is also what a screen reader needs. The usual mistake is starting the test one step past the wiring: it then passes while the product is broken in exactly the place nothing else looks.

## Example 2 — One long test that performs three journeys

A single test signs up, orders and recovers a password in sequence, with a 3 s delay between the steps. It reports at most one of the three journeys when it fails, and the first broken step hides the two behind it. Restructure it without losing coverage.

```ts
test("the whole product", async ({ page }) => {
  await signUp(page);
  await page.waitForTimeout(3000);      // a guess at how long sign-up takes
  await placeOrder(page);
  await recoverPassword(page);
});
```

### Solution

```ts
test("places an order", async ({ page }) => {
  await signInAs(page, "buyer+e2e-20260301-7f3a@example.test");   // shared setup, extracted
  await placeOrder(page);
  await expect(page.getByText("Order confirmed")).toBeVisible({ timeout: 15_000 });
});

// the other journeys become their own tests, sharing the same setup helper
```

One journey per test means a failure names the user goal that broke, and the fix is obvious from the title. Three journeys inside one test report 1 outcome and then stop, so the 2 later journeys are never run; three tests report all 3 outcomes in the same run, the failure red and the 2 passes green. Extracting the shared beginning keeps the setup in one place without chaining the assertions, and each test gets a run-unique account rather than competing for one seeded row. Replacing the 3 s delay with an assertion that waits for the outcome removes the gamble as well: sign-up finishes in 0.4 s on a quiet machine and 3.2 s on a loaded one, so the delay passes on the first and fails on the second, while the waiting assertion returns at either time and fails only when the outcome never appears.
