## Example 1 — A review that lists twenty equal observations

A reviewer left 20 comments on a 45-line change. The 6 that carry the message are below, in the order they were written. Say what the author can act on, then rewrite them so that the priorities and the locations are clear.

```text
- this is bad naming
- you should add tests
- confusing
- I would have used a map instead of the nested loop
- typo in the docstring
- does this handle null?
```

### Solution

```text
blocker: line 42 — `debit` returns "pending" when every retry fails, so the
caller treats a failed charge as paid. What should the caller see instead?

blocker: lines 30-38 — no test covers the retry path, so deleting the whole
branch would still leave the suite green. Can we add 1 test that fails
without it?

suggestion: `data` holds the parsed record, not the raw response — a clearer
name would make line 12 readable.

nit: docstring typo on line 8.

dropped: the map is taste, null is excluded by the type, and the loop runs
over a list of 3 items.
```

Of the 6 comments, 3 become work: 2 blockers and 1 suggestion, each naming a line and stating the expectation and the observation so that it can be answered with evidence. The typo survives as a nit and the other 3 are dropped, because none of them would change the author's next hour. Rewriting was mostly deletion, and that is the point: a long list feels thorough, and 20 comments that all read alike are how 1 real defect gets missed.

## Example 2 — One diff that does two things

A change arrives as a single diff of 620 lines across 13 files: 11 files rename the price module and update its imports, and 2 files change the rounding rule from floor to nearest. Say what a reviewer can realistically do with it, then write the response.

```text
diff: 620 lines, 13 files = 11 rename + 2 behaviour change

files 1-11     rename the price module and update its imports   618 lines
files 12-13    rounding: floor -> nearest, plus its test          2 lines
               618 + 2 = 620

author's note: "the rounding fix is the point, the rename is incidental"
```

### Solution

```text
suggestion: split this before review. As one diff it gets skimmed: a reviewer
given 30 minutes has 30 * 60 = 1800 seconds for 620 lines, which is
1800 / 620 = 2.9 seconds per line — not enough to notice the 2 lines that
change the rounding.

  PR 1 — the rename alone, 618 lines, no behaviour change: mechanical, quick
  PR 2 — the rounding change plus 1 test that fails on the old code
```

A large diff gets a shallow review whatever the reviewer intends, and here 618 lines of rename bury the 2 lines that change behaviour. Splitting puts almost all of the 1800 seconds on the 2 lines that can be wrong, and makes a later bisect land on a commit that means 1 thing. The trap is the author's note: pointing at the important lines feels like a solution, but the reviewer still has to hold all 620 lines in view to trust that the note is complete.
