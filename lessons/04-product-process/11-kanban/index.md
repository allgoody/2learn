---
title: Kanban
type: skill
topic: 04-product-process
tier: small
status: drafted
aliases: []
prereqs: ["04-product-process/02-agile-methodology"]
related: []
---

## What it is

Kanban is flow-based delivery: a board showing the stages work passes through, a limit on how much may be in each stage at once, and a policy for what may enter. There are no sprints and no fixed ceremonies. The artefact is the board itself and the flow metrics it produces.

## Why it matters

Some work cannot be batched into two-week commitments: support queues, incident response, a platform used by many teams, anything where the next item is unknown until it arrives. Kanban fits that work instead of forcing a planning boundary onto it. What the team gives up for its fewer meetings is that boundary: without a sprint, there is no scheduled moment at which the plan is re-examined, so the discipline has to come from the work-in-progress limits and from reviewing the flow metrics instead.

## Core ideas

### The board shows real stages, not a generic pipeline

Columns must name what actually happens — "waiting for review", "in staging", "blocked on a customer reply" — because the board's only job is to make waiting visible.

```text
| Ready (3) | In progress (2) | In review (2) | Staging (2) | Done |
Numbers in brackets are the work-in-progress limits.
```

If a column is never full, it is not a constraint and it does not need a limit.

### The work-in-progress limit is the whole method

A full column means someone starts finishing instead of starting. This is what produces the benefits; the board is only the instrument.

### Measure flow, not velocity

Cycle time (from start to done), throughput (items per week) and the work-in-progress count are the metrics. Velocity is a sprint concept and does not apply.

```text
Cycle time  median 6 days, 85th percentile 14 days
Throughput  11 items per week
WIP          currently 7 against a limit of 9
```

### Make the policies explicit

What qualifies an item to enter, what "done" means at each column, and when an item is blocked. Written on the board, not in someone's head.

### Review the flow on a cadence, and keep one recurring meeting

Kanban removes the sprint ceremonies, so the review has to be scheduled deliberately — a short weekly or fortnightly look at the metrics and the blocked items. Without it, the team stops noticing the growing queue.

## Practice

### Draw the real board

Walk the work from request to done with the people who do it, and name every column after what actually happens, including the waits.

Done when: the board has at least one column for a wait or a blocked state, and each column has a work-in-progress number.

### Find the constraint

Watch the board for a week and note which column is full most often and what arrives there fastest.

Done when: you can name the single stage that limits the whole flow, and one policy change that would relieve it.

## Common mistakes

- **A board with no limits** — the method is reduced to a wall of sticky notes; fix: put a work-in-progress number on every column that fills.
- **Generic columns** — "to do, doing, done" hides every wait and every blocker; fix: name the real stages.
- **Metrics treated as targets** — the numbers improve while the flow does not; fix: use cycle time to find the constraint, not to appraise people.
- **No review cadence** — the queue grows unnoticed; fix: keep one short recurring review of flow and blockers.
- **Implicit policies** — people disagree about what "ready" means and items bounce back; fix: write the entry and exit conditions on the board.

## Go deeper

- **Agile Methodology** (`04-product-process/02-agile-methodology`) — read this first; Kanban is the flow-based route to the same values.
- **Scrum (Software Development)** (`04-product-process/10-scrum-software-development`) — the alternative with fixed sprints and ceremonies.
- **Jira & Confluence** (`04-product-process/13-jira-confluence`) — the tracker most Kanban boards are drawn in.
- **Continuous Integration and Delivery** (`06-cloud-devops/08-ci-cd`) — shorter cycle time is mostly a deployment-frequency problem.
