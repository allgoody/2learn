---
title: Network and performance
prereqs: ["02-frontend/27-browser-devtools/01-elements-and-styles"]
---

## What it is

The Network panel is a chronological log of every request the page made: what was requested, who requested it, when it started, how long it took, how large it was and what came back. The Performance panel records the browser's work as a timeline, separating network activity from main-thread tasks, rendering and layout. Together they answer "what took so long".

## Why it matters

Nearly all slow pages are slow for one of a handful of reasons, and both panels name the reason in seconds. A request that started late because something else blocked it, a resource that is far larger than it needs to be, a script that held the main thread for half a second while the user was trying to click: each is invisible in the source and obvious in the recording. Without them, performance work is guesswork, and guesswork is how teams end up deferring scripts that were never the problem.

## Core ideas

### Read the waterfall by start time, not by size

A request's position on the timeline is often more important than its size. A large image that starts in parallel with everything else costs less than a small script that loads first and blocks the rest. Look for requests that start late because a chain of dependencies delayed them, and for resources that blocked rendering while fetching.

```text
index.html   ████
app.css          ██          ← render-blocking, starts after the HTML
hero.avif           ████     ← discovered last, but it is the LCP element
app.js               ██████  ← parsed and executed after paint could have happened
```

### Check the size, the format and the cache

For each large response, ask whether a smaller format exists, whether the image was sized for the space it occupies, and whether a hashed filename would have let it be cached instead of re-downloaded. The panel shows both the transferred size and the cache status, which is where a surprising repeat download is found.

### The main thread is where interactions are lost

In the performance recording, the main-thread track shows tasks as blocks. A task longer than about 50 milliseconds is where Interaction to Next Paint goes to die, because input arriving during it cannot be handled until it finishes. Expanding the block shows the function names and their self-time, which is usually enough to identify the culprit.

### Distinguish layout, paint and script

A recording marks layout and paint events alongside script execution. Layout appearing repeatedly after each style write is the signature of reading a layout property inside a loop and forcing a recalculation. Script time dominating an interaction is the signature of doing too much synchronously in a handler.

### Throttle, and test the cold path

Recording on an unthrottled machine with a warm cache measures the machine, not the product. Use the CPU and network throttling presets, disable the cache for a load test, and remember that a first visit is what most new users experience.

### Re-record after each change

A recording is evidence for one state of the code. Keeping it open while editing produces a confusing picture of two builds; record again and compare the two timelines side by side.

## Practice

### Find the request that delays the first render

Record a cold load with throttling on, and identify every request that is render-blocking and the point at which the first paint occurred. Then find the largest response.

Done when: you can name the resource blocking the first paint and the resource that took the longest to arrive, and say which one matters more for the metric you care about.

### Find the slowest interaction

Record while performing the main interaction on a page — opening a menu, submitting a form — and expand the longest task that follows it.

Done when: you can name the function that consumed the most self-time and state whether it was script, layout or paint.

## Common mistakes

- **Recording without throttling** — everything looks fast and the problem is invisible; fix: use the CPU and network presets, and disable the cache for a cold load.
- **Sorting the request list by size only** — a small blocking script can cost more than a large image; fix: read the waterfall by start time and look for what blocked what.
- **Keeping an old recording while editing the code** — the timeline no longer describes the current build; fix: re-record after each change.
- **Treating every request as necessary** — third-party scripts and duplicate library copies hide in plain sight; fix: ask what each response is for.
- **Looking only at total time** — the user experiences the first paint and the first interaction, not the load event; fix: find the moment the content appeared and the moment input was answered.

## Go deeper

- **Elements and styles** (`02-frontend/27-browser-devtools/01-elements-and-styles`) — the other half of the same tool, for structure and styling rather than timing.
- **Web Performance (Core Web Vitals)** (`02-frontend/26-web-performance-core-web-vitals`) — the metrics these panels are used to explain.
- **Lighthouse** (`02-frontend/31-lighthouse`) — an automated summary when a full recording is more detail than you need.
