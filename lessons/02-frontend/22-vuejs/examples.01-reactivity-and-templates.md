## Example 1 — A filtered list stored in state

A search field filters a list, and the filtered array is written into a `ref` by a watcher. Clearing the field sometimes leaves results behind. Say why the derived value is being stored, then derive it instead.

```vue
<script setup>
import { ref, watch } from "vue";

const items = ref([{ id: 1, name: "Desk lamp" }]);
const query = ref("");
const visible = ref([]);

watch([items, query], () => {
  visible.value = items.value.filter((item) => item.name.includes(query.value));
}, { immediate: true });
</script>
```

### Solution

```vue
<script setup>
import { ref, computed } from "vue";

const items = ref([{ id: 1, name: "Desk lamp" }]);
const query = ref("");

const visible = computed(() =>
  items.value.filter((item) => item.name.includes(query.value)),
);
</script>
```

A watcher that writes a second `ref` creates two sources of truth for the same list, so the two can disagree — which is exactly what a stale filtered array is — and it needs an `immediate` flag to be correct on the first render at all. `computed` derives the value from the state it depends on, and it is recomputed only when one of those dependencies changes, so it cannot fall behind. The template stays thin, the filter logic has one home, and because it is a plain function of reactive state it can be tested on its own. Side effects such as saving to storage or logging are what `watch` is for.

## Example 2 — A list keyed by its index

Rows in an editable list are keyed by their position. Deleting the first row leaves the typed notes attached to the wrong items. Explain what the key tells the framework, then key on something stable.

```vue
<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      <input v-model="item.note" />
      {{ item.name }}
    </li>
  </ul>
</template>
```

### Solution

```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <input v-model="item.note" />
      {{ item.name }}
    </li>
  </ul>
</template>
```

The key is how the framework matches a rendered element to the data it came from, so an index says "whatever is in position one" — after a delete or a reorder, position one is a different item, and the framework reuses the input that was already there along with the text typed into it. Keying on a stable id lets the element follow its data, so removing a row removes the right one and the local state of every other row stays with its owner. Use the domain's identity for the key, and never the array position, whenever the list can change or reorder. `v-if` and `v-show` are a separate choice: one creates and destroys the subtree, the other only hides it.
