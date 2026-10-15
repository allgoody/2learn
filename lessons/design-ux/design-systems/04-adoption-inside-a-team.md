---
title: Adoption inside a team
prereqs: ["design-ux/design-systems/03-governance-and-versioning"]
---

## What it is

Adoption is the work of getting people to actually use the system: making the right thing the easy thing, migrating the old screens, answering questions quickly and showing that using the system is faster than working around it.

## Why it matters

Most design systems fail here, not in the component code. A library that is correct, documented and versioned still loses to a designer under deadline who can copy a screen faster than reading a component page. Adoption is a product problem — the consumers are users, and the same rules apply: discover their obstacles, remove the friction, and measure whether they return.

## Core ideas

### Make the default path the system path

If a new screen can be built faster outside the system, people will build it outside the system. Put the components in the starting template, keep the tokens in the codebase, and remove the copy-paste path.

```text
Faster outside:  copy the old screen, tweak it, skip the system
Faster inside:   start from a template that already uses the components
-> remove the copy-paste starter, keep the template
```

### Find the obstacles by watching, not guessing

Sit with a consumer building a screen and note where they leave the system. The reasons are usually specific: a missing state, a token not in the theme, a component that cannot take the long label they need.

### Answer in the open

Keep questions and answers somewhere visible. The same three questions get asked by every new joiner, and a public answer removes them permanently.

### Migrate a visible screen early

Nothing convinces like seeing the system in the product. Migrate one high-traffic screen end to end and show the before and after.

### Measure reuse

Count the components used outside the system — the forks and the local overrides. That number, tracked over time, is the adoption metric; downloads and page views are not.

## Practice

### Watch one consumer build a screen

Sit with a designer or engineer building a real screen and note every point at which they leave the system and why. Write the reasons verbatim.

Done when: you have a list of the specific blockers, at least one of which you can remove this week.

### Migrate one screen and record the effort

Take one visible screen, replace its local patterns with the system, and time the work. Repeat on a second screen.

Done when: the second screen took measurably less time than the first, and both are free of local overrides.

## Common mistakes

- **Shipping the library and announcing it** — people keep working as before; fix: remove the copy-paste path and make the template the default.
- **Assuming the reason is unwillingness** — the real cause is usually a missing state or token; fix: watch someone build a screen and record what they hit.
- **Answering questions privately** — the same questions recur with every new joiner; fix: answer where everyone can find it.
- **Migrating nothing visible** — the system has no examples in the product; fix: migrate one high-traffic screen and show the result.
- **Measuring downloads** — the number says nothing about consistency; fix: count local overrides and forks outside the system.

## Go deeper

- **Design Systems** (`design-ux/design-systems`) — the track this chapter closes.
- **Governance and versioning** (`design-ux/design-systems/03-governance-and-versioning`) — the rules adoption depends on.
- **Component API and documentation** (`design-ux/design-systems/02-component-api-and-documentation`) — the artefact most adoption problems are really about.
- **Design Handoff & Specs** (`design-ux/design-handoff-specs`) — packaging components so they are easy to adopt.
