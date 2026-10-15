---
title: Sass
type: skill
topic: 02-frontend
tier: small
status: drafted
aliases: ["SCSS"]
prereqs: ["02-frontend/05-css"]
related: []
---

## What it is

Sass is a stylesheet language that compiles to CSS. It adds variables, nesting, partials, mixins and functions to the plain cascade, so a large stylesheet can be split across files and a repeated block of rules can be written once. SCSS is its mainstream syntax, which stays a superset of CSS: every valid stylesheet is a valid SCSS file.

## Why it matters

For years Sass was how a team survived a stylesheet of more than a few hundred lines, and a great deal of production CSS is still built this way. Many of its features have since been absorbed by CSS itself — custom properties, native nesting, `color-mix()` — which changes what a Sass codebase should still use it for. Knowing which parts are now redundant is what keeps a build step from being carried for no reason, and knowing the parts that are not redundant is what keeps a large existing codebase maintainable.

## Core ideas

### Partials and `@use` organise without leaking

A partial is a file whose name starts with an underscore; `@use` loads it once, under a namespace, and its members are visible where they are needed. `@use` replaced the older `@import`, which loaded the same file repeatedly and put every variable in a shared global scope.

```scss
// _scale.scss
$step: 0.25rem;

@function spacing($n) {
  @return $step * $n;
}

// card.scss
@use "scale";

.card { padding: scale.spacing(4); }
```

### Mixins for rule blocks, functions for values

A mixin emits declarations and can take arguments; a function returns a value. Repeating a gradient or a focus style is a mixin; computing a spacing step or a contrast-safe colour is a function. Keeping the distinction makes the call site obvious about which one it needs.

```scss
@mixin focus-ring($color: currentColor) {
  outline: 3px solid $color;
  outline-offset: 2px;
}

.button:focus-visible { @include focus-ring(teal); }
```

### Nest with restraint

Sass nesting is a convenience, not a licence: each level adds specificity to the compiled selector, and deep nesting produces selectors that cannot be overridden without another level. Nesting one level and using `&` for a state or a modifier is the sustainable limit.

```scss
.card {
  padding: 1rem;

  &.is-selected { border-color: teal; }
}
```

### Know what CSS now does for free

Custom properties replaced most variable use, because they are runtime values and can be changed per subtree. Native nesting replaced structural nesting. `clamp()`, `min()`, `max()` and `color-mix()` replaced many functions. What remains distinctly useful is the compile-time machinery: loops over a map to generate a systematic set of utilities, and functions that produce values CSS cannot compute.

```scss
$sizes: (sm: 0.75rem, md: 1rem, lg: 1.5rem);

@each $name, $size in $sizes {
  .button--#{$name} { font-size: $size; }
}
```

### Compile order and output size are real concerns

Sass can generate a large amount of CSS from a small amount of source: a loop over a map of colours and sizes is compact to write and expensive to ship. Check the compiled output, and prefer a build that emits only what a page uses.

## Practice

### Replace a Sass variable with a custom property

Take a Sass variable used for a brand colour and move it to a CSS custom property. Change it for one subtree without recompiling.

Done when: the colour can be altered at runtime by setting the property on a container, and no Sass variable still duplicates the value.

### Generate a utility set from a map

Write a Sass loop that emits button size modifiers from a map of three steps, then compare the compiled output's size against three hand-written rules.

Done when: the loop emits the same rules as the hand-written version, and you can explain when the loop's smaller source is worth the larger output.

## Common mistakes

- **Nesting deeply to mirror the markup** — the compiled selectors gain specificity and become unoverridable; fix: nest one level and use `&` for states.
- **Reaching for a Sass variable where a custom property fits** — the value is fixed at build time and cannot be themed; fix: use a custom property for anything that changes at runtime.
- **Importing a partial that emits rules in several places** — the same declarations are duplicated in the output; fix: use `@use` and keep rule-emitting partials imported once.
- **Generating every combination into the stylesheet** — a loop over colours and sizes can triple the CSS; fix: check the compiled size and generate only what is used.
- **Carrying Sass for features CSS already has** — a build step remains for no benefit; fix: audit the file and remove what native nesting and custom properties now cover.

## Go deeper

- **Cascading Style Sheets (CSS)** (`02-frontend/05-css`) — the cascade, specificity and modern features that decide what is still worth compiling.
- **Modern CSS features** (`02-frontend/05-css/04-modern-css`) — the native replacements for several Sass features.
- **Webpack** (`02-frontend/24-webpack`) — the build step that has historically compiled the stylesheets.
