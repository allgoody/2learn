## Example 1 — Sizes chosen one page at a time

Four headings carry sizes picked by eye, and a second page has already used 18px body text instead of 17px. Say why the values drift, then derive every size from one base and one ratio.

```css
h1 { font-size: 34px; }
h2 { font-size: 26px; }
h3 { font-size: 19px; }
p { font-size: 17px; }   /* another page uses 18px */
```

### Solution

```css
:root {
  --step-0: 1rem;
  --step-1: 1.25rem;
  --step-2: 1.563rem;
  --step-3: 1.953rem;
}

h1 { font-size: var(--step-3); }
h2 { font-size: var(--step-2); }
h3 { font-size: var(--step-1); }
p { font-size: var(--step-0); }
```

Without a scale, each new screen picks a size that looks right at the moment, and the set grows until nobody can say whether a heading should be 19 or 20 pixels. Deriving the steps from one base and a single ratio produces a small, memorable set — here roughly 1.25 times each step — and a designer or developer chooses the nearest step rather than inventing a value. The sizes are in `rem`, so they respect a reader who has increased their browser's default font size; the pixel values in the original ignored that setting entirely. The scale is a design decision about the ratio, but the consistency it produces is not optional.

## Example 2 — One line height for every size and a paragraph that fills the screen

A document sets a single leading for all text and lets paragraphs run the full width of a wide monitor. Say what each choice costs the reader, then correct both.

```css
body { line-height: 1.5; }
h1 { font-size: 2rem; }
/* paragraph lines run the entire viewport width */
```

### Solution

```css
body { line-height: 1.5; }
h1, h2 { line-height: 1.15; }

.prose { max-width: 68ch; margin-inline: auto; }
```

A single line height is always wrong somewhere: the same leading that suits 16px body text looks loose on a 32px heading, so large type wants a tighter multiplier — which is why the headings get their own. Keeping the value unitless matters as much, because a unitless line height is a multiple of the element's own font size and scales with it, while a pixel value would have to be restated for every step of the scale. The second fault is the measure: past roughly seventy-five characters the eye loses its place on the return, so a paragraph spanning 1600 pixels is unreadable however well it is set. `ch` is measured in the font's zero glyph, so the cap follows a change to the type scale instead of drifting.
