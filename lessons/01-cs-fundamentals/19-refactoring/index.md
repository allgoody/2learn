---
title: Refactoring
type: skill
topic: 01-cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: ["01-cs-fundamentals/08-clean-code", "01-cs-fundamentals/10-unit-testing"]
related: []
---

## What it is

Refactoring is changing the structure of code without changing what it does. It is a procedure rather than an event: a sequence of small transformations, each of which leaves the program working, applied until the design is easier to change. The discipline is in the last part — the behaviour must stay identical down to the order of two side effects, or the exercise becomes an accidental rewrite with none of a rewrite's planning. The moves themselves are few, and each has a size you can state before you start.

## Why it matters

Design problems are cheap to fix while the code is small and expensive once a feature depends on the current shape. Refactoring is the mechanism that lets you pay the design cost continuously instead of in one risky lump later: 1 small step per change, each one green, rather than 1 rewrite that has no working state inside it. Without it, teams fall into a cycle: the code becomes hard to change, so changes are made by adding conditionals to the outside, which makes it harder still, until the only remaining move is a rewrite from scratch. A rewrite throws away the accumulated knowledge in the old code — the 10 behaviours nobody wrote down but the module already gets right — while refactoring keeps it and improves the shape at the same time.

## In this track

1. **Safe refactoring steps** (`01-cs-fundamentals/19-refactoring/01-safe-refactoring-steps`) — the procedure: behaviour unchanged, small steps, a test run between each.
2. **Refactorings you will actually use** (`01-cs-fundamentals/19-refactoring/02-refactorings-you-will-actually-use`) — the handful of transformations that cover most real improvements.

## Prerequisites

- **Clean Code** (`01-cs-fundamentals/08-clean-code`)
- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`)

## Go deeper

- **Debugging** (`01-cs-fundamentals/11-debugging`) — what to do when a change you expected to be behaviour-preserving breaks a test.
- **Code Review** (`01-cs-fundamentals/17-code-review`) — how to show a reviewer that a refactor really did not change behaviour.
- **Software Architecture** (`01-cs-fundamentals/25-software-architecture`) — the same discipline at the scale of modules, once single files are not the problem.
