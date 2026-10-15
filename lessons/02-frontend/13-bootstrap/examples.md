## Example 1 — An override that wins with `!important`

A project recolours the primary button by beating the framework's own selector. Say what that does to the next upgrade, then use the surface the framework documents for this.

```css
/* our own file, loaded after the framework */
.btn-primary {
  background-color: #0f766e !important;
  border-color: #0f766e !important;
}
```

```html
<button class="btn btn-primary">Save</button>
```

### Solution

```css
.btn-brand {
  --bs-btn-bg: #0f766e;
  --bs-btn-border-color: #0f766e;
  --bs-btn-hover-bg: #115e59;
}
```

```html
<button class="btn btn-primary btn-brand">Save</button>
```

Out-specifying a framework means every future theme change has to win by more, and `!important` is where that path ends: the next upgrade silently changes a component you thought you had pinned down. The component's CSS custom properties are a supported, deliberately small surface for exactly this, so the vendor stylesheet stays untouched and the next major version is a changelog read rather than a merge by hand. Install the package locally and import its compiled stylesheet, so the version is pinned in the lockfile instead of being whatever a hosted copy serves today. Keep your own additions in a wrapper class and the split stays legible.

## Example 2 — A grid whose columns stack everywhere

A two-column layout renders stacked on every screen width, including the widest. The markup uses the framework's grid classes. Explain which part of the class name is missing, then fix the layout.

```html
<div class="row">
  <div class="col-12">Main</div>
  <div class="col-12">Aside</div>
</div>
```

### Solution

```html
<div class="row g-3">
  <div class="col-12 col-md-8">Main</div>
  <div class="col-12 col-md-4">Aside</div>
</div>
```

The grid is a twelve-column track, and the breakpoint infix is what makes a class apply only above a width: `col-12` alone says "always full width", which is why both columns stack at every size. Adding `col-md-8` and `col-md-4` keeps the single column on narrow screens and splits the track eight-four from the medium breakpoint up. The `g-3` on the row sets the gutter between the columns without margins on the children. It is the one part of the framework the entry calls durable, and it is also the part most often half-learned, because a missing infix looks like a styling bug rather than a class-name mistake.
