---
title: Measuring and diagnosing
prereqs: ["02-frontend/26-web-performance-core-web-vitals/01-the-core-web-vitals"]
---

## What it is

Measuring is collecting numbers that describe real visits. Diagnosing is finding the specific request, script or element responsible for a bad one. They are different activities: a field dashboard tells you that a metric is failing on mid-range Android devices, and a performance recording tells you which of your scripts is doing the damage.

## Why it matters

Performance work without measurement turns into a list of superstitions: minify everything, defer every script, add a preload, hope. It also makes the work impossible to defend, because nobody can say whether it helped. The two-step discipline — establish the number, find the cause, change one thing, re-measure — is what makes the effort converge. It is also what stops a change that improves one metric from quietly ruining another, which is common enough that the re-measurement is not optional.

## Core ideas

### Field data and laboratory data answer different questions

Field data comes from real sessions, aggregated over time, and tells you whether users are having a bad experience — by device class, connection and page. Laboratory data comes from a controlled run and tells you what could be improved and roughly why. Use the field to decide what to work on; use the lab to find out why.

### Start from the user's device, not your own

Segment the field data by device and connection. A page that is comfortable on a fast laptop can be failing badly on the lower half of the device population, and that is the half that leaves. If you have no field data, throttle the CPU and the network in the laboratory to approximate it.

### A waterfall shows order; a flame chart shows cost

The network waterfall answers "what was blocking what and when", which is where render-blocking resources and late discoveries appear. The performance recording's main-thread track answers "what was expensive", which is where long tasks, layout thrash and excessive script appear. Between them they explain almost every metric failure.

```text
Waterfall:   html  →  css (render-blocking)  →  hero image (late)  →  app.js
Main thread: [ long task 420ms ] ... [ interaction ] [ 180ms to paint ]
```

Reading the recorder in the order the browser experienced it, rather than in the order the code is written, is the whole skill.

### Change one thing and re-measure

Two changes at once produce a result you cannot attribute, and one of them may have made things worse. Keep the measurement protocol identical — same device profile, same page, same route, ideally an average of several runs — so that the difference is the change and not the weather.

### Set a budget and enforce it in the pipeline

A performance budget is a number the build fails on: kilobytes of JavaScript, a maximum size for the largest image, a threshold for a laboratory metric. Without one, every feature adds a little and nobody notices until the page is slow enough to be a project of its own.

### Beware of measuring only the first visit

A repeat visit with everything cached is much faster than a cold start, and a real audience is a mixture of both. Measure a cold load with an empty cache, and then check the warm case separately rather than averaging them into a number that describes neither.

## Practice

### Find the single cause of one bad metric

Record a load of a page with the CPU and network throttled. Identify the one resource or task responsible for the worst metric, and write down the evidence for it.

Done when: you can point at a specific request or a specific function with a duration, rather than describing a general area.

### Make a change and prove it

Apply one fix for the cause you found, then repeat the identical measurement.

Done when: the metric has moved in the expected direction, you can state the size of the movement, and the other metrics are unchanged or better.

## Common mistakes

- **Optimising without a baseline** — there is no way to know whether the change helped; fix: record the number first, using the same conditions.
- **Changing several things at once** — the result cannot be attributed and a regression hides inside an improvement; fix: change one thing per measurement.
- **Trusting a single laboratory run** — variance between runs is large; fix: repeat and compare averages, or use the median of several runs.
- **Measuring only with a warm cache** — the cold start, which most users experience first, is not measured at all; fix: test with the cache disabled.
- **Ignoring the device segment** — the page is fine on the machines the team owns; fix: segment the field data by device and throttling.

## Go deeper

- **The Core Web Vitals** (`02-frontend/26-web-performance-core-web-vitals/01-the-core-web-vitals`) — what the numbers mean before you go looking for their causes.
- **Lighthouse** (`02-frontend/31-lighthouse`) — the laboratory audit that produces a ranked list of opportunities.
- **Browser DevTools** (`02-frontend/27-browser-devtools`) — the waterfall and the performance recording are both here.
