---
title: Dashboards and alerting
prereqs: ["cloud-devops/monitoring-observability-prometheus-grafana/01-metrics-logs-and-traces"]
---

## What it is

A dashboard is a set of charts answering a question someone actually has; an alert is a rule that decides a human should act. Both are built from the same signals, and both fail in the same way: by answering a question nobody asked, or by firing so often that nobody looks. The craft is in choosing a small number of each, so that a glance is informative and a notification is meaningful.

## Why it matters

An on-call rotation is only as good as its alerts. An alert that fires on a symptom a person can act on is valuable; one that fires on a cause nobody can influence trains the team to ignore notifications, and the next real one is missed. Dashboards have the same problem in slower motion: a wall of host metrics looks like diligence and tells you nothing about whether users are being served.

## Core ideas

### Alert on symptoms users feel, not on causes

The useful alerts name a condition the user experiences — the error rate is high, requests are slow, a queue is not draining. Cause-based alerts such as high CPU may precede trouble, but CPU can be high for good reasons and low while the service fails. Symptom alerts are rarer and almost always worth acting on.

```text
alert: error rate over five minutes exceeds 2% for this service
not:   cpu above 80% somewhere
```

### Every alert needs an owner and an action

If the recipient cannot act, the alert is a notification and belongs elsewhere. If nobody owns the service, the alert has no recipient and belongs nowhere. Writing the intended action next to the rule is a surprisingly effective filter: rules with no describable action are usually deleted.

### Thresholds need to reflect the tolerance, not the average

An alert at twice the normal rate fires on every ordinary peak; one set at ten times normal fire only when the situation is already severe. Deriving the threshold from the service's reliability target, rather than from the shape of last week's chart, gives a number that survives traffic growth.

### Rate, error, duration and saturation cover most incidents

For each service, the request rate shows load, the error rate shows failure, the duration shows user-visible slowness, and saturation shows a resource approaching a limit. Building these first, for every service, answers more incidents than a large collection of host-specific rules.

### Dashboards should be layered

An overview for the whole system, a middle layer per service with the four signals, and detail for drill-down. The overview answers "is anything wrong" in seconds; the detail answers "where". A dashboard that begins at detail is unusable under pressure.

An alerting system that has never fired has not been tested. Rules that can be exercised deliberately, and a routine of checking that notifications arrive, are what make the system trustworthy when it matters. The same applies to a dashboard nobody has looked at since it was created.

### Alerts age and accumulate

Every rule outlives the incident that motivated it. Reviewing the set periodically, deleting what no one acts on and merging duplicates keeps the remainder credible. An alerting system's value is inversely proportional to its noise.

## Practice

### Write one symptom alert from a target

Take a service with a stated reliability target and write one rule that fires when the error rate for five minutes exceeds the tolerance implied by that target.

Done when: the rule names the service, the threshold, the window and the action the recipient should take.

### Reduce a dashboard to the four signals

Take an existing dashboard and replace it with an overview of the four signals for each service, keeping the old one available for drill-down.

Done when: a person unfamiliar with the system can tell from the overview alone whether the system is healthy.

## Common mistakes

- **Alerting on causes rather than symptoms** — the alert fires without a user-visible problem and loses credibility; fix: alert on what users experience.
- **Firing on every ordinary peak** — the team learns to ignore notifications; fix: derive thresholds from the reliability target, not from last week's chart.
- **Creating an alert nobody can act on** — it becomes noise; fix: give every rule an owner and a written action, or delete it.
- **Building detailed dashboards first** — the overview is unusable under pressure; fix: layer overview, service, detail.
- **Leaving the alert set unreviewed** — stale rules accumulate and dilute the ones that matter; fix: review and delete regularly.

## Go deeper

- **Metrics, logs and traces** (`cloud-devops/monitoring-observability-prometheus-grafana/01-metrics-logs-and-traces`) — the signals these charts and rules are built from.
- **Monitoring & Observability (Prometheus / Grafana)** (`cloud-devops/monitoring-observability-prometheus-grafana`) — the discipline these two practices belong to.
- **Site Reliability Engineering** (`cloud-devops/site-reliability-engineering`) — where the reliability target that every threshold here derives from is defined.
