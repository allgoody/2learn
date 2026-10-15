---
title: Design Tokens
type: skill
topic: 03-design-ux
tier: small
status: drafted
aliases: []
prereqs: ["03-design-ux/32-design-systems"]
related: []
---

## What it is

A design token is a named value shared between design tools and code: a colour, a spacing step, a type size, a border radius, a duration. Instead of saying `#1F6FEB`, the design and the code both say `colour.action.default`, and the value behind the name is defined once.

## Why it matters

Tokens are how a system stays consistent across two places that cannot share a file. Without them, a rebrand means editing hex values in a design file and again in a stylesheet, and the two drift within a release. With them, the value changes in one place and both follow. Tokens are also the smallest useful piece of a design system, which is why they are usually the first thing built — and the piece that survives even when the component library is abandoned.

## Core ideas

### Name by role, not by value

`colour.action.default` survives a rebrand; `blue600` does not, and `colour.blue` becomes a lie the moment the brand changes. Name what the value is for, and keep the raw scale separate underneath.

```text
Primitive (raw)          Semantic (role)
colour.blue.600          colour.action.default
colour.grey.100          colour.surface.raised
space.4 = 16px           space.gap.control
```

Consumers use the semantic layer only; the primitive layer exists so the semantics have something to point at.

### Two layers, one direction of reference

Semantics point at primitives, never the other way. A theme then swaps which primitives the semantics resolve to, which is how dark mode and white-labelling work without touching a component.

```text
colour.surface.raised  ->  colour.grey.100   (light theme)
colour.surface.raised  ->  colour.grey.900   (dark theme)
```

### Keep the set small enough to memorise

A few dozen tokens cover most products. A set of three hundred is a colour picker with extra steps, and nobody reaches for it.

### Include the invisible values

Spacing, radius, border width, shadow, motion duration and easing, z-index layers. These are where drift is hardest to see and most expensive to fix, and they are the values a designer is least likely to keep consistent by hand.

### Ship them as an implementation detail

Tokens must reach the codebase, not stay in a design tool. Custom properties in CSS are the common route to this; the Cascading Style Sheets entry covers the mechanism. A token set that only exists in a design file changes nothing in the product.

## Practice

### Write a small token set

Define primitives for one colour ramp, four spacing steps, three type sizes and two radii, then write the semantic layer that points at them.

Done when: every semantic token resolves to a primitive, and no component names a colour directly.

### Theme one screen with tokens only

Restyle one screen to a dark theme by changing only the semantic layer, touching no component.

Done when: the screen is legible in the new theme and no component was edited.

## Common mistakes

- **Naming tokens after their value** — the name becomes wrong at the first rebrand; fix: name by role and keep the raw scale underneath.
- **Components referencing primitives directly** — the theming layer is bypassed and dark mode breaks; fix: consumers use semantic tokens only.
- **Hundreds of tokens** — the set is unusable and every consumer picks differently; fix: keep it small enough to remember.
- **Omitting spacing and motion** — the invisible drift continues; fix: tokenise spacing, radius, duration and layering too.
- **Tokens that never reach the code** — the product is unchanged; fix: publish them as the value layer the code actually reads.

## Go deeper

- **Design Systems** (`03-design-ux/32-design-systems`) — read this first; tokens are the layer the system sits on.
- **Component API and documentation** (`03-design-ux/32-design-systems/02-component-api-and-documentation`) — components consume tokens rather than values.
- **Cascading Style Sheets (CSS)** (`02-frontend/05-css`) — custom properties, the usual way tokens reach the browser.
- **Color Theory** (`03-design-ux/29-color-theory`) — choosing the ramps the colour tokens are built from.
