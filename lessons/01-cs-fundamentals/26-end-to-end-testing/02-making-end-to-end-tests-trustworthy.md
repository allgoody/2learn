---
title: Making end-to-end tests trustworthy
prereqs: ["01-cs-fundamentals/26-end-to-end-testing/01-driving-the-system-like-a-user"]
---

## What it is

Trustworthiness is what separates an end-to-end suite people rely on from one they re-run until it passes. A flaky test is one that reports pass and fail for the same commit, the same build and the same input, so once a suite contains one, every red run has to be re-run before anyone believes it. Four properties remove most of the flakiness: each run starts from a known state and ends clean, every wait is for a condition rather than a delay, each failure leaves enough evidence to diagnose it, and the tests give the same result in any order on any machine.

## Why it matters

A red build that is probably nothing is worse than no build at all, because it trains everyone to ignore the signal. The cost is countable: a suite of 100 tests in which 1 test in 20 runs flakes produces 100 / 20 = 5 unexplained red runs per full run, and at 10 minutes to triage each that is 5 * 10 = 50 minutes per run; a team that runs the suite twice a day therefore loses 50 * 2 = 100 minutes a day to tests that were usually fine. The tolerance grows with the damage — the suite gets re-run rather than read, the re-runs are never counted, and one day the pipeline that was protecting the release is switched off. Flakiness in end-to-end tests almost always has a specific cause: shared state, an unwaited event, a dependency on the environment. A specific cause can be found and fixed, which is why a quarantined flake is a debt and not a settlement.

## Core ideas

### Wait for conditions, never for time

The single most common source of flakiness is a fixed sleep standing in for an unknown amount of work. Waiting for a condition is both faster and more reliable, because it returns as soon as the state arrives and it fails with a clear message when the state never does. Take a save that takes 0.4 s on a quiet machine and 3.2 s on a loaded one, and 100 tests that each save once: a 3 s sleep burns 100 * 3 = 300 s = 5 minutes of every run and still fails the loaded machines, because 3 s is shorter than 3.2 s, while a condition wait with a 15 s timeout spends about 100 * 0.4 = 40 s on the quiet run and passes the loaded one at 3.2 s. Modern browser tooling waits automatically for its own actions, but any state your code produces still needs an explicit assertion to wait on.

```text
one save takes 0.4 s on a quiet machine, 3.2 s on a loaded one; 100 tests, one save each

sleep 3 s:
  cost per run:  100 * 3 = 300 s = 5 minutes
  quiet machine:  passes
  loaded machine: fails, because 3 s < 3.2 s
wait for the state, timeout 15 s:
  cost per run:   about 100 * 0.4 = 40 s on a quiet run
  loaded machine: passes when the state arrives at 3.2 s
```

```ts
await expect(page.getByRole("status")).toHaveText("Saved");   // returns when the state arrives
await page.waitForTimeout(3000);                              // waits 3 s whether or not it has
```

### Start clean and end clean

Each run should create the accounts, records and files it needs, with names unique to that run, and abandon or remove them in a way that does not affect the next run. A fixed name such as `test-user@example.test` is one shared row: run 4 tests in parallel and all four reach the same account, so 3 of the 4 see a display name another test has just changed. A run identifier — `e2e-20260301-7f3a`, the date plus four hex characters — makes every created name unique, so the same 4 tests create 4 accounts, no test can read another's data, and cleanup is one prefix match. Tests that assume a seeded user exists pass on a laptop and fail in the pipeline, or pass in the pipeline and fail the day someone edits the seed.

```text
without a run id, 4 tests in parallel:
  all 4 sign in as test-user@example.test   -> 1 shared row
  test A renames the display name           -> tests B, C and D read A's change
with the run id e2e-20260301-7f3a:
  test A signs in as test-user+e2e-20260301-7f3a@example.test
  B, C and D each get a name of their own   -> 4 rows, 0 collisions
```

### Run the same tests against the same build

