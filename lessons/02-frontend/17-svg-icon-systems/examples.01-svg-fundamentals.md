## Example 1 — An icon that will not scale

The icon renders at one size regardless of the CSS, and setting a larger font size on its parent changes nothing. Say which attribute defines the coordinate space, then make it size like text.

```html
<span class="icon"><svg width="24" height="24">…</svg></span>
```

```css
.icon { font-size: 2rem; }
.icon svg { width: 1em; height: 1em; }   /* no effect on the drawing */
```

### Solution

```html
<span class="icon">
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">…</svg>
</span>
```

```css
.icon { font-size: 2rem; }
.icon svg { inline-size: 1em; block-size: 1em; color: currentColor; }
```

Without a `viewBox`, the drawing is pinned to whatever intrinsic size it was exported at, so changing the element's dimensions crops or blurs it instead of scaling the paths. The `viewBox` maps the internal coordinate grid — 24 by 24 units here — onto the rendered box, which is why every icon in a system can be scaled to any pixel size without touching its path data. Sizing in `em` makes the icon track the surrounding font size, so a reader who increases their base text size gets a proportional icon, and `currentColor` lets the parent's text colour decide the fill with no per-instance rule.

## Example 2 — The same inline icon twice, with two identical ids

An icon is pasted into two components. A gradient defined inside it now references the wrong element in the second copy, and its colour is hard-coded so dark mode looks broken. Diagnose both, then fix the delivery.

```html
<svg viewBox="0 0 24 24" width="24" height="24">
  <defs><linearGradient id="g1">…</linearGradient></defs>
  <path d="M4 12h16" fill="#0f766e" stroke="#0f766e" />
</svg>
<!-- pasted again in another component: <linearGradient id="g1"> twice in one document -->
```

### Solution

```jsx
export function SearchIcon({ title }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 12h16" fill="currentColor" stroke="currentColor" />
      {title ? <title>{title}</title> : null}
    </svg>
  );
}
```

```jsx
<SearchIcon />
<span className="text-brand-700"><SearchIcon /></span>
```

An inlined SVG is a DOM subtree, so its ids are global to the document: two copies of the same gradient make every reference ambiguous, and the second icon silently borrows the first one's definition. Making the icon a component either removes the ids entirely or scopes them, and the single source is what keeps the set consistent. `currentColor` fixes the second fault — a hard-coded hex cannot follow a theme, so the icon stands out in dark mode — and it means one file serves both themes with no duplication. The `<title>` is only emitted when the icon is information rather than decoration.
