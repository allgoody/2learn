---
title: Components and props
prereqs: ["02-frontend/29-react/01-rendering-and-jsx"]
---

## What it is

A React screen is built from components nested inside one another, and the data that flows down that tree travels as props. A prop is a named input on a component, written exactly like an attribute in JSX. Splitting a view into components and deciding what each one receives is the main design work in a React codebase.

## Why it matters

One component that renders a whole page works until the page changes. The fixes then get worse: a flag prop to hide a section, a second copy of the same markup with one line different, an event handler threaded through four layers. Components that take a clear set of props can be reused, tested in isolation and rearranged without touching their internals. Getting the boundaries right early is far cheaper than extracting them from a 600-line component later, because the extraction is the easy part — the data flow is what hurts.

## Core ideas

### Props are read-only inputs

A component must never write to its props. They belong to the parent, and mutating them breaks the assumption that a render is a pure function of its inputs. If a component needs to change something, it asks the parent to change it.

```jsx
function Price({ amount, currency }) {
  return <strong>{formatMoney(amount, currency)}</strong>;
}
```

Destructuring the props in the parameter list is the common style, but the rule is the same either way: read, do not write.

### Draw boundaries where the data lives

Put a component around a piece of data, not around a piece of visual space. A `UserCard` that receives a `user` object is easier to move than a `LeftColumn` that reaches into global state. When two components need the same value and neither owns it, move the value up to their nearest shared parent instead of duplicating it.

### Compose with children

Instead of adding a `showHeader` prop, accept `children` and let the caller decide what goes inside. Composition keeps the component's own responsibility small and lets callers assemble layouts without the component knowing about them.

```jsx
function Panel({ title, children }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

<Panel title="Invoices">
  <InvoiceTable rows={rows} />
</Panel>
```

### Pass behaviour down as a function

A child that must trigger an action does not need to know what the action is. Give it a callback prop and let the parent decide.

```jsx
function SaveButton({ onSave, saving }) {
  return (
    <button onClick={onSave} disabled={saving}>
      {saving ? "Saving…" : "Save"}
    </button>
  );
}
```

Name the prop for the event, not for the function: `onSave`, not `handleSaveClick`. The `on` prefix is how a reader knows it is called by the component rather than imported by it.

### Keep the tree shallow where you can

Every layer of nesting is a layer of data you have to thread through, and a prop that exists only to be forwarded is a sign the boundary is in the wrong place. Three clear levels read better than eight thin ones.

## Practice

### Split a page into components

Take a page you have built and identify three regions that own different data. Write the prop list for each component before changing any code, then implement the split.

Done when: no component receives more than four props and no child reaches for data it was not given.

### Replace a flag prop with composition

Find a component that takes a boolean such as `showFooter` and renders extra markup when it is true. Replace the flag with `children` or a slot prop, and update every call site.

Done when: the component no longer mentions the removed feature and every call site still renders what it did before.

## Common mistakes

- **Mutating a prop object** — the parent's data changes behind its back and the next render disagrees with it; fix: copy the parts you need and pass a new object upward through a callback.
- **Threading props through components that ignore them** — every middle layer now knows about a feature it does not use; fix: move the value closer to the components that read it, or compose the layer away.
- **One component per visual box** — the tree becomes deeper than the data model and every change crosses four files; fix: group by data ownership, not by pixel boundaries.
- **Naming callbacks after their implementation** — `handleSaveClick` tells the reader nothing about when it runs; fix: name it for the event, such as `onSave`.
- **Passing a new object or function on every render without thinking** — child components that compare props see a change every time; fix: pass a stable value where it matters and accept a new one where it does not.

## Go deeper

- **Rendering and JSX** (`02-frontend/29-react/01-rendering-and-jsx`) — re-read the reconciliation section: `key` is a props-adjacent decision that belongs with component boundaries.
- **State and hooks** (`02-frontend/29-react/03-state-and-hooks`) — props flow down, state stays put; the next lesson covers where state should live.
- **UI Components** (`02-frontend/12-ui-components`) — turning a set of reusable components into a deliberate library.
