## Example 1 — One caching strategy for everything

The service worker answers every request from the cache first. Users see prices and stock levels that are days old and report the site as wrong. Say what a single strategy assumes, then choose one per route.

```js
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((hit) => hit || fetch(event.request)),
  );
});
```

### Solution

```js
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname.startsWith("/api/")) {
    event.respondWith(fetch(event.request));   // network-first: must be current
    return;
  }

  event.respondWith(
    caches.match(event.request).then((hit) => hit || fetch(event.request)),
  );
});
```

Cache-first is a claim that the resource will not change, which is true of a hashed asset and false of an API payload — so applying it everywhere writes an assumption into the worker that its author never made. The strategy belongs to the resource: a hashed file is cache-first, a payload that must be current is network-first, and a value that is expensive to compute but tolerant of being a little old suits stale-while-revalidate. Deciding which is which, route by route, is most of the work; a cache with no expiry and no invalidation is a bug with a long fuse, and its symptom is a user report rather than a log line.

## Example 2 — A cache name that never changes

Every deploy writes new assets into the same cache. Users run a mixture of two releases, and the only fix anyone knows is clearing site data. Say what a release should do to the cache, then version it.

```js
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open("app").then((c) => c.addAll(["/", "/app.js", "/app.css"])));
});
```

### Solution

```js
const VERSION = "v7";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(["/", "/app.js", "/app.css"])));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((name) => name !== VERSION).map((name) => caches.delete(name))),
    ),
  );
});
```

A cache is a container, and reusing one name across releases means the previous build's files stay available and get mixed with the current build's — which is why the symptom is intermittent rather than reproducible. Naming the cache after the build and deleting every other name on activation gives each release a clean generation and removes the old one, and the deletion has to happen in `activate` rather than `install`, because the old worker still serves pages until the new one takes control. Caching is also where a decision about private data belongs: authenticated responses and anything user-specific should stay out of the cache, or the next person on the device can read them.
