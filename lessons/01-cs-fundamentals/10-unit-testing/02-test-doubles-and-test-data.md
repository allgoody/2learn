---
title: Test doubles and test data
prereqs: ["01-cs-fundamentals/10-unit-testing/01-what-makes-a-good-unit-test"]
---

## What it is

A test double is a stand-in for a collaborator the unit would otherwise call: a stub answers with one canned value, a fake is a small working implementation, a spy records the calls it received, and a mock asserts the calls you told it to expect. Test data is the input you feed the unit, usually built by a short factory with plausible defaults so that each test states only the fields its own case is about. Both exist to keep a test inside the process and keep the reason it fails about the code under test.

## Why it matters

Replacing collaborators is what keeps a unit test fast, and the arithmetic is blunt: 200 tests that each open a database connection at 50 milliseconds cost 200 × 50 ms = 10 000 ms, ten seconds per run, against a few milliseconds for the same 200 tests over an in-memory fake. The choice of double matters just as much as the speed. A mock told to expect three calls turns the test into a description of the current code: store the new order with one `insertMany` call instead of `insert`, or answer the lookup from a cache, and all three expectations fail, although exactly one row still ends up stored under the key `abc`. Elaborate test data does the same one level down — a seven-field order literal copied into five tests makes the next schema change five edits, and the copies drift apart. The habits here are what keep a growing suite quick and worth reading.

## Core ideas

### Pick the double by what you are testing

Use a stub when the unit needs an answer and you do not care how it asked for it, a fake when the collaborator has real behaviour the unit depends on, and a spy sparingly, when the interaction is the requirement itself — one email sent, one event published.

```ts
const clock = { now: () => new Date("2026-01-01T00:00:00Z") };   // stub: one answer, always
const repo = new InMemoryOrders();                              // fake: real, tiny behaviour
```

The clock stub returns the same instant on every call — 1 January 2026 at 00:00 UTC — so a rule that compares an expiry against `now()` sees that instant however long the test takes to run. `InMemoryOrders` is a fake: it keeps its rows in an array inside the test process, `insert` pushes one row, and `findByKey` scans the rows it holds and returns the match or null, so the test exercises real storing and real lookup without a database. Mocking every collaborator instead gives a test that fails whenever the unit is restructured: three call expectations are three ways to go red with no behaviour changed.

### Doubles at the boundary you own

Define the interface you control and substitute that, rather than mocking a third-party library directly.

```ts
interface Clock { now(): Date }
```

`Clock` above is one method wide. A library's client is tens of methods wide — one per endpoint, one per option — and stubbing that client directly means every test you write against it is a repair when the next major version renames a method. An interface you own is stable, small and expresses what your code needs, and the library is adapted to it in one file at the edge. This is the same dependency inversion that makes the production code testable in the first place: the unit takes a `Clock`, the tests pass the fixed one, production passes the real one.

### Verify fewer calls, assert more outcomes

Every expectation about calls adds a constraint on the implementation. An assertion that `findByKey` ran before `insert` describes today's order of statements, not the order that was stored, and the stored order is what the caller cares about. Prefer the unit's output or the state it leaves behind, and reserve call expectations for interactions that are the requirement. A suite that asserts mostly on calls fights every refactor; a suite that asserts on outcomes accommodates them. In the example below, three call expectations collapse into one outcome assertion, and only the outcome assertion survives a change to how the order is stored.

### Build data with small defaults plus overrides

```ts
const order = makeOrder({ total: 2500, currency: "GBP" });
```

`makeOrder` fills in the fields this test does not care about — id 4471, key `abc`, a customer in the `gold` tier, status `draft` — so the line above states exactly what matters: a total of 2 500 pence in pounds sterling, which is £25.00. The risk is drift, so keep the defaults plausible and few: the canonical order in the example below fills in seven fields, which is about the limit of what a reader can hold in mind while reading an assertion. A factory with twelve optional fields and a branch per option has become a second system to maintain, and a reader must understand it before understanding the single assertion that uses it.

### Keep one canonical example per rule

When several tests need the same complex fixture — a valid tax record, a signed token — define one and name it. A seven-field order literal copied into five tests makes the next schema change five edits, and the four copies nobody finds drift out of step, so the suite ends up describing two different versions of the order. Write the literal once, give it a name such as `goldMemberOrder`, and let each test override the one field its case is about.

## Practice

### Replace a mock with a fake

Find a test that mocks a repository and asserts which methods were called. Write a small in-memory implementation of that repository and rewrite the test to assert on what the repository returns.

Done when: the test names none of the repository's methods, and it still goes red when you make `insert` store nothing.

### Shrink a data builder

Find the longest test setup in your suite. Replace it with a short factory plus per-test overrides.

Done when: each test's setup shows only the fields that matter to that case — one to three of the factory's fields, not all of them — and the whole file is shorter than it was.

## Common mistakes

- **Mocking every collaborator** — three call expectations give the test three ways to fail while no caller-visible behaviour changed; fix: stub only what the unit needs and assert on outcomes.
- **Mocking a third-party library directly** — a release that renames one method breaks every test that stubs it, one repair per test; fix: depend on an interface you own and adapt the library at the edge.
- **A factory with branches and options** — the helper grows past the test it serves, so a reader must understand twelve defaults before the one assertion; fix: keep the defaults few and plausible, and write the literal out when a case is unusual.
- **Copying a large fixture into several tests** — a schema change becomes five edits and the copies drift out of step; fix: define one canonical example and reference it.
- **Asserting on internal call order** — reordering two harmless lines inside the unit fails the build; fix: assert only on the interaction that is the requirement, and prefer outcomes.

## Go deeper

- **What makes a good unit test** (`01-cs-fundamentals/10-unit-testing/01-what-makes-a-good-unit-test`) — the behaviour-over-implementation rule these doubles exist to serve, so read it first.
- **Integration Testing** (`01-cs-fundamentals/21-integration-testing`) — what a fake hides, and when you need the real collaborator instead.
- **SOLID Principles** (`01-cs-fundamentals/09-solid-principles`) — the design pressure that makes collaborators substitutable without ceremony.
