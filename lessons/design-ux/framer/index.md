---
title: Framer
type: skill
topic: design-ux
tier: small
status: drafted
aliases: []
prereqs: ["design-ux/figma"]
related: []
---

## What it is

Framer is a design tool that publishes. You lay out a screen as in any design tool, then connect interactions, add responsive layouts and real (or realistic) data, and publish it as a live link. The output is closer to production than a click-through: it runs in a browser at a real address, on real devices.

## Why it matters

Some questions cannot be answered by a static prototype: does the transition feel right at full speed, does the layout hold on a real phone, does the copy survive when it is scrolled past. Framer answers those because the artefact is a page rather than a picture of a page. It is also how a small team ships a marketing page or a concept site without a separate build, which is a legitimate use as long as the artefact's purpose is stated.

## Core ideas

### Reach for it when the artefact must run

Use it when timing, motion, responsiveness or real content is the thing under test. For structure and wording, a static prototype is faster and enough.

```text
Question answered by running it          Question answered by a picture
does this transition feel right          is the sequence logical
does the layout hold at 360px            is the hierarchy right
does the copy read when scrolled         is the tone right
```

### Publish early, and share the link

The value is in watching people use it in their own browser rather than in a shared screen. Publish a link and observe real behaviour.

### Keep the fidelity honest

A published page reads as finished, so participants stop reporting structure problems and start reporting typos. Decide before the session whether you want the polish effect; if not, say plainly what is rough.

### It is a prototype, not a specification

A published artefact invites the assumption that it is the product. Record what is deliberately hard-coded — a single product, no error states, no authentication — and re-specify from the wireframes.

### Use it for one screen, not the whole product

Publishing a single interaction to test a question is quick. Rebuilding an application in it is a project with a maintenance cost and no design benefit.

## Practice

### Publish one interaction

Take a transition you are unsure about and publish it as a live page, then open it on a phone and on a laptop.

Done when: you have watched someone use the link on their own device and can say whether the interaction reads correctly.

### Test responsiveness on a real device

Open the published link at a narrow width on a physical phone and note every layout that breaks.

Done when: you have a list of the breakages and know which of them your real build would inherit.

## Common mistakes

- **Building the whole product** — a maintenance burden with no design gain; fix: publish the one screen under question.
- **Letting polished output suppress findings** — participants report typos instead of structure; fix: state what is deliberately rough, or test structure elsewhere.
- **Treating the published page as the spec** — hard-coded content becomes accidental requirements; fix: record the shortcuts and re-specify from the wireframes.
- **Skipping the real-device check** — the layout is only ever seen at the designer's window size; fix: open the link on a physical phone.
- **Reaching for it before the structure is settled** — time is spent publishing a screen that will be redrawn; fix: decide structure statically first.

## Go deeper

- **Figma (Design Software)** (`design-ux/figma`) — read this first; the drawing stage that precedes publishing.
- **Prototyping** (`design-ux/prototyping`) — choosing fidelity, including when running code is the right choice.
- **Adobe XD** (`design-ux/adobe-xd`) — the sibling tool for teams already inside Adobe.
- **Design Handoff & Specs** (`design-ux/design-handoff-specs`) — what a published prototype still does not tell an engineer.
