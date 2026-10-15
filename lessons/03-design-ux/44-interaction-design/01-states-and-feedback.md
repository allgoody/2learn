---
title: States and feedback
prereqs: []
---

## What it is

Every interactive element exists in several states: idle, hovered or focused, pressed, loading, successful, failed, disabled, empty. Feedback is what the interface does between the action and the result, so the user knows the press registered and can tell progress from a freeze.

## Why it matters

Nothing erodes trust faster than uncertainty about whether the machine heard you. A tenth of a second without feedback and people press again — creating the duplicate order, the double subscription, the two support tickets. And it is always the states that were never designed that ship broken: nobody drew the error, so the error renders raw; nobody drew the empty list, so a new user sees a blank area and assumes a bug.

## Core ideas

### Enumerate the states before designing any of them

Write the list for each element and check it off. Nine states cover most controls; the three that are usually missing are loading, error and disabled-with-a-reason.

```text
Button:  idle | hover | focus | pressed | loading | success | error | disabled
List:    loading | empty | one item | many items | error | stale
Field:   idle | focus | valid | invalid | disabled | read-only
```

### Acknowledge the press immediately

Under about 100 milliseconds the user perceives the response as instant. Beyond that, show a busy state. Never leave a pressed control looking unchanged while work happens.

```text
0-100ms    no indicator needed
100ms-1s   inline busy state on the control itself, control disabled
1-10s      progress indicator plus what is happening
over 10s   background it, tell them it will continue, say how they will hear
```

### Say what failed and keep the input

An error state preserves everything the user typed, names the problem in the interface's own words, and offers a way forward. A form that clears on failure costs the user the whole task.

### Disabled with a reason beats disabled silently

A greyed-out button with no explanation is a dead end; the user cannot tell whether they lack permission, missed a field or hit a bug. Add a one-line reason or allow the press and show the validation.

### Design the empty and error states first

They are the states a new or unlucky user sees, they carry the most information per pixel, and they are the ones left to the end. Draw them before the populated state.

## Practice

### Write a state matrix for one screen

List every interactive element on the screen down the left, the nine states across the top, and fill in what the user sees in each cell. Leave no cell blank.

Done when: every cell is filled, and each of loading, error, empty and disabled-with-reason has a described appearance.

### Time one slow action

Pick the slowest action in your product and measure it. Then write what the user sees at 200 milliseconds, at three seconds and at thirty seconds.

Done when: the user can tell progress from a freeze at every one of those three moments, and no state leaves the control looking unchanged.

## Common mistakes

- **No loading state** — the user presses again and creates a duplicate; fix: show a busy state on the control and disable it while working.
- **Discarding input on error** — the whole task is lost and the user leaves; fix: preserve every field and mark only what failed.
- **Silent disabled controls** — the user cannot tell why the action is unavailable; fix: attach a one-line reason or validate on press.
- **Undesigned empty and error states** — the first impression is a blank area or a raw error string; fix: design both before the populated state.
- **Feedback that does not say what is happening** — a generic spinner for a thirty-second job; fix: say what the system is doing and how the user will hear the result.

## Go deeper

- **Interaction Design** (`03-design-ux/44-interaction-design`) — the track these states belong to.
- **Flow** (`03-design-ux/44-interaction-design/02-flow`) — connecting the states into a sequence.
- **Accessibility (WCAG / a11y)** (`02-frontend/11-accessibility-wcag-a11y`) — focus, live regions and reduced motion for the same states.
- **UX Writing & Microcopy** (`03-design-ux/07-ux-writing-microcopy`) — wording the loading, empty and error messages.
