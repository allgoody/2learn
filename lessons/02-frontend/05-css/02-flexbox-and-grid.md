---
title: Flexbox and grid
prereqs: ["02-frontend/05-css/01-cascade-and-box-model"]
---

## What it is

Flexbox and grid are CSS's two layout systems. Flexbox distributes items along a single axis — a row or a column — and is the right tool when the content decides the sizes. Grid places items into a two-dimensional structure of rows and columns, and is the right tool when the structure should decide where the content goes.

## Why it matters

Before them, laying out a page meant floats, absolute positioning and clearfix hacks, and every layout was a negotiation between elements that did not know about each other. Flexbox and grid moved alignment, spacing and distribution into the container, where they can be described once. That means a responsive card row, a sticky footer and a centred dialog are now three short rules rather than three fragile tricks. Knowing which of the two to reach for is most of the skill: the wrong one still works, but only after a fight.

## Core ideas

### Flexbox is one axis, grid is two

A flex container lays its children out along one direction. Items can grow to fill space, shrink when crowded, and align relative to each other. A grid container defines tracks first and places items into them. If you find yourself nesting flex containers three deep to build a two-dimensional layout, grid is the quieter answer.

```css
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.layout {
  display: grid;
  grid-template-columns: 16rem 1fr;
  gap: 1.5rem;
}
```

### Space is a property of the container

`gap` replaces the margin hacks that used to space items apart, without adding space around the outside. `justify-content` and `align-items` place items on the two axes, and in grid the same names apply to tracks via `justify-content` and the item's own `justify-self`. Naming the axis explicitly — main axis and cross axis in flex, rows and columns in grid — is what makes the properties readable.

### Let the content decide, or the structure decide

`flex: 2` and `grid-template-columns: 1fr 2fr` both express proportion, but they differ when content is large. Flex items can refuse to shrink below their content unless you set `min-width: 0`, while grid tracks with `1fr` are bound to the track and can overflow. Deciding which behaviour you want is the actual design decision.

### Repeat and size tracks with the content

Grid can generate tracks from a rule. `repeat(auto-fit, minmax(16rem, 1fr))` produces as many equal columns as fit above a minimum width, which replaces a stack of breakpoints with one line.

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}
```

### Nested containers are normal, deep nesting is not

A grid item can be a flex container and vice versa; that is how real layouts are built. The smell is depth: if you need four levels to place one element, the outer structure is probably doing a job that one grid could do.

## Practice

### Build a card row that wraps without breakpoints

Lay out eight cards with `grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))` and a gap. Resize the window slowly.

Done when: cards wrap at a width derived from the column minimum rather than from a breakpoint you wrote, and no card is ever narrower than 16rem.

### Centre a dialog with flex and then with grid

Build a modal that sits in the middle of a full-screen overlay, once with flex centring and once with grid placement. Compare the rule counts.

Done when: both versions centre the dialog exactly, and you can say which one you would keep in a codebase and why.

## Common mistakes

- **Using flexbox for a two-dimensional layout** — nested flex containers accumulate and spacing becomes guesswork; fix: use grid for rows and columns, flex inside a cell.
- **Forgetting `min-width: 0` on a flex item** — a long word makes the item refuse to shrink and the row overflows; fix: allow the item to shrink, or wrap the text.
- **Fixing alignment with margins** — the offsets break as soon as an item changes size; fix: use `align-items`, `justify-content` and `gap` on the container.
- **Using `flex: 1` on everything** — every item competes for the same share and the smallest content loses; fix: give only the items that should expand a flex value.
- **Hard-coding a grid to the widest screen** — narrow screens scroll sideways; fix: use `auto-fit` with `minmax`, or let the tracks collapse.

## Go deeper

- **The cascade and the box model** (`02-frontend/05-css/01-cascade-and-box-model`) — `box-sizing`, `gap` and track sizes all assume you know where an element's dimensions come from.
- **Media and container queries** (`02-frontend/05-css/03-media-and-container-queries`) — how the same layout adapts when the viewport or the parent changes.
- **Layout & Grid Systems** (`03-design-ux/30-layout-grid-systems`) — the design-side vocabulary for the decisions you are making here.
