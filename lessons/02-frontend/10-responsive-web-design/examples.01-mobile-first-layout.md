## Example 1 — A desktop layout peeled back with max-width queries

The stylesheet begins from the wide two-column layout and removes it on small screens. Both narrow rules need `!important`. Say why the file is growing, then rebuild the same design from the narrow case.

```css
/* base layer is the desktop layout */
.article { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; padding: 2rem 3rem; }

@media (max-width: 40rem) {
  .article { grid-template-columns: 1fr !important; padding: 1rem !important; }
}
```

### Solution

```css
.article { display: grid; grid-template-columns: 1fr; gap: 1rem; padding: 1rem; }

/* two columns stop fitting below 40rem */
@media (min-width: 40rem) {
  .article { grid-template-columns: 2fr 1fr; }
}

/* the wider gutter is only worth it when there is spare room */
@media (min-width: 70rem) {
  .article { padding: 2rem 3rem; }
}
```

A `max-width` query has to undo a declaration made earlier, so the specificity climbs until only `!important` wins. Writing the base layer as the single-column layout means each query only adds, the source order matches the order the layout grows, and nothing is overridden. The base is also the fallback if a query fails, so it has to be complete on its own. Each breakpoint is placed where the content actually stops working and carries a comment saying which element forced it.

## Example 2 — A visual order that disagrees with the DOM

On mobile the promotional aside appears before the article it interrupts, and the keyboard order matches the markup rather than the screen. A CSS `order` puts the article first on wider screens. Explain which order the user experiences, then fix it in the markup.

```html
<div class="row">
  <aside class="promo">Offer</aside>
  <main class="article">Article</main>
</div>
```

```css
.row { display: grid; grid-template-columns: 1fr; }

@media (min-width: 60rem) {
  .row { grid-template-columns: 2fr 1fr; }
  .article { order: -1; }   /* article left, promo right */
}
```

### Solution

```html
<div class="row">
  <main class="article">Article</main>
  <aside class="promo">Offer</aside>
</div>
```

```css
.row { display: grid; grid-template-columns: 1fr; }

@media (min-width: 60rem) {
  .row { grid-template-columns: 2fr 1fr; }
}
```

The tab order follows the document order, so CSS reordering makes the visual sequence and the keyboard sequence disagree — a keyboard user walks the page in what looks like a random order, and a screen reader reads the aside before the content it belongs beside. The `order` property here also kept the mobile problem: the promo still came first on a phone, which was never the intent. Swapping the markup fixes the reading order at every width and needs no CSS at all, because grid already places the first child in the first track.
