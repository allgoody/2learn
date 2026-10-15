## Example 1 — An icon-only button with no name

A dialog's close control is a button whose only content is an SVG icon. Nothing is announced for it. Say what a screen reader reports, then give the control a name without adding visible text.

```html
<button type="button" class="close">
  <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>
</button>
```

### Solution

```html
<button type="button" class="close" aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
</button>
```

Before the fix the control is announced as "button" with no name, so the user knows something is focusable and nothing about what it does. After the fix the announced role and name are "button, Close dialog": the element still supplies the role, and `aria-label` supplies the name because there is no text content to take it from. The icon is removed from the accessibility tree with `aria-hidden`, which is correct precisely because the button itself now carries the meaning — hiding a focusable element instead would leave the user tabbing onto silence. Visible text is always preferable, and an icon-only control is the case where the attribute is genuinely needed.

## Example 2 — A div pretending to be a button

A control that opens a menu is built from a div with a click handler and an added role. It looks and sounds right and still cannot be used from a keyboard. Explain what the role attribute does and does not provide, then use the element that already implements it.

```html
<!-- announced as a button, but not focusable and not operable -->
<div role="button" class="menu-trigger" onclick="toggleMenu()">Menu</div>
```

### Solution

```html
<button type="button" class="menu-trigger" aria-expanded="false">Menu</button>
```

Adding a role changes what is announced — "menu, button" — but does not add focus handling, Enter or Space activation, or form participation, so the control remains mouse-only. A native button arrives with the role, the announced name taken from its text, the keyboard behaviour and the pressed and expanded states, all implemented by the browser rather than reproduced by hand. The same styling applies unchanged, and `aria-expanded` then reports the state the visual chevron conveys. Reach for ARIA only where no element supplies the behaviour, because an attribute can describe a control and not make it work.
