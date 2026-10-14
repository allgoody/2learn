---
title: Purposeful motion
prereqs: ["frontend/css"]
---

## What it is

Purposeful motion is animation with a job: it shows where an element came from, that a value changed, or that the system is working. It is chosen after the change is understood, not added to make a static design feel alive.

## Why it matters

Animation is one of the few things in an interface that can make it feel slower than it is. A 400ms transition on a menu makes every open feel deliberate and every close feel broken; the same menu at 120ms feels instant and still communicates direction. Because duration and easing are the whole effect, they have to be decided rather than guessed, and they have to be consistent — a product where each transition has its own timing reads as unpolished even when each one is fine in isolation. The other half is restraint: motion that has no message to carry is the first thing to cut when a page feels heavy.

## Core ideas

### Movement should explain a spatial change

If a panel belongs to the right edge, it should enter from the right. If an item was removed from a list, it should collapse where it was rather than disappear. Matching the direction of the motion to the geometry of the change is what makes it information rather than decoration.

```css
.drawer {
  transform: translateX(100%);
  transition: transform 160ms ease-out;
}

.drawer.is-open { transform: translateX(0); }
```

### Enter slowly, leave quickly

Perceived speed is asymmetric: an element can take a moment to arrive without feeling slow, but anything that lingers on the way out blocks the next action. A common rule is to keep exits at roughly two thirds of the entrance duration and give them a simpler path.

```css
.panel { transition: opacity 200ms ease-out, transform 200ms ease-out; }
.panel.is-closing { transition-duration: 120ms; }
```

### Duration scales with distance, not with importance

Between 100ms and 250ms covers almost everything in an interface: shorter reads as instant, longer as sluggish. Large movements, such as a full-screen overlay, can justify the top of that range; small state changes such as a button press belong near the bottom.

### Prefer transitions for state, keyframes for sequences

A transition animates between two states the element already has and reverses naturally when the state flips back. A keyframe animation describes a sequence with its own timeline, which is right for a spinner or an illustration and wrong for anything that must respond to a user action mid-flight.

### Motion can stand in for text

A subtle state change on a control — a brief depress, a colour shift — acknowledges a click before the result arrives. That is a legitimate use: it is feedback about the system's state, and it earns its few milliseconds.

## Practice

### Time three transitions against each other

Build the same menu at 120ms, 240ms and 400ms, and open and close each five times in a row.

Done when: you can name the duration at which it stops feeling responsive, and your chosen value sits below it with a faster exit.

### Make one removal explain itself

Take a list that removes a row on click. Animate the row's height and opacity out before it is removed from the DOM, then remove the node when the animation ends.

Done when: the surrounding rows move up smoothly rather than jumping, and clicking two rows quickly still leaves the list consistent.

## Common mistakes

- **Animating everything on the page** — the interface feels slower and the user's attention is pulled to changes that do not matter; fix: animate only changes that would otherwise be ambiguous.
- **Using one long duration everywhere** — every interaction feels like waiting; fix: keep durations between 100ms and 250ms and use the lower end for small changes.
- **Animating an element out of existence without a message** — a row vanishes as if it were a bug; fix: collapse or fade it in place.
- **Symmetrical enter and exit timings** — the closing motion blocks the next action; fix: make exits shorter than entrances.
- **Starting keyframe animations for two-state changes** — the animation cannot be interrupted and the element and the state disagree; fix: use a transition on a class that reflects state.

## Go deeper

- **Cascading Style Sheets (CSS)** (`frontend/css`) — transitions, transforms and the compositing rules that decide what animates cheaply.
- **Reduced motion and performance** (`frontend/motion-design/02-reduced-motion-and-performance`) — the accessibility and frame-rate obligations that come with this choice.
- **Interaction Design** (`design-ux/interaction-design`) — the wider discipline of which feedback timing is one part.
