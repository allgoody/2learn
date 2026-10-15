## Example 1 — Collapsing nine sizes into six

A product has accumulated nine font sizes, three of them within two pixels of each other, so no reader can tell whether a difference means anything. The list below is everything currently in use. Produce a scale in which each size has one job and every jump is visible.

```text
Sizes found in the product (px)
13  14  15  16  17  18  20  24  32
```

### Solution

```text
Step     Size/line   Weight     Job
title    32/40       bold       page title, once per page
heading  24/32       semibold   section heading
card     18/28       semibold   card or sub-heading
body     16/24       regular    body text, most of the page
caption  14/20       regular    labels, captions, helper text
label    13/18       medium     button and navigation labels
```

Nine sizes become six, and 15 and 17 collapse into 16 because their jobs were never distinct. The line heights fall with the size — 40 for the 32px title, 18 for the 13px label — so small text gets proportionally more room and headings do not float loose. The common failure is keeping a 16/17/18 trio; that step is invisible and reads as an accident rather than a level.

## Example 2 — Fixing a card heading without adding a size

A card list uses 18px for the card title and 16px for the body, both regular and the same grey, so a card reads as undifferentiated paragraphs. Re-rank it using weight and colour rather than another size, keeping the scale above intact.

```text
Card
  Delivery address        18px regular, same grey as body
  24 Willow Road          16px regular, grey
  Updated 3 May           14px regular, grey
```

### Solution

```text
Card
  Delivery address        16px semibold, darkest text colour
  24 Willow Road          16px regular, mid grey
  Updated 3 May           14/20 regular, lightest grey
```

The title keeps the body size and gains weight and contrast, so the level is carried by two dials and the jump stays obvious; the 18px step drops out of use. Changing size, weight and colour at once overshoots: there is then no dial left for the level below, and every heading shouts equally. Use the size dial only when the jump between two levels genuinely needs to be large.
