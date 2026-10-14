---
title: Responsive Web Design
type: skill
topic: frontend
tier: medium
status: drafted
aliases: []
prereqs: ["frontend/css"]
related: []
---

## What it is

Responsive web design is the practice of building one page that reads well on any screen, from a phone held in one hand to a wide desktop monitor. It is not a separate technology: it is how you apply CSS layout, queries and fluid values so that the page adapts instead of the user pinching and scrolling.

## Why it matters

The web is read on screens of wildly different sizes, and a layout designed for exactly one of them is broken on all the others. Responsive design is also the cheaper option: a separate mobile site means two codebases, two sets of bugs and a choice of which one to neglect. Doing it well means the same content is reachable everywhere, which is good for readers, for search engines and for anyone using a screen reader or a keyboard.

## In this track

1. **Mobile-first layout** (`frontend/responsive-web-design/01-mobile-first-layout`) — starting from the narrow layout and adding features as room appears.
2. **Fluid type and spacing** (`frontend/responsive-web-design/02-fluid-type-and-spacing`) — letting sizes scale continuously instead of jumping between breakpoints.

## Prerequisites

- **Cascading Style Sheets (CSS)** (`frontend/css`)

## Go deeper

- **Accessibility (WCAG / a11y)** (`frontend/accessibility-wcag-a11y`) — a layout that only works at one zoom level fails the standard as well as the reader.
- **Responsive Images** (`frontend/responsive-images`) — the delivery half of the same problem.
- **Layout & Grid Systems** (`design-ux/layout-grid-systems`) — the design-side vocabulary for the grids you will be implementing.
