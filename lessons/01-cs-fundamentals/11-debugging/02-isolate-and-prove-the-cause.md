---
title: Isolate and prove the cause
prereqs: ["01-cs-fundamentals/11-debugging/01-reproduce-before-you-fix"]
---

## What it is

Isolating a cause means narrowing the space of possible causes until one remains, and proving it rather than assuming it. The working method is a sequence of single hypotheses: state what you think is wrong, predict what you would see if you are right, and check. Fixing the cause then follows, together with a test that would have caught it.

## Why it matters

The expensive mistake in debugging is the plausible explanation that is wrong. It is compelling, it fits the symptom, and it leads to a fix that changes several things without addressing the defect. The bug then remains or returns, and the code carries a change nobody understands. A hypothesis tested and disproved is real progress: it removes a large part of the search space for a few minutes' work.

## Core ideas

### Bisect the search space

Halve the problem instead of reading everything. Disable half the input, comment out half the pipeline, or check out the commit halfway between the last known good and the first known bad. Each step either reproduces or it does not, and one bit of information halves the candidates. It is far faster than reading code and guessing, and works on data, configuration and history as well as code.

```text
good: release 40   bad: release 47
test 43 -> fails  -> candidate is 41..43
test 41 -> passes -> candidate is 42..43
```

### One hypothesis at a time, written down

Say the hypothesis out loud or write it on the ticket: "the discount is applied before the member flag is loaded". Then predict the observation: "the pricing log should show no member flag at the time of calculation". Then check. One at a time, because two simultaneous changes tell you nothing about which one mattered. Writing it down stops you re-testing a disproved idea an hour later.

```text
hypothesis: discount applied before member flag is loaded
prediction: log shows member = null during calculateTotal
check:      log shows member = null                -> confirmed
```

### A worked example of a false hypothesis

An endpoint takes 800 milliseconds. The first hypothesis is that the database query is slow — it involves a join and the table is large. Measuring the query shows 2 milliseconds, so the hypothesis is disproved, and the measurement has also ruled out the whole database layer. Widening the view shows the handler itself spending 790 milliseconds before it ever queries. Reading that code reveals a retry helper wrapping the whole handler, with exponential backoff, triggered by a 404 from a health check the handler performs first. The slow component was never the database; it was a sleeping retry loop, and the fix is to stop retrying a definitive 404.

```text
800ms total | 2ms database | 790ms before the query -> look at the retry helper
```

### Prove the cause by removing it

The strongest proof is a controlled change: make the suspected cause disappear and watch the failure disappear, then put it back and watch the failure return. Do it in one direction at a time, and if removing the suspected cause also removes something else, you have not isolated anything. This is the moment the guess becomes knowledge.

```text
disable the retry wrapper -> 12ms   (cause confirmed)
re-enable it              -> 800ms  (cause re-confirmed)
```

### Fix the cause, not the symptom

Catching the exception, clamping the wrong value or adding a null check at the call site often makes the symptom vanish while the defect continues to corrupt state elsewhere. Ask what invariant was violated and where it should have been enforced. Then fix it there, and add the test that fails without the fix. If the same wrong value could arrive from a second path, the fix at the call site has left that path broken too.

## Practice

### Bisect a regression

Take a bug that appeared at some point in your history. Find the last commit that worked and the first that did not, then check the commit halfway between them, halving the range each time.

Done when: you have identified a single commit that introduced the failure, or a range small enough to read entirely.

### Disprove your own hypothesis

Write down your current best explanation of a bug, the observation it predicts, and the result of checking that prediction. If it survives, remove the cause and confirm the failure disappears.

Done when: you have either a disproved hypothesis and a smaller search space, or a confirmed cause with a test that fails without the fix.

## Common mistakes

- **Acting on the first plausible explanation** — the fix touches several things and the defect remains; fix: state the hypothesis, predict the observation, and check it before changing code.
- **Changing more than one thing at a time** — nothing can be concluded from the result; fix: one change, one measurement.
- **Fixing the symptom at the call site** — the corrupt state is still produced elsewhere; fix: enforce the invariant where it belongs and add a failing test.
- **Skipping the controlled proof** — the "cause" is still a correlation; fix: remove it and watch the failure disappear, then restore it and watch it return.
- **Stopping at the first instance** — the same mistake exists at other call sites; fix: search for the pattern and fix the copies.

## Go deeper

- **Reproduce before you fix** (`01-cs-fundamentals/11-debugging/01-reproduce-before-you-fix`) — the reproduction this step bisects, so read it first.
- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — turning a confirmed cause into a test that prevents the regression.
- **Code Review** (`01-cs-fundamentals/17-code-review`) — the same systematic questioning, applied before the defect reaches production.
