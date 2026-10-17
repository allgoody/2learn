---
title: Fixtures, databases and cleanup
prereqs: ["01-cs-fundamentals/21-integration-testing/01-testing-across-a-real-boundary"]
---

## What it is

A fixture is the state a test needs before it runs: rows in a table, a file on disk, a user with a known password. Cleanup is what happens afterwards, so the next test starts from the same place. Done well, this machinery is invisible and each test reads as a short story about the behaviour under test. Done badly, the fixture becomes the largest and least trusted part of the suite.

## Why it matters

Most flaky integration suites are not flaky because of the code under test; they are flaky because of shared state. A row another test created, a sequence that has advanced, a transaction that was never rolled back: any of those three makes the outcome depend on the order the runner chose, and the runner is free to choose any of them. Say 3 tests share 1 seeded row and 1 of the 3 writes to it: the failing test now reports its failure in a file nobody edited, on some runs only, and 2 tests away from the change that caused it. The team learns to re-run rather than investigate, and a suite that gets re-run has stopped doing its job. Building the data story properly at the start is far cheaper than diagnosing it for the rest of the project's life.

## Core ideas

### Build the schema instead of inheriting it

Each run should build its database from scratch by applying the real migrations, so the test exercises the same schema production has. Applying them also tests them, which is a real gain rather than a side effect:

```text
run: drop schema -> apply the 12 migrations -> run the tests -> drop schema

1 of the 12 migrations names a column that production does not have
  -> the suite fails naming that migration, on a developer's machine
  -> and never in a release, where it would be far harder to undo
```

If a full build is too slow, snapshot the migrated schema and restore the snapshot per run — but keep the migration path exercised somewhere, because a migration that is never applied by any test is a migration nobody has run.

### One test, one world

Give each test its own namespace or its own transaction, so two tests never see each other's rows. The cheapest version is a transaction per test, rolled back at the end, which works while the code under test uses the same connection:

```text
beforeEach: begin transaction
afterEach:  rollback, even when the test failed
```

When the code opens its own connections or commits as it goes, the rollback no longer reaches it, and a unique schema or a unique prefix per test gives the same isolation:

```text
test 1: rows tagged run=abc-1    test 2: rows tagged run=abc-2
a query that forgets the tag still sees 2 worlds, which is the bug you want to find in a test
```

Either way the rule is the same: no test's result may depend on which test ran before it.

### Build only what the case needs

A shared fixture that inserts fifty rows so every test has something to look at couples every test to all fifty. The cost is measurable: 50 rows holding 8 columns is 400 values, of which the case under test reads 1 row and 2 columns, and a change to any one of the 400 changes what every test sees. Prefer a small factory that inserts 1 row with sensible defaults, plus the fields this case cares about:

```ts
const customer = await createCustomer({ tier: "gold" });   // 1 row, 2 named fields
```

When a test needs a particular arrangement — 3 customers, 1 of them suspended — that arrangement belongs in the test body, where a reader can see it, rather than in a setup file 4 directories away.

### Tear down on the way out, not on success

Teardown has to run whether the test passed or failed, because the failing test is precisely the one that leaves state behind:

```text
teardown written after the assertion, test fails on run 1
  run 1: insert 1 invoice, assertion fails, 1 row survives, teardown never runs
  run 2: insert 1 invoice, count is now 2, expected 1 -> fails again
  run 3: count is 3
```

```text
beforeEach: begin transaction
afterEach:  rollback          <- registered outside the assertion, so it runs either way
```

The same discipline applies to the clock: seed timestamps as fixed values rather than "now", and make every asserted ordering explicit. A test whose data is written at "now" and read back in a window of 86 400 000 ms — one day, since 24 * 60 * 60 * 1000 = 86 400 000 — is a calendar-dependent test, and it will fail on a day when nobody is watching.

### Keep secrets and endpoints out of the test

Credentials and connection strings belong in configuration read from the environment, with a documented default for local runs:

```text
TEST_DATABASE_URL   set   -> the run goes wherever it points
                    unset -> postgres://localhost/app_test, a throwaway instance
```

A test file with a hard-coded shared host is one copy-paste away from writing to the wrong database, and the copy-paste that does it is the ordinary one: copying a passing test to start the next one. Make the safe target the default and the dangerous one require a deliberate setting, so that the destructive run is a choice somebody made rather than the place a test happened to land.

## Practice

### Make a suite order-independent

Take an integration suite that depends on a shared seeded fixture. Convert it to build its own data per test, then run the suite twice in a row and once in shuffled order.

Done when: all 3 runs pass with identical results, and no test file names a row that a different test created.

### Prove the teardown runs

Add a deliberately failing assertion to one integration test and run the suite.

Done when: the tests after it still pass, and the failing test has left 0 rows behind — count them after the run, not before.

## Common mistakes

- **Relying on a database that already has data** — a fresh machine gives a different count from a developer's laptop, and the difference shows up as an unrelated red; fix: build the schema and the rows inside the test run.
- **A global setup that inserts rows every test needs** — 400 fixture values couple every test to all of them, and a change to 1 makes tests 3 files away fail; fix: create data per test, next to the test that uses it.
- **Cleaning up only on success** — the run that fails is the run that leaves its row behind, so run 2 sees 2 rows where it expects 1; fix: tear down in an unconditional hook, registered outside the assertion.
- **Seeding with the current time** — the outcome depends on the hour of the run, and a 24-hour window is 86 400 000 ms wide; fix: use fixed timestamps and inject the clock.
- **Hard-coding a connection string** — a copied test can silently target a shared or production database; fix: read from configuration and default to a local throwaway instance.

## Go deeper

- **Testing across a real boundary** (`01-cs-fundamentals/21-integration-testing/01-testing-across-a-real-boundary`) — why these tests exist and which seams repay their cost, so read it first.
- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — the layer that covers everything this machinery is too slow to cover.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — migrations, transactions and schema behaviour that these tests exercise for real.
