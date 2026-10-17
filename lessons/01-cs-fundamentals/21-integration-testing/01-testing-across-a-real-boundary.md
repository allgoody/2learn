---
title: Testing across a real boundary
prereqs: ["01-cs-fundamentals/10-unit-testing"]
---

## What it is

Crossing a real boundary in a test means letting two genuine components talk to each other: the query goes to a real database, the request goes through the real router, the message is published to a real broker. The test then asserts on something the pair produced. The craft is deciding which boundary is worth the cost, and keeping the test deterministic once real infrastructure is in the way.

## Why it matters

Every boundary your code crosses has a contract, and the contract is rarely what you assumed. A fake will accept a value the real store rejects, return rows in the order you wrote them where the database promises no order at all, or ignore a constraint the production schema enforces — 3 assumptions that a unit test states without ever checking. Integration tests are where those 3 are checked without deploying, and the price is real: each one needs infrastructure, a run that takes 20 seconds rather than the 2 the unit layer takes, and deliberate control of everything nondeterministic. So the design question is not whether to write them, but which seams deserve that price.

## Core ideas

### Cross the seams whose contract you own

The highest value sits at boundaries you control: your SQL against your schema, your serialisation against your own parser, your handler against your framework's routing. Both sides of those seams are yours, so a red means a defect you can fix.

```text
your query <-> your schema          both sides yours: 1 red means 1 defect in your code
your client <-> someone else's API  one side is theirs: 1 red may be their outage or their change
```

A boundary you do not own — a payment provider, a third-party API — is better faked in the test suite and exercised in a controlled way outside it, because its behaviour is not yours to fix and its availability is not yours to guarantee. The seam you own turns each failure into one search through code you can read; the seam you do not own turns it into a support ticket and a waiting period.

### Run the real dependency where it can be real

For a database, that usually means the same engine and the same version as production, started locally or in a container. A substitute engine, or the same engine at a different version, walks the assumption straight back in:

```text
1 query: insert a 40-character name into a column declared varchar(20)

in-memory substitute             accepted, test green
real engine, production version  rejected: value too long, test red
real engine, 1 version older     accepted with a warning, test green again
```

```text
setup: an empty schema, with the real migrations applied by the test's own setup step
```

The substitute's dialect is not the production dialect, so a test that passes against it says nothing about the query that ships. Running the real engine costs a container start and buys the only check that matters: that this query works against this schema.

### Every test builds and destroys its own world

An integration test needs a known starting state. The workable pattern is a fresh schema or a unique namespace per run, with the migrations applied and the rows inserted by the test itself. Sharing fixture rows is what gives the layer its reputation for flakiness:

```text
3 tests sharing 1 seeded row, and the runner may order them in 3! = 3 * 2 * 1 = 6 ways

test B alone          green
test B after test A   red, because A left the row's status as "shipped"
```

One of those 6 orders fails, and it is the order the runner happens to pick on the machine that runs it. The suite is not testing the code; it is testing the runner's ordering.

```text
setup:    create schema -> apply migrations -> insert the 1 row this case needs
teardown: drop the schema, whether the test passed or failed
```

### Keep the assertion close to the seam

Assert on what came back across the boundary — the rows the database returned, the status code and body the handler produced — rather than on incidental state somewhere else in the system:

```text
1 request, and 2 places the result can be read

the response:        status 201, body {"id": 7}     produced by the pair under test
the count of log lines: 3 more lines than before     produced by the pair, and by the logger,
                                                     and by the retry policy, and by the queue
```

The narrower assertion identifies the broken contract on the first red. The wider one forces a debugging session before you know which side is wrong, because 3 other components also write log lines.

### Control time, ordering and randomness

Real infrastructure exposes everything nondeterministic in your code: timestamps, generated identifiers, concurrent inserts, logic that reads the clock. The two everyday cases are ordering and the clock.

```text
4 rows inserted 1 ms apart, then read back with no ORDER BY
  the engine promises nothing about their order: 4! = 4 * 3 * 2 * 1 = 24 possible orders
  your assertion picks 1 of the 24, so it can fail without the code changing
add `order by created_at` and there is 1 order left to assert on
```

```text
a test that seeds a row with created_at = "now", then asserts it is inside the last 24 hours

  23:50   the row is written
  00:10   the suite runs, so the row is 20 minutes old
          20 * 60 * 1000 = 1 200 000 ms
          1 200 000 / 86 400 000 = 0.014 days, where 86 400 000 ms is one day:
          24 * 60 * 60 * 1000 = 86 400 000

  measured as elapsed time, the row is inside the window and the count is 1
  measured in calendar days, the same row is yesterday's and the count is 0
```

The fix is to make the clock an input, so the assertion rests on a fixed instant instead of the minute the suite happens to run:

```ts
const now = new Date("2026-03-01T12:00:00Z");
const service = new Signup(repo, { now: () => now });
```

A flaky test is worse than no test, because it teaches the team to re-run rather than to investigate, and a suite nobody investigates is a suite nobody trusts.

## Practice

### Prove a fake wrong

Take a unit test that uses an in-memory fake for a data store. Write an integration test that runs the same flow against the real store, on the same data.

Done when: the integration test either passes, and you can name the 1 behaviour the fake had right, or fails, and you can name the 1 behaviour the fake got wrong — the fix belongs in the query or the schema, not in the assertion.

### Run the same test twice

Write one integration test that creates its own data and tears it down without a shared fixture.

Done when: 3 runs agree — the suite runs twice in a row and once in reverse order, all 3 green, and no test reads a row that a different test inserted.

## Common mistakes

- **Using an in-memory substitute for a different engine** — the test passes while the same query fails in production, because 1 dialect accepts what the other rejects; fix: run the production engine and version, or accept that the seam is not covered.
- **Sharing fixture rows between tests** — 3 tests sharing 1 row can run in 6 orders, and 1 of them fails; fix: give each test the rows it needs, in the test body.
- **Asserting on incidental state** — a red gives no clue which contract broke, because 3 other components write the same log; fix: assert on what crossed the boundary — the returned rows, the status code and body.
- **Leaving infrastructure running between runs** — data accumulates, so a count that was 1 is 3 by the third run; fix: create and destroy the schema, or use a unique namespace per run.
- **Letting time and ordering be real** — a timestamp written with "now" sorts differently at 23:50 and at 00:10, and 4 unordered rows can come back in any of 24 orders; fix: inject the clock and sort before comparing.

## Go deeper

- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — the isolated layer this one complements, and the reason a fake can be wrong.
- **Fixtures, databases and cleanup** (`01-cs-fundamentals/21-integration-testing/02-fixtures-databases-and-cleanup`) — the mechanics of building and tearing down the world each test needs.
- **End-to-End Testing** (`01-cs-fundamentals/26-end-to-end-testing`) — what to do when the seam that needs covering is the whole user journey.
