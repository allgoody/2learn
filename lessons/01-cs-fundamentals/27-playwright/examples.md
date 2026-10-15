## Example 1 — A selector that describes styling, and a wait that guesses

A test adds a product and asserts on the basket. It breaks whenever the design changes and it is slow. Say what each line is coupled to, then rewrite it.

```ts
test("adds an item to the basket", async ({ page }) => {
  await page.goto("/shop");
  await page.click(".btn-primary.add");       // a CSS class
  await page.waitForTimeout(2000);            // an explicit sleep
  await expect(page.locator("#basket-count")).toHaveText("1");
});
```

### Solution

```ts
test("adds an item to the basket", async ({ page }) => {
  await page.goto("/shop");
  await page.getByRole("button", { name: "Add to basket" }).click();
  await expect(
    page.getByRole("listitem").filter({ hasText: "Keyboard" }),
  ).toHaveCount(1);
});
```

Locators describe the element by what it is — its role, its label, its visible text — which is the information a user or a screen reader uses, so the test survives a styling refactor and fails only when the interface genuinely changes. The assertion then waits for the condition and polls until it becomes true, which is why an explicit sleep is usually a sign that something else is wrong: it is slower than waiting and it fails on the machine that is slowest. Both habits together are what the entry means by auto-waiting and web-first assertions.

## Example 2 — One page shared by every test

A suite opens one browser page and logs in through the interface before each test. Later tests inherit earlier tests' carts, and a failure in the pipeline leaves nothing to inspect. Show how the tooling removes both problems.

```ts
const page = await browser.newPage();
await login(page);                  // typed into the form every time
// test 3 sees the cart that test 1 filled
// pipeline failure: no screenshot, no trace, just a red line
```

### Solution

```ts
test.describe("checkout", () => {
  test.use({ storageState: "auth.json" });   // signed in, fresh context per test
});

test("an empty basket shows the message", async ({ page }) => {
  await page.goto("/basket");
  await expect(page.getByText("Your basket is empty")).toBeVisible();
});

// config: trace and screenshot on failure, opened afterwards to step through the run
```

Each test gets its own browser context — clean cookies, clean storage, no shared session — so ordering cannot leak state between tests, and the reused sign-in is set up once and stored rather than driven through the form every time. Capturing a trace on failure turns a red line in the pipeline into a recorded sequence of actions, DOM snapshots and console output you can step through locally. That is the difference between fixing a flake in ten minutes and guessing at it for a day.
