---
title: Line length and rhythm
prereqs: ["design-ux/typography/01-setting-a-type-scale"]
---

## What it is

Line length is the measure — how many characters fit on a line — and rhythm is the vertical spacing that holds a page together: line height, and the consistent gaps between headings, paragraphs and sections.

## Why it matters

A line that is too long loses the reader: the eye reaches the end, fails to find the start of the next line and rereads. A line that is too short breaks the sentence into fragments and the reading pace stutters. Rhythm is the same problem vertically — if the gap above a heading equals the gap below it, the heading floats between two sections and belongs to neither. Both are invisible when right and immediately tiring when wrong.

## Core ideas

### Aim for 45 to 75 characters on a line

Count characters, not pixels. A comfortable measure is the single largest readability gain available on most screens.

```text
Too wide (110 chars)  a full-width paragraph on a large monitor
Comfortable (60-70)   a column around 60-70 characters
Too narrow (30)       a phone-width column that is also indented
```

Constrain the text column rather than letting it fill the viewport, and keep body text away from the window edge.

### Set line height from the measure

A wide measure needs more line height to help the eye travel back; a short one needs less. Somewhere around one and a half times the font size suits body text, and tighter for headings.

```text
Body 16px  ->  line height about 24px
Heading 32px -> line height about 40px
Wide 90-char body -> slightly more than for a narrow column
```

### Make the gap above a heading larger than the gap below

This is what binds a heading to its own content. If the two gaps are equal, the heading reads as orphaned.

```text
Before heading   40px
Heading
After heading     8px
Body text
```

### Keep one rhythm for the whole page

Set the paragraph and section gaps from a small scale and use them everywhere. A page with three different paragraph gaps looks unplanned however good each gap is.

### Left-align text and avoid full justification

Justified text on screen creates uneven word spacing because the browser cannot hyphenate and space as well as a typesetter. Ragged right is easier to read and easier to set.

## Practice

### Measure one page

Take a body-text block on a wide screen and count the characters on the longest line. Adjust the column so it lands between 45 and 75, then increase the line height if the measure is at the wide end.

Done when: three people read a paragraph without losing their place, and the count is inside the range.

### Fix one heading's spacing

Find a heading whose space above equals its space below. Make the upper gap three to five times the lower one and look at the page from a distance.

Done when: the heading now reads as belonging to the content beneath it, and no other gap on the page changed.

## Common mistakes

- **Full-width paragraphs on a large screen** — lines exceed 100 characters and the reader loses their place; fix: constrain the text column to 45-75 characters.
- **One line height for every size** — headings look loose and body text looks cramped; fix: set line height from the size and the measure.
- **Equal space above and below a heading** — the heading floats between two sections; fix: make the upper gap clearly larger.
- **Justified text on the web** — uneven word spacing and rivers of white; fix: left-align and accept the ragged edge.
- **A different rhythm per page** — the product feels assembled from parts; fix: use one spacing scale for paragraphs and sections.

## Go deeper

- **Setting a type scale** (`design-ux/typography/01-setting-a-type-scale`) — the sizes this rhythm applies to.
- **Typography** (`design-ux/typography`) — the track this chapter closes.
- **Layout & Grid Systems** (`design-ux/layout-grid-systems`) — the columns that produce the measure.
- **Web Typography** (`frontend/web-typography`) — responsive sizing and font loading in the browser.
