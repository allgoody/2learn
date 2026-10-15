---
title: Monitoring & Observability (Prometheus / Grafana)
type: skill
topic: 06-cloud-devops
tier: medium
status: drafted
aliases: ["Prometheus", "Grafana"]
prereqs: ["06-cloud-devops/09-linux-administration"]
related: []
---

## What it is

Monitoring is collecting signals about a running system; observability is having enough of them, joined together, to answer a question you did not anticipate. The signals are metrics, which are cheap numeric samples over time; logs, which are discrete events with detail; and traces, which follow one request across many services. Prometheus is the common metrics store and Grafana the common way of drawing the results, but the discipline is larger than either tool.

## Why it matters

Without these signals you learn about failures from users, and you diagnose them by guessing. With them, the first question after any incident — what changed, and what was it doing at the time — has an answer. That answer is what separates a five-minute fix from an afternoon of conjecture, and it is also what lets a team improve a system deliberately rather than only reacting to it. The cost is real: metrics cost storage, logs cost more, and an unmanaged alerting setup produces noise that trains people to ignore it.

## In this track

1. **Metrics, logs and traces** (`06-cloud-devops/18-monitoring-observability-prometheus-grafana/01-metrics-logs-and-traces`) — what each signal is good at and how they are joined.
2. **Dashboards and alerting** (`06-cloud-devops/18-monitoring-observability-prometheus-grafana/02-dashboards-and-alerting`) — turning signals into answers and into alerts worth waking someone for.

## Prerequisites

- **Linux Administration** (`06-cloud-devops/09-linux-administration`)

## Go deeper

- **Linux Administration** (`06-cloud-devops/09-linux-administration`) — the host-level reading of logs this track scales up, so read it first.
- **Site Reliability Engineering** (`06-cloud-devops/23-site-reliability-engineering`) — how these signals become explicit reliability targets.
- **Istio** (`06-cloud-devops/22-istio`) — a mesh that produces per-route metrics without instrumenting each service.
