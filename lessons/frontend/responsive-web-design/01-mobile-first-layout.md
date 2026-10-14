---
title: Mobile-first layout
prereqs: ["frontend/css"]
---

## What it is

Mobile-first layout means writing the stylesheet for the narrowest screen first, then adding rules for wider ones. The base styles describe a single column of content; media queries add columns, sidebars and extra decoration as space appears. Nothing about the technique is specific to phones — it is a direction of travel, from the constrained case to the roomy one.

## Why it matters

A layout written narrow-first is simpler at both ends. The base rules are the ones that must always be true, so there is no inherited desktop layout to undo, and no `!important` to override a declaration you made three hundred lines earlier. It also forces a content hierarchy: if the page has to make sense in one column, you must decide what matters most, which is a good decision to have made before you have three columns to distribute. And because the narrow styles are the ones downloaded and applied first, a phone gets a complete layout before it has parsed a single wide-screen rule.

## Core ideas

### The base layer is the narrow layout

Start with every element in a single column in source order. No float, no width, no multi-column grid: just readable flow with sensible type and spacing. This layer is also your fallback if a query fails to apply, so it must be complete on its own rather than merely inoffensive.

```css
.article {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
}
```

### Add features with `min-width`, in reading order

Each query adds one capability, and the order of the queries matches the order of the rules they add. That means a reader can scroll the file and watch the layout grow, and a later query always wins because it comes later in source order with the same specificity.

```css
@media (min-width: 40rem) {
  .article { grid-template-columns: 2fr 1fr; }
}

@media (min-width: 70rem) {
  .article { padding: 2rem 3rem; }
}
```

### Choose each breakpoint from the content

Shrink the window until a line becomes awkwardly long or two columns stop fitting. That width is the breakpoint. Recording why each exists in a comment keeps the next person from deleting it as arbitrary.

### Reflow, then reorder only when the meaning allows

Hiding a secondary column on a narrow screen is fine; moving the main content below a decorative aside is not, because the reading order and the source order diverge and keyboard and screen-reader users get the wrong sequence. If a visual reorder is needed, check the DOM order rather than the rendered order.

### Test at the extremes and in between

A layout that works at 320px and at 1440px can still break at 640px. Drag the window edge slowly rather than jumping between named widths, and check a real phone with the browser's device mode as well.

## Practice

### Rewrite a desktop layout narrow-first

Take an existing page whose stylesheet begins with a wide two-column layout. Write a new narrow-first base, adding one query per capability. Keep the original file and compare rule counts and `!important` usage.

Done when: the new stylesheet has no `!important`, the two versions look identical at your widest tested width, and the narrow version is the shorter file.

### Find and justify three breakpoints

Pick a page and record the widths at which the layout stops working. Add a query at each width and write a one-line comment saying which content element forced it.

Done when: deleting any one comment leaves a reader unable to tell why its query exists, and no query is present without a reason.

## Common mistakes

- **Writing the desktop layout first** — every narrow rule has to undo a wide one and the file doubles; fix: put the single-column layout in the base and add columns with `min-width` queries.
- **Using `max-width` queries as the primary mechanism** — a narrow phone and a narrowed desktop window end up with different rules; fix: reserve `max-width` for genuine exceptions and build with `min-width`.
- **Hiding content on small screens** — the content is gone for many users, not merely moved; fix: reflow it into the single column, and only hide decoration.
- **Reordering with flexbox or grid against the DOM order** — the visual order and the tab order disagree and assistive technology reads the wrong sequence; fix: change the markup order instead.
- **Testing only two window sizes** — the layout breaks in the middle where the query boundary is wrong; fix: drag the window edge continuously and check a real device.

## Go deeper

- **Cascading Style Sheets (CSS)** (`frontend/css`) — the cascade, the box model and the queries this lesson assumes you have met already.
- **Fluid type and spacing** (`frontend/responsive-web-design/02-fluid-type-and-spacing`) — the complement to breakpoints: sizes that adapt without one.
- **Accessibility (WCAG / a11y)** (`frontend/accessibility-wcag-a11y`) — reflow and zoom requirements that constrain what a responsive layout may do.
