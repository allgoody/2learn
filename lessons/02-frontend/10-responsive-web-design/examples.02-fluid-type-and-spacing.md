## Example 1 — Headings that step at a breakpoint

Two headings jump to their large sizes at 48rem, so the page has one visible edge and one query that exists only to change four numbers. Replace the step with a continuous scale and delete the query.

```css
h1 { font-size: 1.5rem; }
h2 { font-size: 1.25rem; }

@media (min-width: 48rem) {
  h1 { font-size: 3rem; }
  h2 { font-size: 1.75rem; }
}
```

### Solution

```css
h1 { font-size: clamp(1.5rem, 1rem + 2vw, 3rem); }
h2 { font-size: clamp(1.25rem, 0.9rem + 1vw, 1.75rem); }
```

`clamp(minimum, preferred, maximum)` returns the preferred value but never below or above the bounds, so the headings grow smoothly between the two sizes the design already had and the discontinuity disappears. The preferred value keeps a `rem` term, which is what allows a reader who has increased their default text size to still be respected — a `vw`-only size scales with the window and ignores them. Both bounds need testing at the extremes: the smallest supported width catches a minimum that is too large, and a very wide screen catches a missing maximum where a heading would simply keep growing.

## Example 2 — A measure in pixels and a viewport-only size

A paragraph container is capped in pixels and a display heading is sized purely in viewport units. One breaks when the font scale changes, the other stops responding to zoom. Diagnose each, then correct both.

```css
.prose { max-width: 900px; }
.display { font-size: 5vw; }   /* cannot zoom; grows with the window, not the reader */
```

### Solution

```css
.prose { max-width: 68ch; margin-inline: auto; }
.display { font-size: clamp(2rem, 1.25rem + 3vw, 4.5rem); }
```

A pixel cap is a fixed number while the type scale is not, so the moment the headings change the measure drifts away from the roughly seventy-character band where the eye returns comfortably to the next line; `68ch` is measured in the width of the zero glyph, so it follows the font. The display size has the failure the fluid-type lesson warns about: `vw` alone is not affected by the reader's zoom or default size, and it has no upper bound, so on a 3000px screen the heading is enormous and on a narrow one it is unreadable. Keeping a `rem` term in the expression and both bounds restores zoom and sanity at the extremes.
