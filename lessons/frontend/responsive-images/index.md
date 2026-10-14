---
title: Responsive Images
type: skill
topic: frontend
tier: small
status: drafted
aliases: []
prereqs: ["frontend/html"]
related: []
---

## What it is

Responsive images are the browser's own tools for serving the right image file for the space it will occupy: `srcset` and `sizes` for resolution, `<picture>` for art direction and modern formats, and `width`/`height` attributes to reserve the space before the file arrives. No script is involved.

## Why it matters

A single large image served to every device is the most common cause of a slow page on a phone, and it is entirely avoidable. The same markup also decides whether the layout jumps when the image loads, whether a narrow screen downloads a wide photograph and throws most of it away, and whether a browser that cannot decode the newest format gets a broken image or a working fallback. This is one element doing work that used to require a JavaScript library, and it is worth knowing properly because the cost of getting it wrong is paid by every visitor.

## Core ideas

### `srcset` and `sizes` let the browser choose

`srcset` lists candidate files with their widths; `sizes` tells the browser how wide the image will actually be rendered at each viewport, so it can pick the cheapest candidate that is still sharp. Without `sizes`, the browser assumes the image fills the viewport and often picks a file far larger than needed.

```html
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w"
  sizes="(min-width: 60rem) 33vw, 100vw"
  width="800" height="600"
  alt="A short description of the subject"
  loading="lazy"
  decoding="async"
/>
```

### Always set intrinsic dimensions

`width` and `height` attributes reserve the aspect ratio before the file loads, so the text below does not jump when the image appears. The CSS can still override the rendered size.

### `<picture>` is for changing the image, not just its size

Use `<picture>` when the composition must change — a wide crop on desktop, a tall one on a phone — or when you are offering a modern format with a fallback. The browser uses the first source it understands, so ordering matters.

```html
<picture>
  <source type="image/avif" srcset="hero-1600.avif" media="(min-width: 60rem)" />
  <source type="image/webp" srcset="hero-1600.webp" media="(min-width: 60rem)" />
  <img src="hero-1600.jpg" width="1600" height="900" alt="…" />
</picture>
```

### Lazy load below the fold, never above it

`loading="lazy"` defers offscreen images until they are near the viewport, which saves bandwidth and improves the largest-contentful-paint score. Applying it to the hero image instead delays exactly the image the score is measuring.

### Serve formats the browser can decode, in order of preference

AVIF and WebP are usually much smaller than JPEG at similar quality. Offer them as `<source>` entries with a JPEG or PNG fallback in the `<img>`, and keep the fallback genuinely valid rather than a placeholder.

### Let the build do the resizing

Generating the candidate files by hand does not survive a redesign. Most build tools and image services can emit the set from one source at several widths and formats, which is the only version of this that stays correct over time.

## Practice

### Serve three widths to three screens

Take one photograph and produce it at 400, 800 and 1600 pixels wide. Write the `srcset` and `sizes` for a card that fills the width on a phone and a third of it on a desktop, then check which file the browser downloads at two window sizes.

Done when: the narrow window downloads the smaller file and the wide window the larger, and the image never stretches beyond its intrinsic width.

### Fix a layout shift

Find a page whose content jumps as its images arrive. Add `width` and `height` to each image and record the layout shift again.

Done when: the shift is gone from the trace and the images still render at the size the CSS asks for.

## Common mistakes

- **Writing `srcset` without `sizes`** — the browser assumes a full-width image and downloads a far larger file than needed; fix: describe the rendered width, in `vw` and media conditions.
- **Lazy loading the hero image** — the largest visible element is delayed and the loading metric suffers; fix: lazy load only images below the fold.
- **Omitting `width` and `height`** — the content jumps when the image arrives; fix: always declare the intrinsic dimensions.
- **Offering a modern format with no valid fallback** — unsupported browsers show a broken image; fix: keep a real `<img>` fallback in the last position.
- **Resizing images by hand** — the set drifts out of date the first time the layout changes; fix: generate the candidates in the build.

## Go deeper

- **Hypertext Markup Language (HTML)** (`frontend/html`) — the element, its attributes and the `alt` text that carries the image's meaning.
- **Web Performance (Core Web Vitals)** (`frontend/web-performance-core-web-vitals`) — the metrics these choices move.
- **Responsive Web Design** (`frontend/responsive-web-design`) — the layout context that decides how wide the image will be.
