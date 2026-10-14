---
title: Designing for serverless
prereqs: ["cloud-devops/serverless-computing/01-functions-and-managed-runtimes"]
---

## What it is

Designing for serverless means choosing a system shape that the model rewards: small independent units triggered by events, state in managed stores, retries assumed rather than fought, and identities instead of secrets. It is less a set of services than a set of habits, and they are the same habits that make any distributed system easier to operate — which is why they are worth learning even if the eventual deployment is containers.

## Why it matters

The failure modes of a serverless system are concentrated in the seams. A function that runs twice because a message was retried charges twice and may send two emails. A step that times out after doing half its work leaves an inconsistent state. A fan-out to a thousand invocations hits a concurrency limit and the overflow is dropped. None of these are exotic; they are the ordinary consequences of a system with no single machine to reason about. Designing for them up front costs far less than discovering them under load.

## Core ideas

### Retries make every handler a potential duplicate

A queue may deliver a message more than once and a platform may retry a failed invocation. Any handler that changes something must therefore be safe to run twice: record that the work was done, keyed on the event, before or with the change. The alternative is duplicate charges, duplicate emails and duplicate rows, which are exactly the bugs that erode trust in an event-driven design.

```text
event id -> idempotency record -> if seen, stop
                             -> else do the work and record the id
```

### Prefer orchestrated steps to one long function

Splitting work into steps that each finish quickly gives retries a sensible granularity, makes partial progress visible, and lets a failure resume rather than restart. A platform-orchestrated workflow does the step tracking; a queue-and-handler chain does it yourself. Either way the design rule is the same: each step's output is durable before the next step begins.

### Concurrency limits are a real ceiling

Serverless platforms cap how many invocations run at once, and hitting the cap causes throttling rather than queuing. A design that assumes unbounded parallelism breaks precisely when demand is highest. Where a burst is expected, put a queue in front so the work is absorbed at a rate the downstream services can take.

### Cold starts are a latency budget line

Initialisation cost is paid on cold invocations, so a heavy framework or a large dependency tree shows up as tail latency. Keeping the handler small, trimming dependencies and warming where the platform allows all reduce it. The goal is not to eliminate cold starts but to keep them inside the latency the caller can tolerate.

### Observability is not optional when there is no host

There is no machine to log into, so the evidence comes from structured logs, metrics and traces emitted by the code itself. Correlating a request across a function, a queue and a database call requires an identifier propagated through the whole path. Instrumenting early is much easier than reconstructing a failure after the fact.

### The model is a spectrum, not a binary

Between a virtual machine and a per-request function sit containers on managed platforms and functions with reserved capacity. Each trades some scaling efficiency for some predictability. Choosing per workload rather than adopting a single answer for the whole estate keeps the cost advantages without the constraints.

## Practice

### Make a handler safe to retry

Take a handler that writes a row and sends an email. Add an idempotency record keyed on the event id and describe what happens when the same event arrives twice.

Done when: the second delivery performs no write and sends no email, and you can point at the record that proved it.

### Absorb a burst with a queue

Describe a function that fans out to a downstream service with a concurrency limit. Insert a queue and a consumer so the burst is drained at a sustainable rate.

Done when: you can state the maximum in-flight invocations and what happens to a message that fails repeatedly.

## Common mistakes

- **Assuming a handler runs exactly once** — retries duplicate side effects; fix: make the handler idempotent on the event id.
- **Putting a whole workflow in one invocation** — a failure restarts it from the beginning and the timeout looms; fix: split into durable steps.
- **Fanning out without a queue** — the concurrency limit throttles exactly when load peaks; fix: buffer the work and drain it at a safe rate.
- **Ignoring cold-start cost** — tail latency rises with dependency size; fix: keep the handler small and measure the cold path.
- **Debugging from ad-hoc prints** — there is no host to inspect; fix: emit structured logs and propagate a correlation id.

## Go deeper

- **Functions and managed runtimes** (`cloud-devops/serverless-computing/01-functions-and-managed-runtimes`) — the building blocks this design is assembled from.
- **Serverless Computing** (`cloud-devops/serverless-computing`) — the model and its trade-offs.
- **Monitoring & Observability (Prometheus / Grafana)** (`cloud-devops/monitoring-observability-prometheus-grafana`) — metrics, logs and traces, which are the only view into a serverless system.
