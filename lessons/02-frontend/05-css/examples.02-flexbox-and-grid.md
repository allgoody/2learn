## Example 1 — Flex containers nested to fake two dimensions

A page shell needs a fixed sidebar and a fluid main column. It is built from flex containers, and a third level was needed to place a toolbar beside a table. Say why the nesting keeps growing, then replace the outer structure.

```html
<div class="layout">
  <aside class="side">Filters</aside>
  <main class="content">
    <div class="toolbar">Toolbar</div>
    <div class="table">Rows</div>
  </main>
</div>
```

```css
.layout { display: flex; }
.side { width: 16rem; }
.content { display: flex; flex-direction: column; }
```

### Solution

```css
.layout { display: grid; grid-template-columns: 16rem 1fr; gap: 1.5rem; }
.content { display: flex; flex-direction: column; gap: 1rem; }
```

Flexbox distributes items along one axis, so a two-dimensional structure built from it needs a container per axis and the nesting grows with every new region. Grid defines the tracks first and places items into them, which is one declaration for the whole shell. The computed result on a 1200px viewport: the sidebar is exactly 256px, the gap is 24px, and the content column takes the remaining 920px. Nested flex containers inside a grid cell are normal and expected — the smell is depth in the outer structure, where a single grid would have done the job.

## Example 2 — A flex item that will not shrink

A label and a copy button sit in a row. When the label holds a long unbroken token the row overflows and the button is pushed out of view. Explain the default that causes it, then allow the item to shrink.

```html
<div class="row">
  <span class="label">averylongunbrokentokenthatcannotwrap</span>
  <button>Copy</button>
</div>
```

```css
.row { display: flex; gap: 0.5rem; }
.label { flex: 1; }
/* the row is wider than its container and the button disappears */
```

### Solution

```css
.row { display: flex; gap: 0.5rem; }
.label { flex: 1; min-width: 0; overflow-wrap: anywhere; }
```

A flex item's automatic minimum size is its min-content width, so `flex: 1` cannot shrink the label below the width of that single unbroken token — the item grows past its share and takes the row with it. `min-width: 0` removes the floor, and `overflow-wrap: anywhere` gives the browser a place to break. The computed result in a 300px row: the button stays at roughly 72px, the gap is 8px, the label is 220px, and the token breaks across two lines instead of overflowing. Margins and negative offsets cannot fix this, because the constraint is a sizing rule rather than an alignment one.
