---
title: Asynchronous JavaScript
prereqs: ["02-frontend/06-javascript/02-the-dom-and-events"]
---

## What it is

Asynchronous JavaScript is how the language handles work that does not finish immediately — a network request, a timer, a file read — without freezing the page while it waits. You start the work, hand over a function to run when it completes, and the browser carries on. Promises and `async`/`await` are the modern ways of writing that hand-over.

## Why it matters

A single blocking operation on the main thread makes the whole page unresponsive: the tab stops painting, clicks queue up, and the browser eventually offers to kill the page. Every realistic application therefore fetches, waits and retries, and almost every bug in such an application is an ordering bug — work that finished after the state it was meant to update had already gone, or two requests racing, or an error that was never caught because the rejection had nowhere to land. The asynchronous model is not an advanced topic; it is the shape of the code a browser runs.

## Core ideas

### There is one thread and a queue

JavaScript runs one thing at a time. When work such as a network call finishes, its callback is queued and runs only once the current call stack is empty. That is why a long loop blocks a timer from firing and why code after an `await` resumes later rather than immediately.

```js
console.log("1");
setTimeout(() => console.log("3"), 0);
console.log("2");        // logs 1, 2, 3
```

### A promise is a placeholder with three states

A promise is pending, then either fulfilled with a value or rejected with a reason — once, and never again. `.then` and `.catch` attach callbacks; the return value of a `.then` is another promise, which is what makes chaining work.

```js
fetch("/api/orders")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then((orders) => render(orders))
  .catch((error) => showError(error));
```

Note the check: `fetch` resolves for a 404 as well as a 200. A network failure rejects; an error status does not.

### `async`/`await` is the same thing, spelled linearly

An `async` function always returns a promise, and `await` pauses inside it until the awaited promise settles, resuming with the value or throwing the reason. Wrap it in `try`/`catch`; an unhandled rejection is silent in many contexts.

```js
async function loadOrders() {
  try {
    const response = await fetch("/api/orders");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    showError(error);
    return [];
  }
}
```

### Independent work should run in parallel

Awaiting in sequence waits for the sum of the durations; `Promise.all` waits for the longest. `Promise.allSettled` gives you every result including failures, which is usually what you want when one failure should not cancel the rest.

```js
const [user, orders] = await Promise.all([loadUser(id), loadOrders(id)]);
```

### Cancellation and staleness are your responsibility

A promise cannot be cancelled, but the underlying request can be, with an `AbortController`. When a user types a new query, abort the previous one or ignore its result — otherwise the slowest response wins.

### Never leave a rejection unhandled

Every promise chain needs a `catch`, and every `await` needs a surrounding `try`. In the browser an unhandled rejection reaches the `unhandledrejection` event; in Node it can terminate the process.

## Practice

### Load three endpoints concurrently

Fetch three independent resources and render them together, first sequentially and then with `Promise.all`, timing both.

Done when: the concurrent version takes roughly as long as the slowest request rather than the sum, and a failing request still shows an error rather than a blank page.

### Cancel a stale search

Build a search field that starts a request on each keystroke. Cancel the previous request with `AbortController` when a new one starts.

Done when: typing quickly never renders results for an earlier query, and the network panel shows the abandoned requests as cancelled.

## Common mistakes

- **Forgetting that `fetch` resolves on an error status** — a 500 response is treated as success and the JSON parse fails obscurely; fix: check `response.ok` and throw.
- **Awaiting independent requests in sequence** — the page waits for the sum of the timings; fix: start them together and await `Promise.all`.
- **Leaving a promise without a `catch`** — a rejection disappears and the interface stays in its loading state; fix: attach a handler to every chain and wrap every `await`.
- **Reading state after an `await` and assuming it is unchanged** — the value may have been replaced while the request was in flight; fix: capture what you need before awaiting, or guard with an abort.
- **Using `await` inside a plain `forEach`** — the callbacks are not awaited and the loop finishes first; fix: use `for...of` or `Promise.all` over a map.

## Go deeper

- **The DOM and events** (`02-frontend/06-javascript/02-the-dom-and-events`) — the handlers that start this asynchronous work and the page it updates when it finishes.
- **Modules and tooling** (`02-frontend/06-javascript/04-modules-and-tooling`) — how the code you are writing gets split up and delivered.
- **Web Performance (Core Web Vitals)** (`02-frontend/26-web-performance-core-web-vitals`) — what long tasks and late responses cost the user.
