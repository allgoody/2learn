---
title: Working with engineering and design
prereqs: ["product-process/product-management/01-the-decision-role"]
---

## What it is

Working with engineering and design means dividing the problem so that each discipline contributes the judgement only it can supply: what would satisfy the need, how it should behave for the people using it, and what it costs to build and keep running. The product role brings the goal and the order; it does not bring the design or the architecture.

## Why it matters

The commonest expensive mistake in product work is a decision made with only one of the three perspectives present. A feature chosen without engineering's view of the cost is chosen at a price nobody knows; a feature chosen without design's view of the people is chosen for a user nobody checked. Bringing the three together late produces a plan that is defended rather than a plan that is right.

## Core ideas

### Bring problems, not solutions

A problem statement leaves room for the engineer to propose something cheaper and the designer to propose something better. A pre-decided solution leaves them estimating and resenting.

```text
Instead of  "Build a saved-cards feature."
Bring       "Repeat buyers abandon when they must re-enter card details.
             The goal is fewer abandoned repeat purchases."
```

The second version produced the option of remembering the details without storing the card at all.

### Include the people doing the work before the decision, not after

Decisions announced to the team produce compliance; decisions made with them produce alternatives. Refinement and one design session per significant item is enough.

### Let each discipline say no to its own domain

Engineering decides what the codebase can take this quarter; design decides what the interface should do. Overruling either on their own ground converts a colleague into an order-taker and the judgement is lost next time.

### Make the trade explicit in the room

Cost, time and scope are one dial with three handles. When scope grows, say which of the others moves, in front of everyone.

### Keep a written record of the decision and its reason

One line in the ticket, with the alternatives considered. It settles the question when it returns in three months.

## Practice

### Run one item from problem to plan

Take one significant item and run it through a single session with design and engineering present, starting from the problem statement rather than a solution.

Done when: at least one alternative approach was proposed by someone other than the product manager, and its cost was compared.

### Write the trade line

For the same item, write one line naming what moved — scope, date or cost — when something was added.

Done when: the line is in the ticket and the people who did the work agree it is accurate.

## Common mistakes

- **Arriving with a decided solution** — engineering and design can only estimate, and the better option never appears; fix: bring the problem statement and the goal.
- **Deciding before the team is consulted** — the plan is defended rather than improved; fix: involve them at refinement for every significant item.
- **Overruling a discipline on its own ground** — the judgement is withdrawn next time; fix: let engineering own cost and design own behaviour.
- **Scope growing with the date fixed** — the team absorbs it invisibly; fix: name which dial moves, out loud.
- **No written reason** — the same argument returns in three months; fix: record the decision and the alternatives considered.

## Go deeper

- **The decision role** (`product-process/product-management/01-the-decision-role`) — the decision this collaboration informs.
- **The evidence behind a decision** (`product-process/product-management/03-the-evidence-behind-a-decision`) — what makes the case rather than the argument.
- **Product Management** (`product-process/product-management`) — the track this chapter belongs to.
- **Product Discovery** (`product-process/product-discovery`) — the work that decides whether the item should exist at all.
