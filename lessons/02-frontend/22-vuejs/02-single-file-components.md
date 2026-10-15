---
title: Single-file components
prereqs: ["02-frontend/22-vuejs/01-reactivity-and-templates"]
---

## What it is

A single-file component is one `.vue` file containing a `<script>` block, a `<template>` block and optional `<style>` blocks. The toolchain compiles it into a normal component at build time. The format is Vue's signature idea: the three things that change together — logic, markup and styles — live in one file, and the styles can be scoped to that file's elements.

## Why it matters

Colocation is the whole argument. When a component's behaviour, markup and styling sit in one file, editing it means opening one place, and deleting it means deleting one file. The alternative — a template directory, a script directory and a stylesheet directory that must stay in step — costs navigation time on every change and leaves dead fragments behind when a component is removed. Scoped styles add a second benefit: a class name can be reused across components without a naming convention, because the compiler rewrites it to something unique.

## Core ideas

### The component contract is props down, events up

A parent passes data with `props` and listens to changes with `emits`. A child never mutates its props; when it needs to change something, it emits an event and the parent decides. That single direction is what makes a component tree predictable, and it is the same discipline every framework enforces in its own spelling.

```vue
<script setup>
const props = defineProps({
  label: { type: String, required: true },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["submit"]);
</script>

<template>
  <button :disabled="disabled" @click="emit('submit')">{{ label }}</button>
</template>
```

### Props are declared and validated

Declaring each prop's type, requirement and default turns the component's contract into something the framework checks at development time and documents for whoever reads the file. A prop that is required by the template but not declared is a runtime surprise.

### Slots are how structure is passed in

A slot is a placeholder the parent fills, which is how a component accepts markup without receiving it as a string. Named slots let a layout component define several regions — a header, a body, an actions area — while remaining agnostic about what goes into them.

```vue
<!-- Card.vue -->
<template>
  <section class="card">
    <header><slot name="header" /></header>
    <slot />
  </section>
</template>
```

### Scoped styles isolate without a convention

Adding `scoped` to a `<style>` block rewrites its selectors so they only match this component's elements. That removes the need for a prefixing convention, but it also means a scoped rule cannot style a child component's internals — which is a feature: the styling surface is the component's own elements and the classes it exposes.

### Prefer the composition API for anything non-trivial

The `<script setup>` syntax declares logic top to bottom with no `this`, so functions and imports can be read in order and reused across components as composables. The older options API still works and is common in existing code; new components benefit from the flatter form.

## Practice

### Extract a reusable component

Take a block of markup duplicated on two screens and extract it into a single-file component with props for the data and a slot for the variable part.

Done when: both screens use the component, the component has no knowledge of either screen, and the duplicated markup exists once.

### Scope a component's styles and prove it

Give a component a class name that is also used elsewhere on the page, add `scoped` to its style block, and inspect the rendered class name in the browser.

Done when: the class has been rewritten uniquely, the other element on the page is unaffected, and you can state what the scope does not reach.

## Common mistakes

- **Mutating a prop inside the child** — the parent's data changes without its knowledge and the two disagree; fix: emit an event and let the parent update the value.
- **Declaring props without types or defaults** — the contract is invisible and a missing value fails at render time; fix: declare type, required and default for every prop.
- **Passing markup as a string prop instead of a slot** — the caller cannot nest components and escaping becomes a hazard; fix: use a slot.
- **Assuming a scoped style reaches a child component** — the rule silently does not apply; fix: expose the value as a custom property or style the child's public class.
- **Reaching for the options API in new code out of habit** — `this` scatters the logic and composables cannot be reused; fix: use `<script setup>` for new components.

## Go deeper

- **Reactivity and templates** (`02-frontend/22-vuejs/01-reactivity-and-templates`) — the template and reactivity rules this file format is built on.
- **State Management** (`02-frontend/23-state-management`) — where a component's local state stops being enough.
- **UI Components** (`02-frontend/12-ui-components`) — the API design decisions a single-file component makes concrete.
