---
title: Effects and data fetching
prereqs: ["frontend/react/03-state-and-hooks"]
---

## What it is

An effect is a function that runs after a component has rendered, used to synchronise the component with something outside React: a network request, a timer, a subscription, or the document title. `useEffect` takes that function and a dependency array that says when it should run again.

## Why it matters

Rendering must stay pure, so anything that touches the outside world has to happen after the render, not during it. Effects are where data loading, subscriptions and manual DOM work live — and where most production React bugs originate. A request that resolves after the component unmounts, two requests racing so the slower one wins, an effect that runs on every render and refetches forever: all of these come from a dependency array that does not say what the author meant. Learning the rules turns that class of bug into something you can read off the screen.

## Core ideas

### Effects run after the render, not during it

The effect body runs once the browser has painted the committed output. That ordering is deliberate: the UI is already on screen, so the effect can safely start slow work. Do not use an effect to compute something you already have during render — that is what ordinary code in the component body is for.

```jsx
function DocumentTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}
```

### The dependency array is the trigger

Everything the effect reads from the component's scope belongs in the array. React compares each entry with the previous render using `Object.is`; any change re-runs the effect. An empty array means "run once after the first render". Omitting the array entirely means "run after every render", which is almost never what you want.

```jsx
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);
```

### Return a cleanup function for anything you start

The function returned from the effect runs before the next run and again when the component unmounts. Clearing a timer, closing a socket and cancelling a request all belong here. Without cleanup, the effect from the previous render keeps working on values that no longer exist.

### Fetching needs a guard against the race

Two requests started in quick succession can resolve out of order, so the older response overwrites the newer one. The fix is to ignore a response once its effect has been cleaned up — `AbortController` cancels the request itself, and an `ignore` flag works when you cannot cancel.

```jsx
useEffect(() => {
  let ignore = false;
  setState({ status: "loading" });

  fetch(`/api/search?q=${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((data) => {
      if (!ignore) setState({ status: "ready", data });
    })
    .catch(() => {
      if (!ignore) setState({ status: "error" });
    });

  return () => {
    ignore = true;
  };
}, [query]);
```

Model the request as a small state machine — `loading`, `ready`, `error` — rather than three booleans that can contradict each other.

### An effect that starts the same thing twice is a smell

In development React runs effects twice to surface missing cleanup. If that produces a duplicate subscription or a doubled counter, the missing cleanup is the real bug, not the double run. Fix the effect; do not reach for a ref to suppress the second run.

## Practice

### Load a list with a loading and an error state

Fetch a list from an endpoint of your choice and render three states: a spinner, the list, and a message with a retry button. Type in a search field that changes the query.

Done when: the spinner appears on the first load, a failing request shows the error message with a working retry, and typing quickly never leaves the list showing results for an earlier query.

### Prove the cleanup runs

Add a component that logs on mount and on unmount, mount it and unmount it with a toggle button, and then mount two of them at once.

Done when: the console shows one start and one stop for each mount, with no stop missing and none duplicated.

## Common mistakes

- **Leaving the dependency array off** — the effect runs after every render and refetches in a loop; fix: list every value the effect reads, or use an empty array when it reads none.
- **Forgetting cleanup** — timers, sockets and subscriptions keep running after unmount; fix: return a function that stops whatever the effect started.
- **Ignoring out-of-order responses** — a slow early request overwrites a fast later one; fix: cancel with `AbortController` or guard with an `ignore` flag set in the cleanup.
- **Computing during an effect what belongs in the render** — an extra render and a flash of stale output; fix: calculate it in the component body and pass it down.
- **Using one effect for unrelated work** — the dependency array mixes concerns and unrelated runs trigger each other; fix: split it into one effect per synchronisation.

## Go deeper

- **State and hooks** (`frontend/react/03-state-and-hooks`) — the snapshot rule explains why an effect can still read a stale value; re-read it before debugging a fetch.
- **Web Performance (Core Web Vitals)** (`frontend/web-performance-core-web-vitals`) — how many requests and how much work should follow the first render.
- **Browser DevTools** (`frontend/browser-devtools`) — watching a stalled request and an unmounted component side by side.
