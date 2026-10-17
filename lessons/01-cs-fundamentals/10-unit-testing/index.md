---
title: Unit Testing
type: skill
topic: 01-cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

A unit test exercises one unit — usually a function or a class — with every collaborator replaced by a stand-in the test controls, so the whole test runs inside its own process: no database, no network, no browser. The unit is the code under test, and its job is one decision: `calculatePrice` turns a cart into a total, so 1 000 pence of goods at a ten percent member rate comes back as 1 000 − 100 = 900 pence, and a unit test asserts that number. That is the boundary. A test that crosses a real boundary is an integration test; a test that drives the whole system the way a user would is an end-to-end test.

## Why it matters

Unit tests are the fastest feedback a developer gets, and the arithmetic decides whether they actually get run. A test that touches nothing outside its own process finishes in about a millisecond, so 1 000 of them cost 1 000 × 1 ms = 1 000 ms, one second, and the suite runs on every save; the same 1 000 tests waiting on a database at 50 milliseconds each cost 1 000 × 50 ms = 50 000 ms, fifty seconds, and get run nightly instead. Speed is also what makes a failure readable: a unit test that goes red names one unit and the values you gave it, so the search space is a single function, while an end-to-end failure names the assembled system and you have to narrow it back down to one unit before you can read anything. Because nothing external is involved, a unit test is also the safety net that makes refactoring possible — a behaviour-preserving change is verified in the second it takes to re-run the tests that pin the behaviour.

## In this track

1. **What makes a good unit test** (`01-cs-fundamentals/10-unit-testing/01-what-makes-a-good-unit-test`) — behaviour over implementation, one reason to fail, and a name that states the expectation.
2. **Test doubles and test data** (`01-cs-fundamentals/10-unit-testing/02-test-doubles-and-test-data`) — stubs, fakes and spies, and building input data that keeps tests readable.

## Prerequisites

None.

## Go deeper

- **Integration Testing** (`01-cs-fundamentals/21-integration-testing`) — the next layer: two real parts meeting, and the problems a stand-in would hide.
- **End-to-End Testing** (`01-cs-fundamentals/26-end-to-end-testing`) — the top of the pyramid, driving the whole system like a user.
- **Test-Driven Development (TDD)** (`01-cs-fundamentals/20-test-driven-development-tdd`) — writing the test before the code, and the red run that proves the test can fail.
