---
title: Wireframing
type: skill
topic: design-ux
tier: small
status: drafted
aliases: []
prereqs: ["design-ux/information-architecture"]
related: []
---

## What it is

A wireframe is a grey-box layout: boxes where images and controls go, real text for the labels that matter, and no visual design at all. It fixes structure, hierarchy and the order in which a page is read, so that the discussion stays on those things while they are still cheap to change.

## Why it matters

Polish arrives too early in most projects and settles arguments it has no business settling. A coloured mock-up invites feedback about the shade of blue while the page still puts the primary action below three competing ones. Grey boxes make the hierarchy visible: the biggest block on the page wins the eye whether or not it deserves to. That is why wireframing sits between information architecture and visual design — it tests the structure before anyone is invested in the surface.

## Core ideas

### Grey boxes, real hierarchy

Fill in shapes with grey and use real labels. The visual weight of each block should roughly match its importance; if the wireframe needs an arrow to explain what is most important, the layout is wrong.

```text
+--------------------------------------+
| Your orders                    [search]|
+--------------------------------------+
| #4021  Bristol   £240   Shipped  [view]|
| #4018  Leeds     £90    Delivered [view]|
| ...                                    |
+--------------------------------------+
| <- Back to account                     |
```

### Real words, not lorem ipsum

The labels determine whether the layout works. A heading that is twice as long as the placeholder breaks the row and forces a different structure.

### Design one column at a time

Lay out the primary content first, as if the page had a single column. Then add sidebar, navigation and footer around it. Pages designed from the frame inwards usually have a frame and no content.

### Draw the states, not just the populated page

Empty, one item, many items, loading and error. Wireframe the empty state as carefully as the full one; it is what a new user sees first.

### Keep it disposable

Sketchy boxes invite redrawing, which is the point. A wireframe that took a day to make will be defended rather than revised.

## Practice

### Wireframe one page from a page contract

Take a page contract from your information architecture and wireframe the page in grey boxes with real labels. Include the empty state on a second sheet.

Done when: someone can say what the page is for and what to do first without an explanation.

### Test the hierarchy with a squint

Show the wireframe to three people for five seconds, then take it away and ask what they remember first.

Done when: they name the primary action first, or you have moved it up the page.

## Common mistakes

- **Skipping wireframes and starting with polish** — the visual design answers structural questions by accident; fix: grey-box the layout first and get it agreed.
- **Lorem ipsum** — the real labels break the layout the mock-up approved; fix: write the actual strings, at their real length.
- **A wireframe whose blocks do not match importance** — the layout ranks things by size and the wrong thing wins; fix: adjust the boxes until the eye lands in the right place.
- **Only the full state** — the empty and error pages are improvised later; fix: wireframe the states on separate sheets.
- **Over-detailed wireframes** — days of drawing turns the layout into a position to defend; fix: keep boxes rough and encourage redrawing.

## Go deeper

- **Information Architecture** (`design-ux/information-architecture`) — read this first; a wireframe lays out a structure that has already been tested.
- **The hand-off to layout** (`design-ux/information-architecture/04-the-hand-off-to-layout`) — the page contracts these wireframes come from.
- **Prototyping** (`design-ux/prototyping`) — connecting wireframes into something testable.
- **Visual Design** (`design-ux/visual-design`) — the layer applied once the structure is settled.
