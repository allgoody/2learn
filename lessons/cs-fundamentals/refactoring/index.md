---
title: Refactoring
type: skill
topic: cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: ["cs-fundamentals/clean-code", "cs-fundamentals/unit-testing"]
related: []
---

## What it is

Refactoring is changing the structure of code without changing what it does. It is a procedure rather than an event: a sequence of small transformations, each of which leaves the program working, applied until the design is easier to change. The discipline is in the last part — the behaviour must stay identical, or the exercise becomes an accidental rewrite with none of a rewrite's planning.

## Why it matters

Design problems are cheap to fix while the code is small and expensive once a feature depends on the current shape. Refactoring is the mechanism that lets you pay the design cost continuously instead of in one risky lump later. Without it, teams fall into a cycle: the code becomes hard to change, so changes are made by adding conditionals to the outside, which makes it harder still, until the only remaining move is a rewrite from scratch. A rewrite throws away the accumulated knowledge in the old code; refactoring keeps it.

## In this track

1. **Safe refactoring steps** (`cs-fundamentals/refactoring/01-safe-refactoring-steps`) — the procedure: behaviour unchanged, small steps, a test run between each.
2. **Refactorings you will actually use** (`cs-fundamentals/refactoring/02-refactorings-you-will-actually-use`) — the handful of transformations that cover most real improvements.

## Prerequisites

- **Clean Code** (`cs-fundamentals/clean-code`)
- **Unit Testing** (`cs-fundamentals/unit-testing`)

## Go deeper

- **Debugging** (`cs-fundamentals/debugging`) — what to do when a change you expected to be behaviour-preserving breaks a test.
- **Code Review** (`cs-fundamentals/code-review`) — how to show a reviewer that a refactor really did not change behaviour.
- **Software Architecture** (`cs-fundamentals/software-architecture`) — the same discipline at the scale of modules, once single files are not the problem.
