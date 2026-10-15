## Example 1 — Replacing "about 30% wide" with column spans

A product grid was laid out by eye: each card is roughly 30% of the row and the gaps change as the window resizes. Put the row on a twelve-column set with a fixed gutter, so every card edge is reproducible.

```text
Product grid, viewport 1280px
  Card width:  ~30% of the row
  Gap:         ~20px, drifts as the window resizes
```

### Solution

```text
12 columns, gutter 24px, margin 80px at this width
  4 cards span 3 columns each   (3 + 3 + 3 + 3 = 12)
```

Twelve columns divide cleanly into 2, 3, 4 and 6, so four cards land on whole column edges with no remainder; a fixed gutter keeps the rhythm between blocks stable while the margins alone scale with the viewport. Any element that is "about 30%" cannot be reused on another screen or explained to a developer, whereas a span can be both. The usual failure is an odd column count, where halves and thirds need fractions and nothing lines up.

## Example 2 — Capping the measure at eight columns

On a wide screen the body text of an article page spans all twelve columns and the longest lines run past 100 characters. Bring the text onto the grid at a comfortable measure, leaving the spare columns empty rather than widening the text.

```text
Article page, viewport 1440px
  Body text spans all 12 columns  ->  lines over 100 characters
```

### Solution

```text
12 columns, gutter 24px, margin 80px
  Body text spans 8 columns        ->  about 70 characters
  Remaining 4 columns hold nothing (or a sidebar)
```

Body text should run six to eight columns of a twelve-column set, so the measure stays near 70 characters however wide the screen gets. The columns it does not use are the reason the layout has room for a sidebar later without moving anything. Widening the text to fill the grid is how a comfortable measure becomes an unreadable one, and it is the most common way a column set gets blamed for a typography problem.
