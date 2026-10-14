---
title: Modern CSS features
prereqs: ["frontend/css/03-media-and-container-queries"]
---

## What it is

A handful of features landed in CSS over the last few years that replace work previously done by preprocessors, JavaScript or a pile of classes: custom properties for values you can name and change, nesting for readable scope, logical properties for direction-agnostic spacing, the `:has()` family for parent-aware selection, and functions such as `clamp()` and `color-mix()` for values that adapt on their own.

## Why it matters

Each of these deletes a category of complexity from the average project. Custom properties made runtime theming a styling concern again rather than a build-time one and removed a reason to reach for a CSS-in-JS library. Nesting removed a reason to reach for Sass. Logical properties removed a whole class of "we forgot about right-to-left languages" bugs. You do not need all of them, and you should not use a feature before you can explain what it replaces — but knowing they exist changes the design of the stylesheet you are about to write.

## Core ideas

### Custom properties are values, not variables

A custom property is inherited, so setting it on a subtree re-themes everything inside without a new selector for each element. It also participates in the cascade, which is what makes component-level theming work: the consumer sets the property, the component reads it with a fallback.

```css
.button {
  --button-bg: navy;
  background: var(--button-bg);
  color: white;
}

.card call-to-action .button { --button-bg: teal; }
```

Because the value is stored as text until used, it can hold a length, a colour or a whole `box-shadow` — the component decides how to interpret it.

### Nesting keeps selectors close to their context

Nested rules use `&` for the parent and are otherwise plain CSS, compiled by the browser rather than by a build step. Keep nesting shallow: three levels of `&` re-create the specificity problems nesting was supposed to avoid.

```css
.card {
  padding: 1rem;

  & > h3 { margin-block-start: 0; }
  &:hover { border-color: teal; }
}
```

### Logical properties name the role, not the side

`margin-block`, `padding-inline`, `border-start-start-radius` and friends map onto physical sides according to writing direction. Using them instead of `left`/`right` means a right-to-left language or a vertical script needs no separate stylesheet.

### `:is()`, `:where()` and `:has()` change what a selector can express

`:is()` groups alternatives without repeating the rest of the selector, `:where()` does the same while contributing zero specificity, and `:has()` lets a selector look at a descendant — a form field that is empty, a card containing an image — which previously required JavaScript.

```css
.field:has(input:invalid) { border-color: darkred; }

:where(ul, ol) > li { margin-block: 0.25rem; }
```

### Functions compose values before they are used

`clamp(min, ideal, max)` gives fluid type or spacing with one line, `min()` and `max()` pick between values, and `color-mix()` derives a colour from two others so the palette stays consistent when one is changed.

```css
h1 { font-size: clamp(1.5rem, 2vw + 1rem, 3rem); }
.hint { color: color-mix(in oklab, navy 60%, white); }
```

## Practice

### Replace a media query with a fluid value

Find a rule that jumps between two font sizes at a breakpoint. Replace it with a `clamp()` expression that interpolates between them.

Done when: the text scales smoothly as the window narrows, stays within the two original sizes, and the media query is deleted rather than merely bypassed.

### Theme a component without new selectors

Take a button component and drive its background, padding and radius from custom properties. Theme two instances differently by setting only the properties on the instances.

Done when: neither instance has a bespoke selector, and changing one property on the instance changes only that property.

## Common mistakes

- **Using a custom property without a fallback** — an unset variable makes the declaration invalid and the property falls back to its initial value with no error; fix: provide `var(--name, fallback)` wherever the property is optional.
- **Nesting three or four levels deep** — the compiled selectors gain specificity and become hard to override; fix: nest one level, and reach for a class when you need two.
- **Mixing physical and logical properties in one component** — the layout is correct in one direction and broken in the other; fix: pick logical properties for all spacing and borders in that component.
- **Assuming `:has()` is free** — it makes the browser re-check descendants when the tree changes; fix: keep it on small, stable structures rather than a page-wide selector.
- **Using a new feature without a fallback layer** — an older browser drops the declaration silently; fix: put a plain value first and the modern one after it.

## Go deeper

- **Media and container queries** (`frontend/css/03-media-and-container-queries`) — container queries and modern functions are usually applied together.
- **Design Tokens** (`design-ux/design-tokens`) — custom properties are the natural implementation of a token layer.
- **Tailwind CSS** (`frontend/tailwind-css`) — the alternative answer to many of these same problems, with different trade-offs.
