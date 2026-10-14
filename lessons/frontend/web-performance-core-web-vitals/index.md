---
title: Web Performance (Core Web Vitals)
type: skill
topic: frontend
tier: medium
status: drafted
aliases: ["Core Web Vitals"]
prereqs: ["frontend/javascript", "frontend/css"]
related: []
---

## What it is

Core Web Vitals are a small set of measured user-experience metrics: how long the main content takes to appear, how quickly the page responds to input, and how much the layout moves while it loads. They are measured on real devices from real users rather than in a laboratory.

## Why it matters

Performance is a product feature with a measurable cost attached. Slower pages lose visitors before the content appears, and the loss is largest on the cheapest devices and the worst connections — the users least able to tolerate it. Making the numbers concrete changes the conversation: an argument about whether the build is "fast enough" becomes an argument about whether the largest image arrives within two seconds on a mid-range phone. The metrics also overlap almost completely with accessibility and correctness, because a page that shows its content immediately, uses stable dimensions and responds to input is a page that was built carefully.

## In this track

1. **The Core Web Vitals** (`frontend/web-performance-core-web-vitals/01-the-core-web-vitals`) — what each metric measures, its threshold, and what typically causes it to be missed.
2. **Measuring and diagnosing** (`frontend/web-performance-core-web-vitals/02-measuring-and-diagnosing`) — laboratory and field tools, and how to find the specific cause rather than guessing.

## Prerequisites

- **Javascript** (`frontend/javascript`)
- **Cascading Style Sheets (CSS)** (`frontend/css`)

## Go deeper

- **Lighthouse** (`frontend/lighthouse`) — the tool that runs a laboratory audit and produces the report you will read.
- **Browser DevTools** (`frontend/browser-devtools`) — where a specific slow request or long task is found.
- **Responsive Images** (`frontend/responsive-images`) — the single most common cause of a poor largest-contentful-paint.
