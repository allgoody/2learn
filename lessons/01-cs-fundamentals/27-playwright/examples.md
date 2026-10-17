## Example 1 — A selector that describes styling, and a wait that guesses

A test adds a product to the basket and asserts on the count. It breaks whenever the design changes, and it pauses 2 s before checking. Say what each line is coupled to, then rewrite it.

```ts
test("adds an item to the basket", async ({ page }) => {
  await page.goto("/shop");
  await page.click(".btn-primary.add");       // a CSS class, renamed by any restyle
  await page.waitForTimeout(2000);            // 2 s, done or not
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

Locators describe the element by what it is — its role, its label, its visible text — which is the information a user or a screen reader uses, so the test survives a styling refactor and fails only when the interface genuinely changes: renaming `.btn-primary.add` to `.button--primary` breaks the 40 tests that named the class while changing 0 behaviours, and breaks this test not at all. The assertion then waits for the condition and polls until it becomes true, so it returns at 0.3 s when the server is quick and at 1.8 s when it is loaded, whereas the 2 s sleep passes the first run only after wasting 2 - 0.3 = 1.7 s and fails as soon as the render takes 2.1 s. Both habits together are what the entry means by auto-waiting and web-first assertions. The usual mistake is to keep the sleep "just in case" after fixing the locator, so the test stays slow and keeps its slowest-machine failure.

## Example 2 — One page shared by every test

A suite opens one browser page and logs in through the sign-in form before each test. Later tests inherit earlier tests' carts, and a failure in the pipeline leaves nothing to inspect. Show how the tooling removes both problems.

```ts
const page = await browser.newPage();
await login(page);        // typed into the sign-in form before every test
// test 3 sees the cart that test 1 filled:  1 page, 2 tests, 1 leak
// pipeline failure: no screenshot, no trace, just a red line
```

### Solution

```ts
test.describe("checkout", () => {
  test.use({ storageState: "auth.json" });   // signed in once, fresh context per test
});

test("an empty basket shows the message", async ({ page }) => {
  await page.goto("/basket");
  await expect(page.getByText("Your basket is empty")).toBeVisible();
});

// config: trace and screenshot on failure, opened afterwards to step through the run
```

Each test gets its own browser context — clean cookies, clean storage, no shared session — so 20 tests leave 20 separate cookie jars and no test can see what another left behind: ordering cannot leak state, and the suite gives the same result whichever way it runs. The reused sign-in is stored once instead of driven through the form in every test, which removes 20 form fills for a 20-test file, each of them about 1.5 s of typing and waiting. Capturing a trace on failure turns a red line in the pipeline into a recorded sequence of actions, DOM snapshots and console output you can step through locally, which is often the difference between fixing a flake in 10 minutes and guessing for a day. The usual mistake is to keep one long-lived page for speed, and to retry the resulting failures without saving anything — the flake returns next week, and this time there is still no evidence.
