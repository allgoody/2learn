---
title: Modules and tooling
prereqs: ["frontend/javascript/03-asynchronous-javascript"]
---

## What it is

Modules split JavaScript into files with explicit imports and exports, so each file can state what it needs and what it offers. Tooling is what turns those files, plus any dependencies and non-JavaScript assets, into something a browser can load efficiently. The two are usually learned together because modules are what makes the tooling worth having.

## Why it matters

A single script file does not scale past a few hundred lines: every name is global, load order decides correctness, and nothing can be reused without copying. Modules give code a boundary and a dependency graph, which is what makes testing, tree-shaking and lazy loading possible at all. The tooling exists because browsers cannot do all of that on their own — at least, not with the same guarantees — and because the alternative, shipping every file and every dependency to every visitor, is the most common cause of a slow first load.

## Core ideas

### Named exports, explicit imports

An ES module declares what it offers and what it takes. Named exports are preferable to a default export because they rename on import deliberately, resist typos, and make it obvious what a symbol is.

```js
// format.js
export function formatMoney(cents) { /* … */ }
export const CURRENCY = "GBP";

// invoice.js
import { formatMoney } from "./format.js";
```

Imports are hoisted and live bindings — the importing module sees later changes to an exported `let`. That is different from a copied value and is occasionally surprising.

### A module is evaluated once

Module execution happens once per URL, no matter how many places import it, and the order is determined by the graph rather than by `<script>` tags. Top-level statements in a module therefore run on first import; a module whose top-level code does work is a module that runs at an unpredictable moment.

### Dynamic import splits the graph

`import()` returns a promise and loads a module on demand. That is how a route or a heavy editor is kept out of the initial bundle. Static `import` cannot do this: the bundler has to include the target in the entry bundle.

```js
async function openEditor() {
  const { Editor } = await import("./editor.js");
  return new Editor();
}
```

### A bundler exists to resolve, transform and remove

The bundler resolves module specifiers, transforms syntax the target browsers do not support, inlines assets, and removes code that is never reached. Vite is the common modern choice: it serves native ES modules during development and bundles for production, which keeps the edit-refresh loop fast on large projects.

### Ship less, by measuring

Tooling that is not measured grows. Check what ends up in the built output, keep the biggest dependencies deliberate, and prefer platform features over a library when the platform already does the job.

## Practice

### Split a script into modules

Take one file with several unrelated functions and split it into three modules with named exports, one of which imports the other two.

Done when: no module has more than one reason to change, and the entry file reads as a short list of imports and one call.

### Lazy-load one heavy feature

Find a feature that is rarely used but large — a rich text editor, a charting library — and load it with a dynamic `import()` triggered by the interaction that needs it.

Done when: the network panel shows the chunk is not requested on first load, and the feature still works the first time it is invoked.

## Common mistakes

- **Mixing CommonJS and ES module syntax** — `require` fails in a module and `import` cannot be used conditionally; fix: pick ES modules for new code and convert boundaries deliberately.
- **Importing for a side effect without saying so** — the dependency is invisible and can be removed as "unused"; fix: import the binding you use, or comment why the bare import exists.
- **Doing work at module top level** — it runs at an unpredictable time and cannot be cancelled or retried; fix: export a function and call it from the entry point.
- **Adding a dependency for a few lines** — the bundle grows for everyone and the supply chain widens; fix: use the platform API, or vendor the small function yourself.
- **Never inspecting the production bundle** — a framework or a locale file doubles the transfer without anyone noticing; fix: check the built output after adding a dependency.

## Go deeper

- **Asynchronous JavaScript** (`frontend/javascript/03-asynchronous-javascript`) — dynamic imports return promises, and the same error handling applies.
- **Vite** (`frontend/vite`) — the build tool this lesson gestures at, in detail.
- **Package Management (npm)** (`frontend/package-management-npm`) — how the dependencies your modules import get onto disk in the first place.
