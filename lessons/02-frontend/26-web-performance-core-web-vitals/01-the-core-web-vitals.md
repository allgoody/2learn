---
title: The Core Web Vitals
prereqs: ["02-frontend/06-javascript"]
---

## What it is

Three metrics, each measuring a different part of the loading and interaction experience. Largest Contentful Paint is how long the biggest visible element takes to appear. Interaction to Next Paint is how long the interface takes to respond to a tap or key press. Cumulative Layout Shift is how much content moves around while the page loads. Each has a published threshold separating a good experience from a poor one.

## Why it matters

Together they answer the three questions a user actually asks: is there anything here yet, did it respond when I touched it, and why did it move. Naming them individually matters because the fixes are different: a slow image is a Largest Contentful Paint problem, a heavy event handler is an Interaction to Next Paint problem, and an image without dimensions is a Layout Shift problem. Teams that talk about "performance" in general tend to optimise whatever is easiest to measure rather than whatever the user is suffering from.

## Core ideas

### Largest Contentful Paint: when the main content appears

Largest Contentful Paint records the render time of the largest image or block of text in the viewport. A good target is under 2.5 seconds. The usual causes are a slow server response, a render-blocking stylesheet or script, and an oversized hero image.

```html
<!-- the hero image should be discovered early, not lazy-loaded -->
<link rel="preload" as="image" href="/hero.avif" fetchpriority="high" />
```

Anything blocking the first paint delays it, so the critical stylesheet should be small and the scripts that are not needed for the first render should be deferred.

### Interaction to Next Paint: how fast the interface answers

Interaction to Next Paint measures the delay between a user interaction and the next frame the browser paints, across the whole visit. Under 200 milliseconds is good. It is dominated by long tasks on the main thread: a large script that runs for 300 milliseconds will delay every interaction that arrives while it is running, even the ones that have nothing to do with it.

```js
// Break long work so the browser can paint between chunks
async function process(items) {
  for (const item of items) {
    await new Promise((r) => setTimeout(r, 0));
    render(item);
  }
}
```

### Cumulative Layout Shift: how much moves

Cumulative Layout Shift scores the unexpected movement of visible elements. Below 0.1 is good, and the score is dominated by a few causes: images and embeds without declared dimensions, fonts that swap to a different size, and content injected above what the user is already reading. Reserving space fixes most of it.

```html
<img src="chart.png" width="800" height="600" alt="Revenue by quarter" />
```

Shifts caused by a user's own action, such as expanding an accordion they clicked, do not count.

### Good is a threshold, not a gradient

The published thresholds exist so that a decision can be made: this page is good, or it is not. The useful question is not "how fast is it" but "which of the three is failing on the devices our users actually have".

### The metrics are observed, not simulated

The numbers that count are collected from real sessions on real devices, because that is the population that experiences the page. A fast result on a developer's machine is a hypothesis; the field data is the answer.

## Practice

### Measure the three metrics on one page

Load a page with field data available, or simulate a slow connection, and record which of the three fails and by how much.

Done when: you can name the metric that is furthest from its threshold and the specific element or handler responsible.

### Fix one metric by its cause

Take the failing metric from the previous exercise and apply the single change that addresses its cause — dimensions on the largest image, a smaller hero file, or a long task broken up.

Done when: the metric improves on a repeat measurement and no other metric has got worse.

## Common mistakes

- **Optimising the total load time and ignoring the three metrics** — the page finishes loading quickly while the content appears late; fix: measure Largest Contentful Paint, not the load event.
- **Lazy-loading the largest image above the fold** — the element the metric waits for is deliberately deferred; fix: load the hero eagerly, with high priority.
- **Omitting image dimensions** — the page reflows as each image arrives and the shift score suffers; fix: always declare width and height.
- **Assuming a fast development machine is representative** — the metrics are dominated by device and network conditions; fix: measure on a throttled profile and on real field data.
- **Fixing one metric and breaking another** — deferring a stylesheet can move the content later; fix: re-measure all three after every change.

## Go deeper

- **Javascript** (`02-frontend/06-javascript`) — long tasks and the event loop are what Interaction to Next Paint is measuring.
- **Measuring and diagnosing** (`02-frontend/26-web-performance-core-web-vitals/02-measuring-and-diagnosing`) — how to find the cause rather than the symptom.
- **Responsive Images** (`02-frontend/07-responsive-images`) — the most common single fix for a large Largest Contentful Paint.
