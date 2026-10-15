---
title: Motion Design
type: skill
topic: 02-frontend
tier: medium
status: drafted
aliases: []
prereqs: ["02-frontend/05-css"]
related: ["02-frontend/11-accessibility-wcag-a11y"]
---

## What it is

Motion design is the use of movement in an interface to explain what changed. A panel slides in from the edge it belongs to, a list item fades as it is removed, a button shows a brief state change on press. It is a communication tool, not decoration: every animation should be answering a question the user would otherwise have to ask.

## Why it matters

Interfaces change state constantly, and a change that happens instantly is easy to misread — a dialog that appears with no transition can look like a page reload, and a row that vanishes can look like a bug rather than a deletion. A short, well-placed transition removes that ambiguity. The cost of getting it wrong is high in both directions: motion that is slow makes a fast application feel sluggish, and motion that ignores the user's reduced-motion setting can make some people physically unwell. So the skill is deciding what deserves movement, how long it should take, and when to switch it off.

## In this track

1. **Purposeful motion** (`02-frontend/16-motion-design/01-purposeful-motion`) — choosing which changes to animate and how to keep the duration and easing honest.
2. **Reduced motion and performance** (`02-frontend/16-motion-design/02-reduced-motion-and-performance`) — honouring the operating system setting and animating without dropping frames.

## Prerequisites

- **Cascading Style Sheets (CSS)** (`02-frontend/05-css`)

## Go deeper

- **Accessibility (WCAG / a11y)** (`02-frontend/11-accessibility-wcag-a11y`) — motion that cannot be disabled fails the standard as well as the user.
- **Web Performance (Core Web Vitals)** (`02-frontend/26-web-performance-core-web-vitals`) — animation is one of the cheapest ways to lose a frame budget.
- **Prototyping** (`03-design-ux/40-prototyping`) — where motion is usually first tried, before it reaches code.
