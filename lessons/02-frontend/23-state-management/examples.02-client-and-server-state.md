## Example 1 — Three flags that can all be true

A list screen tracks loading, error and data separately. On a slow retry the screen briefly shows a spinner and an error and the previous rows at once. Say what the type permits, then model the request as one value.

```ts
let loading = false;
let error: Error | null = null;
let data: Item[] = [];

// during a failed refresh: loading true, error set, data still populated
```

### Solution

```ts
type Query<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "ready"; data: T; stale: boolean };

function render(query: Query<Item[]>) {
  switch (query.status) {
    case "ready": return listItems(query.data, query.stale);
    case "error": return showError(query.error);
    case "loading": return spinner();
    case "idle": return null;
  }
}
```

Three independent variables describe eight combinations and several of them are nonsense — loading while errored while holding data is not a state a request can be in, and it is exactly what the flags produce when they disagree. A discriminated union stores one fact, so the impossible combinations cannot be written and the renderer cannot read `data` outside the branch where it exists. The `stale` flag on the ready state is the part worth noticing: a background refresh is not a return to loading, so the previous value stays visible and the interface says it is updating rather than blanking to a spinner.

## Example 2 — Invalidation by reloading everything

A delete action refetches every list on the screen, so the page flickers and four requests return data that did not change. Say what the cache needed instead, then update the affected entry.

```ts
async function deleteOrder(id: string) {
  await fetch(`/api/orders/${id}`, { method: "DELETE" });
  await refetchOrders();
  await refetchCustomers();
  await refetchDashboard();
}
```

### Solution

```ts
async function deleteOrder(id: string) {
  const response = await fetch(`/api/orders/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  cache.remove("orders:page=1", (order) => order.id === id);
  cache.markStale("dashboard:summary");     // refreshed in the background
}
```

Server data is a cache rather than a source of truth, so the question after a write is not "reload" but "which cached entries did this write affect" — and naming those keys is the whole work. Removing the row from the list it belonged to makes the change appear instantly without a round trip, while marking the derived summary stale lets it refresh behind the previous value instead of clearing it. Keying each entry by its request inputs is what makes precise invalidation possible at all; a cache with no keys and no expiry is a bug with a long fuse.
