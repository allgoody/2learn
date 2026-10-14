---
title: Fluid type and spacing
prereqs: ["frontend/responsive-web-design/01-mobile-first-layout"]
---

## What it is

Fluid type and spacing let sizes scale continuously with the available width instead of jumping at breakpoints. A single `clamp()` expression can interpolate a heading between its small-screen and large-screen values, and the same technique applies to the gaps, padding and margins around it.

## Why it matters

A layout with four breakpoints still looks wrong at the three widths between them. Text that is comfortable at 1440px is either enormous or unreadable at 2000px if its size is fixed, and a heading that steps from 1.5rem to 3rem in one jump draws attention to the breakpoint rather than to the content. Fluid values remove those edges: the page is always at a sensible size, and the number of breakpoints drops because there are fewer discontinuities to fix. The cost is that scaling is now a formula, so it has to be bounded — which is what `clamp()` is for.

## Core ideas

### Interpolate between two values with `clamp()`

`clamp(minimum, preferred, maximum)` returns the preferred value but never below the minimum or above the maximum. The preferred value is usually a viewport unit plus a fixed offset, which makes the middle term grow with the window while the bounds keep the extremes sane.

```css
h1 { font-size: clamp(1.5rem, 1rem + 2vw, 3rem); }
```

Read it as: never smaller than 1.5rem, never larger than 3rem, and in between grow by 2% of the viewport width on top of 1rem.

### Measure line length in characters

`max-width: 70ch` caps a paragraph at roughly seventy characters, the range in which the eye comfortably returns to the next line. In `ch` units the cap follows the font, so it keeps working when the type scale changes; a pixel cap does not.

```css
.prose {
  max-width: 68ch;
  margin-inline: auto;
}
```

### Scale spacing with the same expression

Fluid gaps keep a card's internal padding proportional to its width. Keep the steps small — a gap that varies from 0.5rem to 1.5rem reads as deliberate, one that varies fivefold reads as a bug.

```css
.section { padding-block: clamp(1.5rem, 1rem + 3vw, 4rem); }
```

### Give a component its own scale

With container query units (`cqw`), a component can size its text relative to its own container rather than the viewport. A card in a narrow sidebar then uses a smaller heading than the same card in the main column, with no extra class.

### Bound everything

The failure mode of fluid sizing is a value that is fine at 1200px and absurd at 320px or 3000px. Every interpolated value needs both bounds, and the small bound should be checked at the narrowest supported width, not at a familiar one.

## Practice

### Convert a step-based heading scale to fluid

Take a page with three heading levels and a breakpoint that resizes them. Replace each size with a `clamp()` expression between its two existing values, then delete the query.

Done when: the headings are never smaller than the old small size or larger than the old large size, and no heading changes size discontinuously while dragging the window.

### Set a comfortable measure

Apply a `ch`-based `max-width` to every paragraph container on one page, then compare against the same page at 200% zoom.

Done when: no line exceeds about seventy-five characters at any width, and the text still fills the container without an awkward short column.

## Common mistakes

- **Writing `clamp()` without a maximum** — headings grow without limit on very wide screens; fix: set both bounds and test at the widest width you support.
- **Using `vw` alone for font size** — the text cannot be zoomed independently and it scales with the window rather than the reader's preference; fix: keep a `rem` term in the expression so the value respects the root size.
- **Capping line length in pixels** — the measure drifts as soon as the font scale changes; fix: cap in `ch`.
- **Making spacing fluid everywhere** — unrelated gaps breathe in and out and the layout looks unstable; fix: reserve fluid spacing for section-level rhythm and keep component gaps fixed.
- **Interpolating on a breakpoint basis and keeping the queries** — two systems fight over the same property; fix: delete the query once the value is continuous.

## Go deeper

- **Mobile-first layout** (`frontend/responsive-web-design/01-mobile-first-layout`) — the base layer these fluid values are added to.
- **Modern CSS features** (`frontend/css/04-modern-css`) — `clamp()`, custom properties and container units in their wider context.
- **Web Typography** (`frontend/web-typography`) — how to choose the sizes you are interpolating between in the first place.
