---
title: Debugging
type: skill
topic: cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Debugging is the systematic process of finding why a program does not do what it should. The method is short: reproduce the failure, isolate the smallest thing that causes it, prove the cause rather than assuming it, fix the cause rather than the symptom, and leave a test behind. Most debugging difficulty is not technical — it comes from skipping one of those steps and working from a guess instead.

## Why it matters

Time spent debugging is time not spent building, and the difference between a methodical debugger and a guessing one is often a factor of ten. Guessing is seductive because each guess feels productive: you read code, you change something, you re-run. But a guess that turns out to be wrong costs more than no progress, because it adds a change to the system that must now be considered. The disciplined path — reproduce, shrink, prove, fix — is slower for the first five minutes and dramatically faster by the hour.

## In this track

1. **Reproduce before you fix** (`cs-fundamentals/debugging/01-reproduce-before-you-fix`) — turning a report into a deterministic, minimal reproduction you can run at will.
2. **Isolate and prove the cause** (`cs-fundamentals/debugging/02-isolate-and-prove-the-cause`) — bisecting the search space, testing one hypothesis at a time, and fixing the cause.

## Prerequisites

None.

## Go deeper

- **Unit Testing** (`cs-fundamentals/unit-testing`) — a failing test is the most reliable reproduction there is, and the proof the fix holds.
- **Concurrency & Async Programming** (`cs-fundamentals/concurrency-async-programming`) — the bugs that reproduce once in a thousand runs and need a different method.
- **End-to-End Testing** (`cs-fundamentals/end-to-end-testing`) — reproducing a failure that only appears in the assembled system.
