---
title: Ajax
type: skill
topic: 02-frontend
tier: small
status: drafted
aliases: ["AJAX"]
prereqs: ["02-frontend/06-javascript"]
related: []
---

## What it is

Ajax is the technique of exchanging data with a server from a running page, without a full page reload. The name originally stood for Asynchronous JavaScript and XML; the XML has long since given way to JSON, and the request mechanism has moved from `XMLHttpRequest` to the `fetch` API, but the idea is unchanged: update part of the page from the network while everything else stays where it is.

## Why it matters

Before Ajax, every interaction was a form submission and a page load, which meant a visible flicker, a scroll position lost, and a server round trip for one checkbox. Ajax is what makes an application feel like an application rather than a document that reloads. It also introduces a class of problem that does not exist in a page that reloads: partial state. The page can be mid-request, the request can fail silently, and two requests can race — which is why understanding the technique matters more than remembering the API name.

## Core ideas

### The page is updated, not replaced

The request fetches data; the code then updates the part of the tree that changed and leaves the rest alone. That is the whole benefit — no re-render of the header, no lost scroll position — and it is also the source of the complexity, because the DOM and the server data can now disagree.

```js
async function refreshTotals() {
  const response = await fetch("/api/cart/totals");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const totals = await response.json();
  document.querySelector("[data-total]").textContent = formatMoney(totals.total);
}
```

### `fetch` resolves even when the request failed

A network failure rejects the promise, but a 404 or a 500 resolves with `ok` set to `false`. Treating every resolved response as success is the most common Ajax bug: the error page's HTML is parsed as JSON and the failure surfaces as a confusing parse error.

### Ask for JSON and check the shape

`response.json()` returns a promise, because the body is read after the headers arrive. The parsed value is `any`, so the shape you expect is an assumption until something verifies it. For anything beyond a prototype, validate at the boundary.

```js
const data = await response.json();
if (typeof data?.total !== "number") throw new Error("unexpected payload");
```

### Send data with the right method and type

`POST` with a JSON body needs the `Content-Type: application/json` header; a form submission should use `FormData` with no header so the browser sets the boundary. Getting this wrong produces a request the server cannot parse, usually reported as an empty body.

### Degrade when the script does not run

A link that navigates and a form that submits are the fallback for any request the script fails to make. Building the markup so it works without Ajax, then enhancing it, keeps the page usable when a script fails to load or is blocked.

## Practice

### Load and render a list without reloading

Build a button that fetches a list, renders it into the page, and shows a distinct message on failure and while the request is in flight.

Done when: the button shows a disabled loading state, a 500 response shows the error message rather than an empty list, and the rest of the page never re-renders.

### Give a form a working fallback

Take a form that is submitted by Ajax and verify it still works with JavaScript disabled, then confirm the enhanced path produces the same result.

Done when: the no-script path submits and renders correctly, and the enhanced path updates in place without a reload.

## Common mistakes

- **Assuming a resolved `fetch` means success** — a 404 body is parsed as the expected payload; fix: check `response.ok` and throw with the status.
- **Rendering before the request finishes** — the loading state is replaced by an empty one and the interface looks broken; fix: render three explicit states: loading, ready and error.
- **Letting two requests race** — a slow early response overwrites a fast later one; fix: abort the previous request or ignore a response whose request is no longer current.
- **Forgetting the JSON content type on a write** — the server receives an unparseable body; fix: set `Content-Type: application/json` and serialise with `JSON.stringify`.
- **Building the page so it only works with Ajax** — a blocked or failed script leaves nothing usable; fix: start from a working link or form and enhance it.

## Go deeper

- **Javascript** (`02-frontend/06-javascript`) — the language and the DOM you are updating from the response.
- **Asynchronous JavaScript** (`02-frontend/06-javascript/03-asynchronous-javascript`) — promises, cancellation and error handling in the depth this technique needs.
- **Restful API** (`05-backend-data/06-restful-api`) — how the endpoints you are calling are meant to be shaped.
