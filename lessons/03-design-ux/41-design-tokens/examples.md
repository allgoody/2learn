## Example 1 — A two-layer set from one live screen

A settings screen uses four hand-picked colours, three spacing values and two radii, and a dark theme is planned. Build the token set for it, with the raw primitives underneath and the semantic names on top.

```text
Hand-picked values on the screen
  save button fill     #1F6FEB
  page background      #F5F6F7
  card background      #FFFFFF
  error text           #B3261E
  spacing              8px, 16px, 24px
  radii                6px, 999px
```

### Solution

```json
{
  "primitive": {
    "colour.blue.600": "#1F6FEB",
    "colour.grey.100": "#F5F6F7",
    "colour.white": "#FFFFFF",
    "colour.red.700": "#B3261E",
    "space.2": "8px",
    "space.4": "16px",
    "space.6": "24px",
    "radius.control": "6px",
    "radius.pill": "999px"
  },
  "semantic": {
    "colour.action.default": "colour.blue.600",
    "colour.surface.base": "colour.grey.100",
    "colour.surface.raised": "colour.white",
    "colour.text.danger": "colour.red.700",
    "space.gap.control": "space.2",
    "space.block": "space.6"
  }
}
```

Semantics point at primitives and never the other way, so the dark theme can swap what the semantics resolve to without touching a component. Naming by role also means `colour.action.default` still reads correctly after a rebrand, where `blue600` would not. The usual mistake is a component reaching for `colour.blue.600` directly, which quietly bypasses the theme.

## Example 2 — The tokens reaching the browser

The set above has to reach the codebase, not stay in the design file. Publish it as CSS custom properties, consume it in the screen's one component, and swap the raised surface for a dark theme without editing that component.

```text
Goal
  one settings save button consuming the set
  the dark theme changes only the semantic layer
  no component names a primitive colour or a raw value
```

### Solution

```css
:root {
  /* primitives */
  --colour-grey-100: #F5F6F7;
  --colour-grey-900: #1B1F23;
  --colour-blue-600: #1F6FEB;
  --colour-white: #FFFFFF;

  /* semantic */
  --colour-surface-raised: var(--colour-white);
  --colour-action-default: var(--colour-blue-600);
  --space-gap-control: 8px;
  --radius-control: 6px;
}

[data-theme="dark"] {
  --colour-surface-raised: var(--colour-grey-900);
}

.settings-save {
  background: var(--colour-action-default);
  color: var(--colour-surface-raised);
  padding: var(--space-gap-control);
  border-radius: var(--radius-control);
}
```

Custom properties are the common route from the design tool into the browser, and because the component reads only semantic names, the dark-theme block is the only thing that changes. The usual failure is tokens that stay in the design file, where the product is never affected. Keep the set small: a few dozen names cover this screen, and three hundred is a colour picker with extra steps.
