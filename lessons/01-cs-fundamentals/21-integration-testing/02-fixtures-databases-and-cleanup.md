---
title: Fixtures, databases and cleanup
prereqs: ["01-cs-fundamentals/21-integration-testing/01-testing-across-a-real-boundary"]
---

## What it is

A fixture is the state a test needs before it runs: rows in a table, a file on disk, a user with a known password. Cleanup is what happens afterwards so the next test starts from the same place. Done well, this machinery is invisible — each test reads as a short story about the behaviour under test. Done badly, it becomes the largest and least trustworthy part of the suite.

## Why it matters

Most flaky integration suites are not flaky because of the code under test. They are flaky because of shared state: a row another test created, a sequence that has advanced, a transaction that was never rolled back. Because the symptoms appear in unrelated tests and only sometimes, the team learns to distrust the suite and re-run it, which destroys its value entirely. Establishing a clean, isolated data story at the start is far cheaper than diagnosing it later.

## Core ideas

### Create the schema, do not inherit it

Each run should build its database from scratch by applying the real migrations, so the test exercises the same schema production has. Applying migrations also tests them, which is a genuine bonus: a broken migration fails in the suite rather than during a release. If building from scratch is too slow, snapshot the migrated schema and restore it per run — but keep the migration path exercised somewhere.

```text
run: drop schema -> migrate -> run tests -> drop schema
```

### One test, one world

Give each test its own namespace or transaction, so two tests never see each other's rows. The cheapest version is a transaction per test that is rolled back at the end, when the code under test uses the same connection. When the code opens its own connections or commits, use a unique schema or a unique identifier prefix per test instead.

```text
test 1: rows tagged run=abc-1   test 2: rows tagged run=abc-2
```

### Build only what the case needs

A shared fixture that inserts fifty rows so every test has something to look at couples every test to those fifty rows. Prefer a small factory that inserts one row with sensible defaults, plus the fields this case cares about. When a test needs a specific arrangement, that arrangement should be visible in the test body rather than in a global setup file.

```ts
const customer = await createCustomer({ tier: "gold" });
```

### Clean up deterministically, and never rely on the clock

Teardown should run even when the test fails, so the next test is unaffected. Timestamps in seeded data should be fixed values, not "now", and any ordering you assert should be explicit. A test that reads "created in the last 24 hours" is a calendar-dependent test and will fail on a day when nobody is watching.

```text
beforeEach: begin transaction
afterEach:  rollback (even on failure)
```

### Keep secrets and endpoints out of the test

Credentials and connection strings belong in configuration read from the environment, with a documented default for local runs. A test file with a hard-coded production host is one copy-paste away from writing to the wrong database. Make the safe target the default and the dangerous one require deliberate configuration.

## Practice

### Make a suite order-independent

Take an integration suite that depends on seeded rows. Convert it to build its own data per test, then run the suite twice in a row and once in a shuffled order.

Done when: all runs pass with identical results, and no test file contains a reference to a row created elsewhere.

### Prove the teardown runs

Add a deliberately failing assertion to one integration test and run the suite.

Done when: the following tests still pass, proving the teardown ran despite the failure.

## Common mistakes

- **Relying on a database that already has data** — a fresh machine gives a different result than a developer laptop; fix: build the schema and the rows in the test run.
- **Global setup that inserts rows every test needs** — every test is coupled to a fixture nobody reads; fix: create data per test, closest to where it is used.
- **Cleaning up only on success** — a failing test leaves rows behind and breaks the next run; fix: tear down in an unconditional hook.
- **Seeding with the current time** — the test outcome depends on when it runs; fix: use fixed timestamps and inject a clock.
- **Hard-coding a connection string** — a test can silently target a shared or production database; fix: read from configuration, default to a local throwaway instance.

## Go deeper

- **Testing across a real boundary** (`01-cs-fundamentals/21-integration-testing/01-testing-across-a-real-boundary`) — why these tests exist and which seams repay the cost, so read it first.
- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — the layer that covers everything this machinery is too slow to cover.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — migrations, transactions and schema behaviour that these tests exercise for real.
