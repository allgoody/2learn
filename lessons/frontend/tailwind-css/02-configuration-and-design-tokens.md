---
title: Configuration and design tokens
prereqs: ["frontend/tailwind-css/01-utility-first-thinking"]
---

## What it is

Tailwind generates its utilities from a theme: a set of named scales for colour, spacing, typography, radius, shadow and breakpoints. Changing the theme changes every utility at once, so the configuration file is where a project's design tokens actually live, expressed as the values the class names resolve to.

## Why it matters

Without a configured theme, the utilities encode the framework author's taste rather than the product's, and everyone reaches for arbitrary values to get their own colour. With one, a utility class becomes a token reference: `bg-brand-600` means the product's primary shade, and changing that shade in one place changes it everywhere it appears. That is the same guarantee a token layer gives in any styling approach, and it is what makes utility-first survive a redesign instead of being rewritten.

## Core ideas

### Define the scale once, in the theme

Replace the default palette with the product's, and name the scale steps so intent is visible. Keeping the framework's numeric steps (`brand-500`, `brand-600`) while replacing the values gives every developer an obvious set of choices and no reason to reach for a hex code.

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        brand: { 50: "#f0fdfa", 500: "#14b8a6", 700: "#0f766e" },
      },
      spacing: { gutter: "1.5rem" },
    },
  },
};
```

`extend` adds to the defaults; replacing `theme` outright removes them. Most projects want `extend` until they are confident the defaults are unused.

### Let the framework own the breakpoints

The responsive prefixes are generated from the configured screens, so adding a breakpoint once makes `md:`, `lg:` and the rest available. Using the configured set rather than arbitrary widths keeps the media queries consistent across the whole application.

```html
<div class="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
```

### Generate only what is used

The build scans the source for class names and emits only the rules it finds. That is why dynamic construction — `"text-" + size` — produces no styles at all: the scanner works on literal text. Full class names, chosen from a map, are the safe pattern.

```js
// Safe: every possible class appears literally in the source
const sizeClass = { sm: "text-sm", lg: "text-lg" };
```

### Keep the configuration beside the tokens it represents

If the design system already publishes tokens as a data file or JSON, generate the theme from that source rather than copying the values. Two hand-maintained copies of a palette drift, and the drift shows up as a slightly wrong shade in one product area.

### Version the theme with the product

A theme change is a visual change to every screen. Treat it as a release, review it against the designs, and keep the previous palette available for one cycle if the migration cannot be completed in a single commit.

## Practice

### Replace three arbitrary values with theme entries

Find three `[...]` arbitrary values used more than once. Add each to the theme under an intent-naming key and update the call sites.

Done when: the arbitrary values no longer appear in the source, and the new keys read as the design decision rather than the literal value.

### Generate a theme from a token file

If a design token file exists, build the framework theme from it with a small script; otherwise write the tokens into one file that both the theme and any other consumer read.

Done when: changing a colour in the token source changes the generated class, with no edit in the theme file itself.

## Common mistakes

- **Using arbitrary values for repeated colours** — the product ends up with several near-identical shades and no single place to change them; fix: add the colour to the theme and use the class.
- **Building class names with string concatenation** — the scanner never sees the class and the style is absent in the build; fix: keep the full class names in a lookup object.
- **Replacing the whole theme early** — the defaults you removed are still used in a corner nobody checked; fix: extend first and prune once you have searched for usage.
- **Maintaining the palette in two places** — the design file and the configuration drift; fix: generate one from the other.
- **Treating a theme change as a normal commit** — the entire product shifts appearance with no review; fix: review it as a visual release.

## Go deeper

- **Utility-first thinking** (`frontend/tailwind-css/01-utility-first-thinking`) — why the theme is the only place these values should live.
- **Design Tokens** (`design-ux/design-tokens`) — the naming and structure conventions a theme should follow.
- **Design Systems** (`design-ux/design-systems`) — how a token layer and a component library fit together.
