---
title: Hypertext Markup Language (HTML)
type: skill
topic: frontend
tier: small
status: drafted
aliases: ["HTML"]
prereqs: []
related: []
---

## What it is

HTML is the markup language that gives a web page its structure and its meaning. You write elements — headings, paragraphs, lists, links, forms, images — and the browser turns them into a document tree, then into pixels. Nothing about the language is presentational: an `<h1>` says "this is the top-level heading", not "make it big".

## Why it matters

Every other front-end technology sits on top of this tree. CSS selects from it, JavaScript queries it, screen readers announce it and search engines index it — all of them read the same structure, and all of them are misled by the same mistakes. A page built from a pile of `<div>` elements with click handlers on them looks fine and is unusable by keyboard, invisible to assistive technology and fragile to every style change. Getting the markup right is the cheapest accessibility work you will ever do, and it costs nothing but attention.

## Core ideas

### Elements, attributes and the document tree

An element has a tag, optional attributes and children. Nesting is strict, and the resulting tree is what every later tool walks. Attributes carry the machine-readable details — where a link goes, what an image means when it cannot load, which form field a label belongs to.

```html
<article>
  <h2>Quarterly report</h2>
  <p>Published <time datetime="2026-02-14">14 February 2026</time>.</p>
  <img src="chart.png" alt="Revenue rising 12% quarter on quarter" />
</article>
```

### Semantics carry meaning past appearance

Use the element that describes the content: `button` for something that acts, `a` for something that navigates, `nav`, `main`, `article` and `footer` for regions. A `div` with a click handler is not a button — it is unreachable by keyboard, it announces nothing, and it does not submit forms. Styling can make any element look like any other; only the markup can make it behave and be understood.

### Forms do the hard work for you

Native controls bring validation, keyboard behaviour, autofill and mobile keyboards for free. `type="email"` gets an email keyboard and a built-in check; `required` blocks submission; a `label` with a matching `for` makes the whole target clickable and gives the field an accessible name.

### Structure is also navigation

Headings in order are the table of contents a screen reader user jumps by, and landmarks (`header`, `nav`, `main`) are the skip points. A page whose heading levels are chosen for font size has no outline at all.

## Practice

### Mark up a page with no CSS at all

Build a simple profile page — a heading, a short biography, a list of links, one image and a contact form — using only semantic elements. Do not write a stylesheet.

Done when: the page is readable in a browser with CSS disabled, every form field has a visible label, and tabbing reaches every control in a sensible order.

### Audit the outline of a real page

Open any page you maintain and list its headings in the order they appear, using the browser's accessibility inspector. Compare the tree with what you expected.

Done when: every level jumps by at most one, and you have either fixed a skipped level or written down why the content genuinely nests that way.

## Common mistakes

- **Choosing elements by how they look** — the page has no structure and every style change is a rewrite; fix: pick the element that describes the content and move appearance into CSS.
- **Using `div` or `span` for interactive controls** — keyboard users cannot reach it and assistive technology does not announce it; fix: use `button` or `a` and style it.
- **A form field with a placeholder instead of a label** — the name disappears as soon as the user types, and some screen readers skip placeholders; fix: add a `label` linked with `for` and `id`.
- **Skipping heading levels to get a smaller font** — the document outline acquires phantom sections; fix: keep the outline logical and restyle the heading with CSS.
- **Writing `alt=""` on a meaningful image** — the image is announced as decorative and its content is lost; fix: describe the information the image carries, or use an empty `alt` only when it truly adds nothing.

## Go deeper

- **Cascading Style Sheets (CSS)** (`frontend/css`) — the styling layer that selects from the tree you have just built.
- **Accessibility (WCAG / a11y)** (`frontend/accessibility-wcag-a11y`) — auditing the semantics you write here against a real standard.
- **Responsive Images** (`frontend/responsive-images`) — the one element with more delivery options than any other.
