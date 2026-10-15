## Example 1 — A drawer that takes 400ms in both directions

A side drawer uses the same long transition to open and to close, so closing it feels like the interface is stalling. Say which half of the motion is wrong, then time the two directions separately.

```css
.drawer {
  transform: translateX(100%);
  transition: transform 400ms ease-in-out;
}

.drawer.is-open { transform: translateX(0); }
```

### Solution

```css
.drawer {
  transform: translateX(100%);
  transition: transform 160ms ease-out;   /* enter: a moment to arrive */
}

.drawer.is-closing {
  transition-duration: 110ms;             /* exit: roughly two thirds */
}

.drawer.is-open { transform: translateX(0); }
```

The duration is the whole effect, and perceived speed is asymmetric: an element can take a moment to arrive without feeling slow, while anything that lingers on the way out blocks the next action, so the exit wants to be the shorter half. A drawer that belongs to the right edge entering from the right is what makes the motion information rather than decoration — the direction states where the panel came from. Between 100ms and 250ms covers nearly everything in an interface, with the top of the range reserved for large movements such as a full-screen overlay and the bottom for small state changes. Testing three durations against each other is how the cutoff gets decided rather than guessed.

## Example 2 — A row that vanishes as if it were a bug

Removing an item deletes it from the interface instantly, and the rows below jump up. Say what the user is left unsure about, then make the removal explain itself.

```js
function removeRow(id) {
  rows = rows.filter((row) => row.id !== id);
  render(rows);              // the row is simply gone; the list jumps
}
```

### Solution

```css
.row.is-removing {
  overflow: hidden;
  transition: height 140ms ease-out, opacity 140ms ease-out;
  height: 0;
  opacity: 0;
}
```

```js
function removeRow(id) {
  const el = document.querySelector(`[data-row="${id}"]`);
  el.classList.add("is-removing");
  el.addEventListener("transitionend", () => {
    rows = rows.filter((row) => row.id !== id);
    render(rows);
  }, { once: true });
}
```

An item that disappears with no motion reads as a rendering fault: the user cannot tell whether it was removed, failed, or never existed, and the surrounding rows move without explanation. Collapsing it in place answers both — the space it occupied closes, so the list's new shape is legible, and the fade says the change was deliberate. Removing the node when the animation ends keeps the data and the interface in step, and the same pattern covers the quick double-click: the handler adds a class, so a row already leaving is not removed twice. Motion here carries a message that text would otherwise have to.
