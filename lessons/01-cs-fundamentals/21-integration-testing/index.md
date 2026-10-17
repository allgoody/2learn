---
title: Integration Testing
type: skill
topic: 01-cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: ["01-cs-fundamentals/10-unit-testing"]
related: []
---

## What it is

An integration test drives two or more real components together, across a boundary that a unit test would have replaced — a database, an HTTP endpoint, a message queue, the filesystem. The boundary is the whole point. Its job is the failures that live in the seam: a query a fake accepted and the real store rejects, a serialisation format the two sides disagree about, a migration that never ran. Where 0 real components take part, the file is a unit test wearing a longer name.

## Why it matters

A suite of unit tests can be entirely green while the system does not work, because each unit is checked against a stand-in and the stand-ins are the parts most likely to be wrong: they were written from the same misunderstanding as the code they replaced. Say 40 unit tests run in 2 seconds and all 40 pass; the query underneath 1 of them has no `ORDER BY`, and the fake returns rows in the order they were inserted while the real engine is free to return them in any order, so the same flow fails the first time it meets the real store. That is 1 defect the unit layer cannot see by construction, and it is found in the test run — 1 integration test, 20 seconds — rather than in an environment where the real dependency lives. Integration tests are fewer and slower than unit tests, and they are the only tests that can tell you the pieces fit.

## In this track

1. **Testing across a real boundary** (`01-cs-fundamentals/21-integration-testing/01-testing-across-a-real-boundary`) — which boundary to cross and which to fake, and how to keep the test deterministic once real infrastructure is involved.
2. **Fixtures, databases and cleanup** (`01-cs-fundamentals/21-integration-testing/02-fixtures-databases-and-cleanup`) — building the world the test needs, and leaving it the way it was found.

## Prerequisites

- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`)

## Go deeper

- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — the isolated layer this one complements, and the reason a fake can be wrong in the first place.
- **End-to-End Testing** (`01-cs-fundamentals/26-end-to-end-testing`) — the next layer out, where the whole system is driven instead of one seam.
- **Playwright** (`01-cs-fundamentals/27-playwright`) — the tool most teams reach for once the boundary being tested is a browser.
