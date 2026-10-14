---
title: Utility-first thinking
prereqs: ["frontend/css"]
---

## What it is

Utility-first means styling an element with many small classes that each do one thing, rather than with one semantic class whose rule does many things. The class list is not a shortcut around a stylesheet; it is a different place to put the same decisions.

## Why it matters

Naming is the slowest part of writing CSS, and it is where the maintenance cost lives: a `.card` grows a `.card--compact` and a `.card--with-badge`, and after a year nobody knows which of the eleven card classes is safe to delete. A utility class has exactly one definition and one meaning, so nothing is ever ambiguous and nothing is orphaned. The cost is paid in the markup, where a class list can be read in place, and where a component boundary can absorb the repetition. Knowing where that boundary should be is the skill; without it, utility-first just moves the problem into the templates.

## Core ideas

### The class list is the style rule

Reading `<div class="flex items-center gap-2">` tells you everything the rule would have said, at the place it applies. There is no indirection between the markup and the styles, and no need to search the codebase for where `.toolbar` is defined.

```html
<div class="flex items-center gap-2 rounded-md border px-3 py-1.5">
  <span class="text-sm font-medium">Orders</span>
</div>
```

### Extract a component, not a class

When a class list repeats, the fix is a component that owns it — a `Toolbar` whose implementation is the class list — rather than a new utility class. The abstraction then has a name, a place and a reason, and the change is applied in one file.

```jsx
export function Toolbar({ children }) {
  return (
    <div className="flex items-center gap-2 rounded-md border px-3 py-1.5">
      {children}
    </div>
  );
}
```

### Utilities compose along one axis each

`p-4` sets padding, `text-sm` sets font size and line height, `md:flex` applies a flex display above a breakpoint. Variants stack with the same modifier syntax in every category, so learning one prefix — responsive, state, dark mode — teaches the pattern for all of them.

```html
<button class="rounded bg-teal-700 px-3 py-1.5 text-sm text-white hover:bg-teal-600 disabled:opacity-50">
  Save
</button>
```

### Order comes from the framework, not the file

Utilities are emitted in a fixed order, so two classes that set the same property resolve predictably without depending on where they were written. That removes specificity fights — and also removes the option of fixing a conflict by moving a rule, which is the trade you accept.

### Arbitrary values are an escape hatch, not a habit

`w-[42ch]` and `bg-[#0f766e]` exist for the one-off that a token genuinely cannot express. A codebase full of arbitrary values has stopped using a design system and is writing inline CSS with extra steps.

## Practice

### Restyle one component with utilities

Take a component with a hand-written stylesheet and rewrite it using utility classes only, then delete the stylesheet.

Done when: the component renders identically, no rule from the old stylesheet is still imported, and no class list is duplicated inside the component.

### Find the extraction point

Take a page where the same seven-class list appears four times. Extract a component that owns the list and use it at all four sites.

Done when: the class list exists once, each call site passes only what differs, and the component has a name you would say out loud.

## Common mistakes

- **Repeating the same long class list** — the next change has to be applied four times and will be applied three; fix: extract a component that owns the list.
- **Inventing semantic classes in a utility framework** — you are back to the naming problem you left, with less tooling; fix: extract a component instead.
- **Fighting a utility with arbitrary values** — the design system is bypassed and consistency is lost; fix: add the value to the theme, or accept the framework's scale.
- **Building class names by string concatenation** — the scanner cannot see them and the styles are missing in production; fix: write the full class name at every call site.
- **Putting every utility in the markup and no abstraction at all** — templates become unreadable and untestable; fix: extract at the second repetition, not the tenth.

## Go deeper

- **Cascading Style Sheets (CSS)** (`frontend/css`) — the cascade and specificity are what utilities deliberately sidestep; you still need to understand them.
- **Configuration and design tokens** (`frontend/tailwind-css/02-configuration-and-design-tokens`) — where the values in these classes come from.
- **UI Components** (`frontend/ui-components`) — the extraction decision this lesson keeps pointing at.
