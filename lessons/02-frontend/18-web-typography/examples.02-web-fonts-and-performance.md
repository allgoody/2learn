## Example 1 — Two weight files and text that hides while they load

The page declares one file per weight and blocks rendering until the face arrives, so a slow connection shows nothing at all. Say what the two choices cost, then load one file and render immediately.

```css
@font-face {
  font-family: "Body";
  src: url("/fonts/body-regular.woff2") format("woff2");
  font-weight: 400;
  font-display: block;
}

@font-face {
  font-family: "Body";
  src: url("/fonts/body-bold.woff2") format("woff2");
  font-weight: 700;
  font-display: block;
}
```

### Solution

```css
@font-face {
  font-family: "Body";
  src: url("/fonts/body-variable.woff2") format("woff2");
  font-weight: 400 700;
  font-display: swap;
  unicode-range: U+0000-00FF;
}
```

```html
<link rel="preload" href="/fonts/body-variable.woff2" as="font" type="font/woff2" crossorigin />
```

`font-display: block` hides the text until the font is ready, and on a slow connection that is seconds of a blank page; `swap` draws the fallback at once and replaces it when the file arrives, so the text is readable throughout. A variable font packs the whole weight range into one file, which is why two requests become one — and subsetting to the characters the site actually uses often halves it again. Serve the file from your own origin rather than a font host, and preload only the face the first screen renders: `crossorigin` is required even same-origin, or the browser downloads the font twice.

## Example 2 — A swap that moves the page

The font loads correctly and the text visibly jolts when it replaces the fallback. A layout-shift recording puts the movement at a fifth of the page height. Say where the movement comes from, then reduce it.

```css
@font-face {
  font-family: "Body";
  src: url("/fonts/body.woff2") format("woff2");
  font-display: swap;
}

body { font-family: "Body", Arial, sans-serif; }
```

### Solution

```css
@font-face {
  font-family: "Body Fallback";
  src: local("Arial");
  size-adjust: 105%;
  ascent-override: 92%;
}

body { font-family: "Body", "Body Fallback", sans-serif; }
```

The shift is not caused by the swap itself but by the two faces disagreeing about metrics: Arial is slightly narrower and sits on a different baseline, so every line re-wraps and the content below moves when `Body` replaces it. A fallback face declared locally with `size-adjust` and an ascent override scales the substitute's glyphs and baseline to match the loaded font, which removes most of the movement while keeping the immediate render that `swap` gives. Choose the fallback for similar proportions in the first place, test with the network throttled, and check the shift in a trace rather than by eye on a fast local connection.
