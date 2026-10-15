---
title: Service workers and offline
prereqs: ["02-frontend/06-javascript"]
---

## What it is

A service worker is a script the browser runs in the background, separate from any page, that can intercept network requests made by your site and answer them from a cache. It is the mechanism behind offline support, instant repeat visits and background synchronisation. It has no access to the DOM and it outlives the page that registered it.

## Why it matters

Because a service worker can answer a request before the network sees it, it is the only browser feature that can make a site work with no connection at all — and the only one that can serve a stale page to a user who expects fresh content. That second half is the reason offline support is a design decision rather than a checkbox. A cache with no expiry and no invalidation is a bug with a long fuse: it survives deploys, and the user's reported symptom is "the site is wrong" with no error in any log.

## Core ideas

### The service worker is a proxy with a lifecycle

Registration installs the script, activation prepares it to control pages, and from then on it sits between the page and the network. A new version is installed in the background and takes effect only once the old one releases control, which is why an update can appear to do nothing.

```js
// sw.js
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open("v1").then((cache) => cache.addAll(["/", "/offline.html"])));
  self.skipWaiting();
});
```

`skipWaiting` makes the new worker take over immediately; without it, the old worker keeps serving until every controlled tab is closed.

### Pick a caching strategy per resource, not per site

A cache-first response is right for a hashed asset that never changes; a network-first response is right for an API payload that must be current; stale-while-revalidate gives an instant answer and refreshes behind it. Different routes in one application want different strategies, and saying which is which is most of the work.

```js
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(fetch(event.request));   // network-first: always current
    return;
  }
  event.respondWith(caches.match(event.request).then((hit) => hit || fetch(event.request)));
});
```

### Cache the shell, and version it

Precaching the application shell makes the second visit instant. Each deploy should produce a new cache name and delete the old one on activation, so a release does not leave two generations of assets in the browser.

### Do not cache what must not be cached

Authenticated API responses and anything user-specific should not be written into a cache the next user of the device could read, and must not be served after sign-out. Keep caches to static assets and public data unless you have thought carefully about the consequences.

### Offline is a state, not an error

A page that fails to load with a browser error looks broken. A page that shows a clear offline state, with whatever data was already available, is still usable. Handle it as an ordinary state in the interface, exactly as you would a loading or error state.

### Update deliberately

A service worker that updates silently while a user is halfway through a form is a data-loss bug. Show a prompt, or update on the next navigation — but decide, rather than letting the default behaviour choose.

## Practice

### Make a page load with the network off

Register a service worker that precaches a shell page and its assets, then load the page, disable the network in the browser, and reload.

Done when: the page renders while offline and the assets are served from the cache, with no request reaching the network panel.

### Ship a new version and watch the cache change

Change a cached asset, deploy, and observe which version the browser serves before and after the old worker releases control.

Done when: you have seen the stale version served once, and can state the event that caused the new one to take over.

## Common mistakes

- **Caching everything with one strategy** — an API response is served from cache long after it changed; fix: choose a strategy per route.
- **Never versioning the cache name** — deploys leave old assets in place and users see a mixture; fix: change the cache name per build and delete the previous one on activation.
- **Caching authenticated responses** — private data is served to the next person on the device; fix: keep user-specific responses out of the cache.
- **Assuming the new worker takes over immediately** — the old one serves until it releases control; fix: call `skipWaiting` deliberately, and handle the resulting page reload.
- **Showing a browser error when offline** — the application looks broken rather than disconnected; fix: render an offline state with whatever is available.

## Go deeper

- **Javascript** (`02-frontend/06-javascript`) — promises and event listeners are the whole API surface here.
- **Installability and the app manifest** (`02-frontend/25-progressive-web-apps-pwa/02-installability-and-the-app-manifest`) — the other half of making a site installable.
- **Caching (Redis)** (`05-backend-data/16-caching-redis`) — invalidation is the same problem on the server, with a much better error log.
