## Example 1 — A listener per row, built from an HTML string

The markup below has a results list, and the script builds each row by assigning a string and attaching its own click handler. Say what breaks as the list grows, then rewrite the script around one delegated listener.

```html
<ul id="results"></ul>
<script src="app.js"></script>
```

```js
function render(rows) {
  const list = document.querySelector("#results");
  list.innerHTML = "";
  rows.forEach((row) => {
    list.innerHTML += `<li>${row.name} <button>Remove</button></li>`;
    list.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => removeRow(row.id));
    });
  });
}
```

### Solution

```js
const list = document.querySelector("#results");

list.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  removeRow(button.dataset.id);
});

function render(rows) {
  const items = rows.map((row) => {
    const item = document.createElement("li");
    item.textContent = row.name;

    const button = document.createElement("button");
    button.textContent = "Remove";
    button.dataset.id = row.id;
    item.append(button);

    return item;
  });
  list.replaceChildren(...items);
}
```

The original attaches a handler per row on every iteration and rebuilds the whole list each time by appending to `innerHTML`, so the work grows with the square of the list and user text is parsed as markup. Events bubble, so one listener on the container can handle every row — including rows added later — by checking `event.target`. Building real nodes with `textContent` sets the name as text rather than as HTML, and attaching the finished nodes once means the browser reflows a single time instead of once per row.

## Example 2 — A listener on the window that is never removed

A module registers a resize handler when a panel opens. Each time the panel is reopened, another handler is registered. Explain what is being retained, then tie the listener's lifetime to the panel.

```js
function openPanel() {
  window.addEventListener("resize", () => {
    document.querySelector("#panel").style.width = window.innerWidth / 3 + "px";
  });
}

// open and close the panel four times -> four handlers, all still running
```

### Solution

```js
let onResize = null;

function openPanel() {
  const panel = document.querySelector("#panel");
  onResize = () => {
    panel.style.width = window.innerWidth / 3 + "px";
  };
  window.addEventListener("resize", onResize);
}

function closePanel() {
  if (onResize) window.removeEventListener("resize", onResize);
  onResize = null;
}
```

A listener keeps its closure alive for as long as it is attached, and each handler here closes over a panel element that no longer exists once the panel is closed, so the retained set grows with every open. Keeping a named reference to the function is what makes `removeEventListener` possible: an anonymous arrow cannot be removed later. Removing an element takes its own listeners with it, but `window` and `document` outlive every panel, so anything attached to them has to be torn down explicitly.
