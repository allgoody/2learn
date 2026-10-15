---
title: Hierarchy and spacing
prereqs: []
---

## What it is

Hierarchy is the order in which an interface is read: what the eye lands on first, second and third. Spacing is the tool that produces it. Proximity creates groups, and the amount of space between two things states how related they are, whether or not that was intended.

## Why it matters

A screen with everything at the same visual weight is not neutral; it is exhausting. The user has to read all of it to find the one thing they came for. Hierarchy solves that by doing the ranking for them, and spacing is the cheapest way to do it — a change of padding reorders a page without touching a single colour or size, which is why it is worth deciding before the styling.

## Core ideas

### One primary thing per screen

Name the single element the user should see first, and make it win unambiguously: largest, heaviest or most contrasted — one of the three, not all of them. Everything else descends from it.

```text
Screen: order confirmation
1st  "Your order is confirmed"   largest text on the page
2nd  delivery date               one step down in size, high contrast
3rd  order number and total      small, low contrast, still selectable
4th  "Back to your orders"       a link, not a button
```

### Use a spacing scale, not arbitrary numbers

Pick a small set — 4, 8, 16, 24, 40 — and use nothing else. Arbitrary values are what make a page feel almost-aligned; a scale makes the repetition invisible and the grouping deliberate.

```text
4    between a label and its value
8    between related controls
16   between groups inside a card
40   between page sections
```

### Proximity states the relationship

Space is read as meaning: things closer together belong together. Move a label 4 pixels from its field instead of 16 and it becomes an instruction for the whole card.

### Align to one edge and hold it

Pick the left edge of the content and hold it for every element down the page. A block that starts 3 pixels further left reads as a mistake even when nobody can say why.

### Repeat the pattern rather than inventing per screen

If the third card is laid out differently from the first two, the user learns nothing from the first two. Consistency of structure inside a page type is what makes the page skimmable.

## Practice

### Rank one screen in five seconds

Show a screen to three people for five seconds, take it away, and ask what they remember. Compare their first answer with the element you intended to be primary.

Done when: they name the intended primary element first, or you have enlarged it or reduced everything around it.

### Re-space one card without changing anything else

Take one card and adjust only the gaps — label to value, control to control, card to section — using a four-step scale. Change no colour, size or font.

Done when: the groups read correctly at a glance and no two gaps remain that are not on your scale.

## Common mistakes

- **Everything at equal weight** — the screen has no entry point and the user reads all of it; fix: pick one primary element per screen and make it win.
- **Arbitrary spacing values** — the page feels unaligned and nothing quite groups; fix: restrict yourself to a four- or five-step scale.
- **Space that contradicts structure** — a subheading sits closer to the section above than to its own content; fix: set the gaps from the grouping, not from the container.
- **Several competing primaries** — large, bold and coloured all at once on three elements; fix: one winner per screen, the rest descending.
- **Per-screen layout inventions** — the same card looks different on every page; fix: define the pattern once and reuse it.

## Go deeper

- **Visual Design** (`03-design-ux/10-visual-design`) — the track this chapter opens.
- **Contrast and alignment** (`03-design-ux/10-visual-design/02-contrast-and-alignment`) — the second half of the visual decisions.
- **Typography** (`03-design-ux/28-typography`) — the type scale that carries most of the hierarchy.
- **Layout & Grid Systems** (`03-design-ux/30-layout-grid-systems`) — the columns that produce the aligned edge.
