---
title: The DOM and events
prereqs: ["02-frontend/06-javascript/01-syntax-and-semantics"]
---

## What it is

The DOM is the browser's live object model of the document: one node per element, attribute and piece of text, reachable from JavaScript and changed in place. Events are the messages the browser sends when something happens — a click, a key press, a network response — and the DOM is where you listen for them.

## Why it matters

This is where a page stops being a document and starts being an application. Every interactive behaviour, from a dropdown to a live search, is DOM work plus event handling. It is also where the two most common performance and correctness problems live: listeners that keep running after the element is gone, and handlers that update the DOM in a way that forces the browser to recalculate layout over and over. Understanding the API — and its cost — is what separates code that responds instantly from code that stutters.

## Core ideas

### Query the tree, then change it

`querySelector` and `querySelectorAll` take CSS selectors, which means the selector knowledge from CSS applies directly. Change elements by setting properties (`textContent`, `classList`, `value`) rather than by rewriting HTML strings; `innerHTML` parses and reconstructs, which is slower and a route for injected markup.

```js
const list = document.querySelector("#results");
list.textContent = "";
```

Careful with `querySelectorAll`: it returns a static `NodeList`, not a live one — iterate with `for...of` or `Array.from`, not with array methods.

### Build nodes instead of concatenating strings

`document.createElement` and `append` give you a real node you can set properties on, and the browser reflows once when you attach it. Building a string and assigning it parses all of it again and discards the old subtree.

```js
const item = document.createElement("li");
item.textContent = row.name;
list.append(item);
```

### Events bubble, and that is a feature

An event fires on its target and then travels up through its ancestors. Listening on a container and checking `event.target` — delegation — means one listener covers every row, including rows added later. It is the standard fix for both the "my listener is gone" and the "I have two hundred listeners" problems.

```js
list.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  removeRow(button.dataset.id);
});
```

### Prevent the default only when you mean it

`event.preventDefault()` stops the browser's own behaviour — following a link, submitting a form. Calling it on every click to "stop the page jumping" breaks middle-click, keyboard activation and form validation. `stopPropagation` is for nested interactive regions and should be rare.

### Remove what you attach

A listener keeps its element and its closure alive for as long as the element is attached. When you remove an element, its listeners go with it; when you attach to `window` or `document`, they do not. Tear down anything long-lived.

## Practice

### Render a list with delegation

Build a list of items with a remove button on each row, appended from a data array, with a single click listener on the container.

Done when: clicking any row's button removes that row, and adding a row after page load works without adding a listener.

### Watch a reflow in the performance panel

Write a loop that reads `offsetHeight` and then writes a style on each iteration. Record it, then restructure the loop to read everything first and write afterwards, and record again.

Done when: the second recording shows the layout work batched rather than repeated on every iteration.

## Common mistakes

- **Calling `querySelectorAll` and then using array methods** — the `NodeList` has no `map` and the code throws; fix: convert with `Array.from` or iterate with `for...of`.
- **Attaching a listener inside a loop over the same elements** — the work grows with the list and duplicate handlers fire together; fix: attach one delegated listener on the container.
- **Reading layout properties after every write** — each read forces the browser to recalculate and the loop stutters; fix: batch reads, then writes.
- **Using `innerHTML` with user content** — the string is parsed as markup and untrusted text becomes an element; fix: set `textContent`, or build nodes.
- **Forgetting that `event` is gone after the handler returns** — it is reused and its properties are cleared; fix: read what you need into a variable during the handler.

## Go deeper

- **Syntax and semantics** (`02-frontend/06-javascript/01-syntax-and-semantics`) — closures and `this` decide what your handlers can see when they run.
- **Asynchronous JavaScript** (`02-frontend/06-javascript/03-asynchronous-javascript`) — most real handlers start work that finishes later.
- **Browser DevTools** (`02-frontend/27-browser-devtools`) — the Elements pane shows the live tree and the event listeners attached to each node.
