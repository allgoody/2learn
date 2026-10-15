---
title: The evidence behind a decision
prereqs: ["04-product-process/03-product-management/02-working-with-engineering-and-design"]
---

## What it is

The evidence behind a decision is the reason the team believes this work will cause the outcome it wants, written down far enough in advance to be wrong. It is a prediction with a measure attached, not a justification written after the fact.

## Why it matters

Most product decisions are made on the strength of an argument rather than a fact: a competitor has the feature, a customer asked, the chief executive read an article. Each of those can be a real signal, but only when it is attached to evidence about this product's users. Writing the prediction first is also what makes the portfolio self-correcting: a team that records what it expected learns from the twenty decisions a year instead of from the two that were spectacular.

## Core ideas

### Three levels of evidence, in order of strength

Behaviour seen in your product, behaviour observed in research, and opinion — including the opinion of important people. Use the strongest available and say which you used.

```text
Behaviour in product   42% of repeat buyers abandon at the card step
Research               6 of 8 participants re-entered cards rather than saving
Opinion                "customers keep asking for saved cards"
```

The third is not worthless; it is just the weakest, and the reason to design a way to test it.

### Write the prediction before the build

One sentence, with a measure and a threshold. It converts the plan into something that can fail, which is the point.

```text
We expect remembering card details for repeat buyers to raise repeat
checkout completion from 58% to at least 65% within four weeks.
If it does not move, we stop rather than add prompts.
```

### Separate the problem evidence from the solution evidence

Research that shows people struggle does not show that your solution works. Two different claims, two different studies.

### Record the counter-evidence

What you found that argues against the decision. A brief that contains only supporting facts is advocacy, and it hides the risk that will materialise.

### Revisit the prediction on the date, and write down the outcome

One line per decision, whether it worked or not. The record is the asset.

## Practice

### Write a decision brief for one item

One page: the goal, the evidence and its level, the alternatives, the prediction with its measure, the counter-evidence.

Done when: everyone reading it can say what would prove the decision wrong.

### Log the outcome of three past decisions

Take three decisions from the last six releases and record what was predicted, what happened, and whether the evidence level predicted the result.

Done when: at least one record shows a decision made on opinion alone and what that cost.

## Common mistakes

- **Argument treated as evidence** — the loudest case wins and nothing is learned; fix: name the level of evidence for every claim.
- **The prediction written after the result** — hindsight makes every decision sound; fix: write the measure and threshold before the build.
- **Research evidence used to justify a solution** — the two claims are conflated; fix: separate what the problem evidence and the solution evidence each support.
- **Only supporting facts in the brief** — the risk is hidden until it materialises; fix: record the counter-evidence.
- **No outcome record** — the team repeats its mistakes at scale; fix: one line per decision with what actually happened.

## Go deeper

- **Working with engineering and design** (`04-product-process/03-product-management/02-working-with-engineering-and-design`) — the people who challenge the evidence.
- **Saying no** (`04-product-process/03-product-management/04-saying-no`) — what the evidence lets you refuse.
- **Product Management** (`04-product-process/03-product-management`) — the track this chapter belongs to.
- **Product Discovery** (`04-product-process/04-product-discovery`) — the dedicated work of gathering this evidence before committing.
