---
title: Prototype fidelity
prereqs: []
---

## What it is

Fidelity is how finished a prototype looks and behaves — from a paper sketch to a coded build. Choosing fidelity means asking what is still unknown, then building the least finished thing that can answer it.

## Why it matters

Fidelity is expensive in both directions. Too low and the question cannot be answered: paper cannot show whether a loading state feels slow. Too high and the answer arrives too late, having consumed the time that the next iteration needed — and a polished prototype makes honest negative findings harder to hear. The discipline is to spend on the one dimension the question needs and to leave the rest rough.

## Core ideas

### Match fidelity to the question

Write the question down, then pick the row that answers it.

```text
Question                        Fidelity
Is the label understood?        paper, hand-written
Is the sequence logical?        linked grey screens
Does the flow hold together?    clickable wireframes
Does the interaction feel right? one coded screen, real timing
Does it perform acceptably?     coded prototype, real data volume
```

### Spend on one dimension

Decide whether this prototype is testing structure, wording, interaction or performance, and keep the other dimensions deliberately rough. A prototype that is polished everywhere teaches nothing about which part mattered.

### Content shapes the result

Real content, at realistic length and volume. Long names, missing images, a hundred rows. Placeholder content hides exactly the states that break in reality.

### Reuse and throw away without regret

A prototype whose links work is worth three that do not. A prototype that has been polished for a demo should not be promoted to a specification: it was built to answer a question and its shortcuts are not decisions.

```text
shortcut: prototypes reuse the happy path; before any is promoted to a
build, re-specify loading, empty and error states against the wireframes.
```

### State what the prototype is not

Tell the test participants and the team what is deliberately missing, so the findings are about the question rather than about a missing animation.

## Practice

### Choose and build one prototype

Take an open question, write the fidelity table row that answers it, and build the prototype at that fidelity — no more.

Done when: you can point at the one dimension where you spent effort and name the dimensions you deliberately left rough.

### Load it with real content

Replace every placeholder with a real value and add one extreme case: a very long name, an empty collection, a hundred rows.

Done when: the prototype has survived one extreme case without the layout breaking in a way you had not seen.

## Common mistakes

- **Building the finished thing** — the question is answered too late to change anything; fix: pick the lowest fidelity that answers the question.
- **Polishing every dimension** — nobody can tell which part produced the finding; fix: choose one dimension to spend on.
- **Placeholder content** — the layout that is really built breaks immediately; fix: use real strings and at least one extreme case.
- **Promoting a prototype to a specification** — its shortcuts become accidental requirements; fix: re-specify from the wireframes and page contracts.
- **Not declaring the limits** — feedback is spent on what is missing by design; fix: state what the prototype deliberately omits before the test.

## Go deeper

- **Prototyping** (`03-design-ux/40-prototyping`) — the track this fidelity decision opens.
- **Testing a prototype with real users** (`03-design-ux/40-prototyping/02-testing-a-prototype-with-real-users`) — what to do with the artefact once built.
- **Wireframing** (`03-design-ux/27-wireframing`) — the structure the prototype animates.
- **Design Thinking** (`03-design-ux/02-design-thinking`) — matching the artefact to the question in the wider loop.
