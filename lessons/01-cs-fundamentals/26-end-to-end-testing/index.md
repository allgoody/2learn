---
title: End-to-End Testing
type: skill
topic: 01-cs-fundamentals
tier: medium
status: drafted
aliases: ["E2E"]
prereqs: ["01-cs-fundamentals/21-integration-testing"]
related: []
---

## What it is

An end-to-end test drives the whole system the way a user does — through the real interface, against real services — and checks that the outcome is right. The boundary here is the outermost one, so nothing is stubbed: the browser talks to the deployed front end, which talks to the deployed API and its database. A unit test isolates one piece and an integration test joins two real pieces; an end-to-end test is the only kind that can tell you the assembled product works at all.

## Why it matters

Every other test level assumes the parts are wired together correctly, which leaves configuration, routing, authentication, serialisation between the front end and the back end, and the deployment itself outside their view. That is why a feature can pass 200 unit tests and 10 integration tests and still fail the moment a real user tries it: the environment variable holding the API address was never set in the container, or the session cookie is set on `example.test` while the browser asks `app.example.test`. End-to-end tests cover exactly that gap, and they are the only level that does. They are also slow — one journey costs about 20 s against a 5 ms unit test, which is 20 000 / 5 = 4 000 times as long — so a small number of them protects the journeys that matter most rather than every screen.

## In this track

1. **Driving the system like a user** (`01-cs-fundamentals/26-end-to-end-testing/01-driving-the-system-like-a-user`) — picking the 5 journeys worth their 20 s, then driving them through the interface a user actually has.
2. **Making end-to-end tests trustworthy** (`01-cs-fundamentals/26-end-to-end-testing/02-making-end-to-end-tests-trustworthy`) — turning 3 s sleeps into condition waits and shared seeds into per-run data, and reading the trace every failure leaves.

## Prerequisites

- **Integration Testing** (`01-cs-fundamentals/21-integration-testing`)

## Go deeper

- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — the 5 ms layer that should carry most of the coverage, so these 20 s journeys stay few.
- **Integration Testing** (`01-cs-fundamentals/21-integration-testing`) — the middle layer, where the seam under suspicion can be tested in 50 ms without the whole system.
- **Playwright** (`01-cs-fundamentals/27-playwright`) — the browser-automation tool most teams use to write these journeys.
