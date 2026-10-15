---
title: Driving the system like a user
prereqs: ["01-cs-fundamentals/21-integration-testing"]
---

## What it is

Driving the system like a user means interacting through the same interface a person would: the browser, the command line, the public API. The test clicks, types, uploads and submits, then asserts on what the user can observe — a confirmation, a row in a list, a message. It never reaches into internal state or calls a function directly, because the interface is the thing under test.

## Why it matters

The value of an end-to-end test is precisely that it assumes nothing about the inside of the system. It catches the wiring failures nothing else sees: an environment variable missing, a route registered under the wrong path, a cookie not set on the right domain, a migration not applied in the deployed order. Because each test costs seconds and each journey costs maintenance, the craft is choosing which few journeys deserve the cost and writing them so they survive interface changes.

## Core ideas

### Cover journeys, not screens

Pick the handful of paths whose failure would stop the product working: sign up, sign in, complete the core transaction, pay, recover a password. A test per screen produces dozens of slow tests with overlapping coverage; a test per journey covers the same ground with a fraction of them, and reads as a description of what the product does.

```text
sign-up journey:
  open landing -> create account -> verify email -> land in dashboard
```

### Interact the way a person does

Use the roles, labels and visible text a user relies on, rather than internal identifiers, so the test fails when the interface genuinely breaks rather than when a class name changes. It also forces the interface to be accessible, which is a real benefit: a control a test cannot find by its label is a control a screen reader cannot find either.

```ts
await page.getByRole("button", { name: "Place order" }).click();
await expect(page.getByText("Order confirmed")).toBeVisible();
```

### Assert on outcomes the user can see

Assert on the confirmation message, the new row, the redirected URL — not on a database query or an internal flag. The test is claiming that the product works, and only user-visible outcomes support that claim. When the only way to verify is to inspect the database, the test has quietly become an integration test and should live at that level instead.

### Keep the test short and focused

One journey per test, with the setup it needs stated plainly. A long test that performs five journeys in sequence fails for five possible reasons, and the first failure hides the others. Where journeys genuinely share a beginning, extract the setup rather than chaining the assertions.

### Plan for time and order

End-to-end tests run against a deployed system, so they meet real latency, real clocks and real queues. Anything that arrives asynchronously needs the test to wait for a condition rather than a fixed period. Treat every sleep as a bug that will eventually fail on a slow machine.

```ts
await expect(page.getByText("Processing complete")).toBeVisible({ timeout: 15_000 });
```

## Practice

### Write one journey, end to end

Choose the shortest path that produces value for a user in an application you work on. Write a single test that performs it through the real interface and asserts on the visible result.

Done when: the test passes against a freshly started system, and it fails if you break the feature deliberately.

### Trim a journey suite

Take an existing end-to-end file and count how many tests exist. Identify the journeys that overlap, and merge or delete until each remaining test covers a distinct user outcome.

Done when: every test in the file can be described by a user goal, and any that cannot have been removed.

## Common mistakes

- **One test per screen** — the suite becomes slow, overlapping and expensive without covering more risk; fix: test journeys that produce user value.
- **Selecting elements by internal ids or CSS classes** — styling refactors break tests that verify behaviour; fix: select by role, label or visible text.
- **Asserting on internal state** — the test proves an implementation detail, not that the product works; fix: assert on what the user can observe.
- **Fixed sleeps instead of waiting for a condition** — the test fails on a slow machine and passes on a fast one; fix: wait for the expected state with a generous timeout.
- **Chaining several journeys in one test** — the first failure masks all the others; fix: one journey per test with shared setup extracted.

## Go deeper

- **Integration Testing** (`01-cs-fundamentals/21-integration-testing`) — the layer to use when only one seam is in question, so read it first.
- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — where the bulk of coverage should live so these journeys stay few.
- **Making end-to-end tests trustworthy** (`01-cs-fundamentals/26-end-to-end-testing/02-making-end-to-end-tests-trustworthy`) — keeping the journeys you just wrote from becoming flaky.
