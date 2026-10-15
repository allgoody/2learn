## Example 1 — The hero image deferred and unsized

The largest element on the page is lazy loaded and declares no dimensions, so it appears late and the text below it jumps when it arrives. Name the two metrics this damages, then fix the markup.

```html
<img src="/hero.avif" loading="lazy" alt="A workshop at sunset" />
```

### Solution

```html
<link rel="preload" as="image" href="/hero.avif" fetchpriority="high" />
<img src="/hero.avif" width="1600" height="900" alt="A workshop at sunset" />
```

Largest Contentful Paint measures when the biggest visible element appears, and `loading="lazy"` deliberately postpones exactly that element — the directive is for images below the fold, where it saves bandwidth without costing the metric. Preloading and raising the priority gets the file discovered and fetched earlier, which is the usual single fix for a late hero. Cumulative Layout Shift measures movement that the user did not cause, and an image with no declared dimensions reserves no space, so every line under it is pushed down on arrival; `width` and `height` give the browser the aspect ratio to reserve while the CSS still decides the displayed size. Two attributes, two metrics.

## Example 2 — A handler that blocks every interaction

One button runs a loop that filters ten thousand records and re-renders the list synchronously. The interface ignores clicks for most of a second. Say which metric this is and why unrelated interactions suffer too, then let the browser paint between chunks.

```js
button.addEventListener("click", () => {
  const matches = records.filter((r) => r.name.includes(query));
  render(matches);            // 400ms of main-thread work in one task
});
```

### Solution

```js
button.addEventListener("click", async () => {
  const matches = records.filter((r) => r.name.includes(query));

  for (let i = 0; i < matches.length; i += 100) {
    render(matches.slice(i, i + 100));
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
});
```

Interaction to Next Paint measures the delay between a tap and the next frame the browser paints, and a task of several hundred milliseconds holds the main thread so nothing can be handled until it finishes — including interactions that have nothing to do with this handler, which is why the whole page feels stuck rather than one button. Yielding between chunks returns control to the browser so it can paint and process input, and the renderer then paints progressively instead of once at the end. The measurement to confirm the fix is the main-thread track in a recording, not the wall-clock time of the loop.
