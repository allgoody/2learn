---
title: Rendering and JSX
prereqs: ["frontend/javascript"]
---

## What it is

A React component is a function that returns a description of part of a user interface. That description is written in JSX, a syntax that looks like HTML but is really a short way of writing function calls. React takes the description, compares it with the previous one, and updates the browser's DOM to match.

## Why it matters

Direct DOM manipulation is imperative: you must remember every node you created, every class you added and every listener you attached, and undo each one in the right order. React inverts that. You write the markup that should exist for the current data, and React keeps the DOM in step. The result is that a screen is a function of state rather than a sequence of edits, which is why a React view can be re-rendered ten times a second without the code becoming unreadable. Learning the rendering model early saves you from the classic bug where a value is displayed correctly once and then never updates again.

## Core ideas

### A component is a function that returns JSX

Name it with a capital letter and return one root element. React calls it, gets a tree of elements, and renders that. Nothing else is required — no registration, no base class.

```jsx
function Badge({ label }) {
  return <span className="badge">{label}</span>;
}
```

Class components are the older spelling of the same idea. You will meet them in existing code, but new code uses functions.

### JSX is JavaScript, not HTML

Because JSX compiles to function calls, any JavaScript expression fits inside braces. Attributes follow JavaScript naming, so `class` becomes `className`, and every element must be closed, including `<img />` and `<input />`. A component name in angle brackets is a variable reference, which is why the capital letter matters.

```jsx
function Greeting({ name, unread }) {
  return (
    <p title={`${unread} unread`}>
      Hello {name}, you have {unread} message{unread === 1 ? "" : "s"}.
    </p>
  );
}
```

### Rendering is a pure calculation

A render must not change anything outside itself: no writes to a database, no mutations of props, no counter increments. Given the same props and state, the same output must come back. That purity is what lets React re-render freely, and it is the rule that every later hook depends on. Side effects belong in an effect, after the render has finished.

### React diffs the tree, so identity matters

After a render, React compares the new element tree with the previous one and applies only the differences. In a list it needs stable identity to tell a moved item from a changed one, which is what the `key` prop supplies.

```jsx
<ul>
  {items.map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

Using the array index as a key looks harmless until items are inserted, reordered or deleted — then React reuses the wrong DOM node and the bug appears somewhere unrelated.

## Practice

### Render a value that updates

Build a component that takes a temperature in Celsius as a prop and shows it in both Celsius and Fahrenheit. Render it three times on one page with different values.

Done when: all three instances show the correct pair of numbers and you can point at the one line that does the conversion.

### Break a list on purpose

Render a list of five items with the array index as the key. Add a button that removes the second item while each row shows its own text input. Type something into the third row, then remove the second.

Done when: you have seen the wrong row lose its text, and you can explain why `key={item.id}` fixes it.

## Common mistakes

- **Lowercasing a component name** — React treats the tag as a built-in HTML element and silently renders nothing useful; fix: start component names with a capital letter.
- **Mutating props or state during render** — the screen keeps a value it should have replaced, and the cause is invisible; fix: compute a new value instead of writing to the old one.
- **Using the array index as a key** — inserting or reordering rows moves state into the wrong element; fix: use a stable id that survives the change.
- **Writing HTML attributes verbatim** — `class`, `for` and inline event names do not survive the JSX transform; fix: use `className`, `htmlFor`, and a function for each handler.
- **Returning several sibling elements without a wrapper** — the component throws because JSX has one root; fix: wrap them in a fragment.

## Go deeper

- **Javascript** (`frontend/javascript`) — if arrow functions, destructuring or spread syntax in the examples are not yet second nature, read this first.
- **Components and props** (`frontend/react/02-components-and-props`) — the next step: splitting a view into components that compose.
- **Web Performance (Core Web Vitals)** (`frontend/web-performance-core-web-vitals`) — what repeated rendering costs once the page is live.
