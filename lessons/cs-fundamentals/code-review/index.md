---
title: Code Review
type: skill
topic: cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: ["cs-fundamentals/clean-code"]
related: []
---

## What it is

Code review is another person reading a change before it merges, looking for defects the author cannot see. It is a conversation about a diff, with three jobs in order of importance: catch problems that would reach production, confirm the change does what it claims, and spread knowledge of the code between the people who will maintain it. It is not a gate for style preferences and it is not an examination.

## Why it matters

Review is the cheapest defect detection there is. A bug found in a diff costs minutes; the same bug found in production costs an incident, a fix and a customer conversation. Review also catches the defects automated checks cannot: a change that is correct but solves the wrong problem, an error path that swallows a failure, a boundary condition the tests do not cover. And because most teams merge several times a day, review is where shared understanding of a codebase is actually built.

## In this track

1. **Reading a diff for correctness** (`cs-fundamentals/code-review/01-reading-a-diff-for-correctness`) — understanding intent, hunting the risky classes of change, and checking the tests as part of the change.
2. **Reviewing for clarity and tone** (`cs-fundamentals/code-review/02-reviewing-for-clarity-and-tone`) — separating blockers from suggestions and writing comments that improve the code rather than the mood.

## Prerequisites

- **Clean Code** (`cs-fundamentals/clean-code`)

## Go deeper

- **Refactoring** (`cs-fundamentals/refactoring`) — a refactor should be reviewed differently from a behaviour change, and this is why.
- **Debugging** (`cs-fundamentals/debugging`) — the questions a reviewer asks are the same ones a debugger asks, in advance.
- **Software Architecture** (`cs-fundamentals/software-architecture`) — reviewing a change for whether it fits the boundaries the system is built on.
