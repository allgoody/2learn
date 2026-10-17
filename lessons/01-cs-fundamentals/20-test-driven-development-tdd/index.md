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

Test-driven development is the practice of writing a test before the code that makes it pass, then improving that code while the test stays green. One round takes three steps in a fixed order — red, watch the new test fail; green, write the least code that passes it; refactor, improve the code with the test still passing — and a round is short: at 2 minutes each, 60 / 2 = 30 rounds fit in an hour, and at 1 minute each, 60 / 1 = 60. The test is not an afterthought bolted on for coverage; it is the specification you write first, and the code exists to satisfy it.

## Why it matters

Writing the test first changes what you build, and the change is countable. Take a discount rule with three cases: a customer of under five years gets nothing, five years or more gets 0.05 of the price — five per cent — and twenty years or more gets 0.10, ten per cent. Written first, that rule arrives as 3 rounds: 3 tests, and 3 of 3 have been watched failing before the code that passes them existed. Written afterwards it arrives as 1 test over 3 cases, run for the first time against code that already passed it, so nothing in the suite records whether that assertion can fail at all. The interface is settled in the same moment: renaming the function costs 1 line while the only caller is a test, and 3 call sites once 3 modules call it. And because every line of production code was demanded by a failing test, the module carries no branch that no test asks for.

## In this track

1. **The red-green-refactor loop** (`01-cs-fundamentals/20-test-driven-development-tdd/01-the-red-green-refactor-loop`) — what each of the three steps prevents, and how small one round has to be to keep its failure unambiguous.
2. **Where TDD does and does not pay off** (`01-cs-fundamentals/20-test-driven-development-tdd/02-where-tdd-does-and-does-not-pay-off`) — the rules, calculations and bug fixes it suits, the spikes and wiring it fights, and how to tell which one you are doing.

## Prerequisites

- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`)

## Go deeper

- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — the assertion craft and test hygiene this discipline rests on, so read it first.
- **Refactoring** (`01-cs-fundamentals/19-refactoring`) — the third step treated as a procedure of its own, with the catalogue of moves it uses.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — a test that fails and should not have is a debugging problem, and the fastest route to the cause is the same method.
