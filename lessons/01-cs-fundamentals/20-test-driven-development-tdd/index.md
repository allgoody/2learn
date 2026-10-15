---
title: Test-Driven Development (TDD)
type: skill
topic: 01-cs-fundamentals
tier: medium
status: drafted
aliases: ["TDD"]
prereqs: ["01-cs-fundamentals/10-unit-testing"]
related: []
---

## What it is

Test-driven development is the practice of writing a failing test before the code that makes it pass, then improving the code with the test still green. The cycle is short — a minute or two — and repeating it gives a rhythm: red, green, refactor. The test is not an afterthought bolted on for coverage; it is the specification you write first, and the code exists to satisfy it.

## Why it matters

Writing the test first changes what you build. You cannot write an assertion without deciding what the unit is called, what it takes and what it returns, so the interface is designed from the caller's point of view before any implementation bias creeps in. The failing test also proves the test can fail — the most common defect in a hand-written test is that it would pass no matter what the code does. And because every line of production code was demanded by a test, there is no speculative machinery to maintain.

## In this track

1. **The red-green-refactor loop** (`01-cs-fundamentals/20-test-driven-development-tdd/01-the-red-green-refactor-loop`) — the three steps, what each one is for, and how small a cycle should be.
2. **Where TDD does and does not pay off** (`01-cs-fundamentals/20-test-driven-development-tdd/02-where-tdd-does-and-does-not-pay-off`) — the problems it suits, the ones it fights, and how to tell the difference.

## Prerequisites

- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`)

## Go deeper

- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — the test-writing craft this discipline depends on, so read it first.
- **Refactoring** (`01-cs-fundamentals/19-refactoring`) — the third step of the loop, treated as a procedure in its own right.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — a failing test you did not expect is a debugging problem, and the fastest route to the cause is the same method.
