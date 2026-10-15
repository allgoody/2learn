## Example 1 — The same hex code in eleven templates

A product's primary colour is written as an arbitrary value wherever it is needed. A design revision now needs eleven edits, and one shade is already slightly different. Say what the arbitrary value cost, then put the colour where the classes come from.

```html
<button class="bg-[#0f766e] text-white">Save</button>
<a class="text-[#0f766e] underline">Details</a>
<!-- nine more, two of them #0e756d by accident -->
```

### Solution

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: { brand: { 50: "#f0fdfa", 500: "#14b8a6", 700: "#0f766e" } },
    },
  },
};
```

```html
<button class="bg-brand-700 text-white">Save</button>
<a class="text-brand-700 underline">Details</a>
```

A utility generated from the theme is a token reference: `bg-brand-700` means the product's primary shade, so changing it in the configuration changes it everywhere it appears, which is the guarantee that makes utility-first survive a redesign. An arbitrary value carries the literal and nothing else, so the palette ends up duplicated across templates and drifts one shade at a time. Keeping the framework's numeric steps while replacing the values gives every developer an obvious set of choices and removes any reason to reach for a hex code. Use `extend` while the defaults may still be in use; replace the theme outright only once you have searched for usage.

## Example 2 — A palette maintained in two places

A design token file holds the brand colours, and the framework configuration holds a hand-copied version of the same values. A release changes the file. Describe what happens next, then remove the second copy.

```js
// tokens.json
{ "brand": { "700": "#0f766e", "500": "#14b8a6" } }
```

```js
// tailwind.config.js — typed by hand from the file above
export default { theme: { extend: { colors: { brand: { 700: "#0e756d", 500: "#14b8a6" } } } } };
```

### Solution

```js
// tailwind.config.js — generated from one source
import tokens from "./tokens.json";

export default {
  theme: {
    extend: {
      colors: {
        brand: tokens.brand,
      },
    },
  },
};
```

Two hand-maintained copies of a palette always drift, and the drift shows up as a slightly wrong shade in one part of the product that nobody can explain. Generating the theme from the token source makes the file authoritative: a colour changes in one place and the generated class changes with it, with no edit in the configuration at all. It also keeps the theme honest about what it represents — the design decision and the value live together, and a theme change is then reviewed as a visual release rather than tucked into a normal commit that shifts every screen's appearance.
