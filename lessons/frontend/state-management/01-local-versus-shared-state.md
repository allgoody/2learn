---
title: Local versus shared state
prereqs: ["frontend/javascript"]
---

## What it is

Local state belongs to one component and nothing else reads it: whether a menu is open, what has been typed into a field, which row is selected in one table. Shared state is read by more than one part of the interface, and therefore needs an owner, an update path and a name.

## Why it matters

The cheapest state is the state nobody else can see, because it cannot be stale elsewhere. Every value promoted to a global store has lost its locality: it now needs a name, a reset rule, a place in the initial state and an answer to "what happens on navigation". Applications that put everything in one store early end up with a store that mirrors the component tree and a large amount of code whose only job is to synchronise two representations of the same screen. The opposite failure is real too — threading a value through six components that do not use it — which is why the rule is a direction of travel rather than a fixed answer.

## Core ideas

### Start local and lift only when needed

A value starts in the component that displays it. When a second component needs to read it, lift it to the nearest common ancestor and pass it down. Only when that path becomes a nuisance — because the value is needed across distant branches, or across routes — is a store worth introducing.

```js
// Local: nothing else can see or invalidate it
const [open, setOpen] = useState(false);
```

The trigger to lift is a second reader, not a feeling that the value is "important".

### Lifting state means moving the owner, not copying it

Lifting is not the same as mirroring. If two components each keep a copy and keep them in step with effects, the copies will disagree — usually right after a fast interaction. Move the value to the parent, pass the value down and a setter as a prop, and delete the local copies.

```jsx
function Page() {
  const [query, setQuery] = useState("");
  return (
    <>
      <SearchField value={query} onChange={setQuery} />
      <ResultCount query={query} />
    </>
  );
}
```

### A store earns its place by being cross-cutting

Stores are good at values that many distant parts of the application read and write, that must survive navigation, or that must be serialised — the current user, the theme, an unsaved draft. They are poor at values that describe one screen, because the store outlives the screen and its entries must be cleaned up by hand.

### Different shapes suit different problems

A single store with actions and reducers makes every change traceable, which suits applications with complex, auditable state. A small store with direct setters is lighter for simple cases. Reactive primitives — signals — let a framework track dependencies through plain values and skip the store entirely. The names differ; the trade-off between traceability, ceremony and coupling does not.

### Keep the update rule in one place

Wherever the value lives, write down who may change it. A value that three components mutate directly cannot be reasoned about, and its bugs require reading all three. A single update function, even a trivial one, gives the change one place to be validated and one place to be logged.

## Practice

### Move a value back to local

Find a value in a global store that only one screen reads. Move it into that screen's local state and delete it from the store, including its reset-on-unmount rules.

Done when: the screen behaves identically, the store no longer mentions the value, and one fewer cleanup path exists.

### Lift a value to its nearest common owner

Find two components that each keep a copy of the same fact and synchronise them with an effect. Delete both copies, lift the value to their common parent, and pass it down with a setter.

Done when: no effect exists for synchronisation, and both components update together on every change including a fast double-click.

## Common mistakes

- **Putting everything in one global store** — the store mirrors the component tree and needs manual cleanup on every navigation; fix: keep a value local until a second reader exists.
- **Mirroring instead of lifting** — two copies drift and the bug looks like a rendering problem; fix: one owner, passed down.
- **Deriving state in an effect** — an extra render, and a second source of truth that can disagree; fix: compute derived values during render.
- **Forgetting to reset store state on leaving a screen** — the next visit shows the previous visit's data; fix: scope the store to the screen, or reset it explicitly on entry or exit.
- **Letting many components write the same value directly** — no single rule governs the change and every bug needs three files read; fix: funnel writes through one update function.

## Go deeper

- **Javascript** (`frontend/javascript`) — closures and object identity are what make local and shared state behave differently.
- **Client and server state** (`frontend/state-management/02-client-and-server-state`) — the next question: is this value ours at all?
- **React** (`frontend/react`) — the state and lifting rules this lesson generalises.
