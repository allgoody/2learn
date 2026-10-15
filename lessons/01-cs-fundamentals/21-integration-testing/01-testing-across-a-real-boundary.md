---
title: Testing across a real boundary
prereqs: ["01-cs-fundamentals/10-unit-testing"]
---

## What it is

Crossing a real boundary in a test means letting two genuine components talk to each other: the query goes to a real database, the request goes through the real router, the message is published to a real broker. The test then asserts on something the pair produced. The craft is deciding which boundary is worth the cost, and keeping the test deterministic once real infrastructure is involved.

## Why it matters

Every boundary your code crosses has an implicit contract, and the contract is rarely what you assumed. An in-memory fake will happily accept a value the real store rejects, return rows in the order you wrote them but the database will not, or ignore a constraint that the production schema enforces. Integration tests are the only place these assumptions can be checked without deploying. The price is real: these tests are slower, need infrastructure, and can be flaky — so the design question is which seams deserve the cost.

## Core ideas

### Test the seams where you own the contract

The highest value is at boundaries you control: your SQL against your schema, your serialisation against your own parser, your handler against your framework's routing. At those seams, a failure is a defect in your code. A boundary you do not own — a payment provider, a third-party API — is better faked in tests and exercised in a controlled way outside them, since its behaviour is not yours to fix and its availability is not yours to guarantee.

```text
highest value: your query <-> your schema
lower value:   your client <-> someone else's API
```

### Use the real dependency where it can be real

For a database, that usually means the same engine and version as production, running locally or in a container. A different engine — an in-memory substitute, a different version — reintroduces exactly the assumption the test was meant to check. If the substitute's dialect differs, the test passes and production fails, and the suite has made things worse by giving false confidence.

```text
same engine, empty schema, migrations applied by the test setup
```

### Make each test responsible for its own world

An integration test needs known starting state. The workable pattern is a fresh schema or a unique namespace per test run, with migrations applied and data created by the test itself. Tests that depend on rows left behind by another test are the reason integration suites get a reputation for being flaky: they are really testing the order the runner happened to choose.

```text
setup:  create schema -> run migrations -> insert the rows this case needs
teardown: drop schema
```

### Keep the assertion close to the seam

Assert on what came back across the boundary — the rows the database returned, the status code and body the handler produced — rather than on incidental state elsewhere. The narrower the assertion, the more clearly a failure identifies the broken contract. Broad assertions force a debugging session before you even know which side is wrong.

### Control time, ordering and randomness

Real infrastructure exposes everything nondeterministic in your code: timestamps, random identifiers, concurrent inserts, clock-dependent logic. Inject the clock, freeze it where the assertion depends on it, and sort results before comparing. A flaky test is worse than no test, because it teaches the team to re-run rather than investigate.

```ts
const now = new Date("2026-03-01T00:00:00Z");
const service = new Signup(repo, { now: () => now });
```

## Practice

### Prove a fake wrong

Take a unit test that uses an in-memory fake for a data store. Write an integration test that runs the same flow against the real store and see what it catches.

Done when: either the integration test passes, or you can name the specific behaviour the fake got wrong.

### Run the same test twice

Write one integration test that creates its own data and cleans up after itself. Run the whole suite twice in a row and then in reverse order.

Done when: every run is green and identical, with no state carried between runs.

## Common mistakes

- **Using an in-memory substitute for a different engine** — the test passes while production fails on the same query; fix: run the real engine and version, or accept that the seam is not covered.
- **Sharing fixture rows between tests** — results depend on run order and the suite becomes flaky; fix: each test creates the data it needs.
- **Asserting on incidental state** — a failure gives no clue which contract broke; fix: assert on what crossed the boundary.
- **Leaving infrastructure running between runs** — data accumulates and later runs see earlier results; fix: create and destroy the schema, or use a unique namespace per run.
- **Letting time and ordering be real** — the test passes on Tuesday and fails at midnight; fix: inject the clock and sort before comparing.

## Go deeper

- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — the isolated layer this one complements, and the place to start.
- **Fixtures, databases and cleanup** (`01-cs-fundamentals/21-integration-testing/02-fixtures-databases-and-cleanup`) — the mechanics of setting up and tearing down the world each test needs.
- **End-to-End Testing** (`01-cs-fundamentals/26-end-to-end-testing`) — what to do when the seam you need to cover is the whole user journey.
