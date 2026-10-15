## Example 1 — A drawer that animates for everyone

A drawer slides in on every device, including for a reader whose system asks for reduced motion. Say what that setting is for, then gate the movement and keep the interface understandable without it.

```css
.drawer {
  transform: translateX(100%);
  transition: transform 160ms ease-out;
}

.drawer.is-open { transform: translateX(0); }
```

### Solution

```css
@media (prefers-reduced-motion: no-preference) {
  .drawer {
    transform: translateX(100%);
    transition: transform 160ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

For the reader who set reduced motion, the drawer now appears and disappears at once with no slide: the panel is still there, still dismissible, and nothing about the flow depends on the animation finishing. That matters because motion can trigger nausea, dizziness and migraine in people with vestibular disorders, so the setting is not a preference about taste. Wrapping non-essential movement in the `no-preference` query makes a still interface the default, and the blanket rule underneath is a safety net for third-party widgets rather than a replacement for deciding what should move. Colour and opacity changes stay: they still say that something appeared.

## Example 2 — An animation that animates layout

An expandable row animates its height and margin on every frame. On a mid-range phone it stutters. Say which properties the browser must recalculate, then produce the same motion without them.

```css
.row {
  height: 0;
  margin-top: 0;
  transition: height 200ms ease-out, margin-top 200ms ease-out;
}

.row.is-open { height: 2.5rem; margin-top: 0.5rem; }
```

### Solution

```css
.row {
  transform: scaleY(0);
  opacity: 0;
  transform-origin: top;
  transition: transform 200ms ease-out, opacity 200ms ease-out;
}

.row.is-open { transform: scaleY(1); opacity: 1; }
```

`height` and `margin` are layout properties, so each frame forces the browser to recalculate positions for the element and everything after it, and the animation competes for the roughly sixteen milliseconds a frame allows — which is why it looks smooth on the machine it was written on and janks on slower hardware. `transform` and `opacity` can be composited without a layout or paint pass, so the work runs off the main thread and a busy page does not stall it. The visual result is the same, and throttling the CPU while watching the recording is what proves the layout work is gone rather than merely smaller.
