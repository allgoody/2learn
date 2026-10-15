---
title: Figma (Design Software)
type: skill
topic: 03-design-ux
tier: small
status: drafted
aliases: ["Figma"]
prereqs: []
related: []
---

## What it is

Figma is a collaborative design tool where a whole team works in the same file in a browser. Screens, shared components and their variants, and the comments about them live in one place, which makes it the default place to draw an interface and to review one.

## Why it matters

It replaced a workflow of exported files, version numbers and screenshots pasted into review threads. Because everything is in one shared file, a change to a component appears in every screen that uses it, and a reviewer can comment on the exact spot rather than describing it. For a corpus like this one the relevant point is narrower: it is where interface decisions get recorded in a form a developer can inspect, which makes it the natural upstream of handoff.

## Core ideas

### Reach for it when the design has structure to share

It is the right tool once you have components and states to keep consistent. For early exploration, paper is faster; reach for Figma when the third variant of the same button appears.

### Components and variants are the point

A component with named variants is what keeps a screen consistent with the next one. Draw the component once, define its states, then place instances.

```text
Button / Primary
  Variant: default, hover, pressed, disabled
  Property: label (text), leading icon (boolean)
Rule: changing the component updates every instance, so review happens once
```

### Use it as the review surface, not only the drawing surface

Share a link to the exact frame, leave comments on the element, resolve them in the file. The thread of decisions then lives next to the work rather than in a chat tool.

### Keep the file structured like the product

Name pages after the product's areas and keep a separate page for components and one for archive. A file with thirty unlabelled pages is unsearchable within a month.

### Handoff starts in the file

Reference the design-system tokens by name, mark the states and keep the components in the shared library, so the spec is a pointer rather than a re-drawing.

## Practice

### Build one component with states

Create a button component with four named variants and a disabled state, then place it in a page and change the master to check that the instance follows.

Done when: editing the component updates the instance, and a reviewer can see all states on one page.

### Run one review in the file

Share the frame with a colleague, ask for comments on the exact elements, and resolve each thread.

Done when: every comment is resolved or turned into an issue, and the file contains the record.

## Common mistakes

- **Drawing everything as loose shapes** — nothing can be updated once and the screens drift apart; fix: define components and use instances.
- **One page per exploration** — the file becomes unsearchable; fix: structure pages by product area with a components page.
- **Reviewing in chat** — the feedback loses its anchor to the element; fix: comment on the frame itself.
- **Redrawing the system in each file** — the product diverges file by file; fix: consume the shared library instead.
- **Using it for early exploration** — time is spent on polish before the structure is decided; fix: sketch first and move here once variants appear.

## Go deeper

- **UI Components** (`02-frontend/12-ui-components`) — the component API thinking that makes a Figma component usable.
- **Design Systems** (`03-design-ux/32-design-systems`) — where the shared library lives and who governs it.
- **Design Handoff & Specs** (`03-design-ux/42-design-handoff-specs`) — turning the file into something buildable.
- **Adobe XD** (`03-design-ux/35-adobe-xd`) — the alternative to reach for in an Adobe-based organisation.
