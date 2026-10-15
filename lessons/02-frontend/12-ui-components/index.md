---
title: UI Components
type: skill
topic: 02-frontend
tier: medium
status: drafted
aliases: []
prereqs: ["02-frontend/03-html", "02-frontend/05-css"]
related: []
---

## What it is

A UI component is a self-contained piece of interface — a button, a form field, a card, a dialog — with a defined interface of its own: which inputs it accepts, what it renders, and how it behaves. Building one means deciding that interface, implementing it once, and using it everywhere the same job appears.

## Why it matters

Without components, every screen invents its own button. The buttons drift apart one property at a time until the product looks assembled from three different designs, and a change to the primary colour means editing forty files. A component library fixes the drift at the source: one definition, one place to change. It also makes the work faster after the first day, because the second and third screens are assembled rather than designed from scratch. The cost is real, though — a bad component API is worse than no component, because it spreads its confusion everywhere it is used.

## In this track

1. **Designing a component API** (`02-frontend/12-ui-components/01-designing-a-component-api`) — choosing the props, variants and defaults that make a component hard to misuse.
2. **Composing and theming components** (`02-frontend/12-ui-components/02-composing-and-theming-components`) — assembling bigger pieces from small ones and changing their look without editing them.

## Prerequisites

- **Hypertext Markup Language (HTML)** (`02-frontend/03-html`)
- **Cascading Style Sheets (CSS)** (`02-frontend/05-css`)

## Go deeper

- **Design Systems** (`03-design-ux/32-design-systems`) — a component library is the implementation half of a design system.
- **React** (`02-frontend/29-react`) — one concrete way to build and compose these components.
- **Design Tokens** (`03-design-ux/41-design-tokens`) — the variable layer that lets one component wear several themes.
