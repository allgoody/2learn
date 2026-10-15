---
title: Estimation & Story Points
type: skill
topic: product-process
tier: small
status: drafted
aliases: ["Story Points"]
prereqs: ["product-process/user-story"]
related: []
---

## What it is

Story points are an abstract unit for sizing work relative to other work, rather than in hours. A team agrees a rough scale, sizes items against each other, and uses the total of a small batch to forecast what fits in an iteration. The artefact is the sized backlog.

## Why it matters

Teams are bad at absolute estimates and much better at comparisons: "is this bigger than the last one?" is answerable where "how many hours?" invites a guess dressed as a number. Relative sizing also survives the discovery of a missed task, because the scale measures the item against its peers rather than against a clock. The failure modes are equally concrete: points read as a productivity score, velocity compared across teams, and a scale with no shared meaning. Any of those turns a forecasting aid into a performance metric, and the team starts inflating or gaming it.

## Core ideas

### Size against a reference item, not the clock

Keep two or three known items and compare everything to them. A scale of 1, 2, 3, 5, 8, 13 with no hours attached is enough.

```text
Reference 3  add a filter to an existing list
Reference 8  build a simple form with validation and error states

New item: "bulk import orders from a file"
Comparison: bigger than the form (unknown file formats), smaller than
            the whole checkout rebuild -> 13, or split it
```

### The scale is deliberately coarse

Fine distinctions are false precision. If two items are hard to distinguish, size them the same and move on; the uncertainty is in the work, not the number.

### Estimate the batch, not the person

The team sizes together and the number belongs to the item. Individual estimates invite anchoring and turn the discussion into a competition.

### Velocity forecasts a batch; it does not compare teams

Within one team, an average of recent iterations forecasts the next one. Between teams the numbers are not on the same scale and comparing them measures nothing but each team's definition of a point.

### Re-estimate only when the item changed

An estimate that keeps moving with the deadline is a commitment wearing a disguise. If the item changed, re-size it and say what changed.

## Practice

### Build a three-item reference scale

Choose three items from your last iteration, write the size you would give each and why, and size five new items against them.

Done when: two people size the same five items independently and agree within one step on at least four of them.

### Test what your velocity actually predicts

Take the last six iterations: the total sized as done, and what was forecast.

Done when: you can say whether the average predicted the following iteration within about twenty per cent, and name one cause of the misses.

## Common mistakes

- **Points used as a productivity metric** — the team inflates and the forecast loses meaning; fix: keep points on items, never on people.
- **Comparing velocity between teams** — the scales are not interchangeable; fix: forecast only within the team that made the estimates.
- **Hours in disguise** — "one point is a day" reintroduces absolute estimation and its guesses; fix: keep at least three reference items and compare against them.
- **Fine-grained scales** — precision that the work does not support; fix: keep the scale coarse and size close items the same.
- **Re-estimating under pressure** — estimates become commitments; fix: re-size only when the scope changed and say what changed.

## Go deeper

- **User Story** (`product-process/user-story`) — read this first; points size the items a story defines.
- **The backlog and sprint flow** (`product-process/scrum-software-development/02-the-backlog-and-sprint-flow`) — where the sized items are ordered and forecast.
- **Scrum (Software Development)** (`product-process/scrum-software-development`) — the framework in which velocity is normally used.
- **Roadmapping** (`product-process/roadmapping`) — what to do when the question is dates rather than sizes.
