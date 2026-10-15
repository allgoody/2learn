---
title: Contrast and alignment
prereqs: ["design-ux/visual-design/01-hierarchy-and-spacing"]
---

## What it is

Contrast is the difference between two things on screen — in lightness, weight, size or position — and it is what makes a difference perceptible rather than nominally present. Alignment is putting elements on shared edges and baselines so the eye can travel down the page without resettling.

## Why it matters

Two problems look alike and are not. Understated contrast: a "disabled" control that looks enabled, a hint that reads like a value, a state that users cannot see changed. And alignment drift: a page where each block starts a few pixels from the last, which reads as carelessness and makes the whole product feel less trustworthy. Contrast also carries the accessibility obligation — text that a sighted reviewer finds "fine" may fail a contrast ratio for someone reading outdoors.

## Core ideas

### Contrast needs magnitude, not existence

A difference people cannot see is not a difference. Aim for clearly different lightness or weight, not a slightly darker grey.

```text
Weak   #666 heading, #777 body, #888 hint   -> three greys, one impression
Strong #111 heading, #333 body,  #777 hint  -> three levels, read instantly
```

Check the contrast ratio of text against its background rather than trusting the screen.

### Reserve the strongest contrast for the thing that matters

If the most contrasted element on the page is the header logo, that is what people will see. Spend the strongest contrast on the primary action or the current state.

### Align to shared edges, not to the eye

Left-align text and content blocks to one vertical line; right-align numeric columns so digits line up. Centre only what has no natural edge, such as a short message or an illustration.

```text
Aligned numbers (right)     Centred numbers (avoid)
   1,204.00                       1,204.00
      86.50                          86.50
  12,000.00                      12,000.00
```

### Use one alignment per block

Mixing centred headings with left-aligned body inside one block, or alternating row heights, makes a page tiring to scan. Consistency within a block beats variety.

### Alignment makes the grid visible

When everything aligns to the same few edges, the layout has rhythm; when it does not, no amount of spacing rescues it. This is why alignment belongs to layout and contrast belongs to colour and type — and why both are decided together.

## Practice

### Audit one screen's contrast

List every text element with its colour and background, and check the contrast ratio. Note every element that is below the ratio required for its size.

Done when: you have a list of failures and have fixed the two most-used ones, checking them on screen at 100% brightness.

### Square up one page

Take a screenshot of a page and draw vertical lines down the shared left edges. Count the lines.

Done when: the number of distinct left edges has fallen to three or fewer, and every block sits on one of the three.

## Common mistakes

- **Contrast that is only nominal** — three greys that read as one; fix: increase the magnitude until the levels are obvious at a glance.
- **Strongest contrast on decoration** — the logo or a banner wins the eye over the action; fix: move the strongest contrast onto the primary element.
- **Centred body text** — multi-line centred text has four ragged edges and is slow to read; fix: left-align anything longer than one line.
- **Numbers not right-aligned** — digits do not line up and comparison is manual; fix: right-align numeric columns.
- **Mixing alignment within a block** — the eye keeps resettling; fix: one alignment per block and hold it.

## Go deeper

- **Hierarchy and spacing** (`design-ux/visual-design/01-hierarchy-and-spacing`) — the ordering this chapter sharpens.
- **Visual Design** (`design-ux/visual-design`) — the track it belongs to.
- **Color Theory** (`design-ux/color-theory`) — contrast ratios and colour-blind readers in depth.
- **Accessibility (WCAG / a11y)** (`frontend/accessibility-wcag-a11y`) — the formal contrast requirements and how to test them.
