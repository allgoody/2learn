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

Playwright is a browser-automation library for writing end-to-end and cross-browser tests. A test drives a real browser through a small API — find an element, click it, type into it, assert what the page shows — and the library runs the same file in several browser engines without a code change. Its distinguishing feature is that it waits for the page to reach the state a human would need before acting, instead of making the author responsible for timing.

## Why it matters

Browser tests have historically been flaky, slow and painful to debug, and most of that reputation came from tooling that made the author responsible for timing. A test that waits with a fixed 3 s sleep passes when the server answers in 0.4 s, fails when it answers in 3.2 s, and burns 3 s on the way either way; a waiting assertion returns at 0.4 s or at 3.2 s and spends that time only when something is genuinely wrong. Across a 100-test suite, replacing one 3 s sleep per test with a wait that returns after 0.4 s saves 100 * 3 - 100 * 0.4 = 300 - 40 = 260 s per run, and removes the failures that appear only on the slowest machine. Playwright moves the waiting into the library, isolates each test in its own browser context, and records enough evidence — a trace, screenshots, console output — to understand a failure after the fact. That changes the economics: a trustworthy end-to-end suite becomes something a team can afford to keep, rather than one that gets deleted after a quarter of red builds.

## Core ideas

### Locators describe the element, not its position

A locator finds an element by what it is: its role, its label, its visible text. That is the same information a user or a screen reader uses, so the test survives styling and markup reshuffles and fails only when the interface genuinely changes: renaming `.btn-primary.add` to `.button--primary` breaks the 40 tests that named the class while changing 0 behaviours, and breaks a role-based locator not at all. Chain locators to narrow scope, and keep them short enough to read at a glance.

```ts
for (const name of ["Keyboard", "Mouse", "Monitor"]) {
  await page.getByRole("button", { name: "Add to basket" }).click();
}
await expect(page.getByRole("listitem")).toHaveCount(3);   // 3 names added, 3 rows expected
```

### Auto-waiting and web-first assertions

Actions wait for the element to be actionable, and assertions wait for the condition to become true, polling it until a timeout — 5 s for an expectation and 30 s for an action, out of the box. The test therefore describes the expected end state instead of a sequence of timing guesses: a save that takes 0.4 s on a quiet machine and 3.2 s on a loaded one is asserted once, and the assertion returns at 0.4 s in the first case and 3.2 s in the second, with no number chosen by the author. This is the single biggest difference from older tools, and it is why an explicit sleep in a Playwright test is usually a sign that something else is wrong.

```ts
await expect(page.getByText("Saved")).toBeVisible();        // returns at 0.4 s or at 3.2 s
await page.getByRole("button", { name: "Save" }).click();   // waits until the button is clickable
```

### Each test gets a fresh context

By default every test runs in a new browser context: clean cookies, clean storage, no shared session. That isolation removes the most common source of cross-test flakiness for free, because 20 tests leave 20 separate cookie jars, so no test can read what another wrote and the suite gives the same result in any order. State that must be shared — a signed-in session — can be set up once and stored, which is faster than driving the sign-in form in every test: 20 stored sessions remove 20 form fills, each about 1.5 s of typing and waiting, so 20 * 1.5 = 30 s per run.

```ts
test.describe("checkout", () => {
  test.use({ storageState: "auth.json" });   // signed in once; a fresh context per test
});
```

### One API across browsers

The same test runs against several browser engines, so cross-browser behaviour is verified by configuration rather than by rewriting the test: one file on 3 engines — Chromium, Firefox and WebKit — is 3 runs of the same assertions. Emulation of viewport, locale, timezone and network conditions is part of the same API, which makes it practical to cover the mobile layout and the slow-connection path in the same suite: a 390-pixel-wide viewport — the width of a small phone screen — and a connection throttled to 50 kilobits per second, which is 50 000 / 8 = 6 250 bytes per second and about 6 kilobytes per second, are two settings rather than two test files.

```text
one config file, three engines:  chromium, firefox, webkit
the same 20 tests run 3 times = 60 runs, with no test file copied
```

### Debugging is built into the workflow

A trace records the actions, the DOM snapshots, the console output and the network log for a run, and can be opened after the fact to step through what happened. That turns a failure at the end of a pipeline into evidence you can inspect locally, which is often the difference between fixing a flake in 10 minutes and guessing for a day: with the trace the failing action is usually found in about 10 minutes, while recreating the environment, the data and the timing without it can cost roughly 4 hours.

```text
run with tracing on failure -> open the trace -> step to the failing action
```

## Practice

### One small runnable test

Write a test that opens a page, fills a search field, submits it and asserts that a result appears. Run it headless, then run it again with tracing enabled. The whole test performs 1 page load, 1 fill and 1 click, and asserts on 1 visible row; it needs no delay, because the assertion returns as soon as the row exists.

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

Find a test that waits with a fixed delay, or contains a retry loop around an assertion. Replace the delay with a waiting assertion: if the delay was 3 s and the state usually arrives after 0.4 s, the run loses 3 - 0.4 = 2.6 s of waiting and gains a failure message that names what was missing.

Done when: the test is faster and still fails correctly when the expectation is not met.

## Common mistakes

- **Selecting by CSS class or generated id** — renaming `.btn-primary.add` to `.button--primary` breaks the 40 tests that named the class while changing 0 behaviours; fix: select by role, label or visible text.
- **Adding explicit waits or sleeps** — a 3 s sleep burns 3 s of every run and fails as soon as the answer takes 3.2 s; fix: rely on auto-waiting and web-first assertions.
- **Sharing one page between tests** — 20 tests over 1 page leave 19 chances for one test to read another's state, and the result depends on execution order; fix: let each test use its own context.
- **Asserting on values the user cannot see** — the test proves an implementation detail and passes while the page is wrong; fix: assert on what the page actually shows.
- **Ignoring the trace and guessing at the fix** — the same flake returns next week, and each guess costs hours against about 10 minutes with a trace; fix: open the recorded trace before changing anything.

## Go deeper

- **End-to-End Testing** (`01-cs-fundamentals/26-end-to-end-testing`) — the discipline this tool serves, so read it first for what to test and why.
- **Making end-to-end tests trustworthy** (`01-cs-fundamentals/26-end-to-end-testing/02-making-end-to-end-tests-trustworthy`) — the habits that keep a browser suite honest, with Playwright's tooling as the concrete case.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — what to do when the trace shows a failure you do not yet understand.
