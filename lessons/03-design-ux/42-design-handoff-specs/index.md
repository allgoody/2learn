---
title: Design Handoff & Specs
type: skill
topic: 03-design-ux
tier: small
status: drafted
aliases: []
prereqs: ["03-design-ux/32-design-systems"]
related: []
---

## What it is

Design handoff is packaging intent so an engineer can build it right the first time: the states, the edge cases, the tokens and the behaviour, written down where the builder will look. A spec is that package. It is not a picture of the happy path with a colour picker attached.

## Why it matters

Most handoff failures are invisible until the build is finished, and the engineer is blamed for a decision nobody told them about. The loading state nobody drew becomes a spinner in the wrong place; the empty list becomes blank space; the long name breaks the row. Every one of those is a specification gap, and each costs a round trip. A good handoff also removes the meeting where the engineer asks what happens on error — the answer is already there.

## Core ideas

### Specify the states, not only the screen

For each component in the flow, list every state and what it shows. The states are what the engineer will otherwise invent.

```text
Submit button
  idle       label "Place order"
  pressed    label dimmed, control disabled
  loading    spinner replaces the label, control disabled, no second submit
  error      label returns, message shown above the form, input preserved
  disabled   label "Place order", reason shown beneath: "Add a delivery address"
```

### Reference tokens, never raw values

Write `colour.action.default`, not `#1F6FEB`. The spec then survives a rebrand, and the engineer has a name to look up rather than a number to copy.

### State the behaviour, not only the appearance

What happens on press, what is disabled while something is in flight, where focus goes, what happens if the user goes back. This is the part a static file cannot communicate.

```text
On press:      disable the control, show loading, keep the form filled
On success:    replace the form with a confirmation and the order number
On failure:    re-enable, preserve every field, focus the message
On back:       return to the address step with its values intact
```

### Give the real content and the extremes

The longest name, the empty list, the four-hundred-row table, a missing image. Include them as named examples, not as advice.

### Put it where the work happens

Attach the spec to the ticket or the component, not in a separate document nobody opens. A spec that is one click away from the code gets read.

## Practice

### Write a spec for one flow

Choose one flow and write it up: each screen's states, the tokens used, the behaviour on each action and the extreme content cases.

Done when: an engineer can describe every state of every control without asking a question, and no spec line contains a raw hex value.

### Run a build from your own spec

Hand the spec to someone who did not design it and have them build one screen. Note every question they ask.

Done when: the questions they ask are added to the spec and a second builder asks none.

## Common mistakes

- **Only the happy path** — loading, empty and error states are invented by the builder and differ per screen; fix: list every state explicitly.
- **Raw values instead of tokens** — the spec breaks at the next theme or rebrand; fix: reference semantic tokens by name.
- **No behaviour description** — what happens on press is guessed; fix: write the interaction for each action.
- **Ideal content only** — the real names and list sizes break the layout after build; fix: include the longest, the empty and the large cases.
- **A spec in a separate document** — it is never opened; fix: attach it to the ticket or the component page.

## Go deeper

- **Design Systems** (`03-design-ux/32-design-systems`) — read this first; a spec is mostly a pointer into the system.
- **Component API and documentation** (`03-design-ux/32-design-systems/02-component-api-and-documentation`) — the documented states a spec references.
- **Design Tokens** (`03-design-ux/41-design-tokens`) — the named values a spec cites instead of raw numbers.
- **Wireframing** (`03-design-ux/27-wireframing`) — the page structure the spec elaborates.
