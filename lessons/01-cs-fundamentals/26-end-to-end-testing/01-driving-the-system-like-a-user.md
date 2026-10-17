---
title: Driving the system like a user
prereqs: ["01-cs-fundamentals/21-integration-testing"]
---

## What it is

Driving the system like a user means interacting through the same interface a person would: the browser, the command line, the public API. The test clicks, types, uploads and submits, then asserts on what the user can observe — a confirmation message, a new row in a list, a redirected address — and it never reaches into internal state or calls a function directly, because the interface is the thing under test. A journey is the path one user takes from an intention to an outcome, crossing several screens at once: signing up is one journey, and it passes through a landing page, a form, a verification step and the dashboard.

```text
sign-up journey:  landing -> form -> verify -> dashboard
                  4 screens crossed, 1 outcome asserted
```

## Why it matters

An end-to-end test is the only level that assumes nothing about the inside of the system, so it is the only one that sees the wiring failures every other level skips: an environment variable missing from the deployed container, a route registered under `/signup` while the link points at `/sign-up`, a session cookie set on `example.test` while the browser asks `app.example.test`, a migration that never ran in the order the release expected. Those defects sail through a unit test, because the unit is not wired to anything. They cost time in proportion to how far a test stands from the running product: a unit test runs in 5 milliseconds — 5 ms, where 1 ms is a thousandth of a second — an integration test in 50 ms, and a browser journey in about 20 seconds, because it pays for a page load, a form post and a queue round trip. Twenty seconds is 20 000 ms, which is 20 000 / 5 = 4 000 times the unit test and 20 000 / 50 = 400 times the integration test, so the craft is choosing which few journeys earn that price: five journeys at 20 s each is 5 * 20 = 100 s, a suite you can run on every merge, while one test per screen across 40 screens at 2 s each is 40 * 2 = 80 s of tests that never drive the product from one end to the other.

## Core ideas

### Cover journeys, not screens

A screen test opens one page and asserts on it, so it costs about 2 seconds; a journey test crosses four or five pages with real network waits, so it costs about 20 seconds. That price buys coverage a screen test cannot reach, because a screen test must re-run the journey's setup before it can reach the screen it checks, and it stops there. A shop with 40 screens, tested one screen at a time, gets 40 tests whose sign-up group alone is four tests repeating the same three steps before each assertion. The five journeys that matter — sign up, sign in, buy, pay, recover a password — are five tests, each ending on an outcome a user would describe, and each crossing the wiring between screens rather than standing behind it.

```text
a shop with 40 screens

one test per screen:
  40 tests, each opening one page and asserting: 40 * 2 = 80 s
  sign up spans 4 of those screens: landing, form, verify, dashboard
  each of the 4 sign-up tests re-runs the same 3 steps before its own assertion

one test per journey:
  5 journeys, each crossing 3 to 5 screens: 5 * 20 = 100 s
  sign up is 1 test that crosses all 4 of its screens
  the outcome at the end of each journey is what the user asked for
```

### Interact the way a person does

Select an element by the role it plays, the label it shows or the text a user reads, rather than by a class name or a generated id. A class name is a styling decision: restyle the button that adds a keyboard to the basket and `.btn-primary.add` becomes `.button--primary`, which breaks every test that named the old class while the behaviour is untouched. A role and an accessible name are what the user and a screen reader both rely on, so `getByRole("button", { name: "Add to basket" })` keeps matching after the restyle and stops matching only when the button genuinely disappears or loses its name. That is an accessibility check at no extra cost, because a control a test cannot find by its label is a control a screen reader cannot find either.

```text
select by class:  40 tests name ".btn-primary.add"
  a restyle renames it ".button--primary"
  -> 40 tests fail; the number of behaviours changed is 0

select by role and name: the same 40 tests ask for the button called "Add to basket"
  -> 0 tests fail on the restyle; each fails only if that button is gone
```

```ts
await page.getByRole("button", { name: "Place order" }).click();
await expect(page.getByText("Order confirmed")).toBeVisible();
```

### Assert on outcomes the user can see

Assert on the confirmation message, the new row in the list, the redirected address — the things the user is looking at — and not on a database row or an internal flag. An internal assertion can pass while the page is wrong, and then it is worse than no test at all, because it certifies the broken state. Say a test checks that the `orders` table holds exactly one row for the user and reports green, while the list on the page filters by the current basket and renders 0 rows: 1 stored order and 0 visible orders are both true, and the assertion never sees the difference. When only a query can establish the outcome, the check has quietly become an integration test and belongs at that level, where it can run without a browser.

