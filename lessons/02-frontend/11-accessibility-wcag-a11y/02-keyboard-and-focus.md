---
title: Keyboard and focus
prereqs: ["02-frontend/11-accessibility-wcag-a11y/01-semantics-and-aria"]
---

## What it is

Keyboard access is the guarantee that every action available to a mouse is also reachable with Tab, Enter, Space and the arrow keys, and that the user can always see where they are. Focus is the browser's marker for "the element that will receive the next keystroke"; it is the keyboard user's cursor and their sense of position.

## Why it matters

Many people use a keyboard because they cannot use a pointing device, and many others switch to one for speed. If a control cannot be reached by Tab, it does not exist for them, and there is no workaround. Focus is the harder half: an invisible focus ring is the same problem as no focus at all, because the user is typing into something they cannot identify. Both failures are invisible to the developer who tests with a mouse, which is exactly why they persist into production.

## Core ideas

### Tab order follows the DOM

The tab order is the document order, so if the visual order was created with CSS reordering — flex `order`, grid placement, absolute positioning — the two diverge. Keyboard users then walk the page in a sequence that looks random. Fix the markup rather than adding positive `tabindex` values, which break the natural order for everyone downstream.

### Never remove the focus ring without replacing it

`outline: none` is the single most common accessibility bug. If the default ring clashes with the design, replace it with a clearer one that does not depend on colour alone.

```css
:focus-visible {
  outline: 3px solid teal;
  outline-offset: 2px;
}
```

`focus-visible` shows the ring for keyboard interaction and usually suppresses it for a mouse click, which is the compromise most interfaces want.

### Keep focus where the user can see it

Anything that moves the user's attention — opening a menu, opening a dialog, deleting the row they were on — must move focus deliberately, and must put it back when the interaction ends. A dialog that opens without moving focus leaves the user tabbing through the page behind it, which is even more confusing than it sounds.

```js
dialog.showModal();               // moves focus into the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
  trigger.focus();                // return focus where it came from
});
```

### Trap focus only inside a modal, and provide an exit

While a modal dialog is open, Tab should cycle within it, and Escape should close it. Everywhere else, trapping focus is a bug: it strands the user with no way out. The native `dialog` element with `showModal()` handles both behaviours, which is a strong argument for using it.

### Offer a way past repeated navigation

A "Skip to main content" link, visible when focused, lets a keyboard user jump the header on every page. It is one element and it saves a few dozen tabs on every visit.

## Practice

### Tab through a page and write down every stop

Open a page you maintain and press Tab until you leave the page, noting each element and whether you can tell where focus is.

Done when: every stop is visible, no control is skipped, and the order matches the visual order — with any mismatch fixed in the markup rather than with `tabindex`.

### Build a dialog you can escape

Open a dialog from a button, move focus into it, cycle Tab within it, close it with Escape and with a close button.

Done when: focus is inside the dialog when it opens, cannot leave it while it is open, returns to the trigger when it closes, and Escape closes it from any position.

## Common mistakes

- **Removing the focus outline** — keyboard users lose all sense of position; fix: restyle `:focus-visible` instead of deleting it.
- **Using a positive `tabindex`** — the element jumps to the front of the order and everything after it shifts; fix: keep `tabindex` at `0` or leave it off and reorder the markup.
- **Opening a dialog without moving focus** — the dialog looks modal but the keyboard is still behind it; fix: move focus in on open and restore it on close.
- **Adding a click handler to a non-interactive element** — the action is unreachable without a mouse; fix: use a `button` or a link so it participates in the tab order.
- **Treating `:hover` as the only reveal** — menus and tooltips that need a pointer never open for a keyboard user; fix: trigger them from focus as well, and make the content dismissible with Escape.

## Go deeper

- **Semantics and ARIA** (`02-frontend/11-accessibility-wcag-a11y/01-semantics-and-aria`) — roles and names decide what a keyboard user hears when focus lands.
- **Browser DevTools** (`02-frontend/27-browser-devtools`) — running a keyboard pass with the accessibility inspector open shows exactly what is announced.
- **Usability Testing** (`03-design-ux/33-usability-testing`) — watching one keyboard-only user find the barriers in minutes.
