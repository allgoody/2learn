---
title: The cascade and the box model
prereqs: ["frontend/html"]
---

## What it is

The cascade is the algorithm that decides which of your rules wins when several apply to the same element. The box model is the set of rules that decides how large that element ends up. Together they explain almost every "why is it doing that" moment in CSS.

## Why it matters

Almost all CSS pain is a symptom of not being able to answer one of two questions: which rule won, and what the element's width actually is. Once you can answer them, the stylesheet becomes predictable: you add a rule, you know whether it will apply, and you know how much space it will take. Without them, the only tools left are `!important` and extra wrapper elements, and both of those make the next change harder than the last.

## Core ideas

### The cascade has an order of precedence

When rules collide, the browser resolves them in this order: importance (a declaration marked `!important` beats a normal one), origin (the author's stylesheet beats the browser's defaults, but user styles marked important beat both), then specificity, and finally source order. Specificity is a tuple — ids, then classes and attributes and pseudo-classes, then elements and pseudo-elements — compared left to right, not as a single score.

```css
/* specificity: 0,1,1 */
nav a { color: navy; }

/* specificity: 0,2,0 — this wins even though it is written first */
.site-nav .link { color: teal; }
```

Inline styles beat any selector without `!important`. That is why they are so hard to override later.

### Every declaration can win or lose on its own

You rarely override a whole rule; you override one property. Add a property to a losing rule and it applies immediately, while the winning rule keeps its colour. Keeping specificity uniformly low avoids the situation where one new declaration requires escalating three others.

### The box model stacks four boxes

The content box is only the innermost one. Around it are padding, then border, then margin. By default `width` applies to the content box alone, so adding padding widens the element. `box-sizing: border-box` makes `width` include padding and border, which is almost always what you meant.

```css
.card {
  box-sizing: border-box;
  width: 20rem;
  padding: 1rem;
  border: 1px solid grey;
}
```

### Normal flow comes first

Elements sit in normal flow until you change it. Margins collapse between siblings and between a parent and its first or last child, which is why a heading inside a container appears to push the container down. Floats, absolute positioning and flex containers each take children out of that flow in their own way; reach for them only when the flow is genuinely wrong.

### Inheritance moves values down the tree

Inheritable properties such as `color`, `font-family` and `line-height` pass from parent to child; box properties do not. Setting a base `font-size` and `line-height` on `body` gives the whole page a consistent type scale, and `em` inside a component then measures against that component's own font size rather than the root's.

## Practice

### Predict the winner before you look

Write a page with three rules that target the same paragraph at different specificity, including one inline `style` attribute. Write down which colour wins before opening the browser, then check in the Styles pane.

Done when: your prediction matches the rendered colour and you can state the specificity of each selector as a tuple.

### Measure the difference `box-sizing` makes

Create two boxes of the same declared `width` and padding, one with `content-box` and one with `border-box`. Then add a border to both.

Done when: you can point at the computed width of each in DevTools and explain the gap in one sentence.

## Common mistakes

- **Escalating specificity to win a fight** — the next change has to escalate again and the file becomes unmanageable; fix: keep selectors shallow and add a small, well-named class instead.
- **Reaching for `!important` to beat an inherited style** — nothing can override it later and the rule outlives its reason; fix: fix the selector that is actually winning.
- **Adding a wrapper `div` to fix spacing** — the markup grows to compensate for a margin you could have named; fix: understand the margin or the flow that is producing the gap.
- **Assuming `width` includes padding** — the element is wider than the number you typed and the layout overflows; fix: set `box-sizing: border-box` at the top of the stylesheet.
- **Fighting margin collapse with extra padding** — two gaps appear where you wanted one; fix: use `gap` on a flex or grid container, or set the adjacent margin to zero.

## Go deeper

- **Hypertext Markup Language (HTML)** (`frontend/html`) — the tree your selectors match against; the specificity of a selector is really a shorthand for how tightly it describes that tree.
- **Flexbox and grid** (`frontend/css/02-flexbox-and-grid`) — the next step: using the box model deliberately to lay a page out.
- **Browser DevTools** (`frontend/browser-devtools`) — the Styles pane shows every rule that applied, in the order the cascade resolved them.
