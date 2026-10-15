## Example 1 — Counting the duplication before committing

A product lead asks whether the app needs a design system and gives you a week to answer. Start with what exists: five repeated patterns and how many times each is built by hand. Produce the count that says which patterns are worth systematising.

```text
# counts illustrative, from one product
Pattern       Implementations   Divergent variants
Button        11                4
Modal          7                5
Form field     9                6
Tooltip        2                2
Empty state    3                3
```

### Solution

```text
Pattern       Implementations   Variants   Verdict
Button        11                4          system
Modal          7                5          system
Form field     9                6          system
Tooltip        2                2          leave
Empty state    3                3          leave
```

Eleven hand-built buttons with four behaviours is a system-sized problem, and the modal and the form field are close behind. The tooltip and the empty state have one implementation each, so a shared component would cost more to govern than it saves. The mistake is reading the count column alone and treating every row as a candidate.

## Example 2 — Weighting the count by the change rate

The same five patterns, but only some of them move. Add how often each changes and rank the candidates. Produce the two patterns to build first.

```text
# counts illustrative
Pattern       Implementations   Changes per year
Button        11                4
Form field     9                4
Modal          7                1
Empty state    3                1
Tooltip        2                0
```

### Solution

```text
Pattern       Count x changes   Priority
Button        11 x 4 = 44       build first
Form field     9 x 4 = 36       build first
Modal          7 x 1 = 7        later
Empty state    3 x 1 = 3        later
Tooltip        2 x 0 = 0        never
```

Multiplying the count by how often the pattern changes puts the button and the form field at the top, because every change currently has to be made in eleven or nine places. The modal looks busy by count alone, but it barely moves, so it can wait. A pattern that never changes is cheap to duplicate, which is why the raw count on its own ranks the work wrongly.
