---
title: State and hooks
prereqs: ["02-frontend/29-react/02-components-and-props"]
---

## What it is

State is the data a component remembers between renders. In a function component you add state with a hook: `useState` returns the current value and a setter function that replaces it. Calling the setter schedules a new render, and the new value appears in that render.

## Why it matters

Without state, a component can only show what it was handed, so any interaction — an open menu, a typed character, a selected row — would have to live in the parent and be threaded down. State keeps that bookkeeping local and lets React decide when to re-render. Most React bugs are state bugs: a value that never updates, two copies of the same fact that drift apart, or a setter called from a stale closure. Understanding what a state update actually does removes all three.

## Core ideas

### State is a snapshot, not a live variable

Each render captures the values it was called with. The `count` inside a handler belongs to the render that created the handler, so two calls to `setCount(count + 1)` in the same event both see the same `count` and add one, not two.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function addTwo() {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  }

  return <button onClick={addTwo}>{count}</button>;
}
```

The updater form receives the pending value rather than the render's copy, which is why it is the safe default whenever the next value depends on the previous one.

### Do not store what you can calculate

If a value can be derived from props or other state, compute it during render instead of storing it. Storing it means keeping two facts in step forever, and the one you forget to update is the one the user sees.

```jsx
// Prefer this
const visible = items.filter((item) => item.done === false);

// Not this — `visible` will eventually disagree with `items`
const [visible, setVisible] = useState(items.filter((item) => item.done === false));
```

Use `useMemo` only when a calculation is measurably expensive, not to defend a rule you have already broken.

### Put state at its lowest common owner

When two components must agree on a value, move the state up to their nearest shared parent and pass the value down, with a callback to change it. This is called lifting state up. Pushing it to a global store before it has to be shared adds indirection that you cannot remove later without a redesign.

### Hook rules are the price of the design

Hooks must be called at the top level of a component or another hook — never inside a condition, a loop or a nested function. React matches hooks to a component's internal slots by call order, so a conditional hook shifts every later hook by one and produces state that belongs to the wrong variable. The linter rule enforces this; keep it on.

### Batch updates, then render once

React collects the updates from one event and renders once. The setter does not change the current render's value, so reading state immediately after setting it returns the old copy. That is a feature: it keeps a single event from producing three inconsistent frames.

## Practice

### Build a filterable list

Create a list of tasks with a text field that filters them as you type. Keep the tasks and the query in state, and derive the visible list during render.

Done when: typing shows a filtered list, clearing the field restores every row, and there is no state variable whose value is a filtered copy of another.

### Fix a double-count

Write a component with a button that should add two to a counter. Implement it incorrectly first with two `setCount(count + 1)` calls, observe the result, then switch to the updater form.

Done when: the button adds exactly two, and you can say in one sentence why the first version added one.

## Common mistakes

- **Reading state right after setting it** — the handler sees the render's snapshot, not the new value; fix: compute the next value from the updater argument instead of reading the variable.
- **Storing derived values** — the copy drifts from its source and the screen lies; fix: compute during render, and memoise only if it is measurably slow.
- **Copying props into state** — later prop changes are ignored, because state keeps its first value; fix: read the prop directly, or key the component so it remounts.
- **Calling a hook conditionally** — state ends up attached to the wrong hook and errors appear far from the cause; fix: call every hook unconditionally and branch inside it.
- **Duplicating shared state in two components** — the two copies disagree and the fix is a third update in a third place; fix: lift the state to the nearest common parent.

## Go deeper

- **Components and props** (`02-frontend/29-react/02-components-and-props`) — the boundary rules decide which component should own the state in the first place.
- **Effects and data fetching** (`02-frontend/29-react/04-effects-and-data-fetching`) — what to do when the work is not a calculation and must happen after render.
- **State Management** (`02-frontend/23-state-management`) — the point at which local state stops being enough.
