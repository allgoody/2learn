---
title: Reduced motion and performance
prereqs: ["02-frontend/16-motion-design/01-purposeful-motion"]
---

## What it is

Two constraints on any animation you ship. Reduced motion: the operating system exposes a setting for people who are made unwell or distracted by movement, and `prefers-reduced-motion` reports it. Performance: every animation must run inside the browser's frame budget, or it will stutter and make the page feel broken.

## Why it matters

Motion can trigger nausea, dizziness and migraine in people with vestibular disorders, and the setting they used to say so is the one your stylesheet has to respect. Ignoring it is not a matter of taste: it is a failure of the standard and a real harm to a real user. The performance half is equally practical — an animation that animates a property the browser has to lay out again will jank on a mid-range phone even when it is smooth on the machine you wrote it on, and jank is much more visible during motion than during a static redraw.

## Core ideas

### Respect the reduced-motion setting

Wrap non-essential motion in a `no-preference` query so the default is a static, still interface. Then decide what to keep: opacity and colour changes are usually safe and often necessary to show that something appeared, while parallax, large translates and looping ambient animation should stop.

```css
@media (prefers-reduced-motion: no-preference) {
  .drawer { transition: transform 160ms ease-out; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

The blanket rule is a safety net for third-party widgets; it should sit underneath a considered implementation, not replace it.

### Animate transforms and opacity

The browser can composite a change to `transform` or `opacity` without recalculating layout or repainting, so those two are the cheap ones. Animating `width`, `height`, `top`, `left` or `margin` triggers layout on every frame, and animating colours repaints. Where a layout property must change, animate a transform that produces the same visual result.

```css
/* cheap: composited */
.row-enter { transform: translateY(0); opacity: 1; }

/* expensive: layout on every frame */
.row-enter { height: 2.5rem; margin-top: 0; }
```

### Keep the work off the main thread where possible

A CSS transition or animation on a composited property runs independently of JavaScript, so a busy main thread does not stall it. Web Animations or a small CSS transition therefore beats a `requestAnimationFrame` loop that recalculates positions each frame.

### Do not fight the frame budget

At a typical refresh rate you have roughly 16 milliseconds per frame, shared with everything else the page is doing. An animation that starts during a long task will drop frames at exactly the moment the user is watching. Keep animations short, start them after expensive work, and avoid reading layout properties inside a per-frame callback.

### Test with the setting on and the CPU throttled

Turn the operating system setting on and confirm the interface is still usable and understandable. Then throttle the CPU in the browser's performance tools and watch the animation again.

Done once, this catches both classes of failure before a user does.

## Practice

### Gate one animation on the preference

Take a transition you wrote and move it behind `prefers-reduced-motion: no-preference`. Then turn the setting on and step through the same flow.

Done when: the flow is still clear without the movement, and nothing depends on the animation finishing to remain usable.

### Replace a layout animation with a composited one

Find an animation that changes `height` or `margin` on every frame. Rewrite it to use `transform` and `opacity` and confirm the visual result is the same.

Done when: the performance recording shows no layout work during the animation and the perceived motion is unchanged.

## Common mistakes

- **Ignoring `prefers-reduced-motion`** — some users are harmed by the animation and cannot opt out; fix: gate motion behind `no-preference`.
- **Animating `height` or `margin`** — every frame forces a layout pass and the animation stutters on slower hardware; fix: animate `transform` and `opacity`.
- **Using JavaScript for a per-frame loop where CSS would do** — the animation competes with application work for the main thread; fix: prefer a CSS transition or the Web Animations API.
- **Disabling all feedback for reduced motion** — the interface becomes ambiguous about whether anything happened; fix: keep instant or opacity-only state changes.
- **Testing only on a fast machine** — jank appears on mid-range hardware the developer never sees; fix: throttle the CPU when checking animation.

## Go deeper

- **Purposeful motion** (`02-frontend/16-motion-design/01-purposeful-motion`) — the choice of what to animate, which comes before how it is implemented.
- **Accessibility (WCAG / a11y)** (`02-frontend/11-accessibility-wcag-a11y`) — the standard these requirements come from.
- **Web Performance (Core Web Vitals)** (`02-frontend/26-web-performance-core-web-vitals`) — how animation and long tasks show up in the metrics.
