---
title: Browser Compatibility
type: skill
topic: 02-frontend
tier: small
status: drafted
aliases: []
prereqs: ["02-frontend/03-html", "02-frontend/05-css", "02-frontend/06-javascript"]
related: []
---

## What it is

Browser compatibility is the practice of deciding which browsers your product must work in, finding out whether the features you are using exist there, and handling the ones that do not. In practice that means feature detection rather than browser detection, a deliberate support matrix, and a fallback that degrades sensibly where a feature is missing.

## Why it matters

Every page is read by a range of engines that never ship the same features at the same time. A site that assumes the newest API works everywhere will break silently for a slice of its audience, and usually in the least visible place: an old corporate browser, a locked-down device, a user who never updates. The cost of ignoring it is not a crash but a quiet loss of users who cannot complete the task. The reason it earns its own lesson is that the naive fix — sniffing the user agent and branching on a browser name — is unreliable and ages badly, while the correct technique costs almost nothing when applied from the start.

## Core ideas

### Detect features, not browsers

Ask the engine what it can do. In CSS, `@supports`; in JavaScript, test for the property or object you intend to use. Feature detection answers the question that matters, and it keeps working when a browser name changes its meaning or a user spoofs it.

```js
if ("IntersectionObserver" in window) {
  observeVisibility(images);
} else {
  loadAllImages(images);
}
```

### Write the fallback first, then enhance

Build the version that works everywhere, then add the newer behaviour on top. This is progressive enhancement, and it means a missing feature costs polish rather than function. A stylesheet that starts with plain values and then adds a modern one achieves the same thing: the browser that understands neither still renders.

```css
.card { width: 100%; }

@supports (display: grid) {
  .card { width: auto; grid-column: span 2; }
}
```

### Keep a support matrix and derive it from data

Decide which browsers you support from your analytics, contractual requirements or a public compatibility dataset, write it down, and configure your tooling from it. The matrix is the input to every other decision — what to transpile, which polyfills to include, which syntax to allow.

### Transpilation rewrites syntax; polyfills add behaviour

A tool can convert newer syntax back to older equivalent syntax, but it cannot invent a missing API. A polyfill is a script that adds one, and it costs bytes to every visitor, so include them per feature rather than as one large bundle. Modern output with a small legacy bundle for the remainder is the usual compromise.

### Test in a second engine

An emulator is that engine's own viewport, not its engine. Real compatibility work includes running the page in at least one engine other than the one you develop in, and testing against the oldest version in the support matrix when the cost warrants it.

## Practice

### Wrap one modern feature in a guard

Choose a feature you use without thinking and add a feature-detected fallback path next to it. Force the fallback by temporarily disabling the test.

Done when: the fallback renders a usable page, and removing the guard makes the difference visible in the same browser.

### Publish a support matrix and check your CSS against it

Write down the browsers and versions you support, then inspect your stylesheet for any feature that is missing in the oldest of them. Note what happens where it is missing.

Done when: every unsupported feature has either a fallback, a `@supports` guard or a written decision to accept the gap.

## Common mistakes

- **Sniffing the user agent string** — the string is spoofed, frozen by vendors and meaningless for the question you are asking; fix: detect the feature directly.
- **Assuming a modern API exists** — the page throws before it has rendered and the fallback never runs; fix: guard with a feature test and provide the old path.
- **Polyfilling everything for everyone** — every visitor pays bytes for a case only a few have; fix: ship modern code and serve a legacy bundle only where needed.
- **Testing only in one engine** — layout and event differences are invisible until a user reports them; fix: run the page in a second engine before release.
- **Setting a support matrix once and never revisiting it** — the tooling drifts from reality and the build targets browsers nobody uses; fix: review the matrix on a schedule, from the analytics that justify it.

## Go deeper

- **Hypertext Markup Language (HTML)** (`02-frontend/03-html`) — the layer with the oldest and most reliable fallbacks of all.
- **Cascading Style Sheets (CSS)** (`02-frontend/05-css`) — `@supports` and the cascade's forgiving error handling are compatibility tools.
- **Javascript** (`02-frontend/06-javascript`) — the feature detection tests are written in the language itself.
