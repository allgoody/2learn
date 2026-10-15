---
title: Finding a problem worth solving
prereqs: ["design-ux/user-research"]
---

## What it is

Finding a problem worth solving means taking what research turned up and establishing two things the research alone does not: how much the problem costs, and who bears that cost. The output is a problem statement with numbers attached.

## Why it matters

A research session can reveal a real frustration that affects four people. Without a size, the team cannot tell that from a frustration that affects everyone who signs up, and the loudness of the story decides. Sizing also exposes the case where the cost falls on someone other than the buyer — support staff, a partner, the finance team — which changes who has to be convinced and sometimes changes whether the work is worth doing at all.

## Core ideas

### Attach a rate and a cost to every problem

How many people hit it, and what it costs each time. Even rough figures change the argument from taste to arithmetic.

```text
Problem   repeat buyers re-enter card details at checkout
Rate      42% of repeat buyers, about 1,900 sessions a month
Cost      ~40 seconds each, and 28% abandon at the step
Value     recovering half the abandoners is ~€9k/month of orders
```

Numbers with a stated margin of error are far more useful than adjectives.

### Separate the frequency from the severity

A rare problem that blocks the task outranks a common one that costs a few seconds. Report both, and do not collapse them into one score yet.

### Find who pays

Sometimes the person who feels the pain is not the person who pays for the fix, and sometimes the organisation pays twice — once in the product and once in support time. Name both, because the business case will be judged by the second.

```text
User       40 wasted seconds, some abandon
Support    ~60 calls a month about card details, 5 minutes each
```

### Write the problem statement last

Not "we need saved cards" but "repeat buyers abandon at the card step because they must re-enter details they have given before". The first is a solution; the second leaves room for remembering details without storing a card.

### Say what you would do differently

If the rate were 4% rather than 42%, the answer changes. Write the threshold now so the decision is not renegotiated later.

## Practice

### Size one problem from existing evidence

Take a problem you already believe in and attach a rate, a unit cost and who bears it — using analytics, support logs and a handful of sessions if needed.

Done when: the problem has three numbers with their sources, and a stated threshold below which you would not act.

### Write the problem statement

Turn the sized evidence into one sentence naming the person, the goal and the obstacle, with no solution in it.

Done when: two different solutions are visibly possible from the sentence, and neither is mentioned.

## Common mistakes

- **Problems with no size** — the loudest story wins; fix: attach a rate and a unit cost.
- **Collapsing frequency and severity** — a blocker and an annoyance end up ranked together; fix: report both and rank explicitly.
- **Counting only the user's cost** — the support and partner costs vanish from the business case; fix: name everyone who pays.
- **A problem statement that names the solution** — the cheapest option is excluded before it is considered; fix: state the obstacle, not the feature.
- **No threshold** — the decision is argued again after the numbers arrive; fix: write the number below which you would not act.

## Go deeper

- **Product Discovery** (`product-process/product-discovery`) — the track this chapter opens.
- **Testing a solution cheaply** (`product-process/product-discovery/02-testing-a-solution-cheaply`) — what to do once the problem is sized.
- **User Research** (`design-ux/user-research`) — the methods that produce this evidence.
- **From findings to decisions** (`design-ux/user-research/04-from-findings-to-decisions`) — the same clustering and counting discipline.
