---
title: Lean UX
type: skill
topic: design-ux
tier: small
status: drafted
aliases: []
prereqs: ["design-ux/user-centered-design"]
related: []
---

## What it is

Lean UX replaces a long upfront specification with short cycles: state what you believe, build the smallest thing that tests it, measure what happened, then decide whether to keep going. The design artefact stops being the deliverable; the learning is.

## Why it matters

A specification written months before release is a set of guesses that get more expensive to correct the further they travel. Lean UX moves the correction to the point where it costs an afternoon. It also fits how software teams already work: instead of a design phase that hands over and ends, design continues alongside delivery, and the team's own work generates the evidence. The risk it introduces is churn, which is why the hypothesis has to be written down before the build starts.

## Core ideas

### Write the hypothesis before the build

State the belief, the measurable outcome and the threshold together. Vague intent cannot be falsified, and an unfalsifiable hypothesis is a plan with better vocabulary.

```text
We believe: new buyers abandon checkout at the address step
because it asks for a phone number.
We will know we are right when: completion rises above 60%
in the cohort that sees the optional-phone variant.
```

Write it on the wall, not in a private document; the threshold is what prevents the redefinition of success afterwards.

### Small batches, short cycles

Split work so each cycle can be finished and judged within a week or two. Big batches hide which part changed the outcome, and a batch that takes a quarter cannot be re-planned inside that quarter.

### Outcome over output

Count behaviour, not features shipped. "Three releases launched" is output; "task completion rose from 48% to 61%" is an outcome. Teams measure output because it is easy to count, which is exactly why the habit has to be written into the goal.

### Build, measure, learn as one loop

Each cycle ends with a decision: persevere, change one variable, or stop. A cycle that ends with a demo and no decision has produced a feature, not learning — and the next cycle will repeat it.

## Practice

### Turn a feature request into a hypothesis

Take the next item on your backlog. Rewrite it as a belief, an outcome measure and a threshold, then name the smallest build that would test it.

Done when: a colleague can read your statement and say what result would prove it false.

### Run one full cycle and write the decision

Ship the smallest version within a week, record the measure before and after, and write one paragraph: what you believed, what happened, what you will do next.

Done when: the paragraph ends in a decision — persevere, change, or stop — with the next cycle's hypothesis named.

## Common mistakes

- **A hypothesis with no threshold** — any result can be read as success after the fact; fix: write the number and the date in advance.
- **Measuring output** — the team reports velocity and features shipped while the outcome stalls; fix: put one behaviour measure on the wall next to the backlog.
- **Cycles too large to re-plan** — the batch outlives the evidence and gets finished anyway; fix: split until a cycle fits inside two weeks.
- **Skipping the measure** — the build ships straight into the next build and nothing is learned; fix: treat the measurement as part of the work item, not an optional follow-up.
- **Calling it lean and cutting the research** — assumptions get cheaper to test but are tested without evidence about the people; fix: keep the user contact from the earlier cycle rather than replacing it with analytics alone.

## Go deeper

- **User Centered Design** (`design-ux/user-centered-design`) — the source of the task and constraint evidence each cycle tests against.
- **A/B Testing** (`design-ux/ab-testing`) — how to run the measurement half of a cycle credibly.
- **Quantitative UX Research** (`design-ux/quantitative-ux-research`) — choosing outcome measures that mean something.
- **Prototyping** (`design-ux/prototyping`) — the smallest artefact that can answer a cycle's question.
