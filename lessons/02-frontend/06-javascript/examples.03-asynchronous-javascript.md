## Example 1 — Three requests awaited one after another

A dashboard loader awaits three independent requests in sequence, and it treats every response as a success. Explain both problems, then make the waits overlap and the failures visible.

```js
async function loadDashboard(id) {
  const user = await loadUser(id);      // 300ms
  const orders = await loadOrders(id);  // 400ms
  const alerts = await loadAlerts(id);  // 200ms
  return { user, orders, alerts };
}
// total: ~900ms

const response = await fetch("/api/orders/" + id);
const orders = await response.json();   // a 500 is parsed as if it succeeded
```

### Solution

```js
async function loadOrders(id) {
  const response = await fetch("/api/orders/" + id);
  if (!response.ok) throw new Error("HTTP " + response.status);
  return response.json();
}

async function loadDashboard(id) {
  const [user, orders, alerts] = await Promise.all([
    loadUser(id), loadOrders(id), loadAlerts(id),
  ]);
  return { user, orders, alerts };
}
// total: ~400ms — the slowest call, not the sum
```

Awaiting in sequence makes the page wait for the sum of the three durations, while the requests have no dependency on each other at all; `Promise.all` waits only for the longest and rejects if any of them fails. The second problem is quieter: `fetch` rejects on a network failure but resolves for a 404 or a 500, so the JSON parse is attempted against an error body and fails with a message that points at the wrong thing. Checking `response.ok` turns a confusing parse error into a named status.

## Example 2 — A search where the slowest response wins

Each keystroke starts a request and the result is rendered whenever it arrives. Typing "keyboard" can end up showing the results for "key". Say what is racing, then make the abandoned request stop.

```js
async function search(term) {
  const response = await fetch("/api/search?q=" + term);
  const results = await response.json();
  render(results);
}

input.addEventListener("input", () => search(input.value));
// the response for an earlier, shorter term can land last
```

### Solution

```js
let controller = null;

async function search(term) {
  if (controller) controller.abort();
  controller = new AbortController();

  try {
    const response = await fetch("/api/search?q=" + term, {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    render(await response.json());
  } catch (error) {
    if (error.name === "AbortError") return;   // superseded, not a failure
    showError(error);
  }
}

input.addEventListener("input", () => search(input.value));
```

A promise cannot be cancelled, but the request behind it can, which is what `AbortController` is for: starting a new search aborts the one in flight, so a stale response can no longer overwrite a fresh one. The abort also arrives as an error, so it has to be distinguished from a real failure or every keystroke would show an error message.
