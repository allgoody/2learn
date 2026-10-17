---
title: Code Review
type: skill
topic: 01-cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: ["01-cs-fundamentals/08-clean-code"]
related: []
---

## What it is

Code review is another person reading a change before it merges, looking for the defects the author cannot see. It is a conversation about a diff with 3 jobs, in this order: catch what would reach production, confirm that the change does what it claims, and spread knowledge of the code among the people who will maintain it. It is not a gate for style preferences and it is not an examination.

## Why it matters

Review is the cheapest defect detection there is. A defect found in a diff costs 1 comment, 1 changed line and 1 re-run of the 3 tests around it; the same defect found in production costs a failed release, a rollback and a fix that has to ship on its own, with the same 3 tests written afterwards in a hurry. Review also catches what automated checks cannot: a change that is correct but solves the wrong problem, an error path that swallows a failure, a boundary value — 0 items, 1 item, the largest the field allows — that no test ever tried. And because a team that merges 4 changes a day holds 20 of these conversations a week, review is where shared understanding of a codebase is actually built.

## In this track

1. **Reading a diff for correctness** (`01-cs-fundamentals/17-code-review/01-reading-a-diff-for-correctness`) — understanding intent, hunting the risky classes of change, and checking the tests as part of the change.
2. **Reviewing for clarity and tone** (`01-cs-fundamentals/17-code-review/02-reviewing-for-clarity-and-tone`) — separating blockers from suggestions and writing comments that improve the code rather than the mood.

## Prerequisites

- **Clean Code** (`01-cs-fundamentals/08-clean-code`)

## Go deeper

- **Refactoring** (`01-cs-fundamentals/19-refactoring`) — a refactor should be reviewed differently from a behaviour change, and this is why.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — the questions a reviewer asks are the same ones a debugger asks, in advance of the code running.
- **Software Architecture** (`01-cs-fundamentals/25-software-architecture`) — reviewing a change for whether it fits the boundaries the system is built on.
