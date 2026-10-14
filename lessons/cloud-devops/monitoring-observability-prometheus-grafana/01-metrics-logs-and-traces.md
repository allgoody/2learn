---
title: Metrics, logs and traces
prereqs: ["cloud-devops/monitoring-observability-prometheus-grafana"]
---

## What it is

Three kinds of signal answer different questions. A metric is a number sampled over time and cheap enough to keep for months, which makes it the right tool for trends and thresholds. A log is a record of one event with as much detail as the author chose to include, which makes it the right tool for determining what happened in a specific case. A trace follows a single request through every service it touched, which makes it the right tool for finding where the time went. Observability is the practice of having enough of all three, joined by the same identifiers.

## Why it matters

Teams usually start with logs, because they are free, and then discover that the volume is unmanageable and the question they actually have — is this normal? — cannot be answered from a record of individual events. Metrics answer that question cheaply, but they are aggregated and lose the detail needed to diagnose a single failure. Traces supply the missing middle by showing the path and its timings. Choosing the signal by the question, rather than by which one already exists, is the skill.

## Core ideas

### Metrics are cheap, aggregated and good at trends

A metric is a named time series with labels that distinguish its dimensions. Because it is a number, it can be stored at high frequency for a long time and compared against a threshold. What it cannot do is tell you why: an error rate tells you something is failing, not which request or which customer.

```text
http_requests_total{route="/checkout", status="500"}  12
http_requests_total{route="/checkout", status="200"}  3418
```

### Labels make metrics powerful and expensive

Labels split a series into dimensions, and each distinct combination is a separate series. A label with unbounded values — a user identifier, a request identifier — creates an explosion of series that consumes memory and storage without answering anything. The rule is to label by dimensions you will group by: route, status, region, instance, never by identity.

### Logs should be structured, and sampled where they are voluminous

A structured log with consistent fields can be queried, counted and joined; a free-text line can only be read. High-volume informational logs are better sampled or summarised than stored in full, and detailed logs are better kept for a short window. Retention is a cost decision that should be made explicitly rather than by default.

### A trace shows the path and its timings

A request is given a correlation identifier at its entry point, and every service it passes through records a span with a start, a duration and a parent. The result is a tree that shows where time was spent and where the failure occurred, which is the only practical way to diagnose a problem spread across five services.

### The three join on identifiers

A trace identifier in a log line, and a metric broken down by route and status, let a single investigation move between the signals: the alert fires from a metric, the trace shows which step was slow, the logs for that step show the error. Without shared identifiers the three are separate systems and the investigation restarts in each.

Keeping every trace is expensive, so traces are sampled: a fraction of them, with more attention paid to errors and slow requests. Because the sampling decision is made at the entry point and propagated, a sampled request is complete rather than partially recorded. Knowing the sampling rate matters when a count from traces is compared with a count from metrics.

### Instrument what you will ask

The useful metrics are usually request rate, error rate, duration and saturation for each service, plus a small number of business-specific ones. A dashboard full of host CPU graphs answers a question nobody asked during the incident. Instrumenting the four golden signals first covers most incidents.

## Practice

### Add the four signals to one service

Instrument a service with request count, error count, latency and a saturation measure, each labelled by route and status.

Done when: a chart can show the error rate and latency for one route over an hour, and the label set contains no unbounded value.

### Follow one request

Take a request that crosses two services and record a correlation identifier in both services' logs, then follow it from the log line to the trace.

Done when: you can name every service the request touched and how long each step took.

## Common mistakes

- **Labelling a metric with a request or user identifier** — the series count explodes; fix: label by route, status and similar bounded dimensions.
- **Logging everything at high volume forever** — storage grows and nothing is found faster; fix: structure logs, sample the noisy ones and set retention deliberately.
- **Choosing a signal by convenience rather than by question** — the dashboard cannot answer what is being asked; fix: pick metrics for trends, logs for detail and traces for paths.
- **Tracing without propagating the identifier** — traces are partial and unusable; fix: propagate the correlation identifier through every call.
- **Instrumenting hosts instead of services** — the graph is green while the application fails; fix: instrument the request path and the four signals.

## Go deeper

- **Monitoring & Observability (Prometheus / Grafana)** (`cloud-devops/monitoring-observability-prometheus-grafana`) — the discipline these three signals make up.
- **Dashboards and alerting** (`cloud-devops/monitoring-observability-prometheus-grafana/02-dashboards-and-alerting`) — what to do with the signals once they exist.
- **Linux Administration** (`cloud-devops/linux-administration`) — the per-host log reading this scales up.
