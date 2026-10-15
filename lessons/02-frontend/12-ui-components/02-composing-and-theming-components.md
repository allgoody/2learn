---
title: Composing and theming components
prereqs: ["02-frontend/12-ui-components/01-designing-a-component-api"]
---

## What it is

Composition is building larger components out of smaller ones without either knowing much about the other. Theming is changing a component's appearance from the outside — colours, spacing, density — without editing the component or duplicating it. Both are what turn a folder of components into a system that a whole product can actually be built from.

## Why it matters

A component library that cannot be composed produces a new bespoke component for every screen, and the drift you removed returns at the screen level. A library that cannot be themed produces either a fork per brand or a prop for every colour. Getting both right is what lets one team ship a marketing site, an application and a partner-branded view from the same components. It also decides how expensive the next design change is: with a theme layer it is a token edit, without one it is a migration.

## Core ideas

### Compose by nesting, not by configuring

A `Toolbar` should arrange whatever it is given, not accept a list of items and a rendering mode. Nesting keeps each component's job small and lets the caller express arrangements the author never anticipated.

```jsx
<Card>
  <Card.Header>
    <Avatar user={user} />
    <span>{user.name}</span>
  </Card.Header>
  <Card.Body>{bio}</Card.Body>
</Card>
```

### Share the styling contract through custom properties

Custom properties are inherited, so a wrapper can set them for everything inside without a selector per component. That single mechanism covers density, radius, colour and spacing, and it keeps the theming surface explicit and small.

```css
.compact {
  --control-pad: 0.25rem 0.5rem;
  --control-radius: 0.25rem;
}

.button { padding: var(--control-pad); border-radius: var(--control-radius); }
```

### Theme with tokens, not with overrides

A theme is a set of values; an override is a rule that beats the component from outside. Overrides multiply and win by specificity, so the next theme needs a bigger selector. Tokens invert that: the component reads a value and the theme supplies it, so any number of themes coexist without competing.

### Keep the theming surface documented and versioned

Whatever a consumer can set is public API. Write it down, name it consistently, and treat a rename as a breaking change. Component libraries that forget this end up with two classes for the same purpose because renaming the first one was too risky.

### Let the caller extend, not fork

Offer a slot at the point where variation is expected — a footer, an actions area, an icon — and the caller extends the component in place. Any variation that needs a copy of the whole component is a missing slot rather than a new component.

## Practice

### Build a compact theme without editing components

Take two or three existing components that share spacing and radius values. Extract those values into custom properties and add a wrapper class that sets them to a denser scale.

Done when: the components render compact inside the wrapper and unchanged outside it, and no component file was edited.

### Extend a component with a slot

Choose a component whose callers have copied it once. Add the slot that would have covered the difference, and migrate one copy to use it.

Done when: the copy is deleted, the original renders both variants correctly, and the slot's name is documented.

## Common mistakes

- **Theming by overriding component selectors** — specificity escalates with every theme and the component cannot be refactored; fix: expose the values as custom properties and let the theme set them.
- **Adding a prop for each new variation** — the API grows without bound and invalid combinations multiply; fix: add a slot or a token and let the caller vary it.
- **Leaking the theme into the component** — the component now knows about one brand and cannot serve the other; fix: keep the component reading only its own properties and fallbacks.
- **Undocumented theming surface** — consumers guess at property names and use internals; fix: document every public property and treat changes as versioned.
- **Forking a component for one screen** — the fix ships to one copy only and the copies diverge; fix: extend the original with a slot instead of copying it.

## Go deeper

- **Designing a component API** (`02-frontend/12-ui-components/01-designing-a-component-api`) — the props and defaults this lesson themes; re-read it before adding a new variation.
- **Modern CSS features** (`02-frontend/05-css/04-modern-css`) — custom properties and the cascade behaviour that makes the token approach work.
- **Design Tokens** (`03-design-ux/41-design-tokens`) — how to name and organise the values a theme sets.
