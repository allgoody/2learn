---
title: Designing a component API
prereqs: ["frontend/html"]
---

## What it is

A component's API is the set of inputs it accepts and the promises it makes in return: the props and slots, their types and defaults, the events it emits, and the styling hooks it exposes. Designing that API is the same kind of work as designing a function signature, with the difference that the caller is another developer writing markup and the mistake is discovered months later on a different screen.

## Why it matters

A component is used hundreds of times, so every ambiguity in its API is multiplied by hundreds. A prop that means two things becomes two behaviours to maintain; a boolean that defaults to the wrong value becomes a thousand one-line overrides; a styling hook that leaks an internal class name becomes impossible to change once three teams depend on it. Getting the API right is cheap at the first use and expensive at the fiftieth, which is why it deserves the twenty minutes of thought that a component's body often gets instead.

## Core ideas

### Prefer a small, closed set of variants

A `variant` prop with three named values documents itself and can be validated. Three booleans that combine into eight states, three of which are nonsense, cannot.

```jsx
<Button variant="primary" />
<Button variant="secondary" />
<Button variant="danger" />
```

The question to ask of every boolean is "can this ever be combined with the other one in a way that makes sense?" If not, they are one enumerated value.

### Make the common case the default

The most frequent usage should need no props. If most call sites pass `size="medium"`, make medium the default and delete the prop from those call sites — that is both shorter to read and easier to change later.

### Use slots for structure, props for data

Pass content as children or named slots rather than as props full of markup. A component that accepts a `footer` slot can be reused in ways its author never imagined; a component that accepts `footerHtml` as a string cannot be safely extended at all.

```jsx
<Card>
  <Card.Header>Invoice #1042</Card.Header>
  <Card.Body>{lines}</Card.Body>
</Card>
```

### Do not leak the implementation

Expose semantic hooks, not internal class names. If the component's DOM changes, consumers should not have to change. Where CSS variables are available, exposing those is a deliberately small, stable surface.

```css
.badge {
  --badge-bg: navy;   /* public */
  --badge-pad: 0.25rem;
  background: var(--badge-bg);
  padding: var(--badge-pad);
}
```

### Decide who owns the state

A component that keeps its own state is easy to drop in but hard to control. A component that takes its value and an `onChange` is more verbose but can be driven by the application. Choose one per component and state it in the documentation: a component that is sometimes controlled and sometimes not is the worst of both.

## Practice

### Rewrite a flag-based component as variants

Find a component with two or more boolean props that are never both true. Replace them with a single enumerated prop and update every call site.

Done when: the invalid combinations are now unrepresentable, and the component's source has one fewer branch than before.

### Document a component by using it

Write the documentation for one existing component as three usage examples: the shortest possible call, the most common call, and the most complex call your product actually needs. Implement any missing slot the third example exposes.

Done when: all three examples work, the shortest call requires no props, and no example reaches into an internal class name.

## Common mistakes

- **Adding a boolean for every variation** — the combinations multiply and invalid states become reachable; fix: replace mutually exclusive booleans with one enumerated variant.
- **Exposing internal class names as styling hooks** — renaming a class becomes a breaking change across the product; fix: expose custom properties or documented slot names.
- **Requiring props for the common case** — every call site repeats the same value and a change means editing all of them; fix: choose the most common value as the default.
- **Accepting markup as a string prop** — callers cannot nest components inside it and escaping becomes a hazard; fix: accept children or a slot element.
- **Being vague about controlled state** — the component sometimes ignores the value it is given, which reads as a bug; fix: pick internal or controlled per component and document it.

## Go deeper

- **Hypertext Markup Language (HTML)** (`frontend/html`) — the semantics of the elements you wrap are part of the API, not an implementation detail.
- **Composing and theming components** (`frontend/ui-components/02-composing-and-theming-components`) — the next step: making several components work as one.
- **Design Systems** (`design-ux/design-systems`) — the wider practice of which a component API is one part.
