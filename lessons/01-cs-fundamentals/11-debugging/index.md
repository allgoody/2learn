---
title: Debugging
type: skill
topic: 01-cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Debugging is the systematic process of finding why a program does not do what it should. The method is short: reproduce the failure, isolate the smallest thing that causes it, prove the cause rather than assuming it, fix the cause rather than the symptom, and leave a test behind. That is five steps, and skipping one shows up in the numbers rather than in the effort — a case that fails 37 runs in 1 000 cannot be declared fixed by one green run, because 963 of those 1 000 runs would have been green anyway. Most debugging difficulty is not technical; it comes from working from a guess instead of from a reproduction.

## Why it matters

Time spent debugging is time not spent building, and the method decides how much of it is spent. Seven candidate releases take at most 3 checks if you halve the range at each step, because 2^3 = 8 covers 7 candidates, while reading them newest first can take up to 7 reads and tells you nothing when the change is not there. Guessing is seductive because each guess feels productive: you read code, you change something, you re-run. A wrong guess costs more than no progress, because the 2 or 3 edits you made stay in the diff and every one of them must now be reviewed and excluded. The disciplined path — reproduce, shrink, prove, fix — is slower for the first five minutes and dramatically faster by the hour.

## In this track

1. **Reproduce before you fix** (`01-cs-fundamentals/11-debugging/01-reproduce-before-you-fix`) — turning a report into a deterministic, minimal reproduction you can run at will.
2. **Isolate and prove the cause** (`01-cs-fundamentals/11-debugging/02-isolate-and-prove-the-cause`) — bisecting the search space, testing one hypothesis at a time, and fixing the cause.

## Prerequisites

None.

## Go deeper

- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — a failing test is the most reliable reproduction there is: one red run before the fix, one green run after it.
- **Concurrency & Async Programming** (`01-cs-fundamentals/05-concurrency-async-programming`) — the bugs that reproduce once in a thousand runs, a rate of 0.1 percent, and need a different method.
- **End-to-End Testing** (`01-cs-fundamentals/26-end-to-end-testing`) — reproducing a failure that only appears in the assembled system, which a single process never sees.