```text
internal assertion:  rows in `orders` = 1             passes
what the user sees:  rows rendered in the list = 0    fails
both are true at once, because the list filters by basket, not by user
```

### Keep the test short and focused

One journey per test, with the setup it needs stated plainly. A test that performs five journeys in sequence reports at most one of them: it stops at the first failure, so the four journeys behind it are never run and a single red line says one of five things is broken without saying which. Five journey tests report all five outcomes in one run — the failure and the four passes together — and a failing test's name is the user goal that broke. Where journeys genuinely share a beginning, extract that beginning into a helper rather than chaining their assertions into one long test.

```text
one test, five journeys: sign up -> buy -> pay -> recover -> sign out
  a break inside buy: the run reports 1 of the 5 journeys, then stops
  the 4 journeys behind it are never run, so 4 outcomes go unreported

five tests, one journey each:
  the same break turns 1 test red and leaves the other 4 green, in one run
```

### Plan for time and order

End-to-end tests run against a deployed system, so they meet real latency, real clocks and real queues, and anything that arrives asynchronously has to be waited for by condition rather than by a fixed period. Waiting for a condition is faster as well as more reliable, because it returns the moment the state appears. Say a save takes 0.4 s on a quiet machine and 3.2 s on a loaded one: the condition wait returns at 0.4 s in the first case and 3.2 s in the second, and fails only when the state never arrives. A fixed 3 s sleep passes on the quiet machine after wasting 3 - 0.4 = 2.6 s, and fails on the loaded one, because 3 s is shorter than 3.2 s. Treat every sleep as a bug that will eventually fail on a slow machine, and give the condition a timeout generous enough to outlast the slowest honest run.

```text
save a record, then assert on the confirmation

the write takes 0.4 s on a quiet machine, 3.2 s on a loaded one

sleep 3 s:
  quiet machine:  passes, having wasted 3 - 0.4 = 2.6 s
  loaded machine: fails, because 3 s < 3.2 s
wait for the state, timeout 15 s:
  passes at 0.4 s and at 3.2 s
  fails at 15 s only if the state never appears
```

```ts
await expect(page.getByText("Processing complete")).toBeVisible({ timeout: 15_000 });
```

## Practice

### Write one journey, end to end

Choose the shortest path that produces value for a user in an application you work on, and write the steps down before you write the test: the screens it crosses and the observable outcome at the end. Drive each step through the real interface — the link the user clicks, the label they type into — and assert once, on that outcome. Measure how long the test takes, so you can set it against the 5 ms unit test that covers the same feature.

Done when: the test passes against a freshly started system, fails with a message naming the broken step when you break the feature deliberately, and you can state its runtime in seconds.

### Trim a journey suite

Take an existing end-to-end file and rewrite its test names as user goals rather than screens. Count the tests that share one journey — the four sign-up screen tests share one — and merge or delete until each remaining test covers a distinct outcome. Time the file before and after the trim.

Done when: every test in the file can be described by a user goal, the test count has fallen, and the file still turns red when you break the feature those tests cover.

## Common mistakes

- **One test per screen** — 40 screen tests cost 40 * 2 = 80 s and not one of them drives a payment from basket to confirmation, so the wiring between screens stays unchecked; fix: test the five journeys that produce user value, one test each.
- **Selecting elements by internal ids or CSS classes** — a restyle that renames `.btn-primary.add` breaks all 40 tests that named it while 0 behaviours changed; fix: select by role, label or visible text.
- **Asserting on internal state** — a test that checks `orders` = 1 passes while the page renders 0 rows, so it certifies the broken page instead of catching it; fix: assert on what the user can observe.
- **Fixed sleeps instead of waiting for a condition** — a 3 s sleep passes on the machine whose write takes 0.4 s, fails on the one whose write takes 3.2 s, and wastes 2.6 s every time it passes; fix: wait for the expected state with a generous timeout.
- **Chaining several journeys in one test** — five journeys in one test report 1 outcome and then stop, so the first failure masks the other four; fix: one journey per test, with the shared setup extracted.

## Go deeper

- **Integration Testing** (`01-cs-fundamentals/21-integration-testing`) — the layer to use when only one seam is in question, so read it first for the narrower tool.
- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — where the bulk of coverage should live, so that 5 ms tests rather than 20 s journeys carry the weight.
- **Making end-to-end tests trustworthy** (`01-cs-fundamentals/26-end-to-end-testing/02-making-end-to-end-tests-trustworthy`) — keeping the journeys you just wrote from becoming flaky.
