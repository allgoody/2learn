## Example 1 — Bisecting a regression by commit

A test that passed in release 40 fails in release 47. Say how many checks the bisection needs, then walk it to its conclusion.

```text
good: release 40   bad: release 47
test 43 -> fails   -> candidate range is 41..43
test 41 -> passes  -> candidate range is 42..43
test 42 -> fails   -> commit 42 introduced it
```

### Solution

```text
seven releases, halved each time: about 3 checks, not 7
range 41..43 holds 3 commits -> at most 2 more checks
result: commit 42, so the change to read is one commit's diff
```

Testing the midpoint halves the candidates whatever the result, so seven releases take about three checks rather than seven, and the answer is a single commit whose diff can be read in full. The trap is starting at the top and reading the most recent changes, which uses the same information while throwing away the halving — and it assumes the regression arrived with a release somebody tested.

## Example 2 — A false hypothesis, disproved in one measurement

An endpoint takes 800 ms, and the first hypothesis is a slow database join. The measurement below is what came back. Say what the hypothesis predicted, whether it survived, and what to do next.

```text
hypothesis: the join on orders is slow
prediction: the query accounts for most of the 800 ms
check:      query 2 ms, handler 790 ms before it queries
```

### Solution

```text
disproved: the query is 2 ms of 800 ms, so the whole database layer is
ruled out, not merely this query.

next: bisect the 790 ms before the query. That code wraps the handler in
a retry helper, sleeping on a 404 from its health check.
remove the retry -> 12 ms;  restore it -> 800 ms
```

Stating the prediction first is what makes the measurement decisive: it rules the database out of the search space, which is real progress even though nothing has been fixed. Bisecting what remains points at code that never appeared in the original story, and removing and restoring it proves the cause instead of merely correlating with it. The trap is the explanation that fits the symptom, because a join on a large table is exactly the guess that leads to a change nobody can justify later.
