## Example 1 — Nesting that mirrors the markup

The nesting below follows the DOM four levels deep. A small design change needs another level to override. Say what each level does to the compiled selector, then flatten it to the sustainable limit.

```scss
.card {
  .card__header {
    .card__title {
      .card__badge {
        color: teal;
      }
    }
  }
}
```

### Solution

```scss
.card {
  padding: 1rem;

  &.is-selected { border-color: teal; }
}

.card__title { font-size: 1.125rem; }
.card__badge { color: teal; }
```

Sass nesting is a convenience for the author, not a scope: each level is concatenated into the compiled selector, so four levels produce a selector with four classes' worth of specificity that the next developer has to beat with five. Nesting one level and using `&` for a state or a modifier keeps the compiled output flat and overridable, and it stops the stylesheet's shape from depending on the markup's shape. The class names already say which element they belong to, so the nesting was not adding information — only specificity. The same restraint applies to native CSS nesting.

## Example 2 — A Sass variable where the value should change at runtime

A brand colour is a Sass variable, so a second brand needs a second stylesheet. Say why the variable cannot do this job, then move the value to a custom property.

```scss
$brand: #0f766e;

.button {
  background: $brand;
  border-color: $brand;
}

// to theme a section, a whole second compile was needed
```

### Solution

```scss
:root { --brand: #0f766e; }

.button {
  background: var(--brand);
  border-color: var(--brand);
}

.brand-partner { --brand: #1d4ed8; }
```

A Sass variable is substituted at build time, so the value is fixed into the compiled CSS and every variation has to be a separate build; a custom property is a runtime value that inherits, so setting it on a wrapper re-themes everything inside with no second compile and no selector per component. This is the part of Sass that native CSS has made redundant, and it is worth auditing the file for it: variables used for anything that changes at runtime should become custom properties, while Sass keeps the jobs CSS still cannot do — loops over a map that generate a systematic set of rules, and functions that compute values. Keep the build step only for what it is actually carrying.
