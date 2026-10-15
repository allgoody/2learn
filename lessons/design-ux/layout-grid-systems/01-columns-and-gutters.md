---
title: Columns and gutters
prereqs: []
---

## What it is

A column set is the number of vertical tracks content is placed in, and the gutters are the gaps between them. The margins are the space from the outermost columns to the edge of the viewport. Together they are the skeleton of every screen.

## Why it matters

Columns are a constraint that produces consistency for free. When a designer places a card, they choose an edge that already exists rather than inventing one, and when an engineer builds it, the width is a multiplication rather than a measurement. Choosing the count well also determines what is easy: a twelve-column set divides into halves, thirds, quarters and sixths without fractions, which is why it has outlasted its print origins.

## Core ideas

### Count columns by what you need to divide into

Twelve divides cleanly into 2, 3, 4 and 6. Whatever the count, the test is which common layouts produce whole columns with no remainder.

```text
12 columns   halves 6+6, thirds 4+4+4, quarters 3+3+3+3, sixths 2x6
16 columns   more flexibility, more ways to be inconsistent
```

### Let the gutter stay constant, and the margins scale

A fixed gutter keeps the rhythm between blocks stable as the viewport changes; margins widen on large screens to stop the measure growing too long.

```text
Gutter   24px at every width
Margin   16px on a phone, 40px on a tablet, 80px on a wide screen
```

### Content spans columns, never fractions of them

Every element starts and ends on a column edge. An element that is "about 30% wide" cannot be reused on another screen and cannot be explained to a developer.

### Narrow the text, not the whole grid

Body text should run about 6 to 8 columns of a 12-column set; the remaining columns hold nothing or a sidebar. Do not widen the text to fill the grid — that is how a comfortable measure becomes an unreadable one.

### Make the grid visible while designing, invisible when done

Overlay it while working and take it off for review. The grid is scaffolding: if a finished screen needs the overlay to be understood, the layout is doing something the grid did not intend.

## Practice

### Choose a column set for one product

Pick a count, a gutter and three margin sizes, and lay out the same list page at each of the three widths.

Done when: every block sits on a column edge at every width, and the body text never exceeds eight columns.

### Rebuild one screen on the grid

Take a screen laid out by feel and re-place every block on column edges, changing nothing else.

Done when: no element starts at an arbitrary offset, and the page reads the same or better than before.

## Common mistakes

- **Odd column counts** — halves and thirds need fractions and nothing lines up; fix: choose a count with many divisors, such as twelve.
- **Gutter varying with width** — the vertical rhythm shifts and blocks look differently spaced on each screen; fix: fix the gutter and scale the margins instead.
- **Elements at arbitrary widths** — the layout cannot be reused or reproduced; fix: span whole columns only.
- **Text filling all columns** — the measure grows with the screen and reading suffers; fix: cap body text at six to eight columns.
- **Designing with the overlay on** — the grid becomes a visible structure rather than a guide; fix: review without the overlay and judge the result on its own.

## Go deeper

- **Layout & Grid Systems** (`design-ux/layout-grid-systems`) — the track these columns open.
- **Breakpoints** (`design-ux/layout-grid-systems/02-breakpoints`) — how the column set adapts across widths.
- **Cascading Style Sheets (CSS)** (`frontend/css`) — the browser layout modes that place content on these columns.
- **Typography** (`design-ux/typography`) — the measure these column spans are chosen to produce.
