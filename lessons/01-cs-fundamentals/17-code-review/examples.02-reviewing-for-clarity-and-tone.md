## Example 1 — A review that lists twenty equal observations

The comments below are what a reviewer left on a small change. Say what the author can act on, then rewrite them so priorities and locations are clear.

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
caller treats a failed charge as paid. What should the caller see?

blocker: lines 30-38 — no test covers the retry path, so reverting would
still pass the suite. Can we add one that fails without it?

suggestion: `data` holds the parsed record, not the raw response — a
clearer name would make line 12 readable.

nit: docstring typo on line 8.
dropped: the map is taste, null is excluded by the type, and the loop runs
over a list of three.
```

Rewriting is mostly deletion: half the comments would not change the author's day, and without severity labels the author must guess which matter. Each surviving comment names a line and states the expectation and the observation, so it can be answered with evidence. The trap is that a long list feels thorough — the commonest way a real defect is missed.

## Example 2 — One diff that does two things

A change arrives as a single diff of 620 lines: a module rename across eleven files, plus a change to the rounding rule in two of them. Say what a reviewer can realistically do, then write the response.

```text
diff: 620 lines, 13 files
  files 1-11: rename the price module and update imports
  files 12-13: change rounding from floor to nearest, plus its test
author's note: "the rounding fix is the point, the rename is incidental"
```

### Solution

```text
suggestion: split this before review. As one diff it gets skimmed, and 618
lines of rename hide the two lines that change behaviour.

  PR 1 — the rename alone, no behaviour change: mechanical and quick to check
  PR 2 — the rounding change plus a test that fails on the old code
```

A large diff gets a shallow review whatever the reviewer intends, and 618 lines of rename bury the two lines that change behaviour. Splitting raises the attention the behaviour change receives, and makes a later bisect land on a meaningful commit. The trap is the author's note: pointing at the important lines feels like a solution, but the reviewer must still hold 620 lines in view to trust it.
