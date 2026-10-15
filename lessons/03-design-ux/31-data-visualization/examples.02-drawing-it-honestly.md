## Example 1 — The axis that turns one point into a climb

A dashboard reports weekly satisfaction on a bar chart whose axis starts at 80, so a one-point change between weeks looks like a dramatic rise. The table below stands in for the chart. Correct the axis and name the distortion the change removes.

```text
Satisfaction by week — as published (axis 80-90)

  week 3   84   ████
  week 4   85   ██████
  week 5   84   ████
```

### Solution

```text
Satisfaction by week — axis from zero (0-100)

  week 3   84   ██████████████████████████████████████
  week 4   85   ███████████████████████████████████████
  week 5   84   ██████████████████████████████████████
```

Bars encode quantity by length, so a baseline at 80 truncates every bar and lies about the ratio between them. Starting at zero removes the false impression that satisfaction climbed in week 4 and fell back: the three weeks are within one point of each other and the shape now says so. A line chart may use a non-zero baseline because it shows change rather than magnitude, but the label has to say so. The failure to watch for is a bar axis trimmed "to see the difference".

## Example 2 — A single value with nothing to compare it to

A weekly support report states one number and no context, so nobody can tell whether 312 tickets was a good week. Give the figure a reference and label it directly, so the reading needs no legend.

```text
Support tickets this week: 312
```

### Solution

```text
Support tickets this week — 312
  target     250   ┈┈┈┈┈┈┈┈  reference line
  last week  288   ────────
  this week  312   ████████
```

The bar is now compared against a target and last week, both drawn on the chart rather than left in the reader's head, and each mark is labelled in place instead of through a legend the eye must shuttle to. A single number has no meaning without a reference. The common failure is a value with no reference at all, or a legend that slows every comparison by forcing a look back and forth across the chart.
