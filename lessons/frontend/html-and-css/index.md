---
title: HTML and CSS
type: area
topic: frontend
tier: small
status: drafted
aliases: []
prereqs: []
related: []
---

## What it covers

HTML and CSS are the two languages every browser already understands, and together they make up the document layer of the web. HTML gives a document its structure and meaning; CSS decides how that structure looks and how it reflows as the space changes. They are usually named together because they are learned together and because neither is useful alone: markup with no stylesheet is a plain document, and a stylesheet with no markup to select has nothing to style.

## Why it matters

Everything above this layer — JavaScript, frameworks, build tools — compiles down to these two languages. That makes them the most durable front-end skills you can invest in: a framework's conventions change every few years, but a page whose markup is semantic and whose stylesheet is small and predictable keeps working. It is also where accessibility is won or lost, because the document tree is what assistive technology reads, and where performance starts, before any script is considered.

## Included skills

- **Hypertext Markup Language (HTML)** (`frontend/html`) — the structure and meaning of a document.
- **Cascading Style Sheets (CSS)** (`frontend/css`) — the cascade, the box model and the layout systems that style it.

## Where to start

Read HTML first: the elements you choose are the raw material for every style rule that follows, and their semantics cannot be added later by CSS. Then work through the CSS track in order, ending with the modern features that replace much of what older stylesheets were built from. After that, Responsive Web Design applies both to real screens.
