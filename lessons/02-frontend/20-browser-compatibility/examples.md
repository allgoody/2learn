## Example 1 — Branching on the browser's name

A page checks the user agent string to decide whether lazy loading is supported. It misbehaves in one engine and fails completely in another. Say what the check is actually answering, then ask the engine the question you care about.

```js
const isModern = /Chrome\/(\d+)/.test(navigator.userAgent);
if (isModern) {
  observeVisibility(images);
} else {
  loadAllImages(images);
}
```

### Solution

```js
if ("IntersectionObserver" in window) {
  observeVisibility(images);
} else {
  loadAllImages(images);
}
```

A user agent string is spoofed, frozen by vendors for compatibility and rewritten by privacy tools, so it answers a question about identity rather than about capability — and it ages the moment a browser changes its meaning. Feature detection tests the property you are about to use, which is the question that matters, and it keeps working when a browser is renamed or a user overrides the string. Keeping a fallback path is half the technique: the guarded branch is an enhancement, so a browser without the API still loads every image rather than showing none. Guard from the start rather than adding the test after the first report.

## Example 2 — A modern declaration with nothing behind it

A layout uses a modern value with no fallback above it, and an older engine drops the declaration and renders an unstyled box. Say how the browser handles a value it cannot parse, then write the fallback first and enhance on top of it.

```css
.card { grid-column: span 2; }
```

### Solution

```css
.card { width: 100%; }

@supports (display: grid) {
  .card { width: auto; grid-column: span 2; }
}
```

A browser that cannot parse a declaration discards that declaration and nothing else — it does not halt the stylesheet — which is why a modern value simply has no effect rather than breaking the page. That forgiveness is what makes progressive enhancement cheap: put the value that works everywhere first, then let `@supports` add the modern behaviour, so a browser that understands neither still renders something usable. The alternative of polyfilling everything for every visitor makes each reader pay bytes for a case only a few have, and the usual compromise is modern output with a small legacy bundle served only where the support matrix requires it.
