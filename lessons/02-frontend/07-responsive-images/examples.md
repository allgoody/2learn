## Example 1 — A hero image the browser cannot size

A hero image has three candidate files, is lazy loaded, and declares no rendered width or intrinsic size. On a phone the browser downloads the 1600px file and the layout jumps as it arrives. Say what each missing attribute was needed for, then fix the markup.

```html
<img
  src="hero-1600.jpg"
  srcset="hero-400.jpg 400w, hero-800.jpg 800w, hero-1600.jpg 1600w"
  loading="lazy"
  alt="A workshop at sunset"
/>
```

### Solution

```html
<img
  src="hero-800.jpg"
  srcset="hero-400.jpg 400w, hero-800.jpg 800w, hero-1600.jpg 1600w"
  sizes="(min-width: 60rem) 50vw, 100vw"
  width="1600" height="900"
  alt="A workshop at sunset"
/>
```

Without `sizes`, the browser assumes the image fills the viewport, so a 400px-wide phone still qualifies for the largest candidate and downloads a file most of which is thrown away. `sizes` states the rendered width at each viewport, which is the information the choice actually needs. The `width` and `height` attributes reserve the 16:9 box before the file arrives, so the text below does not move; CSS can still set the displayed size, because the attributes only supply the intrinsic ratio. And `loading="lazy"` is wrong on a hero: it delays the largest visible element, which is precisely what the loading metric measures — offscreen images are what it is for.

## Example 2 — A modern format with nothing behind it

A picture element offers two modern formats and no fallback, so a browser that can decode neither shows a broken image. Explain how the browser chooses a source, then make the fallback real.

```html
<picture>
  <source srcset="hero-1600.avif" />
  <source srcset="hero-1600.webp" />
</picture>
```

### Solution

```html
<picture>
  <source type="image/avif" srcset="hero-1600.avif" media="(min-width: 60rem)" />
  <source type="image/webp" srcset="hero-1600.webp" media="(min-width: 60rem)" />
  <img src="hero-1600.jpg" width="1600" height="900" alt="A workshop at sunset" />
</picture>
```

The browser walks the sources in order and uses the first one it understands, which is why the modern format comes first and why the `type` attribute matters — without it the browser may fetch a file it cannot decode. The `<img>` is not optional: it is the fallback that every browser can render, and it must be a genuinely valid file rather than a placeholder. `media` on a source is what makes `<picture>` useful for art direction as well as format — a wide crop on large screens and a tall one otherwise — while `srcset` inside it still handles resolution.
