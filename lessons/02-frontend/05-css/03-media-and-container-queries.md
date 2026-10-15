---
title: Media and container queries
prereqs: ["02-frontend/05-css/02-flexbox-and-grid"]
---

## What it is

A query wraps CSS rules in a condition, so they apply only when something about the environment is true. Media queries ask about the viewport and the device — its width, its colour scheme, whether the user has asked for reduced motion. Container queries ask about an ancestor element's own size, which lets a component adapt to the space it is given rather than to the screen it happens to be on.

## Why it matters

One layout cannot serve a phone, a laptop and a 300-pixel sidebar. Queries are how a single stylesheet covers all three without three stylesheets, and they are what makes responsive design a technique rather than a set of separate sites. The trap is treating them as device detection: a breakpoint at 768px stops meaning anything once a phone is as wide as a tablet and a desktop widget is as narrow as a phone. Queries written against content, not hardware, survive new devices without being touched.

## Core ideas

### Query the condition, not the device

Write the query where the layout actually breaks. Shrink the window until the line of text becomes unreadable or the card row overflows, note the width, and put the query there. A class named `tablet` ages badly; a comment saying "two columns stop fitting" does not.

```css
.grid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 48rem) {
  .grid { grid-template-columns: 1fr 1fr; }
}
```

### Range syntax makes the intent readable

The older `min-width`/`max-width` pair is easy to read in one direction and awkward in both. Modern range syntax says what it means in one clause, which matters when several queries overlap.

```css
@media (48rem <= width < 80rem) {
  .sidebar { display: block; }
}
```

### Start small and add

Basing the stylesheet on the narrow layout and adding features with `min-width` queries gives a file that works first and improves second, and it keeps the cascade order the same as the reading order. The alternative — a desktop layout peeled back with `max-width` — has to undo declarations, which almost always means `!important` or duplicated blocks.

### Container queries let a component own its own breakpoints

Declare a containment context with `container-type: inline-size` on the wrapper, name it, and query that name. The same card component can then sit in a wide main column and a narrow sidebar and adapt correctly in both.

```css
.card-grid { container-type: inline-size; container-name: cards; }

@container cards (min-width: 30rem) {
  .card { grid-template-columns: 8rem 1fr; }
}
```

### Query user preferences too

`prefers-reduced-motion`, `prefers-color-scheme` and `prefers-contrast` are media queries like any other, and they are how a design respects the settings the operating system already asked the user about. Treat them as part of the layout, not as an optional enhancement bolted on at the end.

## Practice

### Derive three breakpoints from the content

Take a page with a header, a main column and a sidebar. Reduce the window width slowly and record each width at which the layout stops working. Write queries only at those widths.

Done when: the page has no horizontal scroll and no overlapping text at any width from 320px upwards, and each query carries a comment naming what breaks below it.

### Make a card work in two containers

Build one card style and place it in a wide column and in a narrow sidebar. Give the wrapper a container context and move the card's single-column rule into a `@container` query.

Done when: the card switches to its compact layout in the sidebar without any class changing, and you have tested it by resizing the sidebar rather than the window.

## Common mistakes

- **Picking breakpoints from a device list** — the queries age out and the layout breaks on the next device class; fix: derive each breakpoint from where the content actually overflows.
- **Writing desktop-first `max-width` rules** — every narrowing step must undo the wide layout and the file doubles; fix: start from the narrow layout and add with `min-width`.
- **Forgetting the viewport meta tag** — a phone renders a 980px page shrunk to fit and every query sees the wrong width; fix: include the viewport declaration in the document head.
- **Using a container query without a containment context** — the query has no registered container and silently never matches; fix: set `container-type` and a `container-name` on the wrapper.
- **Treating `prefers-reduced-motion` as optional** — motion-sensitive users cannot opt out and the animation plays anyway; fix: wrap non-essential transitions in a `no-preference` query.

## Go deeper

- **Flexbox and grid** (`02-frontend/05-css/02-flexbox-and-grid`) — queries change which layout applies; you still have to choose the layout.
- **Modern CSS features** (`02-frontend/05-css/04-modern-css`) — logical properties and `clamp()` remove several queries you would otherwise have to write.
- **Responsive Web Design** (`02-frontend/10-responsive-web-design`) — the wider discipline this technique belongs to.
