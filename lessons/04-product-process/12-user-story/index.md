---
title: User Story
type: skill
topic: 04-product-process
tier: small
status: drafted
aliases: []
prereqs: ["04-product-process/02-agile-methodology"]
related: []
---

## What it is

A user story is a short statement of a need, conventionally shaped "As a *role*, I want *something*, so that *a benefit*", with acceptance criteria written beside it. It is a placeholder for a conversation, not a specification. The artefact is the card plus its criteria.

## Why it matters

The shape forces three things a requirements list often omits: who wants this, what they want, and why it is worth building. The "so that" clause is the one that does the work — it is where a request that cannot name its benefit gets questioned, and where the team can propose a cheaper way to achieve the same outcome. The failure mode is worth stating as plainly as the benefit: a story written into a tracker and never discussed is a miniature specification, and it inherits every weakness of a specification while being too short to be complete.

## Core ideas

### The "so that" is the decision-making clause

Write it first, and in the words of the person asking. If it cannot be written, the item is a solution in search of a problem.

```text
Weak:   As a user, I want a dashboard, so that I can see things.
Better: As a warehouse supervisor, I want to see which pickers are
        behind by more than an hour, so that I can move someone
        before the afternoon dispatch is late.
```

The second version can be satisfied in at least three ways, and one of them may be a report rather than a screen.

### Acceptance criteria are the testable part

Conditions a reviewer can check, one line each, in the user's terms. They are the bridge to the tests, and they are what makes the story finishable.

```text
- Lists only pickers more than one hour behind plan
- Sorted by how far behind, most first
- Refreshes at least every five minutes
- Shows nothing when every picker is on plan
```

### Split by workflow step, not by technical layer

A story split into "the API" and "the UI" delivers nothing until both are done. Split so each piece is independently demonstrable.

### The conversation is the deliverable

The card exists to schedule a discussion between the person with the need and the people who will build it. Refinement is that discussion; the written words are its summary.

### Keep the backlog ordered by value, not by story size

Small stories are easier to pick, so an unordered backlog drifts toward trivia. The product owner's ordering is the thing that keeps small and valuable ahead of small and easy.

## Practice

### Rewrite three requests as stories

Take three items currently written as tasks — "add sort to the orders table" — and rewrite each as a story with a named role, a benefit and three acceptance criteria.

Done when: each story's benefit suggests at least two possible implementations, and each set of criteria can be checked without asking the author.

### Split one story by workflow

Take a story you have already sized as larger than a third of an iteration and split it so each piece can be demonstrated on its own.

Done when: you can describe the demonstration for each piece without mentioning the others.

## Common mistakes

- **A story with no "so that"** — the need is asserted and no cheaper option can be proposed; fix: write the benefit in the requester's words or question the item.
- **Stories used as specifications** — detail is written and no conversation happens; fix: treat the card as a placeholder and refine in discussion.
- **Splitting by technical layer** — nothing is demonstrable until the last piece lands; fix: split by workflow step or by user-visible outcome.
- **Acceptance criteria that cannot be checked** — "should be fast" or "user friendly"; fix: write conditions a reviewer can verify.
- **An unordered backlog** — the team picks whatever is smallest; fix: keep one ordered list owned by the product owner.

## Go deeper

- **Agile Methodology** (`04-product-process/02-agile-methodology`) — read this first; the story is a unit of planning for these values.
- **Estimation & Story Points** (`04-product-process/17-estimation-story-points`) — how stories are sized relative to each other.
- **The backlog and sprint flow** (`04-product-process/10-scrum-software-development/02-the-backlog-and-sprint-flow`) — where stories are ordered and refined.
- **Requirements Engineering** (`04-product-process/05-requirements-engineering`) — the more formal route when the system must be specified testably.

