---
title: Lighthouse
type: skill
topic: frontend
tier: small
status: drafted
aliases: []
prereqs: ["frontend/browser-devtools"]
related: []
---

## What it is

Lighthouse is an automated audit that loads a page in a controlled environment, measures a set of metrics and checks a set of rules, and produces a report with scores and a list of opportunities. It is built into the browser's developer tools and can also be run from the command line, which is what makes it useful in a pipeline.

## Why it matters

It is the fastest way to get a structured, repeatable opinion about a page. Five categories — performance, accessibility, best practices, SEO and, in the browser, PWA — run in under a minute, and each failing item comes with the element it concerns and a description of the fix. Used well, it turns a vague sense that a page is slow or inaccessible into a numbered list. Used badly, it becomes a score to chase: the number is a laboratory summary under simulated conditions, and a page can score well and still be slow for most of its users.

## Core ideas

### It is a laboratory test on a simulated device

The audit runs once, with a throttled CPU and network, on an empty cache. That makes runs comparable to each other and comparable to a slow device — and it makes a single run noisy, so treat a score difference of a few points as noise and use the median of several runs.

### Read opportunities before the score

The score is a weighted summary; the useful part is the list beneath it. Each opportunity reports the estimated saving and the specific resources responsible: which image is oversized, which script blocked the first paint, which cache lifetime is too short. Fixing the largest item moves the score, and the explanation is the real output.

```text
Reduce unused JavaScript         est. 210 KiB
Properly size images             est. 480 KiB   ← largest, do this first
Eliminate render-blocking CSS    est. 120 ms
```

### The categories find different things

The accessibility checks catch concrete, mechanical failures: a missing accessible name, insufficient contrast, a form field with no label, a heading order that skips a level. They do not catch a confusing flow or an unusable dialog, but they do catch the cheap mistakes before a user does. The SEO checks catch missing metadata and unindexable pages.

### It cannot see your users

Nothing in the report comes from a real visit. A page whose field data is bad can score highly if the simulation happens to be kind, and a page with excellent field data can score poorly because of a single slow third-party script in the laboratory profile. The score is a smoke test; the field metrics are the truth.

### Run it in the pipeline against a budget

Running the audit on every build and failing on a threshold — a minimum accessibility score, a maximum transferred size — is what keeps the numbers from drifting back. A budget the build enforces is a decision; a report nobody opens is a document.

### Do not chase a perfect score

A hundred is not the goal, and reaching it often means removing things that help users. Set a floor that reflects your audience, fix the opportunities that matter, and stop when the field data is good.

## Practice

### Run one audit and act on the largest item

Audit a page, read the opportunities in order of estimated saving, and fix only the largest one. Re-run the audit.

Done when: the largest opportunity is gone from the report and the metric it affected has improved.

### Add an accessibility floor to the build

Configure the audit to run on one representative page and fail when the accessibility score drops below an agreed threshold.

Done when: the build fails on a page with an introduced accessibility defect and passes again once it is fixed.

## Common mistakes

- **Chasing the score** — effort goes into the last few points while a real problem remains; fix: work through the opportunities by estimated saving.
- **Treating one run as a measurement** — a few points of variation is noise and triggers pointless work; fix: repeat the audit and compare medians.
- **Ignoring the field metrics** — the laboratory result is not the user's experience; fix: check real-user data alongside the report.
- **Running the audit only locally before a release** — regressions arrive with the next commit; fix: run it in the pipeline against a budget.
- **Fixing an accessibility warning without understanding it** — the check passes and the interface is still unusable; fix: read what the rule is asking for, not just where it points.

## Go deeper

- **Browser DevTools** (`frontend/browser-devtools`) — the audit panel sits beside the tools that explain its findings.
- **Web Performance (Core Web Vitals)** (`frontend/web-performance-core-web-vitals`) — the metrics the performance score is built from.
- **SEO** (`frontend/seo`) — the audit's SEO category is a subset of the technical work.
