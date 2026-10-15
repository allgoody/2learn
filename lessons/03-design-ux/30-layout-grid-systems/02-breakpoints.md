---
title: Breakpoints
prereqs: ["03-design-ux/30-layout-grid-systems/01-columns-and-gutters"]
---

## What it is

A breakpoint is a width at which the layout changes arrangement: columns collapse, a sidebar moves below the content, navigation becomes a menu. Choosing breakpoints means deciding where the current arrangement stops working and what it becomes instead.

## Why it matters

Layouts fail by degrees, not all at once: a three-column page is fine at 1280 pixels, cramped at 900 and unusable at 480. Without deliberate breakpoints the browser squeezes everything until text wraps to four words a line and images overlap. Breakpoints also determine how many layouts have to be designed and maintained — too many, and every change is made six times.

## Core ideas

### Set breakpoints where the content breaks, not at device sizes

Resize the window slowly and mark the width at which something becomes unreadable or cramped. Those widths are your breakpoints. Device model names date within a year; content-driven widths do not.

```text
Mark: at 940px the sidebar squeezes the text below 45 characters
Mark: at 620px the three-column card grid leaves 2-word lines
Breakpoints: 940 and 620, chosen from the content
```

### Fewer breakpoints, bigger changes

Three or four arrangements cover most products. At each one, change the arrangement rather than nudging sizes; a layout that differs only in padding could have been fluid.

```text
Wide   >=940   content + sidebar side by side
Medium 620-939 sidebar moves below the content
Narrow <620    single column, navigation collapses to a menu
```

### Design the narrowest arrangement deliberately

The narrow layout is not the wide one squeezed. Decide what survives: the primary action, the heading, the essential field. Anything else moves down the page or into a secondary view.

### Let the layout be fluid between breakpoints

Between two breakpoints, widths should stretch smoothly rather than jumping. A breakpoint is a change of arrangement, not the only place the layout adapts.

### Test at the awkward widths, not the round numbers

Check just above and just below each breakpoint, and at a very wide screen. Most layout bugs live at the boundaries, where one arrangement has ended and the next has not begun.

## Practice

### Find the breakpoints by shrinking

Take the widest layout and narrow the window one step at a time. Write down the width each time something becomes awkward.

Done when: you have two or three content-driven widths and can name what changes at each.

### Design the narrow arrangement independently

Sketch the same page at 360 pixels wide without looking at the wide layout, deciding what the page is for when there is only one column.

Done when: the narrow layout has a clear primary action and no element carried over only because it was easier to keep.

## Common mistakes

- **Breakpoints copied from device names** — the widths do not match the content and date quickly; fix: choose widths where the layout actually breaks.
- **Too many breakpoints** — every change has to be made five times; fix: three or four arrangements and a fluid layout between them.
- **Only padding differing between arrangements** — the breakpoint adds maintenance for no benefit; fix: change the arrangement or let it be fluid.
- **Squeezing the wide layout** — the narrow screen gets four-word lines and overlapping blocks; fix: design the narrow arrangement on its own terms.
- **Testing only at round widths** — the boundary failures go unseen; fix: check just above and below each breakpoint.

## Go deeper

- **Columns and gutters** (`03-design-ux/30-layout-grid-systems/01-columns-and-gutters`) — the column set these breakpoints rearrange.
- **Layout & Grid Systems** (`03-design-ux/30-layout-grid-systems`) — the track this chapter closes.
- **Responsive Web Design** (`02-frontend/10-responsive-web-design`) — the wider practice of adapting across devices.
- **Cascading Style Sheets (CSS)** (`02-frontend/05-css`) — how a breakpoint is expressed in code.
