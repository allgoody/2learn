---
title: Short iterations and feedback
prereqs: ["04-product-process/02-agile-methodology/01-values-and-principles"]
---

## What it is

An iteration is a fixed, short period — usually one to four weeks — at the end of which the team has something that runs and something they learned. Short iterations are the mechanism that turns agile's values into daily behaviour: they cap how long a wrong assumption can survive.

## Why it matters

The cost of being wrong grows with the time before anyone finds out. A two-week cycle means the maximum sunk cost per wrong assumption is two weeks of work; a two-quarter release means it is two quarters, discovered at the worst moment. Short iterations also make the plan self-correcting: instead of one large forecast that is either met or missed, you get twenty-six small ones.

## Core ideas

### The cycle has four beats, and the last one is the point

Decide, build, review with someone who can react, adjust. Skip the review and you have a short waterfall.

```text
Day 1-2    decide: pick the smallest item worth shipping
Day 3-8    build: working software, integrated, shippable
Day 9      review: show it to a real user or a stakeholder who can react
Day 10     adjust: change the backlog from what you learned
```

### Iteration length is a guess about your uncertainty

Short cycles where requirements are unclear, longer ones where the work is well understood and the build is expensive. Fixing two weeks by doctrine wastes money on a stable product and gives false comfort on an unstable one.

### Finish, do not start

An iteration that ends with five items at eighty per cent has delivered nothing. Limiting work in progress is what makes the cycle boundary meaningful.

### Ship or demonstrate, never demo-only

A review of a working increment on a real environment is evidence. A slide deck about next sprint's increment is not.

### Measure the cycle's stability, then improve it

Track how much of the plan survived the iteration. If it is consistently low, either the items are too large or the team is being interrupted; both are process findings, not effort findings.

## Practice

### Run one iteration by the four beats

Plan a single one-week iteration with the four beats written into the calendar: decide, build, review, adjust.

Done when: the review happened with someone who can react, and the backlog changed as a result.

### Measure the plan's survival

Record what was planned and what was actually finished for two iterations.

Done when: you have a number for how much of the plan survived, and one sentence naming what moved it.

## Common mistakes

- **A demo with no one who can react** — the feedback beat is skipped and the cycle is short for nothing; fix: invite a user or a stakeholder with authority.
- **Long iterations with agile ceremony** — change stays expensive; fix: shorten the cycle before tuning anything else.
- **Carrying half-finished items** — nothing is delivered and progress is unmeasurable; fix: limit work in progress and finish.
- **Committing to the sprint contents** — the plan becomes a promise and learning is punished; fix: forecast and revise.
- **Ignoring the survival rate** — recurring interruptions stay invisible; fix: measure planned against done each cycle.

## Go deeper

- **Values and principles** (`04-product-process/02-agile-methodology/01-values-and-principles`) — the values these cycles implement.
- **Agile Methodology** (`04-product-process/02-agile-methodology`) — the track this chapter closes.
- **Scrum (Software Development)** (`04-product-process/10-scrum-software-development`) — a framework that formalises this cycle.
- **Kanban** (`04-product-process/11-kanban`) — the alternative when the work arrives unpredictably.
