## Example 1 — Desktop-first rules that have to undo themselves

A stylesheet starts from the wide layout and peels it back with `max-width` queries. Two of the rules now need `!important`. Say why the file is growing, then rewrite the queries from the narrow layout up.

```html
<div class="grid">
  <article>One</article>
  <article>Two</article>
</div>
```

```css
.grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }

@media (max-width: 60rem) {
  .grid { grid-template-columns: 1fr 1fr; }        /* undo three columns */
}
@media (max-width: 40rem) {
  .grid { grid-template-columns: 1fr !important; } /* undo two */
}
```

### Solution

```css
.grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }

/* two columns stop fitting below 40rem */
@media (min-width: 40rem) { .grid { grid-template-columns: 1fr 1fr; } }
/* the third column starts to overflow below 60rem */
@media (min-width: 60rem) { .grid { grid-template-columns: 1fr 1fr 1fr; } }
```

The `max-width` version has to undo a wide declaration at every step, so the specificity creeps upward and `!important` appears — which is a symptom, not a fix. Basing the sheet on the narrow layout and adding features with `min-width` means each query only adds, the cascade order matches the reading order, and no rule needs to be overridden. The breakpoints are also written where the layout actually breaks rather than on a device list, so the comment beside each one explains why it exists. On a 320px viewport one column fits; above 640px two; above 960px three.

## Example 2 — A container query that never matches

A card component is placed in a wide main column and in a narrow sidebar. The compact style is written as a container query, but the sidebar keeps rendering the wide layout. Find what is missing, then fix it.

```html
<aside class="sidebar"><div class="card-grid"><article class="card">…</article></div></aside>
```

```css
.card { display: grid; grid-template-columns: 8rem 1fr; gap: 1rem; }

@container cards (max-width: 30rem) {
  .card { grid-template-columns: 1fr; }   /* never applies */
}
```

### Solution

```css
.card-grid { container-type: inline-size; container-name: cards; }

.card { display: grid; grid-template-columns: 8rem 1fr; gap: 1rem; }

@container cards (max-width: 30rem) {
  .card { grid-template-columns: 1fr; }
}
```

A container query needs a registered ancestor to ask about, and without `container-type` there is none, so the rule silently never matches. Declaring the wrapper as a containment context names it, and the card then responds to the width it is actually given: in the 240px sidebar the computed layout is one column, and in a 900px main column it stays two. That is the point of querying a container rather than the viewport: the same component adapts correctly in both places.
