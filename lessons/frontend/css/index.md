---
title: Cascading Style Sheets (CSS)
type: skill
topic: frontend
tier: large
status: drafted
aliases: ["CSS"]
prereqs: ["frontend/html"]
related: []
---

## What it is

CSS is the language that decides how the document tree looks. You write rules that select elements and set their properties, and the browser resolves those rules into a final value for every element on the page. It is a declarative style language, not a scripting one: you describe the result you want, and the browser works out which of your rules wins.

## Why it matters

The same stylesheet produces wildly different results in the hands of two people, and the difference is almost never talent. It is whether they understand the cascade — which rule wins and why — and the box model — where widths and gaps actually come from. Teams that do not understand those two things write `!important` to escape their own specificity, add wrapper elements to fix alignment they do not understand, and rewrite the stylesheet every two years. Teams that do understand them keep a small file that survives redesigns, because the rules say what they mean and lose to each other for reasons you can trace.

## In this track

1. **The cascade and the box model** (`frontend/css/01-cascade-and-box-model`) — how a winning value is chosen, and where each pixel of an element's size comes from.
2. **Flexbox and grid** (`frontend/css/02-flexbox-and-grid`) — the two layout systems, when each is the right shape for the problem.
3. **Media and container queries** (`frontend/css/03-media-and-container-queries`) — adapting a layout to the space it is actually in.
4. **Modern CSS features** (`frontend/css/04-modern-css`) — custom properties, nesting, `:has()` and the functions that replaced whole toolchains.

## Prerequisites

- **Hypertext Markup Language (HTML)** (`frontend/html`)

## Go deeper

- **Responsive Web Design** (`frontend/responsive-web-design`) — the discipline that grew around CSS layout, once you know the mechanics.
- **Tailwind CSS** (`frontend/tailwind-css`) — a utility-first approach that trades stylesheet design for class names you can read.
