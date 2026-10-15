---
title: Bootstrap (Front-End Framework)
type: skill
topic: 02-frontend
tier: small
status: drafted
aliases: []
prereqs: ["02-frontend/05-css"]
related: []
---

## What it is

Bootstrap is a CSS framework with a prebuilt component library and a grid system. You add a stylesheet and a script, adopt its class conventions — `btn btn-primary`, `row`, `col-md-6` — and get a working, consistent interface quickly. It was the first framework most teams used, and it is still the one that ships with a large amount of server-rendered and internal tooling.

## Why it matters

Bootstrap's strengths and its cost are the same property: it is recognisable. That recognisability makes it the fastest way to get a credible interface onto a screen — a prototype, an admin panel, a tool that three people will use for a month. It also means the result looks like Bootstrap, in a way users now read as dated, and undoing that means overriding the very classes that made it fast. Knowing when that trade is worth taking is more useful than knowing the class names, because the class names are in the documentation.

## Core ideas

### The grid is the part that survives

Twelve columns with responsive breakpoint classes solve a real problem — a layout that reflows without hand-written queries — and they remain readable. Everything else in the framework is a set of component opinions you may or may not share.

```html
<div class="row g-3">
  <div class="col-12 col-md-8">Main</div>
  <div class="col-12 col-md-4">Aside</div>
</div>
```

### Components arrive complete and therefore generic

A modal, a dropdown and a tooltip come with the markup, the styles and the JavaScript, including focus handling and keyboard support that takes real effort to write correctly. You get that for free, and you also get the framework's assumptions about spacing, radius and type size baked into every one.

### Overriding is the normal workflow, and it fights back

Customising a Bootstrap component means out-specifying the framework's own selectors. The escape routes are its CSS custom properties, a build with only the modules you use, and a thin wrapper of your own classes — in that order of preference. Editing the framework's source or scattering `!important` is the path that makes the next upgrade impossible.

```css
.btn-brand {
  --bs-btn-bg: var(--brand-600);
  --bs-btn-border-color: var(--brand-600);
}
```

### It is still a reasonable answer

For internal tools, time-boxed prototypes, server-rendered applications where a build pipeline is unwelcome, and projects whose budget will not stretch to a design system, Bootstrap remains a defensible choice. What it is not is a starting point for a product whose visual identity is part of its value: you will spend the effort you saved on undoing it.

### Budget for the upgrade

A pinned major version is a liability with a long fuse. Reading the changelog and upgrading on a schedule costs a day; upgrading two majors after two years costs a week and a redesign.

## Practice

### Build one screen with and without it

Create the same page twice: once from Bootstrap's components, once from hand-written CSS. Time both and compare the result.

Done when: you can state how long the framework saved, how much of the result you would have to override for the product's identity, and which version you would ship.

### Restyle one component without `!important`

Take a Bootstrap component and restyle it using its documented custom properties and a wrapper class.

Done when: no `!important` was added, the framework's file is unmodified, and the component still works when the framework's JavaScript updates its state.

## Common mistakes

- **Overriding with `!important`** — the next theme change breaks in an unrelated place; fix: use the framework's custom properties or a build that includes only the modules you need.
- **Using every component because it is there** — the page becomes a catalogue of defaults rather than a design; fix: choose the few components that earn their weight.
- **Editing the framework's source** — upgrades become merges by hand; fix: keep vendor files untouched and layer your own.
- **Ignoring the JavaScript bundle** — a small page ships a tooltip and dropdown runtime it never uses; fix: import only the modules you use, or none.
- **Forgetting the grid's breakpoint class names** — columns stack on every screen and the layout looks broken; fix: read the grid documentation once, properly.

## Go deeper

- **Cascading Style Sheets (CSS)** (`02-frontend/05-css`) — the mechanism every override fight is really about.
- **Tailwind CSS** (`02-frontend/14-tailwind-css`) — the modern answer to the same speed-versus-identity trade-off.
- **Web Performance (Core Web Vitals)** (`02-frontend/26-web-performance-core-web-vitals`) — what shipping a whole framework's CSS and JavaScript costs.
