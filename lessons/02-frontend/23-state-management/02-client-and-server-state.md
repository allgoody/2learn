---
title: Client and server state
prereqs: ["02-frontend/23-state-management/01-local-versus-shared-state"]
---

## What it is

Client state is data the application owns: which tab is open, an unsaved draft, a filter the user chose. Server state is data the application borrowed: a list of orders, a user profile, a stock level. The two look similar in code — both are values you read and display — but they are different problems, because the server can change the value without telling you.

## Why it matters

Treating server data as ordinary state produces a specific set of bugs: a stale list after another user edits the record, a page that shows a spinner on every visit because nothing was kept, and a cache that is never invalidated. The fix is not a bigger store; it is recognising that server state is a cache with an expiry and a refresh policy. Once that distinction is made, the questions become concrete — how long may this be stale, what invalidates it, what should be shown while it refreshes — and a whole class of hand-written loading flags disappears.

## Core ideas

### Server data is a cache, not a source of truth

Keep a copy for speed, but remember whose copy it is. Every cached value needs three answers: when it was fetched, what makes it stale, and what to do when it is. A cache with no expiry and no invalidation is a bug with a long fuse.

```js
// A cache entry is only meaningful with its age and its trigger
{ data, fetchedAt: Date.now(), key: "orders:page=1" }
```

### Key every request by its inputs

Two requests for the same resource with different parameters are different cache entries. Keying by the inputs — the query, the page, the filter — makes it possible to answer "do we already have this?" before fetching, and to invalidate precisely rather than wholesale.

### Model the request, not three flags

A single union — loading, ready, error, and the refreshing state on top of ready — makes contradictory combinations impossible. Three booleans allow a screen that is loading and errored and has data, which is exactly what users see when the flags disagree.

```ts
type Query<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "ready"; data: T; stale: boolean };
```

### Invalidate on mutation, deliberately

After a write, the cached copies of what the write affected are wrong. The choices are to refetch the affected queries, to write the new value into the cache with the server's response, or to mark the affected entries stale and refresh in the background. Naming the affected keys is the work; the rest is mechanical.

### Show the old value while refreshing

A list that blanks to a spinner on every refresh is worse than a list that stays put with a subtle "updating" hint. Keeping the previous data visible during a background refresh is why the ready state carries a `stale` flag rather than becoming loading again.

### Let a library do it if the project allows

Dedicated server-state libraries implement caching, deduplication, retries, background refresh and invalidation. Writing that by hand is a project in itself. The important part is to know the model, so that using one is a decision rather than a dependency.

## Practice

### Separate one screen's state into two kinds

Take a screen that fetches a list and lets the user filter it. Write down every value it holds and mark each as client or server state.

Done when: the list, its loading state and its error state are server state with one cache key, the filter and the sort are client state, and no value is doing both jobs.

### Make a mutation invalidate precisely

Add a delete action to the list. After it succeeds, update the cache rather than refetching everything, and confirm the affected view is correct without a full reload.

Done when: deleting a row updates the list immediately and a subsequent navigation shows the server's current state rather than the old cached one.

## Common mistakes

- **Storing fetched data in the same place as form state** — the two have different lifetimes and invalidation rules, and the form starts lying after a refetch; fix: keep server data in a cache keyed by request and client state where it is edited.
- **Never invalidating a cache** — a user sees another user's writes as missing; fix: invalidate on mutation and on window focus, or set an explicit staleness time.
- **Reloading everything after every write** — the page flickers and the network is full of requests that return identical data; fix: update the affected cache entries.
- **Showing a spinner whenever a refresh is in flight** — the screen blanks on each poll and the user loses their place; fix: keep the previous value and indicate the refresh separately.
- **Hand-rolling loading, error and data flags** — the combinations contradict each other; fix: model the request as one union.

## Go deeper

- **Local versus shared state** (`02-frontend/23-state-management/01-local-versus-shared-state`) — where the copy should live, once you have decided it is a copy.
- **Asynchronous JavaScript** (`02-frontend/06-javascript/03-asynchronous-javascript`) — the request mechanics, cancellation and error handling underneath.
- **Caching (Redis)** (`05-backend-data/16-caching-redis`) — the same cache-and-invalidate reasoning applied on the server.
