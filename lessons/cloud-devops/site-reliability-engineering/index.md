---
title: Site Reliability Engineering
type: skill
topic: cloud-devops
tier: medium
status: drafted
aliases: ["SRE"]
prereqs: ["cloud-devops/monitoring-observability-prometheus-grafana"]
related: []
---

## What it is

Site reliability engineering is the practice of stating how reliable a service needs to be, measuring whether it is, and making that measurement the arbiter of when to ship features and when to fix the system. The central tool is the service level objective: a target such as "99.9 percent of requests succeed within 300 milliseconds". The difference between the target and perfect reliability is the error budget, which is spent as failures occur and which decides what the team works on next.

## Why it matters

Without an explicit target, "is it reliable enough" is answered by whoever is loudest after the last outage. One group pushes for more features, another for more resilience, and the argument is settled by anecdote. A target converts that into arithmetic: if the service is within budget, ship features; if the budget is exhausted, fix reliability first, and everyone already agrees on the rule. It also prevents the equally expensive mistake of over-investing in reliability a product nobody depends on at that level actually needs.

## In this track

1. **Service level objectives** (`cloud-devops/site-reliability-engineering/01-service-level-objectives`) — choosing a target that measures what users experience.
2. **Error budgets** (`cloud-devops/site-reliability-engineering/02-error-budgets`) — spending and enforcing the budget, and what happens when it runs out.

## Prerequisites

- **Monitoring & Observability (Prometheus / Grafana)** (`cloud-devops/monitoring-observability-prometheus-grafana`)

## Go deeper

- **Monitoring & Observability (Prometheus / Grafana)** (`cloud-devops/monitoring-observability-prometheus-grafana`) — the measurement this practice depends on, so read it first.
- **Linux Administration** (`cloud-devops/linux-administration`) — the operational reality the targets have to be achievable within.
- **CI/CD** (`cloud-devops/ci-cd`) — the delivery speed an error budget is meant to govern.
