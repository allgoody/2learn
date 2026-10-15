## Example 1 — Constraining a paragraph on a wide screen

An article body fills the full width of a 1440px window, so each line runs past 100 characters and readers lose their place at the wrap. Set the measure and the line height so the reading is comfortable, changing nothing else about the page.

```css
.article {
  width: 100%;
  line-height: 1.5;
}
```

### Solution

```css
.article {
  max-width: 65ch;    /* about 60-70 characters on a line */
  line-height: 1.6;   /* a wide measure needs a little more */
}
```

Counting characters, not pixels, lands the longest line near 65 and stops it growing with the window; the slightly increased line height helps the eye travel back to the left edge. Constraining the text column is the single largest readability gain available on most screens. The usual failure is leaving `width: 100%` on a large monitor and treating the resulting 110-character lines as a font problem.

## Example 2 — The heading that belongs to neither section

In the page below, the heading sits between two paragraphs at an equal distance from each, so it reads as belonging to neither. Fix its spacing from a small scale, and change no other gap on the page.

```text
Shipping rates

    24px below the heading
Body text ...

    24px above the next heading
Returns

    24px below the heading
Body text ...
```

### Solution

```text
Shipping rates

     8px below the heading
Body text ...

    40px above the next heading
Returns

     8px below the heading
Body text ...
```

The gap above a heading is now five times the gap below, so the heading visually binds to the text it introduces and the page reads in two clear sections. Both values come from the same small spacing scale, which is what keeps the rhythm consistent from page to page. The failure to watch for is nudging the upper gap alone on one heading; if the scale is not shared, the product starts to look assembled from parts.
