---
title: Flow
prereqs: ["03-design-ux/44-interaction-design/01-states-and-feedback"]
---

## What it is

Flow is how steps connect: what leads to what, where the user can go back, how they move sideways to look something up, and where the path branches. It is the sequence around the states, and it decides whether a task takes three steps or eleven.

## Why it matters

Every unnecessary step multiplies by the number of users, and every step that cannot be undone makes people careful in a way that slows them down. Flow problems are rarely visible in a screen-by-screen review, because each screen is fine; they appear only when the screens are laid end to end. This is also where accessibility and interruption meet the design: a flow that loses state when the phone rings fails for everyone, not only for the people who use a keyboard.

## Core ideas

### Count the steps to the goal

Write the shortest path and count it. Then count the steps for the cases that are not the happy path: a returning user, a user who needs to look something up mid-task, a user who made an error.

```text
Happy path            4 steps   (search -> item -> cart -> pay)
Returning customer    3 steps   (reorder -> address -> pay)
Needs a receipt first 7 steps   (back out, find order, copy number, return)
```

The third row is the one worth redesigning.

### Make Back mean the previous step

The browser or platform back gesture must not lose the work or exit the flow. Keep state server-side or in the URL so the previous step is a step, not a restart.

### Allow sideways movement

People need to check something midway: a price, an address, a previous order. A flow that traps them until the end forces them to abandon and start again. Open it in a way that preserves their progress.

### Ask for information when it is needed, not when it is convenient

Collecting everything at the start to avoid a second round trip feels efficient for the system and increases abandonment for the user. Ask at the step the answer is used.

### Never repeat a step silently

If a step must be repeated — a re-authentication, a confirm — say why. A repeat with no explanation reads as a bug and costs trust.

## Practice

### Map one flow and count the steps

Take your main task and draw it as boxes and arrows, including the returning-user path and the error path. Count the steps in each.

Done when: you have a step count for three paths and can name the step you would remove first.

### Test an interruption

Start the task, interrupt yourself halfway — close the tab, take a call, navigate away — then come back and continue.

Done when: the flow resumes where you left it, or you have written down exactly which step had to be repeated.

## Common mistakes

- **Optimising only the happy path** — the returning and error paths stay long and expensive; fix: count the steps for three paths, not one.
- **Back exiting the flow** — the user loses the task and starts again; fix: persist state so back is the previous step.
- **Trapping the user until the end** — they cannot check a price or an address mid-flow; fix: allow sideways movement that preserves progress.
- **Collecting data early** — abandonment rises at the first step; fix: ask for each item at the step that uses it.
- **Repeating a step with no explanation** — the user reads it as a bug; fix: state why the step is repeated and how long the flow has left.

## Go deeper

- **States and feedback** (`03-design-ux/44-interaction-design/01-states-and-feedback`) — what happens inside each step.
- **Interaction Design** (`03-design-ux/44-interaction-design`) — the track this chapter closes.
- **Wireframing** (`03-design-ux/27-wireframing`) — laying out the steps this flow connects.
- **Accessibility (WCAG / a11y)** (`02-frontend/11-accessibility-wcag-a11y`) — keyboard order and focus management across a multi-step flow.
