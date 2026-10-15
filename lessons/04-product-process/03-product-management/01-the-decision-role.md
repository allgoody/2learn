---
title: The decision role
prereqs: ["04-product-process/03-product-management"]
---

## What it is

The decision role is choosing what the team works on next and being able to say why, against a goal the business has agreed. In practice the artefact is an ordered list with a reason attached to the top of it, and a goal that can be met or missed.

## Why it matters

A team without this role still makes decisions, but they are made implicitly — by whoever is most persuasive, most senior, or most recent to complain. Consequences arrive months later attached to no one. Naming a decision-maker also gives everyone else a legitimate way to stop arguing: they can disagree with the decision, but they do not have to keep relitigating it.

## Core ideas

### Write the goal before the list

The goal is a change in the world, stated so it can be judged. Everything on the list is a bet about how to cause it.

```text
Goal: cut the time from order to first shipment from 4 days to 2,
      measured weekly, by the end of Q3.

Bets:  automation of the packing slip, a same-day courier option,
       removing the manual stock check.
```

Without the goal, the list is a wish list and any ordering is defensible.

### Order the list; do not just collect it

An unordered backlog is not a plan. The order is the product of the role's judgement and is the thing other people can challenge.

### Own the outcome, not the feature

A product manager who promises a feature has promised an output; if the goal does not move, the feature still shipped. Say which outcome you expect the work to change and how you will know.

### Ask for the decision's cost

Every yes is a no to something else. Write the next-best alternative beside the decision so the trade is visible when it is reviewed.

```text
Decision   Ship refunds before saved payment methods.
Foregone   Saved payment methods, which support expects to cut 30 calls/week.
Reason     Refunds block the Q3 goal; payment methods do not.
```

### Revisit on evidence, not on pressure

Change the order when the evidence changes, and say which evidence. Re-ordering because someone escalated is how the list stops meaning anything.

## Practice

### Write one goal and order a list against it

State a goal with a measure and a date, then order ten backlog items by how directly they serve it, writing the reason beside the top five.

Done when: every item in the top five has a reason that names the goal, and you can name what you are deliberately not doing.

### Record one decision's cost

Take your most recent yes and write down the next-best alternative you gave up.

Done when: the entry names the alternative, the goal it loses to, and the date it should be reviewed.

## Common mistakes

- **Collecting without ordering** — the team picks by loudness; fix: keep one ordered list and own the order.
- **No stated goal** — any ordering is defensible and none is checkable; fix: write the outcome and its measure first.
- **Promising features rather than outcomes** — success is measured by shipping; fix: name the change you expect and how you will know.
- **Relitigating settled decisions** — the team spends its time on arguments already decided; fix: record the decision and the trade, and revisit only on new evidence.
- **Changing the order under escalation** — the list stops meaning anything; fix: require the evidence that justifies a change.

## Go deeper

- **Product Management** (`04-product-process/03-product-management`) — the track this first chapter belongs to.
- **Working with engineering and design** (`04-product-process/03-product-management/02-working-with-engineering-and-design`) — how the decision is reached with the other disciplines.
- **Roadmapping** (`04-product-process/14-roadmapping`) — communicating the order as a sequence over time.
- **Prioritization Frameworks (RICE / MoSCoW)** (`04-product-process/15-prioritization-frameworks-rice-moscow`) — a scoring aid for the ordering decision.
