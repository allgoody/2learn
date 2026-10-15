---
title: The backlog and sprint flow
prereqs: ["04-product-process/10-scrum-software-development/01-roles-and-ceremonies"]
---

## What it is

The backlog is an ordered list of everything that might be built, with the most valuable and most refined items at the top. The sprint backlog is the subset the team forecasts for the current sprint. Flow is how items move between the two: written roughly, refined just before use, taken into a sprint, and finished as an increment.

## Why it matters

A backlog is the artefact where a product's ordering decisions are recorded, so its shape decides whether the team builds the most valuable thing. Two failure modes are common and opposite: a backlog that is a dumping ground for every request, and one that is filled with detailed specifications months in advance, which is a waterfall plan in a list. The flow below keeps refinement close to the work, where the detail is still accurate.

## Core ideas

### One ordered list, and the order is the decision

The product owner's main artefact is the order, not the volume. Everything below the top few items is a placeholder that will change.

```text
1. Refund request and status            ready
2. Refund audit log                    ready
3. Bulk export of orders               needs refinement
4. Saved payment methods               needs refinement
--- beyond here, order is indicative ---
5. Multi-currency support
6. Redesigned dashboard
```

### Refine just in time, not in advance

Detail written three months early is wrong by the time it is used. Refine the top few items to the point where the team can forecast them, and no further.

### Size the items so a sprint can hold several

An item that takes the whole sprint removes the team's ability to adapt and makes the sprint boundary a single all-or-nothing gamble. Split until several fit.

### The sprint backlog is the team's, and it can change

The sprint goal is fixed; the contents move as the team learns. A sprint backlog that may not change is a commitment dressed as a forecast.

### Unfinished work goes back, visibly

An item not finished at the boundary returns to the product backlog, re-ordered, not silently carried. Carrying it hides the pattern that the items are too large.

## Practice

### Order one backlog by value

Take the top twenty items, write the reason for each item's position in one clause, and re-order anything you cannot justify.

Done when: every item in the top ten has a one-clause reason, and the reasons are about value rather than about who asked.

### Split one oversized item

Find an item bigger than a third of a sprint and split it into deliverable pieces.

Done when: at least three of the pieces can each be demonstrated on their own.

## Common mistakes

- **A backlog with no order** — the team picks by loudness; fix: the product owner maintains one ordered list.
- **Detail written months ahead** — refinement is wasted and the specification is wrong when used; fix: refine just in time.
- **Items larger than a sprint** — the boundary becomes all-or-nothing; fix: split until several deliverable pieces fit.
- **Carrying unfinished items silently** — the pattern of oversized work stays invisible; fix: return unfinished items to the product backlog and re-order them.
- **The sprint contents treated as frozen** — the goal is fixed but the contents should move; fix: state that the sprint goal, not the list, is the commitment.

## Go deeper

- **Roles and ceremonies** (`04-product-process/10-scrum-software-development/01-roles-and-ceremonies`) — the meetings that operate this flow.
- **Scrum (Software Development)** (`04-product-process/10-scrum-software-development`) — the track this chapter closes.
- **User Story** (`04-product-process/12-user-story`) — the usual form of a backlog item.
- **Estimation & Story Points** (`04-product-process/17-estimation-story-points`) — sizing the items the sprint forecast contains.
