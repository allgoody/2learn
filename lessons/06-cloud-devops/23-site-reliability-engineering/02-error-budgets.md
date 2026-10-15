---
title: Error budgets
prereqs: ["06-cloud-devops/23-site-reliability-engineering/01-service-level-objectives"]
---

## What it is

An error budget is the amount of failure an objective permits: a 99.9 percent target over thirty days allows about forty-three minutes of unavailability, and that allowance is a budget. It is spent by incidents, deployments and experiments. When it is exhausted, the team's priority shifts from shipping features to restoring reliability, and the rule is agreed in advance rather than argued about during an outage.

## Why it matters

The budget is what turns a reliability target from a statement into a governance mechanism. It gives product and operations a shared number to reason about, and it resolves the recurring argument — how much reliability is enough — without either side having to win. It also makes risk-taking deliberate: a team can spend the budget on a risky migration knowingly, rather than pretending the risk does not exist. The alternative is the familiar cycle of feature pressure until an outage, followed by a freeze and an over-correction.

## Core ideas

### A budget is a rate, not a reserve

The budget refills as the window rolls forward. A team that spends it in the first week has a quiet remainder, and one that spends nothing is not necessarily doing well — it may be spending nothing because it ships nothing. The useful reading is the trend and the rate of spend, not the single number for today.

```text
99.9% target over 30 days -> about 43 minutes
spend 30 minutes in one week -> slow down until the window rolls
```

### Exhaustion changes priority, not blame

The rule is that when the budget is gone, reliability work takes precedence over new features until it is restored. That is a policy decision made when everyone is calm. Applied during an incident it becomes an accusation, which is why the policy must pre-exist the moment it is invoked.

### Every deployment spends some budget

Releasing adds risk; that is why the budget exists rather than being avoided. A team can spend deliberately on a change likely to break something, in exchange for not spending it elsewhere. Measuring deployment-related failures against the budget is how the cost of a risky change becomes visible before it is made.

### Frozen is not the same as fixed

When the budget runs out, the work is to find and remove the cause of the spend, not simply to stop deploying. A freeze that does not repair anything leaves the system exactly as fragile and delays the next release. The budget's value is in directing that work, so a freeze without a cause is a wasted quarter.

### The budget informs alerting thresholds

If the objective permits a small error rate over a long window, an alert should not fire for a rate that is inside the budget. Conversely, a fast burn that would exhaust the budget in hours deserves a page. This is where the objective becomes practical: the alert threshold is derived from the budget's burn rate, not from the shape of yesterday's graph.

### It needs an owner who can change the target

A budget nobody owns is a number nobody obeys. Someone has to be accountable for both enforcing it and revising it when the business changes. If the target can never be raised or lowered, the mechanism becomes a trap rather than an agreement.

## Practice

### Compute a budget and its burn

For a service with a stated objective, calculate the allowed failure time in a thirty-day window, then state the error rate that would exhaust it in six hours.

Done when: you can name the rate that justifies a page and the rate that does not.

### Write the exhaustion policy

Write down what the team does when the budget is exhausted: who decides, what work takes priority, and how the budget is restored.

Done when: the policy names a decision-maker and a concrete first action, and it was written before the budget was spent.

## Common mistakes

- **Treating the budget as a reserve to hoard** — spending nothing means shipping nothing; fix: spend it deliberately on changes that carry risk.
- **Invoking the policy as blame** — the argument becomes personal and the rule is abandoned; fix: agree the policy in advance and apply it automatically.
- **Freezing without fixing** — the system is exactly as fragile after the freeze; fix: use the budget's exhaustion to direct reliability work.
- **Ignoring the budget when setting alerts** — alerts fire inside the allowed failure rate and lose credibility; fix: derive thresholds from the burn rate.
- **Leaving the budget unowned** — nobody enforces or revises it; fix: name an owner accountable for the target and the policy.

## Go deeper

- **Service level objectives** (`06-cloud-devops/23-site-reliability-engineering/01-service-level-objectives`) — the target whose shortfall this budget measures.
- **Site Reliability Engineering** (`06-cloud-devops/23-site-reliability-engineering`) — the practice the budget governs.
- **Dashboards and alerting** (`06-cloud-devops/18-monitoring-observability-prometheus-grafana/02-dashboards-and-alerting`) — where a budget's burn rate becomes an alert that is worth acting on.
