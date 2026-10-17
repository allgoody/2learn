---
title: Isolate and prove the cause
prereqs: ["01-cs-fundamentals/11-debugging/01-reproduce-before-you-fix"]
---

## What it is

Isolating a cause means narrowing the space of possible causes until one remains, and proving it rather than assuming it. The working method is a sequence of single hypotheses: state what you think is wrong, predict the observation that follows if you are right, and check that observation. Narrowing by halves does the work — 7 candidate causes become 1 in 3 checks, because 2^3 = 8 is at least 7 — whereas changing three things at once leaves all 7 candidates open. Once the cause is proved, the fix follows, together with a test that would have caught it.

## Why it matters

The expensive mistake in debugging is the plausible explanation that is wrong. It is compelling, it fits the symptom, and it leads to a fix that changes four things without addressing the defect: those 4 edits stay in the diff, 3 of them unexplained, and the bug remains or returns. A hypothesis tested and disproved is real progress instead — it removes half the candidates at the cost of one measurement, so 7 candidates become 3, then 2, then 1 in three checks rather than seven code reads. That is why the method is cheap even when it feels slower: each check buys one bit of information about which half holds the cause.

## Core ideas

### Bisect the search space

Halve the problem instead of reading everything. Disable half the input, comment out half the pipeline, or check out the commit halfway between the last known good and the first known bad. Each step either reproduces or it does not, and one bit of information halves the candidates.

```text
good: release 40      bad: release 47
candidates: 41, 42, 43, 44, 45, 46, 47         -> 7 releases

check 43 (either split works while both halves hold at most 4):
  43 fails -> candidates 41, 42, 43            -> 3 releases
check 41:
  41 passes -> candidates 42, 43               -> 2 releases
check 42:
  42 fails -> commit 42 introduced it         -> 1 release

7 candidates halved: 2^2 = 4 < 7, so 2 checks cannot cover them;
2^3 = 8 >= 7, so 3 checks always suffice
```

Three checks locate the commit among seven; reading seven diffs to find it may take four or five readings, and reading the wrong four tells you nothing. Bisecting is also far more reliable than reading code and guessing, and it works on data, configuration and release history as well as on code.

### One hypothesis at a time, written down

Say the hypothesis out loud or write it on the ticket: "the discount is applied before the member flag is loaded". Then predict the observation that follows: "the pricing log prints member = null for an order that was placed by a member". Then check that one prediction.

```text
hypothesis: the discount is applied before the member flag is loaded
prediction: the pricing log prints member = null during calculateTotal
check:      the log prints member = null                  -> confirmed

one run settles it: member = false or member = true would each disprove
the hypothesis, and no third outcome is possible
```

One hypothesis at a time, because two simultaneous changes give two explanations and no experiment that separates them. Writing the prediction down also stops you re-testing a disproved idea an hour later.

### A worked example of a false hypothesis

An endpoint takes 800 milliseconds, and the first hypothesis is that the database query is slow: it involves a join and the table is large. Measure the request instead of arguing about it.

```text
one request, 800 ms in total:

  retry helper sleeps                      700 ms
  handler work (parse, validate, log)      90 ms
  database query                            2 ms
  response writing                          8 ms

  700 + 90 + 2 + 8 = 800 ms

the query is 2 ms of the 800, so it cannot be the slow part:
2 / 800 = 0.0025, one quarter of one percent
```

The measurement disproves the hypothesis and, doing so, rules out the whole database layer. Widening the view puts 700 + 90 = 790 ms of the request before the query, with the query itself at 2 ms and 8 ms of response writing after it: 790 + 2 + 8 = 800. Reading that code reveals a retry helper wrapping the entire handler, sleeping on a 404 from a health check the handler performs first. The slow component was never the database; it was 700 ms of sleep, and the fix is to stop retrying a definitive 404.

### Prove the cause by removing it

The strongest proof is a controlled change: make the suspected cause disappear and watch the failure disappear, then put it back and watch the failure return.

```text
disable the retry wrapper -> 100 ms   (800 - 700 = 100: the sleeps are gone)
re-enable it              -> 800 ms   (700 ms of the time is sleep again)

the 700 ms that disappeared matches the 700 ms the sleeps accounted for,
which is what separates a cause from something that merely moved with it
```

Make the change one direction at a time, and if removing the suspected cause also removes something else along with it, you have not isolated anything yet. This is the moment the guess becomes knowledge.

### Fix the cause, not the symptom

Catching the exception, clamping the wrong value, or adding a null check at the call site makes the symptom vanish while the defect keeps producing bad state elsewhere.

```text
discountFor(customer) returns null for a member with no tier set
  call sites: calculateTotal, the invoice screen, the report export  -> 3 callers

check at calculateTotal:  1 of 3 callers repaired, the other 2 still print null
check inside discountFor: 3 of 3 callers repaired, with 1 test on the function
```

Ask what invariant was violated and where it should have been enforced, then enforce it there, and add the test that fails without the fix. Run that test before the fix and again after it: red, then green.

## Practice

### Bisect a regression

Take a bug that appeared at some point in your history. Find the last commit that worked and the first that did not, then check the commit halfway between them, halving the range each time.

Done when: you have identified a single commit that introduced the failure — or a range small enough to read entirely — and you can say how many checks it took: 7 candidate releases need at most 3 checks, because 2^3 = 8 is at least 7 while 2^2 = 4 is not.

### Disprove your own hypothesis

Write down your current best explanation of a bug, the observation it predicts, and the result of checking that prediction. If the hypothesis survives, remove the cause and confirm the failure disappears, then restore it and confirm the failure returns.

Done when: you have either a disproved hypothesis and a smaller search space — 7 candidates down to 3, say — or a confirmed cause with a test that fails without the fix.

## Common mistakes

- **Acting on the first plausible explanation** — the fix changes 4 things and the defect remains, leaving 3 unjustified edits in the diff; fix: state the hypothesis, predict the observation, and check it before changing code.
- **Changing more than one thing at a time** — 2 changes give 2 explanations and no experiment that separates them, so the result decides nothing; fix: one change, one measurement.
- **Fixing the symptom at the call site** — 1 of the function's 3 callers is repaired while the other 2 still receive the same bad value; fix: enforce the invariant where it belongs and add a failing test.
- **Skipping the controlled proof** — the cause is still a correlation, since the 800 ms reading and the retry helper were only ever observed together; fix: remove it and watch the failure disappear, then restore it and watch it return.
- **Stopping at the first instance** — the same mistake sits at the other call sites you have not opened; fix: search for the pattern and fix the copies.

## Go deeper

- **Reproduce before you fix** (`01-cs-fundamentals/11-debugging/01-reproduce-before-you-fix`) — the reproduction this step bisects, so read it first.
- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — turning a confirmed cause into a test that prevents the regression.
- **Code Review** (`01-cs-fundamentals/17-code-review`) — the same systematic questioning, applied before the defect reaches production.
