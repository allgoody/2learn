## Example 1 — One sentence, then the split

The monthly invoice run is slow, but only on the last working day of the month. You have been reading the rendering code for an hour. Write the problem in one sentence, split it into checkable parts, and mark the cheapest assumption to test.

```text
Observation  the invoice run is slow on the last day of the month only
Spent so far  an hour in the rendering code, nothing ruled out
```

### Solution

```text
Problem: the invoice run is slow on the last day of the month only.
Parts   (a) the number of invoices produced that day
        (b) the reconciliation job that also runs then
        (c) the batch size the run is configured with
Known   (c) unchanged for a year
Assumed (a) volume peaks on the last day   <- cheapest to check
Next    log the invoice count and the run time for two months
```

One sentence forces a definition, and the parts can each be checked on their own. Marking the cheapest unknown instead of the likeliest one usually moves the work off the interesting code, which is where an hour has already gone. The usual mistake is splitting into tasks rather than unknowns: "check the logs" is not a part of the problem.

## Example 2 — Keep the elimination log

You have a bounded afternoon on a bug: one order's invoice is missing its last line. Write the log so someone else could continue without repeating your afternoon.

```text
Bug       the last line is missing from some invoice PDFs
Starting point  the template, because that is where the line is drawn
```

### Solution

```text
13:00  hypothesis: the template drops the last line. Reprinted a failing
       order; the line is missing from the print too. Ruled out.
13:35  hypothesis: page height truncates the block. Set a taller page; the
       line still missing. Ruled out.
14:10  hypothesis: odd or even line counts. Three failures have an even
       count and two passes have an odd one. Ruled out.
14:40  Left: the rows the renderer receives, not the drawing of them.
Next   dump the rows for one failing order and count what reaches the
       renderer.
```

A timebox with a written list turns a lost afternoon into evidence and names what is left for whoever continues. The usual mistake is chasing hypotheses without recording the negative results, so the next person tests the template again.
