---
title: Drawing it honestly
prereqs: ["03-design-ux/31-data-visualization/01-choosing-the-right-chart"]
---

## What it is

Drawing a chart honestly means scaling the axes without exaggeration, encoding quantities as length or position rather than area or colour, ordering and labelling so the reader needs no explanation, and showing enough context that a difference can be judged.

## Why it matters

Readers take the visual shape of a chart as the finding and check none of the mechanics. A bar chart whose axis starts at 80 turns a one-point change into a dramatic climb; a bubble chart makes the largest value look hundreds of times bigger than a value that is only four times larger. Both are common in product dashboards, and both persuade people of things that are not true. Honesty here is not a moral nicety; it is what makes the chart usable as evidence.

## Core ideas

### Start bar-chart axes at zero

Bars encode quantity by length, so cutting the axis truncates the length and lies about the ratio. Line charts may use a non-zero baseline, because they encode change rather than magnitude — but say so in the label.

```text
Bars:  always from zero
Lines: may start at a non-zero value, annotated, for showing change
```

### Position and length beat area and colour

A reader estimates position on a common scale most accurately, length next, angle after that, and area and colour intensity least accurately. Use the weakest channels only for decoration or for a rough grouping.

```text
Accurate          position (dot plot) > length (bar) > angle > area > colour
Use for values    dot plots and bars
Use for grouping  colour, but always with a label or shape as well
```

### Show the comparison, not just the value

A single number has no meaning without a reference: last period, a target or a peer. Put the reference on the chart, not in the reader's head.

```text
Weak:   "312 support tickets this week"
Better: "312 support tickets this week, target 250, last week 288"
```

### Label directly, and drop what is not needed

Put the label next to the mark rather than in a legend that forces the eye to travel. Remove gridlines, borders, 3D effects and gradients that add nothing to the reading.

### Let the reader check the numbers

Provide the axis labels, units and — where it matters — the underlying table. A chart whose values cannot be recovered is a claim without evidence.

## Practice

### Audit three charts for honesty

For each, check the axis baseline, the encoding channel, the presence of a reference value and whether the labels can be read without a legend. Fix the worst violation in each.

Done when: every bar chart starts at zero, every value has a comparison beside it, and no quantity is encoded by area alone.

### Redraw one misleading chart

Take a chart you know exaggerates, redraw it with a zero baseline for bars, direct labels and a reference line, then show both versions to three people and ask what each says.

Done when: the two versions lead to different conclusions and you can name the specific change that caused it.

## Common mistakes

- **A truncated bar axis** — a tiny difference looks enormous and the chart lies; fix: start bar axes at zero.
- **Area encoding a value** — bubbles overstate the largest values by their radius squared; fix: use bars or dots, or size by area deliberately and label the scale.
- **A value with no reference** — the reader cannot tell whether it is good; fix: add the target, last period or peer value.
- **A legend instead of labels** — the eye shuttles between chart and legend and comparisons slow down; fix: label the marks directly.
- **Decoration that changes the reading** — gradients, 3D and drop shadows distort the marks; fix: remove anything that does not carry information.

## Go deeper

- **Choosing the right chart** (`03-design-ux/31-data-visualization/01-choosing-the-right-chart`) — the form this drawing step renders honestly.
- **Data Visualization** (`03-design-ux/31-data-visualization`) — the track this chapter closes.
- **Color Theory** (`03-design-ux/29-color-theory`) — making a colour-coded chart readable without colour.
- **Quantitative UX Research** (`03-design-ux/24-quantitative-ux-research`) — reading a measure's caveats before presenting it.
