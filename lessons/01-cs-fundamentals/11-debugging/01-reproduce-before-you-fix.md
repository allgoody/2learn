---
title: Reproduce before you fix
prereqs: []
---

## What it is

Reproducing a bug means making it happen on demand, in a way you can run again. Until that is possible, you are working from a report, and a report is a story about a system that includes the reporter's memory, their environment and their expectations. A reproduction is a fact: these inputs, this state, this wrong output. It is the first and most valuable step, because everything afterwards depends on being able to tell whether your change fixed anything.

## Why it matters

Fixing without reproducing is guessing with a good chance of breaking something else. Worse, a bug that cannot be reproduced cannot be verified as fixed, so the same defect returns and the second investigation starts from nothing. A reproduction also shrinks the problem: the act of finding the smallest input that triggers it usually reveals the cause before you have read a single line of code. Experienced debuggers spend their time here deliberately, even when they think they already know the answer.

## Core ideas

### Read the error before theorising

Start with what actually happened: the full error message, the stack trace, the log lines immediately before it, the version and environment. Beginners read the first line and start guessing; the tenth line usually names the file and the reason. If there is no error, write down the precise difference between what happened and what should have happened — that sentence is your specification for the reproduction.

```text
Expected: order total 42.00 with a 10% member discount
Actual:   order total 46.20 (no discount applied)
```

### Build the smallest reproduction

Start from the failing case and remove everything that is not necessary, re-running after each removal. The goal is the fewest inputs and the least code that still fails. A small reproduction is fast to run, easy to reason about, and can be turned directly into a test. When the case is large — a whole workflow — shrink it to the step before the wrong output appears.

```text
full checkout flow -> remove payment -> remove shipping -> still wrong
-> total is wrong as soon as the member flag is set
```

### Make it deterministic

A reproduction that fails one time in five is almost as bad as none. Pin the sources of variation: seed the random generator, freeze the clock, sort the collection, set the locale and timezone, and run it in a loop until you know the failure rate. Once it is repeatable, you can measure it, and once you can measure it, you can bisect it.

```text
run 1000 times -> 37 failures -> order matters
run with a fixed seed -> 1000 failures -> now it is debuggable
```

### Capture the state at the moment of failure

Inspect the values, not just the outcome. Print or breakpoint the inputs, the intermediate results and the object identity at the point where the wrong value appears. Debugging by reading code alone answers "what could happen"; inspecting state answers "what did happen". Prefer the latter whenever it is cheap.

### Turn the reproduction into a test

A reproduction you do not keep is a reproduction you will rebuild. Once it is small and deterministic it is usually a few lines from being an automated test, and the test is what stops the defect from returning. Write it before the fix if the tooling allows, and watch it fail — that failing test is the proof the fix works.

## Practice

### Shrink a real failure

Take a bug you are currently working on and reduce the reproduction to under ten lines, or to a single command with a fixed input. Re-run after every removal.

Done when: the reproduction still fails, and you have removed at least half of what you started with.

### Pin the nondeterminism

For a failure that happens sometimes, run the reproduction in a loop and record the failure rate. Then fix the seed, the clock and the ordering, and run it again.

Done when: the failure rate is either zero or one hundred percent, and you know which sources of variation you removed.

## Common mistakes

- **Starting to fix before there is a reproduction** — the fix is unverifiable and the bug returns; fix: reproduce first, even when the cause looks obvious.
- **Reading only the first line of an error** — the name of the failing file and the actual reason are usually further down; fix: read the whole message and the stack.
- **Reproducing with the full production dataset** — the run is slow and the signal is buried; fix: shrink to the smallest input that still fails.
- **Accepting an intermittent reproduction** — you cannot tell whether a fix worked; fix: pin the seed, clock and ordering until it is deterministic.
- **Fixing and discarding the reproduction** — the defect can return unnoticed; fix: turn it into an automated test before you change the code.

## Go deeper

- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — how to turn the reproduction you just built into a test that stays in the suite.
- **Isolate and prove the cause** (`01-cs-fundamentals/11-debugging/02-isolate-and-prove-the-cause`) — the next step, once the failure is repeatable on demand.
- **Concurrency & Async Programming** (`01-cs-fundamentals/05-concurrency-async-programming`) — why some failures resist reproduction, and what to pin to make them behave.
