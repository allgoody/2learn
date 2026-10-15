## Example 1 — One file, global names, and work that runs on import

Everything the app needs lives in a single script, and an analytics call runs as a side effect of loading a module. Say what the file boundary is missing, then split it so each module states what it offers and nothing runs by accident.

```js
// utils.js — every name is global
function formatMoney(cents) { /* ... */ }
function buildInvoice(order) { /* ... */ }
function sendReceipt(invoice) { /* ... */ }
```

```js
// entry.js
import "./analytics.js";   // bare import; the effect is invisible
trackPageView();           // and this runs at module top level as well
```

### Solution

```js
// format.js
export const CURRENCY = "GBP";
export function formatMoney(cents) { /* ... */ }
```

```js
// invoice.js
import { CURRENCY, formatMoney } from "./format.js";
export function buildInvoice(order) { /* ... */ }
```

```js
// entry.js — reads as a list of imports and one deliberate call
import { buildInvoice } from "./invoice.js";
import { trackPageView } from "./analytics.js";

trackPageView();
```

Named exports give each file a boundary: `invoice.js` states exactly what it needs from `format.js`, a typo in the name fails immediately, and the dependency graph is a thing a bundler can read. A module is evaluated once, in graph order, so a top-level call runs at a moment nobody chose and cannot be retried or cancelled — exporting a function and calling it from the entry point makes the timing the author's decision.

## Example 2 — A heavy editor in the initial bundle

A rich text editor is imported at the top of a module, so every visitor downloads it before the page is interactive, even though only a small number of users open it. Say what the bundler is forced to do, then load it when it is needed.

```js
import { Editor } from "./editor.js";   // ~240 kB, always in the entry bundle

export function openEditor() {
  return new Editor();
}
```

### Solution

```js
export async function openEditor() {
  const { Editor } = await import("./editor.js");   // its own chunk
  return new Editor();
}

// caller
button.addEventListener("click", async () => openEditor());
```

A static `import` is part of the graph the bundler must include in the entry bundle, so the editor's 240 kB is paid for by everyone who loads the page. `import()` returns a promise and is resolved at runtime, which lets the bundler emit a separate chunk that is requested on the interaction that needs it. The trade is a short wait the first time the feature is used, and an `async` function the caller must handle.
