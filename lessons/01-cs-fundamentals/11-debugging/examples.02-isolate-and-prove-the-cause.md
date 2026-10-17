## Example 1 — Bisecting a regression by commit

A test that passed in release 40 fails in release 47, so 7 releases are candidates — 41, 42, 43, 44, 45, 46 and 47 — and one of them introduced the failure. Say how many checks the bisection needs, then walk it to its conclusion.

```text
good: release 40   bad: release 47
test 43 -> fails   -> candidate range is 41..43
test 41 -> passes  -> candidate range is 42..43
test 42 -> fails   -> commit 42 introduced it
```

### Solution

```text
7 candidates, 41 to 47, halved at each check:
  2^2 = 4, and 4 < 7, so 2 checks cannot cover them
  2^3 = 8, and 8 >= 7, so at most 3 checks are needed

each check splits the current range into two halves of at most 4:
  check 43 -> 41..43 (3 releases) or 44..47 (4 releases)
  check 41 -> 42..43, then check 42 -> commit 42

result: commit 42, one commit's diff to read, and no other candidate left
```

Testing a midpoint halves the candidates whatever the answer comes back as, so 7 releases take at most 3 checks rather than 7, and the result is a single commit whose diff can be read in full. Each check costs one build and one test run, which is why three of them are the cheap route to certainty rather than a slow one. The trap is starting at the top and reading the most recent changes, which uses the same information while throwing away the halving — and it assumes the regression arrived with a release somebody tested.

## Example 2 — A false hypothesis, disproved in one measurement

An endpoint takes 800 ms, and the first hypothesis is that the slow part is the database join against a large orders table. The measurements below are what came back. Say what the hypothesis predicted, whether it survived, and what to do next.

```text
hypothesis: the join on orders is slow
prediction: the query accounts for most of the 800 ms
check:      query 2 ms; handler 790 ms before the query, 8 ms after it
            790 + 2 + 8 = 800 ms
```

### Solution

```text
disproved: the query is 2 ms of the 800 ms -- 2 / 800 = 0.0025, a quarter of a
percent -- so the whole database layer is ruled out, not merely this query.

the 790 ms before the query breaks down as
  700 ms of sleep inside the retry helper + 90 ms of handler work
  700 + 90 = 790

next: bisect the 700 ms. That helper wraps the entire handler and sleeps on a
404 from the health check the handler makes first.

remove the retry -> 800 - 700 = 100 ms;   restore it -> 800 ms
```

Stating the prediction before measuring is what makes the measurement decisive: 2 ms out of 800 rules the database out of the search space, which is real progress even though nothing has been fixed yet. Bisecting what remains points at code that never appeared in the original story, and removing and restoring it proves the cause instead of merely correlating with it — 700 ms of the request disappears and then returns exactly as predicted. The trap is the explanation that fits the symptom, because a join on a large table is exactly the guess that leads to a change nobody can justify afterwards.
