---
title: Tailwind CSS
type: skill
topic: frontend
tier: medium
status: drafted
aliases: []
prereqs: ["frontend/css"]
related: []
---

## What it is

Tailwind is a utility-first CSS framework: instead of writing rules in a stylesheet, you compose small single-purpose classes directly in the markup — `flex items-center gap-2 rounded px-3 py-1.5`. A build step scans the markup and emits only the classes that were used.

## Why it matters

Utility classes move a decision that used to be split across two files into one. There is no longer a name to invent for every wrapper, no orphaned rule when a component is deleted, and no question about which stylesheet a class is defined in, because the answer is the framework's generated file. The trade-off is equally real: the markup becomes dense, and reusing a pattern means either repeating the class list or extracting a component. Teams tend to love it or hate it, and the honest position is that it suits component-based codebases with a design token system and punishes those without one, because the class values become the design.

## In this track

1. **Utility-first thinking** (`frontend/tailwind-css/01-utility-first-thinking`) — why the class list is the component, and when to extract.
2. **Configuration and design tokens** (`frontend/tailwind-css/02-configuration-and-design-tokens`) — turning a palette, a scale and a spacing system into the theme the utilities are generated from.

## Prerequisites

- **Cascading Style Sheets (CSS)** (`frontend/css`)

## Go deeper

- **Design Tokens** (`design-ux/design-tokens`) — the naming layer a Tailwind theme is one implementation of.
- **Sass** (`frontend/sass`) — the older answer to stylesheet structure, worth comparing.
- **UI Components** (`frontend/ui-components`) — the extraction point that keeps a class list from being repeated everywhere.
