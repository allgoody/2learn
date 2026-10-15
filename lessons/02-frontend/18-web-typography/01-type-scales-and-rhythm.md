---
title: Type scales and rhythm
prereqs: ["02-frontend/05-css"]
---

## What it is

A type scale is the fixed set of sizes a page uses, related by a ratio rather than chosen one at a time. Vertical rhythm is the related idea for space: a single base unit that margins, padding and line heights are multiples of, so that blocks of text sit on a consistent grid down the page.

## Why it matters

Without a scale, sizes accumulate: an 18px heading here, a 19px one there, chosen by eye at the moment and impossible to keep consistent as the product grows. Without a rhythm unit, the space above a heading is unrelated to the space below it, and the page reads as irregular even to someone who cannot say why. Both are cheap to establish once and expensive to retrofit, because every screen built on ad-hoc values has to be reviewed when the scale finally arrives.

## Core ideas

### Set the base size and let everything relate to it

A body size around one rem, with headings a ratio apart, produces a small, memorable set of steps. Small ratios (1.125) are gentle and suit dense interfaces; larger ratios (1.333) separate levels strongly and suit marketing pages. The ratio is a design decision; the consistency is not.

```css
:root {
  --step-0: 1rem;
  --step-1: 1.25rem;
  --step-2: 1.563rem;
  --step-3: 1.953rem;
}

h1 { font-size: var(--step-3); }
h2 { font-size: var(--step-2); }
```

Sizes in `rem` respect the reader's browser font-size setting; sizes in pixels do not.

### Line height depends on the line

Short lines and large type need less leading than long lines and small type; a single global `line-height` is always wrong somewhere. A workable rule is roughly 1.5 for body text, tighter for large headings, and always unitless so it scales with the font size.

```css
body { line-height: 1.5; }
h1, h2 { line-height: 1.15; }
```

### Cap the measure

A line of around 45 to 75 characters is comfortable; beyond that the eye loses its place on the return. `max-width` in `ch` units follows the font, so the cap survives a change to the type scale.

### Round spacing to the same unit

A base unit — often a quarter of the line height, or 0.25rem — that all margins and padding are multiples of brings the page into a rhythm. It also removes the "is this 12 or 14 pixels?" conversation from code review.

```css
:root { --unit: 0.25rem; }

.section { padding-block: calc(var(--unit) * 12); }
.card + .card { margin-block-start: calc(var(--unit) * 6); }
```

### Make the scale fluid once it is established

Once the steps exist, each can interpolate between its small and large values with `clamp()`, so the same scale holds at every viewport width without additional breakpoints.

## Practice

### Build a four-step scale from one value

Choose a base size and a ratio, compute four steps, and apply them to the headings on one page. Delete every other font-size declaration.

Done when: the page has four heading sizes and one body size, all expressed in `rem`, and no arbitrary size remains.

### Align two blocks to a rhythm unit

Pick a unit of 0.25rem and rewrite the margins and padding of one page as multiples of it. Compare the layout side by side with the original.

Done when: the spacing is visually consistent and every value is a multiple of the unit, with no magic numbers left.

## Common mistakes

- **Adding a new size for each design** — the scale stops being a scale and consistency disappears; fix: choose the nearest step and change the step if it is genuinely wrong.
- **Setting sizes in pixels** — the reader's font-size preference is ignored; fix: use `rem` for type and spacing.
- **A single `line-height` for the whole document** — headings look loose and body text looks tight; fix: vary leading by size and keep it unitless.
- **Letting a paragraph span the full page width** — the line becomes unreadable; fix: cap it in `ch`.
- **Fixing rhythm after the fact** — every screen has to be revisited; fix: establish the unit before the second page is built.

## Go deeper

- **Cascading Style Sheets (CSS)** (`02-frontend/05-css`) — custom properties and the cascade are how a scale is actually applied.
- **Fluid type and spacing** (`02-frontend/10-responsive-web-design/02-fluid-type-and-spacing`) — turning a fixed scale into one that adapts continuously.
- **Web fonts and performance** (`02-frontend/18-web-typography/02-web-fonts-and-performance`) — the delivery half of setting type in a browser.
