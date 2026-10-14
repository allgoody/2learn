---
title: Cloud Cost Management
type: skill
topic: cloud-devops
tier: small
status: drafted
aliases: ["FinOps"]
prereqs: ["cloud-devops/aws"]
related: []
---

## What it is

Cloud cost management is the set of practices that keep a cloud bill proportionate to the value the cloud is delivering. The cloud removes the natural brake that capital spending used to provide: nobody signs a purchase order for an extra instance, so nothing stops one. The practices — right-sizing, commitments, budgets, alerts — replace that brake with measurement and intent.

## Why it matters

The bill is the only feedback loop the cloud gives you every month, and it reports on every decision made since the last one. Teams that do not read it accumulate idle resources, oversized machines and forgotten storage until the number becomes a board-level problem and the response is a hurried, harmful round of cuts. Teams that do read it usually find that a small number of recurring patterns — unattached disks, non-production running all night, data crossing regions for no reason — account for most of the waste. This is not an accounting exercise; it is a design review with a number attached.

## Core ideas

### Right-sizing starts from measured use

An instance is priced by its size, not by its load. Almost every fleet contains machines whose observed CPU and memory are a fraction of what they are provisioned for, and resizing them is the cheapest saving available because it requires no commitment and no architecture change. The method is dull and effective: measure peak usage over a representative period, choose the next size down that still clears it with headroom, and repeat. The same applies to storage volumes that were provisioned large and never shrunk.

```text
provisioned: 8 vCPU, 32 GB
observed peak: 1.4 vCPU, 6 GB
action: resize, keep headroom for a spike, re-measure next month
```

### Commitments trade flexibility for price

A provider will discount a workload whose shape is predictable in advance: a one- or three-year commitment for compute, or a committed spend level. The saving is large and the risk is real, because the commitment is paid whether or not the workload needs it. Use commitments for the stable floor of usage — the part that would run even on a quiet day — and let on-demand pricing cover everything above it.

### Non-production is the usual culprit

Development, staging and test environments are provisioned like production and used like offices: idle overnight, idle at weekends, idle during holidays. Scheduling them to stop outside working hours can remove most of their cost without touching production at all. This is the least controversial saving in the whole discipline, which is why it is a good first move.

### Budgets and alerts convert the bill into a signal

A budget states what you expect to spend on a scope; an alert fires when the forecast diverges from it. Set them per team or per environment, not only for the whole account, so the person who can act is the person who is told. An alert nobody can action is noise; an alert on the production account is a question someone can answer.

### Tagging is what makes the number divisible

A single account-wide total cannot be managed, because no one owns it. Tags for owner, environment and project let the same bill be split by the people who make the decisions, which is what turns reviewing it into a five-minute task. Requiring a minimal tag set at creation is far cheaper than attributing resources afterwards.

### Waste is often a design smell

An idle database replica, a queue with no consumer, a service nobody calls: each is a cost line and also an unanswered design question. Finding them via the bill is efficient, because the bill does not care about intent. Removing them is a small architectural cleanup that happens to pay for itself.

## Practice

### Find the largest waste in one account

Sort last month's bill by service and by resource where tags allow. Identify the three largest lines and, for each, decide whether the resource is right-sized, scheduled, committed or unused.

Done when: you can name one concrete change per line and its approximate monthly saving.

### Put a non-production environment on a schedule

Pick a development environment and define its running hours. Describe how it would stop and start automatically and who would notice if it failed to start.

Done when: the schedule names the hours, the owner and the fallback, and you can estimate the fraction of the month it saves.

## Common mistakes

- **Sizing by guess and never revisiting** — provisioned capacity drifts far above use; fix: measure peak use on a schedule and resize.
- **Buying commitments for the whole estate** — a workload changes and the commitment cannot; fix: commit only the stable floor and pay on demand above it.
- **Leaving non-production running continuously** — it costs nearly as much as production and delivers nothing at night; fix: schedule it to the hours it is used.
- **Setting one account-wide budget** — no team can see or act on its own share; fix: budget and alert per environment or team.
- **Creating resources without owner tags** — cost cannot be attributed and waste cannot be assigned; fix: require a minimal tag set at creation.

## Go deeper

- **AWS** (`cloud-devops/aws`) — the account and services whose usage this bill records, so read it first.
- **Identity and cost** (`cloud-devops/aws/04-identity-and-cost`) — the permissions that decide who may create the cost, and the tags that attribute it.
- **Terraform** (`cloud-devops/terraform`) — declaring infrastructure in code so a wasted resource is visible in a diff rather than only in the bill.
