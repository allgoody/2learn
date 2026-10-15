---
title: Data and machine learning
prereqs: ["06-cloud-devops/04-google-cloud-platform-gcp"]
---

## What it is

This is the part of GCP that exists because Google analyses an enormous amount of data and trains models on it. It spans storage for analytical data, engines that answer queries over billions of rows, pipelines that move and transform data on a schedule, and services that train and serve models. The pieces are designed to fit together, which is unusual: elsewhere the same pipeline is assembled from products that were not built as a set.

## Why it matters

Most cloud migrations make the same discovery: the awkward part is not the servers, it is the data. A pipeline that reads from one store, transforms in another and serves from a third accumulates glue code, credentials and failure modes at every seam. Where the whole chain is one provider's, the seams are thinner and the identity model is uniform. That is worth real money on data-heavy work, and it is worth almost nothing on a workload that mostly serves web pages — which is the distinction to make before choosing.

## Core ideas

### Separate storage from compute

Analytical systems here follow the same split the rest of the cloud uses: keep data in a durable, cheap store and pay for query engines only while they run. This is why a warehouse can be idle at near-zero cost and why the size of the query, not the size of the data, sets the bill. It also makes the same data readable by several engines instead of locking it into one.

```text
object storage (durable, cheap)  ->  query engine (billed while running)  ->  result
```

### Columnar storage changes what queries cost

Data stored by row is cheap to write one record and expensive to scan one field; stored by column it is the opposite. Analytics reads a few fields across many records, so a columnar format can reduce the bytes read — and therefore the bill — by an order of magnitude. Choosing the format is choosing the query cost.

### Pipelines are dependencies, and dependencies fail late

A data pipeline is a graph of steps with schedules and retries. The failure that hurts is not a crash but a silent one: a table that stops being updated, a partition that arrives empty, a job that succeeds while producing nothing. Pipelines need freshness checks and alerts on the data itself, not only on the job's exit code.

### Managed models turn training into a configuration problem

For common tasks the platform offers pre-trained or configurable models, so a team can get a working result without a machine-learning specialist. That is genuinely useful and it is also a constraint: when the task is unusual the managed path ends and the unmanaged one — provision accelerators, manage a training loop — begins. Knowing where that boundary is prevents a project from discovering it late.

### The strong ground is also the narrow ground

These services are excellent at what they were built for and comparatively thin outside it. The provider's enterprise administration, directory integration and desktop tooling lag the others. That is the trade: buy depth in data and accept less breadth everywhere else.

## Practice

### Price one query two ways

Take a table of events with a timestamp, a user and an amount. Write the query that totals amounts per user per day, then describe what a row-oriented store would have to read to answer it.

Done when: you can name the columns the query actually needs and why reading only those columns is cheaper.

### Add a freshness check

Describe a scheduled pipeline that loads yesterday's events. Add the check that fires when the load succeeded but the data is empty.

Done when: the check fails on an empty partition rather than on a job error, and you can say who is told.

## Common mistakes

- **Keeping analytical data in a row-oriented store** — every query scans columns it does not need; fix: store analytics in a columnar format.
- **Running a query engine continuously** — compute is billed whether or not it is queried; fix: separate storage from compute and scale the engine with use.
- **Alerting only on job exit codes** — pipelines can succeed while producing nothing; fix: assert on the data's freshness and shape.
- **Assuming the managed model covers the real task** — the boundary arrives mid-project; fix: check the task against the available models before committing.
- **Choosing the provider for data work and expecting breadth elsewhere** — the gaps show up in administration; fix: accept the trade or split the estate deliberately.

## Go deeper

- **Google Cloud Platform (GCP)** (`06-cloud-devops/04-google-cloud-platform-gcp`) — the provider these services belong to.
- **Kubernetes and managed platforms** (`06-cloud-devops/04-google-cloud-platform-gcp/02-kubernetes-and-managed-platforms`) — the other half of this provider's strongest ground.
- **Monitoring & Observability (Prometheus / Grafana)** (`06-cloud-devops/18-monitoring-observability-prometheus-grafana`) — how pipelines and models are watched once they run.
