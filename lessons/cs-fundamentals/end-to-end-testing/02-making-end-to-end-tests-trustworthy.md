---
title: Making end-to-end tests trustworthy
prereqs: ["cs-fundamentals/end-to-end-testing/01-driving-the-system-like-a-user"]
---

## What it is

Trustworthiness is what separates an end-to-end suite people rely on from one they re-run until it passes. It means each run starts from a known state and ends clean, every wait is for a condition rather than a delay, failures produce enough evidence to diagnose, and the tests can run in any order on any machine. The technical work is small; the discipline is in refusing to accept a flaky test as normal.

## Why it matters

A red build that is probably nothing is worse than no build at all, because it trains everyone to ignore the signal. The damage compounds: real failures are waved through, the suite grows more flaky as its tolerance for flakiness grows, and eventually the team disables the pipeline that was supposed to be protecting them. Flakiness in end-to-end tests almost always has a specific cause — shared state, an unwaited event, a dependency on the environment — and specific causes can be fixed.

## Core ideas

### Wait for conditions, never for time

The single most common source of flakiness is a fixed sleep standing in for an unknown amount of work. Waiting for a condition is both faster and more reliable: it returns as soon as the state arrives, and it fails with a clear message when it never does. Modern browser tooling does this automatically for its own actions, but any state your code produces still needs an explicit assertion to wait on.

```ts
await expect(page.getByRole("status")).toHaveText("Saved");   // condition
await page.waitForTimeout(3000);                              // gamble
```

### Start clean and end clean

Each run should create the accounts, records and files it needs, with names unique to that run, and remove or abandon them in a way that does not affect the next run. Tests that assume a seeded user exists will pass locally and fail in the pipeline, or pass in the pipeline and fail when someone changes the seed. A run identifier in every created record makes cleanup cheap and debugging easier.

```text
run id: e2e-20260301-7f3a
every name created by this run contains it
```

### Run the same tests against the same build

Promote one build through environments rather than building per environment. A test that passes against the artefact you will actually run is evidence; a test that passes against a separately built near-identical artefact is a hope. Freeze the data the tests depend on, and pin the clock where the assertion is time-sensitive.

### Make failures diagnosable

When a test fails at the end of a pipeline, the only evidence is what the test saved: a screenshot, a video, a trace, the console log, the network requests. Configure the runner to capture them on failure, and name the artefacts after the test. A retry that hides a failure without saving anything is worse than a failure, because it discards the evidence too.

```text
on failure: screenshot + trace + server log, uploaded with the run id
```

### Treat a retry as a bug report

Retries have their place for genuinely transient infrastructure, but a test that needs one twice a week is a test with an unidentified race. Track the retry rate like any other error metric, and give the flakiest test the same attention as a production bug. The alternative is a suite whose green colour means nothing.

## Practice

### Remove a sleep

Find a fixed delay in an end-to-end test and replace it with an assertion that waits for the resulting state to appear.

Done when: the test is green, is measurably faster, and fails with a clear message when the expected state never arrives.

### Prove two runs are independent

Run the whole end-to-end suite twice in a row against the same environment, then once more in a shuffled order.

Done when: all three runs give identical results, and no test depends on data created by another.

## Common mistakes

- **Using a fixed sleep to synchronise** — the test fails only on slower machines, which is exactly where it matters; fix: wait for the condition with a timeout.
- **Depending on data another run created** — the suite passes alone and fails in parallel; fix: create uniquely named data per run.
- **Retrying automatically without capturing evidence** — the flake is hidden and never diagnosed; fix: save a screenshot and a trace on every failure, retried or not.
- **Building a different artefact per environment** — the tested build is not the deployed build; fix: promote one artefact through environments.
- **Accepting a known-flaky test** — the suite's signal decays and real failures get ignored; fix: fix it or delete it, and never leave it quarantined indefinitely.

## Go deeper

- **Driving the system like a user** (`cs-fundamentals/end-to-end-testing/01-driving-the-system-like-a-user`) — the journeys these habits are protecting, so read it first.
- **Integration Testing** (`cs-fundamentals/integration-testing`) — moving a slow, flaky check down a level where it can be deterministic.
- **Debugging** (`cs-fundamentals/debugging`) — the systematic approach to a failure that only happens sometimes.
