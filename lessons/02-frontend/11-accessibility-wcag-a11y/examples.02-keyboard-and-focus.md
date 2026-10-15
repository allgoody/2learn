## Example 1 — A focus ring the design removed

The default focus outline was deleted because it clashed with the design, and the same rule hides the focus ring the user depends on. Say what is lost, then restyle it instead of removing it.

```css
.menu-trigger:focus { outline: none; }

.menu { display: none; }
.menu-trigger:hover + .menu { display: block; }
```

### Solution

```css
.menu-trigger:focus-visible {
  outline: 3px solid teal;
  outline-offset: 2px;
}

.menu { display: none; }
.menu-trigger:hover + .menu,
.menu-trigger:focus-visible + .menu { display: block; }
```

The focus ring is the keyboard user's cursor, so removing it is the same as removing the pointer for everyone else: they are typing into something they cannot identify. `:focus-visible` is the compromise — it shows the ring when the element was reached by keyboard and generally suppresses it after a mouse click — and styling it with a thick outline plus an offset keeps it visible against a busy background. The second rule matters just as much: a menu that opens only on hover never opens for a keyboard user, so the same content has to be revealed from focus and dismissible with Escape.

## Example 2 — A dialog that opens without taking focus

A dialog is shown by changing its display, and the keyboard stays behind it. Say why the dialog only looks modal, then use the platform behaviour that makes it behave.

```js
function openDialog() {
  dialog.style.display = "block";   // nothing moves; Tab walks the page behind
}
```

### Solution

```js
function openDialog() {
  dialog.showModal();               // moves focus in, traps Tab, Escape closes
}

closeButton.addEventListener("click", () => {
  dialog.close();
  trigger.focus();                  // return focus where it came from
});
```

Opening a dialog without moving focus leaves the user tabbing through the page underneath — they can neither reach the dialog nor tell that it exists, and Escape does nothing. The native `showModal()` method moves focus into the dialog, cycles Tab within it, and closes it on Escape, which is exactly the behaviour that has to be hand-written for a non-modal imitation. Restoring focus to the trigger on close is the other half: deleting the row a user was on or closing a menu must put them back where they were, or the next Tab restarts from the top of the document.