Promote one build through environments rather than building once per environment. A test that passes against the artefact you will actually run is evidence; a test that passes against a separately built near-identical artefact is a hope, because two builds from one commit can differ — a dependency resolved to a later patch, a timestamp embedded in a file, generated output written in a different order. One artefact promoted through 2 environments is 1 binary tested twice; 2 builds from the same commit are 2 different binaries, so the pass against the staging build says nothing about the bytes the production build contains. Freeze the data the tests depend on, and pin the clock where the assertion is time-sensitive.

```text
build once, promote the artefact:
  1 artefact -> tested in staging -> the same bytes deployed to production
build once per environment:
  2 artefacts from 1 commit -> the staging pass describes bytes production never runs
```

### Make failures diagnosable

When a test fails at the end of a pipeline, the only evidence is what the test saved: a screenshot, a video, a trace, the console log, the network requests. Configure the runner to capture them on failure, and name the artefacts after the test and the run. A trace records every action with a DOM snapshot and the console output, so a failure from three weeks ago can be stepped through locally instead of reproduced from scratch: with the trace the faulty action is usually found in about 10 minutes, while recreating the environment, the data and the timing without it can cost roughly 4 hours. A retry that hides a failure without saving anything is worse than the failure, because it discards the evidence as well.

```text
on failure, saved under the run id e2e-20260301-7f3a:
  screenshot  the page at the moment of failure
  trace       every action, DOM snapshot and console line, steppable afterwards
  server log  the requests the run made
diagnosing from those files:    about 10 minutes
reproducing it without them:    roughly 4 hours
```

### Treat a retry as a bug report

Retries have their place for genuinely transient infrastructure, but a test that needs one twice a week is a test with an unidentified race. Count the cost: 2 retries a week is 2 * 52 = 104 unexplained failures a year, and at 10 minutes to triage each that is 104 * 10 = 1 040 minutes, about 17 hours. Track the retry rate like any other error metric, and give the flakiest test the same attention as a production bug. The alternative is a suite whose green colour means nothing, because nobody has checked it in months.

```text
a test that retries twice a week:
  2 * 52 = 104 unexplained failures a year
  104 * 10 = 1 040 minutes = about 17 hours of triage
the same 104 failures, each with a trace attached, are diagnosed instead of absorbed
```

## Practice

### Remove a sleep

Find a fixed delay in an end-to-end test and replace it with an assertion that waits for the resulting state to appear. Time the test before and after: if the delay was 3 s and the state usually arrives after 0.4 s, the run should lose 3 - 0.4 = 2.6 s of pure waiting.

Done when: the test is green, measurably faster, and fails with a clear message when the expected state never arrives.

### Prove two runs are independent

Remove the data the suite depends on, then run the whole end-to-end suite twice in a row against the same environment, and once more with the test order shuffled. Any test that reads another test's data fails on the second run, when the shared name is already taken or its value already changed.

Done when: all three runs give identical results, and no test depends on data created by another.

## Common mistakes

- **Using a fixed sleep to synchronise** — 100 tests with a 3 s sleep burn 100 * 3 = 300 s = 5 minutes per run and still fail the machine whose write takes 3.2 s; fix: wait for the condition with a timeout.
- **Depending on data another run created** — 4 tests sharing the account `test-user@example.test` leave 3 of them reading a display name another has just changed; fix: create uniquely named data per run, keyed by a run id.
- **Retrying automatically without capturing evidence** — the flake is hidden and never diagnosed, so the same test retries 2 * 52 = 104 times a year; fix: save a screenshot and a trace on every failure, retried or not.
- **Building a different artefact per environment** — 2 binaries from 1 commit mean the staging pass describes bytes production never runs; fix: promote one artefact through the environments.
- **Accepting a known-flaky test** — the suite's signal decays and real failures get waved through; fix: fix it or delete it, and never leave it quarantined indefinitely.

## Go deeper

- **Driving the system like a user** (`01-cs-fundamentals/26-end-to-end-testing/01-driving-the-system-like-a-user`) — the journeys these habits are protecting, so read it first.
- **Integration Testing** (`01-cs-fundamentals/21-integration-testing`) — moving a slow, flaky check down a level where it can be deterministic.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — the systematic approach to a failure that only happens sometimes.
