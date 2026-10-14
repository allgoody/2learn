---
title: Unit Testing
type: skill
topic: cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

A unit test exercises one unit — usually a function or a class — in isolation, with every collaborator replaced by a stand-in the test controls. It is the only one of the three testing skills that runs entirely inside your process: no database, no network, no browser. That is the boundary. If a test crosses a real boundary, it is an integration test; if it drives the whole system the way a user would, it is an end-to-end test.

## Why it matters

Unit tests are the fastest feedback a developer gets, and speed is what makes them worth writing. A suite that runs in seconds is run on every save, so a mistake is found in the minute it was made rather than in a deploy. Because nothing external is involved, a failure points at one unit rather than at a system, which turns debugging into reading. This is also the safety net that makes refactoring possible: a behaviour-preserving change can only be verified quickly when the behaviour is pinned by tests that do not need infrastructure.

## In this track

1. **What makes a good unit test** (`cs-fundamentals/unit-testing/01-what-makes-a-good-unit-test`) — behaviour over implementation, one reason to fail, and a name that states the expectation.
2. **Test doubles and test data** (`cs-fundamentals/unit-testing/02-test-doubles-and-test-data`) — stubs, fakes and spies, and building input data that keeps tests readable.

## Prerequisites

None.

## Go deeper

- **Integration Testing** (`cs-fundamentals/integration-testing`) — the next layer: where two real parts meet and a stand-in would hide the very problem you are testing for.
- **End-to-End Testing** (`cs-fundamentals/end-to-end-testing`) — the top of the pyramid, driving the whole system like a user.
- **Test-Driven Development (TDD)** (`cs-fundamentals/test-driven-development-tdd`) — writing the test before the code, and where that discipline pays off.
