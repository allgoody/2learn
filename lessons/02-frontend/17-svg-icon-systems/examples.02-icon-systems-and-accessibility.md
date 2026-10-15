## Example 1 — Two unlabelled icons with opposite problems

A toolbar button holds a magnifier icon and a status area shows a warning icon next to no text. One announces too little, the other announces nothing meaningful. Say what a screen reader reports for each, then fix both.

```html
<button type="button" class="icon-button">
  <svg viewBox="0 0 24 24"><path d="M10 10l4 4" stroke="currentColor" /></svg>
</button>

<span class="status">
  <svg viewBox="0 0 24 24"><path d="M12 8v5" stroke="currentColor" /></svg>
  Payment declined
</span>
```

### Solution

```html
<button type="button" class="icon-button" aria-label="Search">
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M10 10l4 4" stroke="currentColor" />
  </svg>
</button>

<span class="status">
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 8v5" stroke="currentColor" />
  </svg>
  Payment declined
</span>
```

The button was announced as "button" with no name, because an icon-only control has no text content to take a name from; adding the label to the control makes it announce as "button, Search". The status icon is the opposite case: it is decoration beside text that already carries the meaning, so leaving it visible to the accessibility tree inserts meaningless content into the reading order — it becomes "graphic" followed by the message. Hiding it with `aria-hidden` and `focusable` removes it from the tree entirely. The rule that decides which fix applies: name the control when the icon is the only label, hide the icon when real text is beside it. Never label both, or the name is announced twice.

## Example 2 — An icon font that fails silently

The project draws its icons from a font, and a missing glyph shows as a blank box with no error anywhere. Say what the delivery model costs, then move to a set of SVG symbols.

```css
.icon { font-family: "Icons"; font-size: 24px; }
.icon-search::before { content: "\e902"; }
```

### Solution

```html
<svg class="icon" aria-hidden="true" focusable="false">
  <use href="/icons.svg#search" />
</svg>
```

```css
.icon { inline-size: 1em; block-size: 1em; color: currentColor; }
```

An icon font encodes each glyph as a private-use character, so a missing glyph, a wrong codepoint or a blocked font file all produce the same silent blank, and the font must be downloaded in full to show one icon. A sprite referenced by `<use>` is one cached file of symbols that can be recoloured through `currentColor` and sized in `em`, and a missing symbol is a visible error rather than an empty box. The same trade-off applies within SVG: a sprite suits the many icons that only need a colour and a size, while inline markup is the right answer for the few that must be animated or drawn in several colours.
