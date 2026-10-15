---
title: Adobe XD
type: skill
topic: 03-design-ux
tier: small
status: drafted
aliases: []
prereqs: ["03-design-ux/12-figma"]
related: []
---

## What it is

Adobe XD is a UI design and prototyping tool that covers the same ground as Figma: artboards, reusable symbols, linked prototypes and sharing. Its distinct strengths are its repeat grid for list-type content and its tight relationship with the rest of the Adobe tools.

## Why it matters

Tool choice is mostly a matter of what the organisation already holds and what the rest of the team can open. Companies already standardised on Adobe software tend to have XD available, and a design that lives next to the image and video assets is easier to hand over. Knowing it means you can work in the environment you are given rather than insisting on your own tool, which is a real constraint on many teams.

## Core ideas

### Reach for it when Adobe is already the standard

If the organisation's assets, licences and habits are Adobe, using XD removes a procurement question and keeps the work next to the source material. If the team is already collaborative in another tool, switching costs more than it returns.

### The repeat grid does list work quickly

Draw one item, then repeat it across a grid and swap the contents. For a list, a table or a card collection it collapses an afternoon of copying into a few minutes.

```text
Draw one order row: number, city, total, status
Repeat across 8 rows, then adjust the spacing once
Swap in the real values -> every row follows the same layout
```

### Auto-animate covers most prototype transitions

Naming an element identically on two artboards and setting the transition to auto-animate gives a working motion prototype without coding. It is enough to check whether a transition reads correctly.

### Symbols and states are the consistency mechanism

As in any tool, the value is in reuse: define the symbol once, override text and icons per instance, and update every screen together.

### The same handoff discipline applies

States, tokens, edge cases and a link to the right artboard. The tool does not change the specification work described in Design Handoff & Specs.

## Practice

### Build a list with the repeat grid

Take a list screen — orders, invoices, contacts — and build one row, repeat it eight times, then replace the content with real values of different lengths.

Done when: the longest and shortest real values both fit without breaking the row.

### Prototype one transition

Create two artboards with a shared element, name the element identically on both, and set the transition to animate between them.

Done when: the transition runs in the shared preview link and reads correctly at the speed a user would meet it.

## Common mistakes

- **Switching tools mid-project** — time is spent recreating work and the team loses its shared file; fix: choose the tool the team can open, and switch between projects rather than within one.
- **Copying rows by hand** — the list drifts and a spacing change has to be made eight times; fix: use the repeat grid.
- **Animating everything** — the prototype becomes a demo of transitions rather than a test of the task; fix: animate only the transition you are questioning.
- **Loose artboards instead of symbols** — the screens diverge immediately; fix: define symbols for anything used twice.
- **Treating the prototype as the spec** — the build inherits shortcuts nobody chose; fix: write the spec separately against the system.

## Go deeper

- **Figma (Design Software)** (`03-design-ux/12-figma`) — read this first; it is the baseline most teams have already chosen.
- **Prototyping** (`03-design-ux/40-prototyping`) — choosing fidelity before reaching for either tool.
- **Design Handoff & Specs** (`03-design-ux/42-design-handoff-specs`) — the packaging that a tool does not do for you.
- **Framer** (`03-design-ux/36-framer`) — the other sibling tool, aimed at publishing rather than drawing.
