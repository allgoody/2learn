## Example 1 — The same class list in four places

A toolbar's class list is copy-pasted into four templates. A spacing change now needs four edits, and one of them was missed last time. Say what the repetition costs and where the abstraction belongs, then fix it.

```html
<div class="flex items-center gap-2 rounded-md border px-3 py-1.5">
  <span class="text-sm font-medium">Orders</span>
</div>

<!-- the same twelve classes repeated in three more templates -->
```

### Solution

```jsx
export function Toolbar({ children }) {
  return (
    <div className="flex items-center gap-2 rounded-md border px-3 py-1.5">
      {children}
    </div>
  );
}
```

```jsx
<Toolbar><span className="text-sm font-medium">Orders</span></Toolbar>
<Toolbar><span className="text-sm font-medium">Invoices</span></Toolbar>
```

When a utility list repeats, the abstraction is a component, not a new semantic class: inventing a class means you are back to the naming and deletion problems you left, with less tooling. A component owns the list in one file, has a name you can say out loud, and each call site passes only what differs. Utilities make the styling readable at the point it applies, and the component boundary is what keeps that readability from turning into a template nobody can review. The extraction point is the second repetition, not the tenth.

## Example 2 — Class names assembled from strings

A helper picks a text size by concatenating a prefix with a variable, and the styles are missing in the built output while working in development. Explain why the build cannot see them, then write the classes so they survive.

```jsx
function Label({ size = "sm", children }) {
  return <span className={"text-" + size}>{children}</span>;   // text-sm never emitted
}
```

### Solution

```jsx
const sizeClass = { sm: "text-sm", md: "text-base", lg: "text-lg" };

function Label({ size = "sm", children }) {
  return <span className={sizeClass[size]}>{children}</span>;
}
```

The build scans the source for literal class names and emits only the rules it finds, so a name assembled at runtime never matches anything and no rule is generated — this is why the style works in development, where nothing is being filtered, and disappears in production. Keeping every possible class literal in a lookup object gives the scanner three real names to find while preserving the same call site. The alternative, a safelist in the configuration, works but grows without anyone noticing, and the next component that concatenates a name inherits the same invisible failure.
