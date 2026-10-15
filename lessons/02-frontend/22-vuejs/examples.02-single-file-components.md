## Example 1 — A child that changes a prop it was given

A counter component increments the value it received, and the parent's display disagrees with it. Say which direction data is supposed to travel, then hand the change back to the parent.

```vue
<script setup>
const props = defineProps({ count: Number });
</script>

<template>
  <button @click="props.count++">{{ props.count }}</button>
</template>
```

### Solution

```vue
<script setup>
defineProps({ count: { type: Number, required: true } });
const emit = defineEmits(["increment"]);
</script>

<template>
  <button @click="emit('increment')">{{ count }}</button>
</template>
```

```vue
<Counter :count="count" @increment="count++" />
```

A prop is a value the parent owns, so a child that writes to it updates a copy the parent does not know about and the two views disagree — the bug looks like a rendering problem rather than a data one. The contract is props down and events up: the child reports what happened and the parent decides what the new value is. Declaring the prop's type and requirement is the other half, because it turns the contract into something the framework checks in development and documents in the file. Keeping a child free of its parent's state is also what makes it reusable on the next screen.

## Example 2 — Markup sent to a component as a string

A card accepts its header and action buttons as HTML strings and renders them with `v-html`. Callers cannot nest components and one of them broke when a quote appeared in the content. Say what the string prop costs, then pass structure instead.

```vue
<script setup>
defineProps({ title: String, actionsHtml: String });
</script>

<template>
  <section class="card">
    <h2>{{ title }}</h2>
    <div v-html="actionsHtml" />
  </section>
</template>
```

### Solution

```vue
<template>
  <section class="card">
    <header><slot name="header" /></header>
    <slot />
    <footer><slot name="actions" /></footer>
  </section>
</template>
```

```vue
<Card>
  <template #header><h2>Invoice #1042</h2></template>
  <p>{{ summary }}</p>
  <template #actions>
    <Button variant="primary">Pay</Button>
  </template>
</Card>
```

A string of markup is parsed as HTML, so escaping becomes the caller's responsibility and anything user-supplied in it is an injection route; it also cannot contain another component, which is why the callers wanted a feature the card could not give them. Slots pass structure as structure, so the caller's own components, event handlers and bindings all work as written, and the card stays agnostic about what goes into each region — its styling surface remains its own elements and the classes it exposes, and a scoped rule correctly cannot reach into the child's internals.
