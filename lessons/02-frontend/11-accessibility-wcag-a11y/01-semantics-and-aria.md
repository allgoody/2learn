---
title: Semantics and ARIA
prereqs: ["02-frontend/03-html"]
---

## What it is

Assistive technology describes every element it meets in terms of three things: its role, its accessible name and its state. Semantics are how the browser knows those values — a `button` has the role "button" and is focusable, an `input` with a `label` has a name, a checkbox reports checked or not. ARIA is a set of attributes that can override or supplement what the markup already says, for the cases where no native element fits.

## Why it matters

A control without a name is announced as "button", and the user cannot tell what it does. A state that is only conveyed by colour — a red border, a greyed-out row — does not exist for anyone listening rather than looking. These are not edge cases: they are the interface, described to a different sense. The good news is that the fix is mostly restraint. The correct ARIA is usually no ARIA, because the native element already carries the right role, name and keyboard behaviour, and a hand-written substitute has to reproduce all three correctly.

## Core ideas

### Use the native element first

`<button>`, `<a href>`, `<input type="checkbox">`, `<select>` and `<details>` arrive with roles, keyboard behaviour, focus handling and form participation already implemented. Reproducing any of those with a `div` and ARIA is possible and almost always worse: the ARIA attributes describe the control but do not make it work.

```html
<!-- announces "Subscribe, button" and works from the keyboard -->
<button type="button">Subscribe</button>
```

### Every control needs an accessible name

The name comes from the element's content, an associated `label`, or `aria-label` / `aria-labelledby` when neither is possible. Icons are the common failure: a button whose only child is an SVG icon has no text, so the icon must be hidden from the tree and the button given a name.

```html
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">…</svg>
</button>
```

### ARIA is for the gaps, not for decoration

`aria-hidden="true"` removes an element from the accessibility tree — useful for a decorative icon, destructive on a focusable control. `role` replaces the element's role and should be reserved for widgets that genuinely have no HTML equivalent, such as a tab list or a live region.

### Announce changes that happen without navigation

When a region updates without a page load — a search filter, a save confirmation — a sighted user sees it and everyone else does not. `aria-live="polite"` on the region makes the new content announced when the user is idle; use it sparingly and keep the announcements short.

```html
<p role="status" aria-live="polite">{message}</p>
```

### Do not convey meaning by colour alone

Required fields, errors, selected rows and status all need a second cue: text, an icon, an underline, a border pattern. This is also the fix for colour-blind users and for anyone reading on a washed-out screen in daylight.

## Practice

### Name every control on a page

Open a page you maintain, list every interactive element, and write down the accessible name a screen reader would announce for each. Use the browser's accessibility tree to check your answers.

Done when: no control is announced without a name, and every icon-only button has either a visible label or an `aria-label` naming its action.

### Replace a clickable `div` with the right element

Find a `div` with an `onClick` handler. Decide whether it navigates or acts — then use an `a` or a `button` and keep your styling.

Done when: the control is reached by Tab, activated by Enter and Space as appropriate, and the accessibility tree reports the matching role.

## Common mistakes

- **Putting `aria-hidden="true"` on a focusable element** — it stays in the tab order but has no name, so keyboard users land on silence; fix: hide only decorative content and give the control its own name.
- **Reproducing a button with `div` and `role="button"`** — Enter and Space do not activate it and the form is never submitted; fix: use a real `button` and style it.
- **Using a placeholder as the only label** — the name vanishes on input and is not reliably announced; fix: add a `label` linked by `for` and `id`.
- **Announcing nothing when content changes** — a filter that updates silently looks broken to a screen-reader user; fix: mark the region `aria-live="polite"` and keep the message short.
- **Conveying errors with a red border only** — the error is invisible to anyone who cannot see the colour; fix: add a text message tied to the field, and an icon or prefix as a second cue.

## Go deeper

- **Hypertext Markup Language (HTML)** (`02-frontend/03-html`) — the semantics this lesson builds on; the element you choose is the role the user hears.
- **Keyboard and focus** (`02-frontend/11-accessibility-wcag-a11y/02-keyboard-and-focus`) — the other half of the same guarantee.
- **Figma (Design Software)** (`03-design-ux/12-figma`) — where colour and contrast decisions are often made long before the markup exists.
