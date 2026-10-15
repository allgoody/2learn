## Example 1 — Predicting which colour wins

Three rules target the same paragraph in a page you can open in a browser. Say which colour the text renders, then say which rule won and why. Save the markup and the stylesheet below as one HTML file and open it.

```html
<p class="note" id="intro" style="color: crimson;">Shipping notes</p>

<style>
  p { color: navy; }          /* A */
  #intro { color: green; }    /* B */
  p.note { color: purple; }   /* C */
</style>
```

### Solution

```text
rendered colour: crimson
winner: the inline style attribute
why: inline declarations outrank every selector that is not !important,
     whatever its specificity, so A, B and C never reach the element.
```

As tuples the stylesheet rules are `p` = (0,0,1), `p.note` = (0,1,1) and `#intro` = (1,0,0), so among them `#intro` wins; delete the `style` attribute and the text turns green. The trap is stopping there. An inline declaration sits in a higher origin tier than any author selector, so it takes the property outright and specificity is never consulted. When you cannot override something later, this is usually why.

## Example 2 — The width two boxes really take

Both boxes declare the same width, padding and border, but one uses `border-box` and the other `content-box`. Work out how wide each box is on screen, and say which declaration you would keep.

```css
.a {
  box-sizing: content-box;   /* the default */
  width: 300px;
  padding: 20px;
  border: 1px solid grey;
}

.b {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 1px solid grey;
}
```

### Solution

```text
.a = 342px   300 content + 20 + 20 padding + 1 + 1 border
.b = 300px   the padding and border come out of the 300
```

With `content-box` the declared `width` covers the content alone, so padding and border are added around it: 300 + 40 + 2 = 342. With `border-box` the declared `width` is the whole visible box, so the content area shrinks to 258 and the box measures exactly 300. Keep `border-box`, because it makes a box the size you typed and that is what stops a row of columns overflowing its container. The trap is mixing the two: two boxes with the same `width` no longer measure the same.
