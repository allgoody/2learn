---
title: Color Theory
type: skill
topic: design-ux
tier: small
status: drafted
aliases: ["Colour Theory"]
prereqs: ["design-ux/visual-design"]
related: []
---

## What it is

Color theory is choosing colour for contrast, harmony and meaning, and understanding how it reads in context — on a dim screen, in sunlight, in print, and for the roughly one in twelve men and one in two hundred women who cannot distinguish some pairs of it. In an interface, colour is a signalling system before it is a decoration.

## Why it matters

Colour is the fastest channel for state: what is selected, what failed, what is a link, what is disabled. When those signals are carried by red and green alone, a substantial minority of users cannot read them. When the palette is not checked for contrast, text becomes unreadable in a bright room even for users with perfect vision. And when a brand palette is applied without a system, the product ends up with fourteen shades of the same blue.

## Core ideas

### Colour carries state, so it needs a partner

Never encode meaning in hue alone. Pair it with text, an icon or a shape, and the signal survives both colour-blindness and a monochrome printout.

```text
Bad     green dot = passed, red dot = failed
Better  green dot + "passed"  /  red dot + "failed"
Best    tick icon + "passed"  /  warning icon + "failed"  (hue is redundant)
```

### Build ramps, not swatches

Define a small ramp per hue — a light surface, a border, the base, and a dark text-on-surface version — so that any pair you reach for is already known to work.

```text
blue-50   surface
blue-200  border
blue-600  base, icons and fills
blue-800  text on blue-50
```

Four steps per hue for the two or three hues you actually use beats twenty swatches used once each.

### Check contrast, do not eyeball it

Text against its background needs a measurable ratio, and larger text is allowed a lower one than body text. Check every pairing you ship, including states: hover, disabled, placeholder and error.

```text
body text on a surface      needs a high ratio   <- check every page
large heading               needs a lower ratio
placeholder and disabled    most often the failures in a product
```

### Use one accent for action, and nothing else

If blue means "clickable" and also "informational banner" and also "the brand block", it means nothing. Reserve the accent for interactive elements and a second, contrasting colour for destructive actions.

### Meaning is cultural and contextual

Red means danger in one context and good fortune in another. Check what the colour means to the audience, and never rely on the convention alone when a word will do.

## Practice

### Audit one palette

Take the colours in a live interface and list every pairing of text on background that actually ships. Check each ratio and mark the failures.

Done when: you have a written list of failing pairings and a replacement value for the two worst.

### Re-encode one colour-only signal

Find a status that is currently conveyed by hue alone. Add a word or an icon and a second channel such as weight or shape.

Done when: the status is still unambiguous when you view it with the colour removed, for example in greyscale.

## Common mistakes

- **Red and green only** — a large group of users cannot read the state; fix: add text, an icon or a shape beside the colour.
- **Too many hues** — the palette stops signalling and starts decorating; fix: keep two or three hues with a ramp each.
- **Unchecked contrast** — the interface is unreadable outdoors or on a dim screen; fix: measure the ratio for every shipping pairing.
- **The accent colour used for everything** — clickable, informational and decorative all look the same; fix: reserve the accent for interaction.
- **Placeholder text treated as decoration** — it fails contrast while still being read; fix: check placeholder and disabled states like any other text.

## Go deeper

- **Visual Design** (`design-ux/visual-design`) — read this first; colour is one of its four decisions.
- **Contrast and alignment** (`design-ux/visual-design/02-contrast-and-alignment`) — the contrast discipline this chapter extends.
- **Data Visualization** (`design-ux/data-visualization`) — colour as a data channel, where the rules tighten further.
- **Accessibility (WCAG / a11y)** (`frontend/accessibility-wcag-a11y`) — the formal ratios and how to test them.
