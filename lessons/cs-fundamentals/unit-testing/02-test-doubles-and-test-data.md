---
title: Test doubles and test data
prereqs: ["cs-fundamentals/unit-testing/01-what-makes-a-good-unit-test"]
---

## What it is

A test double is a stand-in for a collaborator the unit would otherwise call. Stubs return canned answers, fakes are small working implementations, spies record how they were called, and mocks assert expectations about calls. Test data is the input you feed the unit, usually built by a small factory with sensible defaults so each test only states what matters to it.

## Why it matters

Unit tests only stay fast and focused if the unit's collaborators are replaced, and the choice of double decides how coupled the test is to the implementation. A mock that asserts a call sequence makes the test a description of the current code, which is the opposite of what you want. Data setup has the same problem at a lower level: elaborate builders make tests unreadable, while inline literals repeated everywhere make them noisy. The habits here are what keep a suite honest and quick as it grows.

## Core ideas

### Pick the double by what you are testing

Use a stub when the unit needs an answer and you do not care how it was asked for it. Use a fake when the collaborator has real behaviour the unit depends on, such as a repository that stores and returns values. Use a spy sparingly, when the interaction is genuinely the thing being tested — sending an email, publishing an event. Mock-everything produces tests that fail whenever the unit is restructured.

```ts
const clock = { now: () => new Date("2026-01-01T00:00:00Z") };   // stub
const repo = new InMemoryOrders();                              // fake
```

### Doubles at the boundary you own

Define the interface you control and substitute that, rather than mocking a third-party library directly. An interface you own is stable, small and expresses what your code needs; a library's API is large, will change on its own schedule, and leaks that library into every test. This is the same dependency inversion that makes the production code testable in the first place.

```ts
interface Clock { now(): Date }
// the unit takes a Clock; tests pass a fixed one, production passes the real one
```

### Verify fewer calls, assert more outcomes

Every expectation about calls adds a constraint on the implementation. Prefer asserting on the unit's output or resulting state, and reserve call expectations for the interactions that are the actual requirement. A test suite that asserts mostly on calls will fight every refactor; one that asserts on outcomes will accommodate them.

### Build data with small defaults plus overrides

A factory with realistic defaults keeps each test focused: it states the three fields relevant to the case and inherits the rest. The risk is that the defaults drift into unrealistic territory, so the values should be genuinely plausible and the factory short. If it needs options and branches, it has become a second system to maintain.

```ts
const order = makeOrder({ total: 2500, currency: "GBP" });
```

### Keep one canonical example per rule

When several tests need the same complex fixture — a valid tax record, a signed token — define one and name it. Copying a twenty-field literal into five tests means the next schema change is five edits, and four of them will be missed.

## Practice

### Replace a mock with a fake

Find a test that mocks a repository and asserts which methods were called. Write a small in-memory implementation of that repository and rewrite the test to assert on what it returns.

Done when: the test no longer mentions any method names of the repository and still fails if the unit's behaviour is broken.

### Shrink a data builder

Find the longest test setup in your suite. Replace it with a short factory plus per-test overrides.

Done when: each test's setup shows only the fields that matter to that case, and the whole file is shorter.

## Common mistakes

- **Mocking every collaborator** — the test becomes a specification of the current implementation and blocks refactoring; fix: stub only what the unit needs and assert on outcomes.
- **Mocking a third-party library directly** — the test breaks on the library's schedule and leaks its types everywhere; fix: depend on an interface you own and adapt the library at the edge.
- **A factory with branches and options** — the test helper has become harder to understand than the test; fix: keep defaults plausible and the factory short.
- **Copying a large fixture into several tests** — a schema change requires finding every copy; fix: define one canonical example and reference it.
- **Asserting on internal call order** — a harmless reordering fails the build; fix: assert only on the interaction that is the requirement, and prefer outcomes.

## Go deeper

- **What makes a good unit test** (`cs-fundamentals/unit-testing/01-what-makes-a-good-unit-test`) — the behaviour-over-implementation rule these doubles exist to serve, so read it first.
- **Integration Testing** (`cs-fundamentals/integration-testing`) — what a fake hides, and when you need the real collaborator instead.
- **SOLID Principles** (`cs-fundamentals/solid-principles`) — the design pressure that makes collaborators substitutable without ceremony.
