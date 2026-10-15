---
title: Playwright
type: skill
topic: 01-cs-fundamentals
tier: small
status: drafted
aliases: []
prereqs: ["01-cs-fundamentals/26-end-to-end-testing"]
related: []
---

## What it is

Playwright is a browser-automation library for writing end-to-end and cross-browser tests. A test drives a real browser through a small API: find an element, click it, type into it, assert what the page shows. Its distinguishing feature is that it waits for the page to reach the state a human would need before acting, rather than requiring you to sprinkle delays through the test. It runs the same test in several browser engines without changing the code.

## Why it matters

Browser tests have historically been flaky, slow and painful to debug, and most of that reputation came from tooling that made the author responsible for timing. Playwright moves the waiting into the library, isolates each test in its own browser context, and records enough evidence — a trace, screenshots, console output — to understand a failure after the fact. That changes the economics: a trustworthy end-to-end suite becomes something a team can afford to keep, rather than one that gets deleted after a quarter of red builds.

## Core ideas

### Locators describe the element, not its position

A locator finds an element by what it is: its role, its label, its visible text. That is the same information a user or a screen reader uses, so the test survives styling and markup reshuffles and fails only when the interface genuinely changes. Chain locators to narrow scope, and keep them short enough to read at a glance.

```ts
await page.getByRole("button", { name: "Add to basket" }).click();
await expect(page.getByRole("listitem")).toHaveCount(3);
```

### Auto-waiting and web-first assertions

Actions wait for the element to be actionable, and assertions wait for the condition to become true, polling until a timeout. The test describes the expected end state instead of a sequence of timing guesses. This is the single biggest difference from older tools, and it is why an explicit sleep in a Playwright test is usually a sign that something else is wrong.

```ts
await expect(page.getByText("Saved")).toBeVisible();
await page.getByLabel("Email").fill("user@example.com");
```

### Each test gets a fresh context

By default every test runs in a new browser context: clean cookies, clean storage, no shared session. That isolation removes the most common source of cross-test flakiness for free. State that must be shared — a logged-in session — can be set up once and reused, which is faster than logging in through the interface in every test.

```ts
test.describe("checkout", () => {
  test.use({ storageState: "auth.json" });   // start signed in
});
```

### One API across browsers

The same test runs against several browser engines, so cross-browser behaviour is verified by configuration rather than by rewriting tests. Emulation of viewport, locale, timezone and even network conditions is part of the same API, which makes it practical to test the mobile layout and the slow-connection path in the same suite.

```text
run the suite on chromium, firefox and webkit from one config
```

### Debugging is built into the workflow

A trace records the actions, the DOM snapshots, the console output and the network log for a run, and can be opened after the fact to step through what happened. That turns "it failed in the pipeline" into evidence you can inspect locally, which is often the difference between fixing a flake in ten minutes and guessing for a day.

```text
run with tracing on failure -> open the trace -> step to the failing action
```

## Practice

### One small runnable test

Write a test that opens a page, fills a search field, submits it and asserts that a result appears. Run it headless, then run it again with tracing enabled.

```ts
import { test, expect } from "@playwright/test";

test("search returns at least one result", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Search").fill("keyboard");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByRole("listitem").first()).toBeVisible();
});
```

Done when: the test passes on a local server, fails with a clear message when you make the search field empty on purpose, and the trace opens to show the failing action.

### Replace a sleep with an assertion

Find a test that waits with a fixed delay, or contains a retry loop around an assertion. Replace it with a waiting assertion.

Done when: the test is faster and still fails correctly when the expectation is not met.

## Common mistakes

- **Selecting by CSS class or generated id** — a styling change breaks a test that verifies behaviour; fix: select by role, label or visible text.
- **Adding explicit waits or sleeps** — the test only appears stable and fails on slower machines; fix: rely on auto-waiting and web-first assertions.
- **Sharing one page between tests** — state leaks and failures depend on order; fix: let each test use its own context.
- **Asserting on values the user cannot see** — the test proves an implementation detail; fix: assert on what the page actually shows.
- **Ignoring the trace and guessing at the fix** — the same flake returns next week; fix: open the recorded trace before changing anything.

## Go deeper

- **End-to-End Testing** (`01-cs-fundamentals/26-end-to-end-testing`) — the discipline this tool serves, so read it first for what to test and why.
- **Making end-to-end tests trustworthy** (`01-cs-fundamentals/26-end-to-end-testing/02-making-end-to-end-tests-trustworthy`) — the habits that keep a browser suite honest, with Playwright's tooling as the concrete case.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — what to do when the trace shows a failure you do not yet understand.
