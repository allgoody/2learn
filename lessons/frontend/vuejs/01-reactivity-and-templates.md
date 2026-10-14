---
title: Reactivity and templates
prereqs: ["frontend/javascript"]
---

## What it is

A Vue template is HTML with a few extra attributes: `{{ }}` for text, `v-bind` and its `:` shorthand to bind attributes, `v-on` and its `@` shorthand for events, and the directives that control rendering. Reactivity is the mechanism underneath: when a value a template depends on changes, Vue re-renders the parts of the template that used it.

## Why it matters

Reactivity is the difference between describing a state and updating a view by hand. In plain JavaScript, changing a value means finding every place that displays it and updating each one, and forgetting one produces a screen that lies. Vue inverts that: you change the value and the framework works out what to re-render. Templates then keep the markup readable rather than turning it into function calls, which makes the component easier to hand to a designer. The trade-off is that template expressions are less expressive than arbitrary code, so the discipline is to keep the logic in the script and the template declarative.

## Core ideas

### Declare reactive state, then reference it

`ref` wraps a single value and `reactive` wraps an object; both make their content trackable. The template unwraps a `ref` automatically, while in script you read and write `.value`. The rule that matters is that reactivity tracks property access at the moment it happens, so a property added later is not tracked unless the object was reactive from the start.

```vue
<script setup>
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

### Bind attributes and events with shorthand

`:` binds one-way from state to the DOM; `@` listens to an event. Two-way binding is `v-model`, which is shorthand for a value binding plus an input listener, and it is the right tool for form fields rather than for arbitrary state.

```vue
<template>
  <input v-model="query" placeholder="Search" />
  <p v-if="results.length === 0">No matches.</p>
  <ul v-else>
    <li v-for="item in results" :key="item.id">{{ item.name }}</li>
  </ul>
</template>
```

`v-if` adds and removes elements; `v-show` toggles display and keeps them. Choosing wrongly costs either a re-created component or a permanently installed subtree.

### Computed values are cached derivations

`computed` derives a value from reactive state and recomputes only when its dependencies change. It is where derived data belongs — filtered lists, totals, formatted labels — so that templates stay thin and the derivation is not repeated on every render.

```js
const visible = computed(() =>
  items.value.filter((item) => item.name.includes(query.value))
);
```

### `watch` is for side effects

A watcher runs a function when a value changes, which is the right shape for saving to storage, logging or triggering a request — and the wrong shape for computing a value, because it introduces an extra render cycle and a second source of truth.

### Keep the template declarative

Anything with a loop and a temporary variable belongs in the script. Templates with long expressions are hard to test and impossible to reuse; a named computed or method gives the same result and can be tested on its own.

## Practice

### Build a filter with a computed value

Render a list and a text input. Filter the list with a `computed` derived from the input, not with a watcher and a second array.

Done when: typing filters the list immediately, clearing the field restores it, and the filtered array is never stored in reactive state.

### Compare `v-if` and `v-show` on a live component

Render a component with local state inside both a `v-if` and a `v-show` toggle. Enter a value, toggle it off and on, and compare.

Done when: you can explain which version lost the typed value and which directive you would choose for a frequently toggled panel.

## Common mistakes

- **Destructuring a reactive object** — the extracted variable is a plain value and stops updating; fix: keep the reference, or use the reactivity helpers that preserve it.
- **Forgetting `.value` in script** — the state never changes and nothing re-renders; fix: remember the template unwraps refs but the script does not.
- **Computing derived state in a watcher** — an extra render and a second source of truth that can disagree; fix: use `computed`.
- **Using an array index as `:key` in `v-for`** — inserting or reordering reuses the wrong element's state; fix: key on a stable id.
- **Putting business logic in template expressions** — it cannot be tested and is duplicated the moment a second template needs it; fix: move it into a computed or a method.

## Go deeper

- **Javascript** (`frontend/javascript`) — reactivity is built on language features such as getters and proxies; the model is easier to trust when you know the language.
- **Single-file components** (`frontend/vuejs/02-single-file-components`) — how these templates become reusable, isolated components.
- **React** (`frontend/react`) — a different answer to the same problem: no reactivity, an explicit state setter instead.
