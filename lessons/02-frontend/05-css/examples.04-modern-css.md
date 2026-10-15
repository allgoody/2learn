## Example 1 — A font size that jumps at a breakpoint

A heading steps from one size to another at 768px. The jump is visible and the query exists only to change one number. Replace both with one value that adapts on its own.

```css
h1 { font-size: 1.5rem; }

@media (min-width: 48rem) {
  h1 { font-size: 3rem; }
}
```

### Solution

```css
h1 { font-size: clamp(1.5rem, 2vw + 1rem, 3rem); }
```

`clamp(min, ideal, max)` interpolates between the two sizes and stops at either end, so the media query is deleted rather than merely bypassed. The computed values: on a 320px viewport `2vw + 1rem` is 22.4px but the minimum holds it at 24px; at 800px it is 32px; at 1200px it is 40px; past 1600px the maximum holds it at 48px. Nothing jumps, and the text stays within the two sizes the design specified. The same function replaces the fluid spacing and width queries that usually surround it, which is why the entry calls these features query deleters.

## Example 2 — A button themed with a selector per place

One component needs a different background in a card and different padding in the footer. Each variation has grown its own selector that repeats the whole rule. Say what the repetition costs, then drive the differences from properties instead.

```css
.button {
  background: navy;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}

.card .button { background: teal; }
.footer .button { background: navy; padding: 0.75rem 1.5rem; }
```

### Solution

```css
.button {
  --button-bg: navy;
  --button-pad: 0.5rem 1rem;
  background: var(--button-bg, navy);
  padding: var(--button-pad, 0.5rem 1rem);
  border-radius: 0.25rem;
}

.card .button { --button-bg: teal; }
.footer .button { --button-pad: 0.75rem 1.5rem; }
```

A custom property is inherited and takes part in the cascade, so setting it on a subtree re-themes everything inside, and the theme point becomes one line that names only what changed. The fallback inside `var()` matters: an unset property makes the declaration invalid and the browser silently drops it rather than reporting an error, so `var(--button-bg, navy)` keeps the component safe when nobody sets it. The variant selectors no longer repeat the base rule, which means the next variation cannot drift out of step with it.
