---
title: Clean Code
type: skill
topic: 01-cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Clean code is code that the next reader can change safely. It is not a style preference or a matter of taste in punctuation; it is a set of habits about names, function size, structure and error handling that keep the cost of a change proportional to the change. The measure is practical: how long does it take someone who did not write this to work out what it does and make a correct edit.

## Why it matters

Every change to a file begins with a read of it, and the habits in this track decide how much of the file that read costs. A 400-line function with 8 responsibilities must be understood in full before the first edit lands; the same behaviour behind 8 names of 50 lines each lets the reader open the 1 that the change touches and leave the other 7 closed. Poor error handling compounds it. A failed charge that returns a total of 0.00 is not obviously wrong — 0.00 is a valid total — so the specific failure becomes a mystery that surfaces two systems later as a wrong invoice. These habits are cheap while the code is small and nearly impossible to retrofit once a system depends on the mess, which is why the track comes before the design topics that build on it.

## In this track

1. **Names and small functions** (`01-cs-fundamentals/08-clean-code/01-names-and-small-functions`) — choosing names that carry meaning and splitting functions until each does one thing.
2. **Structure and error handling** (`01-cs-fundamentals/08-clean-code/02-structure-and-error-handling`) — comment discipline, keeping the happy path visible, and failing where the failure is understood.

## Prerequisites

None.

## Go deeper

- **Refactoring** (`01-cs-fundamentals/19-refactoring`) — the mechanics for improving structure in small, verified steps instead of a risky rewrite.
- **Code Review** (`01-cs-fundamentals/17-code-review`) — where these habits are checked by another person before the change merges.
- **Code Reusability** (`01-cs-fundamentals/16-code-reusability`) — how far to take the extraction once a function is clear.
