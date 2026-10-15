---
title: Agile Software Development
type: skill
topic: product-process
tier: small
status: drafted
aliases: []
prereqs: ["product-process/agile-methodology"]
related: []
---

## What it is

Agile software development is the values applied concretely by one engineering team: trunk-based work, small changes merged often, automated tests, a build that is deployable at the end of every iteration, and a preference for solving the problem in front of them over building for the problem they imagine. The difference from Agile Methodology is the level — that entry is the values and their trade-offs; this one is what an engineering team's week actually looks like when the values are taken seriously.

## Why it matters

Values do not ship software. A team can agree with every principle and still integrate once a month, which means the feedback loop is a month long whatever the iteration is called. The engineering practices below are what make the iteration boundary real: you cannot demonstrate working software at the end of two weeks if nobody has merged in eleven. They also decide whether the team can respond to change at all — a codebase that takes a week to release cannot respond to anything.

## Core ideas

### Integrate continuously, release on demand

Everyone merges to one branch at least daily, and the pipeline proves the build works. Without this, the iteration is a planning unit and the integration risk still lands once per release.

```text
Daily      merge to trunk, pipeline runs tests in under ten minutes
Per item   deployable; the decision to deploy is a business one
Per cycle  demonstrate something that runs on a real environment
```

### Small changes, reviewed quickly

A change that takes three days to review is a change that blocks two people. Keep changes small enough to review in an hour and review them the same day.

### Tests are the specification that survives

Acceptance tests state what the feature must do in a form that fails when it stops being true. Where a written specification would have been, the team keeps a test and a one-line decision record.

```text
Requirement  "refunds must not exceed the original payment"
Test         refund_of_more_than_paid_is_rejected
Record       one line: reason = chargeback liability
```

### The team owns the definition of done

Write it down and include the unglamorous parts: tests pass, deployed to a shared environment, observability in place, documentation updated. Without it, "done" means "works on my machine".

### Refactoring is delivered continuously, not scheduled

A team that needs a dedicated refactoring quarter is a team that has been deferring it every week. Budget a share of each iteration, not a phase.

## Practice

### Write your definition of done

List the conditions an item must meet before it counts as finished, and check the last three completed items against them.

Done when: every condition is either met by the last three items or written down as a gap with an owner.

### Measure your integration interval

For one week, record the longest gap between merges to trunk by a working pair or individual.

Done when: you know the longest gap and have named the one thing that stops it being shorter.

## Common mistakes

- **One integration per release** — the risk lands at the worst moment and the iteration is only a label; fix: merge to trunk daily.
- **Large, slow reviews** — change queues up and the feedback loop lengthens; fix: keep changes reviewable within an hour.
- **No written definition of done** — "finished" means "works on my machine"; fix: write the conditions and check items against them.
- **Refactoring deferred indefinitely** — the codebase loses the ability to respond to change; fix: allocate a share of every iteration.
- **Specifications that no one updates** — the tests and the code disagree with the document; fix: keep acceptance tests as the durable statement.

## Go deeper

- **Agile Methodology** (`product-process/agile-methodology`) — read this first; this entry is those values at engineering level.
- **Short iterations and feedback** (`product-process/agile-methodology/02-short-iterations-and-feedback`) — the cycle these practices keep honest.
- **Unit Testing** (`cs-fundamentals/unit-testing`) — the tests that make refactoring safe.
- **Continuous Integration and Delivery** (`cloud-devops/ci-cd`) — the pipeline that makes daily integration real.
