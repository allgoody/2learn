---
title: Web fonts and performance
prereqs: ["02-frontend/18-web-typography/01-type-scales-and-rhythm"]
---

## What it is

A web font is a typeface file the browser downloads before it can render text in that face. Loading one is a scheduling problem: for a moment the page has text it cannot yet draw, and the three ways of handling that moment — waiting, substituting, or swapping later — produce three different user experiences.

## Why it matters

Text that vanishes and reappears looks broken, and text that shifts after the layout has settled is one of the most common causes of a poor layout-shift score. Font files are also often among the largest assets on a page: a full family can outweigh the JavaScript. Getting this right is therefore the difference between a page that shows readable text immediately and one that either flashes invisibly or jolts the content downward a third of a second after it looked ready.

## Core ideas

### Load one format, subset it, and serve it from your own origin

A modern `woff2` file is compressed and supported everywhere that matters. Subsetting — including only the characters the site actually uses — often cuts the file by more than half. Serving it from your own origin avoids a third-party connection and the extra domain lookup.

```css
@font-face {
  font-family: "Body";
  src: url("/fonts/body.woff2") format("woff2");
  font-weight: 400 700;
  font-display: swap;
  unicode-range: U+0000-00FF;
}
```

A variable font packs several weights into one file, so a family with four weights can cost close to the size of one.

### Choose a `font-display` strategy deliberately

`swap` renders the fallback immediately and replaces it when the font arrives, which keeps the text readable and guarantees a visible swap. `optional` gives the font a very short window and keeps the fallback for the whole page load if it is not there in time, which avoids the swap entirely. `block` hides the text for a moment and should be used rarely, if at all.

### Make the fallback match the font

The shift comes from the fallback's metrics differing from the loaded font's. A fallback stack chosen for similar proportions, plus metric overrides or `size-adjust` on a local fallback face, can reduce the shift to near zero.

```css
@font-face {
  font-family: "Body Fallback";
  src: local("Arial");
  size-adjust: 105%;
  ascent-override: 92%;
}

body { font-family: "Body", "Body Fallback", sans-serif; }
```

### Preload sparingly and only what the first screen needs

`rel="preload"` starts the download earlier, which helps the font used above the fold and wastes bandwidth for a font used only in a footer. The `crossorigin` attribute is required even for a same-origin font, and omitting it causes the file to be fetched twice.

### Consider not loading one at all

A well-chosen system stack renders instantly, costs nothing, and matches the operating system the reader already chose. For interfaces where text is the product, a system stack is often the better engineering answer; a distinctive face earns its bytes when the brand depends on it.

## Practice

### Measure the shift with and without a fallback override

Load one custom font on a page, record the layout shift in a performance trace, add a metric-adjusted fallback face, and record again.

Done when: the second trace shows a smaller shift than the first and the text is readable throughout both.

### Subset one font and compare sizes

Take the font your project uses and subset it to the characters the site actually contains. Compare the file sizes and measure the load again.

Done when: the subset file is smaller than the original, the page renders identically, and you can name what would break if the content changed language.

## Common mistakes

- **Using `font-display: block` by default** — the text is invisible for as long as the font takes, and on a slow connection that is seconds; fix: use `swap` or `optional`.
- **Loading a whole family for two weights** — the page pays for glyphs it never shows; fix: subset and prefer a variable font.
- **Omitting `crossorigin` on a preloaded font** — the font is downloaded twice; fix: always set it for font preloads.
- **Preloading every font** — bandwidth is spent on faces below the fold and something more important is delayed; fix: preload only what the first screen renders.
- **Testing on a fast local connection** — the swap never happens locally and the problem ships; fix: throttle the network to a slow profile when checking.

## Go deeper

- **Type scales and rhythm** (`02-frontend/18-web-typography/01-type-scales-and-rhythm`) — the sizes and fallbacks these fonts are being fitted into.
- **Web Performance (Core Web Vitals)** (`02-frontend/26-web-performance-core-web-vitals`) — where font loading shows up as layout shift and blocked rendering.
- **Cascading Style Sheets (CSS)** (`02-frontend/05-css`) — `@font-face`, the cascade and the custom properties that hold a font stack.
