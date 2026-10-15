---
title: Prioritization Frameworks (RICE / MoSCoW)
type: skill
topic: product-process
tier: small
status: drafted
aliases: ["RICE", "MoSCoW"]
prereqs: ["product-process/product-management"]
related: []
---

## What it is

A prioritization framework is a scoring aid for turning a wish list into an argued order. RICE scores each candidate as reach times impact times confidence, divided by effort. MoSCoW sorts candidates into must, should, could and will-not. Both produce an artefact — a ranked list — and both are wrong on their own.

## Why it matters

Teams routinely rank by loudness, by who asked last or by what is easiest to estimate. A framework replaces that with numbers that can be inspected and challenged, and it forces the awkward inputs into the open: how many people does this reach, how confident are we really, and what does it cost. The failure mode is a score treated as a verdict. A number computed from four guesses is a conversation starter, never a decision.

## Core ideas

### Score the candidates in one table

Use the same scale for every row, and mark the estimates that are guesses.

```text
Item                     R      I     C     E    Score
A  refunds and status    900    3     0.8   2     1080
B  saved card details   1900    2     0.6   1     2280
C  bulk order export     300    2     1.0   3      200
D  multi-currency        700    3     0.2   5       84

R = people per month  I = impact 0.5-3  C = confidence 0-1  E = effort in months
Score = R x I x C / E
```

The table immediately shows the two useful facts: B is the cheapest large win, and C is the item everyone feels certain about, which is exactly why confidence is a separate column.

### Then override the score with judgement, and say why

The formula cannot see the things that decide real work: a contractual commitment, a dependency that unblocks two other items, a legal risk, or a one-off strategic bet.

```text
Score says  build B (2280) before D (84).
Judgement   D ships first anyway:
            - the EU invoice rule takes effect in July, so D is a deadline
            - B's confidence is inflated: two of three teams have not tested it
            Decision: D this quarter, B next, and B's confidence re-checked.
```

The override is the point of the exercise, not a failure of it. A framework that is never overridden is not being used for judgement; it is being used instead of it.

### MoSCoW needs a fixed constraint to mean anything

Must, should and could are only meaningful against a stated capacity. Without one, everything is a must and the method collapses.

```text
Release: 6 developer-weeks.
Must (5w)   refunds, refund status  -- release is not valid without them
Should (1w) saved card details      -- painful to omit, but shippable
Could       bulk export, multi-currency
Will not    dashboard redesign this release
```

### Confidence is where the lies hide

Teams over-score confidence on items they want. Require a basis for it: tested with users, seen in analytics, or a guess. A guess is 0.5 at most.

### Recompute when the inputs change, not when the answer is unwelcome

Re-score when the evidence changes and write the new inputs. Re-scoring because the output was inconvenient is how the framework loses credibility.

## Practice

### Score four real candidates

Take four items from your backlog, agree the reach and effort figures from data, and produce the table.

Done when: at least one score is overridden by a stated judgement reason, and the override names what would have to change for the score to win.

### Write a MoSCoW release plan with a stated capacity

State the capacity first, then sort the items into the four buckets and name what is excluded.

Done when: the must bucket fits inside the capacity and the will-not list is non-empty.

## Common mistakes

- **Treating the score as a verdict** — a number built from guesses decides real money; fix: override with judgement and record the reason.
- **Confidence scored by wish** — the item the team wants scores highest; fix: require a basis for every confidence value.
- **MoSCoW with no capacity** — everything is a must; fix: state the release capacity first.
- **Different scales per row** — the comparison is meaningless; fix: one scale across the table.
- **Re-scoring to get the answer you wanted** — the framework loses its credibility; fix: recompute only when the inputs changed.

## Go deeper

- **Product Management** (`product-process/product-management`) — read this first; this is a tool for the ordering that role owns.
- **The decision role** (`product-process/product-management/01-the-decision-role`) — the goal the ranking serves.
- **Saying no** (`product-process/product-management/04-saying-no`) — what to do with the items that did not make the top.
- **Roadmapping** (`product-process/roadmapping`) — where the ranked items get placed in time.
