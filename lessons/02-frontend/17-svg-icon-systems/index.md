---
title: SVG & Icon Systems
type: skill
topic: 02-frontend
tier: medium
status: drafted
aliases: []
prereqs: ["02-frontend/03-html", "02-frontend/05-css"]
related: []
---

## What it is

SVG is an XML format for vector graphics that the browser renders as part of the page. Because it is markup rather than an image file, its shapes can be styled and animated with CSS and scripted with JavaScript. An icon system is the way a project organises a set of these icons — sprites, inline components, or an icon font — so they can be used consistently and delivered efficiently.

## Why it matters

Icons are small, numerous and easy to get wrong. Done well, they are sharp at every zoom level, scale with the font, inherit the current colour, and are invisible to a screen reader when they are decorative. Done badly, they are raster images that blur, a font that fails silently when the glyph is missing, or an unlabelled button that announces nothing. The decisions are few — how to deliver the icons, how to size and colour them, and how to label them — but each one propagates across every icon in the product, which is why it belongs in a system rather than in a folder of downloaded files.

## In this track

1. **SVG fundamentals** (`02-frontend/17-svg-icon-systems/01-svg-fundamentals`) — the coordinate system, the shapes, and why the same markup can be styled by CSS.
2. **Icon systems and accessibility** (`02-frontend/17-svg-icon-systems/02-icon-systems-and-accessibility`) — delivery approaches and the labelling rules that keep icons meaningful.

## Prerequisites

- **Hypertext Markup Language (HTML)** (`02-frontend/03-html`)
- **Cascading Style Sheets (CSS)** (`02-frontend/05-css`)

## Go deeper

- **Accessibility (WCAG / a11y)** (`02-frontend/11-accessibility-wcag-a11y`) — icon labelling follows directly from the accessible-name rules.
- **Motion Design** (`02-frontend/16-motion-design`) — icons are a common place for small, purposeful animation.
- **Browser DevTools** (`02-frontend/27-browser-devtools`) — inspecting a rendered SVG shows the DOM structure you can style.
