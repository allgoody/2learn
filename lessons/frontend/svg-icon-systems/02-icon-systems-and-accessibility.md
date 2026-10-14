---
title: Icon systems and accessibility
prereqs: ["frontend/svg-icon-systems/01-svg-fundamentals"]
---

## What it is

An icon system is the delivery and labelling strategy for a set of icons: how the browser receives them, how they are sized and coloured, and what a screen reader is told when one appears. The delivery choice is usually between a sprite file referenced from `<use>`, inlining the markup, or rendering through an `<img>`; the labelling choice is whether the icon is decoration or information.

## Why it matters

The delivery choice decides what is possible. An `<img>` icon cannot inherit colour; a sprite can, but cannot be animated per element; inline markup can do both, at the cost of repeating the paths. The labelling choice decides whether the interface is usable: an icon-only button with no name announces as "button", and a decorative icon without `aria-hidden` inserts meaningless content into the reading order. Both decisions are made once and then copied hundreds of times, which is what makes a system worth having.

## Core ideas

### Three delivery models, three trade-offs

A sprite is one file containing every symbol, referenced with `<use href="#name">`. It is cached once, and the icons can be recoloured with `currentColor`. Inline markup gives full per-element control — animation, multiple colours, scripted parts — and repeats the path data. An `<img>` is the simplest to author and the least flexible: no colour inheritance, no styling of internals.

```html
<svg aria-hidden="true" focusable="false">
  <use href="/icons.svg#search" />
</svg>
```

The practical split is a sprite for the many icons that only need a colour and a size, and inline markup for the few that are animated or multi-coloured.

### Decide decoration or information, and say so

A decorative icon is hidden from the accessibility tree with `aria-hidden="true"` and `focusable="false"`, and the text beside it carries the meaning. An informative icon is given a name — either `role="img"` with an `aria-label`, or a `<title>` element as its first child.

```html
<!-- Icon-only button: the button carries the name -->
<button type="button" aria-label="Search">
  <svg aria-hidden="true" focusable="false">…</svg>
</button>
```

Never leave this to chance: an unlabelled decorative icon is noise, and an unlabelled informative icon is a missing word.

### Name the control, not the icon

When the icon is inside a button or a link, the accessible name belongs on the control. Adding an `aria-label` to both the button and the SVG usually produces the name twice, which screen readers announce as a stutter.

### Size in `em` and colour with `currentColor`

An icon that follows the surrounding font size and colour needs no per-instance styling and behaves correctly when the user increases the base font size. Icons sized in fixed pixels ignore that setting and break the zoom requirement.

```css
.icon { inline-size: 1em; block-size: 1em; color: currentColor; }
```

### Keep a visual convention across the set

One stroke width, one corner radius convention, one internal grid (24 by 24 is common) and one optical size. Icons that disagree on these look like they came from different products even when each is well drawn, and the fix is a design decision rather than a code change.

## Practice

### Audit the labels on one toolbar

Take a toolbar of icon-only buttons and check each one's accessible name in the browser's accessibility inspector. Fix every control that announces without a name and every decorative icon that appears in the tree.

Done when: every control has exactly one clear name, and no decorative icon is announced.

### Compare sprite and inline on one icon

Render the same icon once from a sprite and once inline. Change its colour, animate it, and change the base font size.

Done when: you can state which approach you would use for static icons and which for the animated one, with the reason.

## Common mistakes

- **Leaving a decorative icon unlabelled** — the reading order fills with meaningless content; fix: add `aria-hidden="true"` and `focusable="false"`.
- **Leaving an informative icon unnamed** — a control announces with no name; fix: put a label on the control, or a `<title>` on the icon.
- **Labelling both the button and its icon** — the name is announced twice; fix: name the interactive element only.
- **Sizing icons in fixed pixels** — they ignore the reader's font-size setting; fix: size in `em` so they track the text.
- **Using an icon font for new work** — a missing glyph fails silently, and the glyphs cannot be styled per element; fix: use SVG.

## Go deeper

- **SVG fundamentals** (`frontend/svg-icon-systems/01-svg-fundamentals`) — the coordinate system and styling rules these icons rely on.
- **Accessibility (WCAG / a11y)** (`frontend/accessibility-wcag-a11y`) — accessible names are covered in full there.
- **Browser DevTools** (`frontend/browser-devtools`) — the accessibility inspector is where you verify what is announced.
