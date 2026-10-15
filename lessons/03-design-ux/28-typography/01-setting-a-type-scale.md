---
title: Setting a type scale
prereqs: []
---

## What it is

A type scale is a short list of sizes with a stated job for each. Five or six steps cover an entire product; the skill is in assigning each one a purpose and then refusing to add a seventh.

## Why it matters

Every size without a job becomes a negotiation. The result of unfettered choosing is a product with nine near-identical sizes, in which no reader can tell whether the difference between two headings means anything. A scale removes the choice and returns the meaning: if it is bigger, it is more important, and everyone can see by how much.

## Core ideas

### Give every size a job

Write the list with its purpose before touching the design. If two steps have the same job, delete one.

```text
Size    Weight   Job
32/40   bold     page title, once per page
24/32   semibold section heading
18/28   semibold card or sub-heading
16/24   regular  body text, most of the page
14/20   regular  labels, captions, helper text
13/18   medium   button and navigation labels
```

Six steps, each with exactly one purpose.

### Keep the steps far enough apart to be seen

A 16 to 17 pixel step is invisible and reads as an accident. Either the jump is obvious or the two sizes should be the same one.

```text
Invisible jump:  16 / 17 / 18
Visible jump:    16 / 18 / 24 / 32
```

### Weight and colour are separate dials

A heading does not have to be larger — semibold at the same size, or a darker grey at a smaller one, can carry the level. Using all three dials at once overshoots and leaves nowhere to go for the next level.

### Name the sizes, never the numbers

Use the job as the name: `title`, `heading`, `body`, `caption`. Then a change to the numbers is one edit rather than a hundred, and no one argues for "the 19".

### Set line height with the size

Small text needs proportionally more line height than large text, because the reader's eye has less to track. Fixing one ratio for every size makes headings loose and body text cramped. The implementation of these values belongs to Web Typography and to the CSS entry.

## Practice

### Write a five-step scale for one product

List five or six sizes with their purpose, and apply them to three real screens — a list, a detail page and a form.

Done when: no screen uses a size outside the scale, and every size present has its stated job.

### Collapse an existing palette of sizes

Count the distinct font sizes in a live product. Map each to the nearest step of your new scale and list what changes.

Done when: the distinct count has fallen to six or fewer, and you can name what each remaining size means.

## Common mistakes

- **Too many sizes** — the hierarchy stops meaning anything; fix: five or six steps, each with one job.
- **Steps too close together** — the difference reads as a mistake; fix: make the jump visible or merge the two sizes.
- **Using size, weight and colour at once** — every level shouts and nothing stands out; fix: change one dial per level.
- **Line height fixed for all sizes** — headings loosen and body text tightens; fix: adjust line height with size.
- **Sizes referenced by number in conversation** — every review re-litigates the values; fix: name them by job.

## Go deeper

- **Typography** (`03-design-ux/28-typography`) — the track this scale opens.
- **Line length and rhythm** (`03-design-ux/28-typography/02-line-length-and-rhythm`) — the other half of setting type well.
- **Web Typography** (`02-frontend/18-web-typography`) — how these sizes are loaded and scaled in the browser.
- **Visual Design** (`03-design-ux/10-visual-design`) — the hierarchy this scale expresses.
