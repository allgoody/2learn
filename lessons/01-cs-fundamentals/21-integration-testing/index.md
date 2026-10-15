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

An integration test exercises two or more real components together, across a boundary that a unit test would have replaced — a database, an HTTP endpoint, a message queue, the filesystem. The boundary is the whole point. Its job is to catch the failures that live in the seam: a query the fake accepted and the real database rejects, a serialisation format the two sides disagree about, a migration that never ran. If nothing real is involved, it is a unit test wearing a longer name.

## Why it matters

A suite of unit tests can be entirely green while the system does not work. Each unit behaves correctly against its stand-ins, and the stand-ins are the parts most likely to be wrong, because they were written from the same misunderstanding as the code they replaced. Integration tests are where that misunderstanding is found — cheaply, in the test run, rather than in an environment where the real dependency lives. They are slower and fewer than unit tests, and they are the only tests that can tell you the pieces actually fit.

## In this track

1. **Testing across a real boundary** (`01-cs-fundamentals/21-integration-testing/01-testing-across-a-real-boundary`) — which boundary to cross, which to fake, and how to keep the test deterministic.
2. **Fixtures, databases and cleanup** (`01-cs-fundamentals/21-integration-testing/02-fixtures-databases-and-cleanup`) — creating the world the test needs and leaving it exactly as it was found.

## Prerequisites

- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`)

## Go deeper

- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — the isolated layer this one complements, and the reason a fake can be wrong.
- **End-to-End Testing** (`01-cs-fundamentals/26-end-to-end-testing`) — the next layer out, where the whole system is driven instead of one seam.
- **Playwright** (`01-cs-fundamentals/27-playwright`) — the tool most teams reach for once the boundary being tested is a browser.
