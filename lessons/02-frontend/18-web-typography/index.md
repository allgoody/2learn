---
title: Web Typography
type: skill
topic: 02-frontend
tier: medium
status: drafted
aliases: []
prereqs: ["02-frontend/05-css"]
related: []
---

## What it is

Web typography is the practice of choosing and setting type in a browser: which typefaces, at what sizes, with how much space between lines, letters and paragraphs, and how all of that changes with the viewport and the reader's settings. On the web it is inseparable from delivery, because a typeface is a file that has to be downloaded before the text can be displayed.

## Why it matters

Text is most of most interfaces, and its settings decide whether a page is read or abandoned. A line that is too long loses the reader's place on every return sweep; too little leading makes a paragraph feel dense; a font loaded late makes the text invisible and then jump. These are small numbers with large effects, and they are cheap to get right — a scale, a measure, a leading rule and one fallback stack cover most pages. What is expensive is doing it late, after a layout has been built on accidental values.

## In this track

1. **Type scales and rhythm** (`02-frontend/18-web-typography/01-type-scales-and-rhythm`) — choosing a size scale and the vertical spacing that holds it together.
2. **Web fonts and performance** (`02-frontend/18-web-typography/02-web-fonts-and-performance`) — loading typefaces without making the reader wait or see the text jump.

## Prerequisites

- **Cascading Style Sheets (CSS)** (`02-frontend/05-css`)

## Go deeper

- **Responsive Web Design** (`02-frontend/10-responsive-web-design`) — fluid sizing makes a type scale hold at every width.
- **Design Tokens** (`03-design-ux/41-design-tokens`) — where a type scale belongs once it is shared with design.
- **Web Performance (Core Web Vitals)** (`02-frontend/26-web-performance-core-web-vitals`) — font loading is one of the most common causes of a poor layout-shift score.
