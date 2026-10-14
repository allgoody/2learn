---
title: Clean Code
type: skill
topic: cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Clean code is code that the next reader can change safely. It is not a style preference or a matter of taste in punctuation; it is a set of habits about names, function size, structure and error handling that keep the cost of a change proportional to the change. The measure is practical: how long does it take someone who did not write this to work out what it does and make a correct edit.

## Why it matters

Code is read far more often than it is written, and the reader is usually you in six months with no memory of the reasoning. A function that does four things behind one name forces that reader to reconstruct all four before touching any of them, and the reconstruction is where mistakes enter. Poor error handling compounds it: a swallowed failure turns a specific problem into a mystery that surfaces somewhere else entirely. These habits are cheap while the code is small and nearly impossible to retrofit once a system depends on the mess.

## In this track

1. **Names and small functions** (`cs-fundamentals/clean-code/01-names-and-small-functions`) — choosing names that carry meaning and splitting functions until each does one thing.
2. **Structure and error handling** (`cs-fundamentals/clean-code/02-structure-and-error-handling`) — comment discipline, keeping the happy path visible, and failing where the failure is understood.

## Prerequisites

None.

## Go deeper

- **Refactoring** (`cs-fundamentals/refactoring`) — the mechanics for improving structure in small, verified steps instead of a risky rewrite.
- **Code Review** (`cs-fundamentals/code-review`) — where these habits are checked by another person before the change merges.
- **Code Reusability** (`cs-fundamentals/code-reusability`) — how far to take the extraction once a function is clear.
