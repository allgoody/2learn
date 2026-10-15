---
title: Values and principles
prereqs: []
---

## What it is

Agile's four values, stated as preferences rather than absolutes: individuals and interactions over processes and tools; working software over comprehensive documentation; customer collaboration over contract negotiation; responding to change over following a plan. The right-hand items are not worthless — they are worth less when they conflict with the left.

## Why it matters

Read as absolutes the values produce anarchy — no documents, no plan, no contract — which is exactly how some teams read them and why "agile" has a poor reputation in parts of the industry. Read as stated, they are a tie-breaker for the common case: when the plan and the new information disagree, the information wins. They also name the cost honestly, which is the part teams skip: every one of these preferences buys flexibility with predictability.

## Core ideas

### Documentation still exists; it stops being the deliverable

Working software is the measure of progress, not the volume of documents. The artefact is whatever communicates: a diagram, a short spec, a test that describes the behaviour.

```text
Instead of                        Produce
40-page requirements document     acceptance tests + a one-page summary
architecture PDF reviewed once    a short decision record kept with the code
status report per sprint          the deployed increment and its changelog
```

The test is whether anyone reads it twice, not whether it exists.

### The iteration length is the real commitment

Short iterations are what make change affordable: a two-week cycle gives you twenty-six chances a year to be wrong cheaply. A long cycle with all the ceremonies is waterfall wearing a hat.

### Plans are forecasts, and should be revised

An estimate becomes a commitment only if someone decides it does. Say which one you mean. A revised forecast is not a failure of the process; a plan that never changes is evidence that nothing is being learned.

### Self-organising teams beat assigned tasks

The people closest to the work decide how to do it, within a goal. This is why the values put individuals and interactions first: the coordination happens in conversation, not in a tool's workflow field.

### Say the failure mode out loud

Agile fails by ceremony with no change: daily stand-ups that report status upward, retrospectives with no actions, estimates tracked against individuals. Every one of those is a symptom of the right-hand column winning while everyone says the left.

## Practice

### Audit one practice against its value

Take a practice your team runs — the stand-up, the estimate, the review — and write which value it serves and what it would look like if it stopped serving it.

Done when: you can name one practice whose output nobody consumes, and either change it or delete it.

### Run a two-week iteration and measure the revision

Plan two weeks, then record every change made mid-cycle and what triggered it.

Done when: you can say how many of the changes came from learning something rather than from a missed estimate.

## Common mistakes

- **Reading the values as absolutes** — "no documentation" produces a team nobody can join; fix: keep the right-hand item, reduce it to what is read twice.
- **Ceremony without change** — the vocabulary is adopted and the behaviour is not; fix: check each practice for the value it serves.
- **Estimates treated as commitments** — the team stops reporting what they learn; fix: state which numbers are forecasts and revise them.
- **Long cycles with agile labels** — change stays expensive and the values do not apply; fix: shorten the iteration before adding any ceremony.
- **Planning without the people doing the work** — the plan is detached and the team disengages; fix: let the team decide how, given the goal.

## Go deeper

- **Agile Methodology** (`04-product-process/02-agile-methodology`) — the track these values open.
- **Short iterations and feedback** (`04-product-process/02-agile-methodology/02-short-iterations-and-feedback`) — the mechanism that makes the values real.
- **Agile Software Development** (`04-product-process/09-agile-software-development`) — the values applied inside one engineering team.
- **Scrum (Software Development)** (`04-product-process/10-scrum-software-development`) — one framework that turns these values into a schedule.
