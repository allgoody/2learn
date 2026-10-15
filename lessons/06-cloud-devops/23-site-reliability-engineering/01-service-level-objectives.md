---
title: Service level objectives
prereqs: ["06-cloud-devops/23-site-reliability-engineering"]
---

## What it is

A service level indicator is a measurement of something users care about. A service level objective is a target for that measurement over a period. A target has to be a number, a window and a scope: the proportion of requests that succeed, over thirty days, for a named service. The objective is a business statement expressed in a measurable way, not a description of the system's internal health.

## Why it matters

A target is how reliability becomes a decision rather than an opinion. Without one, a page at three in the morning is justified by whoever set the alert, and the question "should we ship the feature or fix the database" is a personality contest. With one, the answer is arithmetic, and the argument moves to a much more productive question: is this the right target? Naming a target also forces the team to decide what users actually experience, which is frequently not what the internal dashboards measure.

## Core ideas

### Measure what the user experiences, not what the system reports

The indicator should be success rate, latency or availability as a user would perceive it, measured at the closest point to the user that is practical. A service that is responding quickly but returning errors has good system health and bad user outcomes. A service that is up but unusably slow fails the user just as completely.

```text
indicator: proportion of requests served successfully within 300 ms
objective: 99.9% over a rolling 30 days
scope:     the checkout service, excluding internal health checks
```

### The target is a choice about cost, not a measurement of quality

Going from 99.9 to 99.99 percent usually costs far more than ten times the effort, because it removes the freedom to deploy without a rehearsal and to fail and recover. A target should be the level users notice and no more, and it should be agreed with the people who depend on the service rather than set unilaterally by the operators. Many products are perfectly successful at a much lower figure.

### Aggregation hides the interesting cases

An average across all requests hides the slowest ones and the unluckiest users. Averages of averages over several instances hide an instance that is failing. Latency objectives should be stated as a proportion within a threshold rather than a mean, so that a long tail counts against the objective rather than being averaged away.

### A new service starts by borrowing a target

Choosing a target for something with no users is guesswork. The practical approach is to adopt the platform's or a sibling service's target, measure the actual behaviour for a period, and then set one informed by that. The target is a living agreement, revisited as the service matures, not a figure fixed at design time.

### The objective must be measured from a real signal

If the indicator cannot be computed from data already being collected, it will not be monitored. That is the link back to observability: an objective that requires a measurement nobody keeps is a wish. It also argues for choosing indicators that the existing metrics can already express.

### Fewer objectives, clearly owned

One or two per user-visible interaction is enough. A list of twenty objectives is a description of the system, not a set of promises, and nobody will act on it. Each objective should have a named owner who is accountable for meeting it and for changing it when the agreement changes.

## Practice

### Write one objective for a real service

Choose a service you know and write its indicator, target, window and scope in a single sentence, then check that the metric exists.

Done when: you can state the indicator, the number, the period and the scope, and point at the data that computes it.

### Find the indicator's blind spot

Take an existing objective and describe a user-visible failure it would not catch.

Done when: you can name at least one failure mode the objective misses, and decide whether that is acceptable.

## Common mistakes

- **Measuring internal health instead of user experience** — the dashboard is green while users fail; fix: state the indicator as the user would perceive it.
- **Setting the target unilaterally and very high** — the cost is enormous and the value is unproven; fix: agree the target with the consumers and set it to what they need.
- **Using averages** — the slowest requests and the unluckiest users disappear; fix: measure the proportion within a threshold.
- **Writing many objectives nobody owns** — the list is not a promise; fix: one or two, each with a named owner.
- **Choosing an indicator with no data behind it** — the objective is never measured; fix: choose metrics the observability stack already collects.

## Go deeper

- **Site Reliability Engineering** (`06-cloud-devops/23-site-reliability-engineering`) — the practice these objectives are the foundation of.
- **Error budgets** (`06-cloud-devops/23-site-reliability-engineering/02-error-budgets`) — what a target implies for how the team spends its time.
- **Monitoring & Observability (Prometheus / Grafana)** (`06-cloud-devops/18-monitoring-observability-prometheus-grafana`) — where the indicator is actually measured.
