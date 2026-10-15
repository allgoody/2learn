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

An end-to-end test drives the whole system the way a user does — through the real interface, against real services — and checks that the outcome is right. The boundary here is the outermost one, and nothing is stubbed. A unit test isolates one piece and an integration test joins two real pieces; an end-to-end test is the only kind that can tell you the assembled product works at all.

## Why it matters

Every other test level assumes the parts are wired together correctly. Configuration, routing, authentication, serialisation between the front end and the back end, and the deployment itself are all outside their view. That is why features pass every unit test and fail the moment a real user tries them. End-to-end tests cover exactly that gap. They are slow, they are expensive to maintain, and a small number of them protects the journeys that matter most.

## In this track

1. **Driving the system like a user** (`01-cs-fundamentals/26-end-to-end-testing/01-driving-the-system-like-a-user`) — picking the journeys worth covering and interacting through the real interface.
2. **Making end-to-end tests trustworthy** (`01-cs-fundamentals/26-end-to-end-testing/02-making-end-to-end-tests-trustworthy`) — removing flakiness, seeding data, and reading the failures when they come.

## Prerequisites

- **Integration Testing** (`01-cs-fundamentals/21-integration-testing`)

## Go deeper

- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — the fast layer that should carry most of the coverage so this one does not have to.
- **Integration Testing** (`01-cs-fundamentals/21-integration-testing`) — the middle layer, where the seam under suspicion can be tested without the whole system.
- **Playwright** (`01-cs-fundamentals/27-playwright`) — the browser-automation tool most teams use to write these tests.
