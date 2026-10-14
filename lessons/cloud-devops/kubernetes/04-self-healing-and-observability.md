---
title: Self-healing and observability
prereqs: ["cloud-devops/kubernetes/03-configuration-and-secrets"]
---

## What it is

Self-healing is the cluster noticing that reality no longer matches what you declared — a pod died, a node vanished, a process stopped answering — and acting to restore it. Observability is how you learn that this happened and whether it succeeded. The first is the feature that makes an orchestrator worth its complexity; the second is the thing that keeps that feature from becoming an invisible source of change.

## Why it matters

A system that restarts its own failed components will happily hide a chronic fault: pods restart, the service stays up, and nobody learns that the cause is a memory leak until it becomes an outage. The health checks that drive healing are therefore also a diagnosis surface, and their failures are the most useful signal the platform produces. Reading restarts, readiness transitions and evictions as data — rather than as background noise — is what turns the orchestrator's automation into something you understand.

## Core ideas

### Health checks are the trigger for every automatic action

A liveness check that fails causes a restart; a readiness check that fails removes the pod from service without killing it. Both are written by you and both shape the cluster's behaviour, which makes them the highest-leverage few lines in a manifest. A liveness check that depends on a downstream service will restart healthy pods whenever that service is slow, converting a brief dependency problem into an endless restart loop.

```text
liveness  fails -> container restarted (and the failure repeats until fixed)
readiness fails -> taken out of the service's endpoints, still running
```

### Probes need time to start, and time to stop

A startup period prevents a slow initialising process from being killed before it is ready, and a termination grace period lets a pod finish in-flight work. Both defaults are short enough to be wrong for real services. The combination of a short grace period and a process that ignores the termination signal is the standard cause of errors during a rolling deployment.

### Replicas and disruption budgets keep a rollout safe

A rollout replaces pods gradually under a policy that says how many may be unavailable. Declaring a disruption budget that refuses to take the application below a minimum available count is what stops a maintenance operation or a bad rollout from removing too much capacity at once. It converts an availability intention into something the cluster enforces.

### Restarts are evidence, not noise

A rising restart count means the workload is unhealthy even if users have not noticed. The same applies to pods repeatedly evicted for exceeding memory. Watching those two counters turns a class of latent failure into an early warning, and both are visible from the cluster's own state without extra tooling.

### You need all three signals, and the platform provides none automatically

Metrics say a service is degraded, logs say what the code saw, traces say which call was slow — and a cluster gives you none of them out of the box. What it does provide is a consistent place to attach them, because every workload is described by the same objects. Emitting a correlation identifier from every pod is what makes the three joinable when something goes wrong.

### The cluster's own events explain most mysteries

Scheduling refusals, image pull failures, probe failures and evictions all appear as events attached to the object. Reading them is usually faster than reading logs, because the platform is saying precisely what it refused to do and why.

## Practice

### Separate liveness from readiness properly

Take a service with an external dependency, make the liveness check depend only on the process and the readiness check include the dependency, then make the dependency slow.

Done when: the pod becomes unready but its restart count does not increase.

### Roll out under load with a safe budget

Deploy a new version of a service while generating steady traffic, with a disruption budget that keeps a minimum available count.

Done when: the load test reports no failed requests and the restart counters stay at zero.

## Common mistakes

- **Making liveness depend on an external service** — a slow dependency triggers restarts and turns a small problem into an outage; fix: keep liveness local.
- **Omitting a startup period** — a slow initialisation is killed before it finishes and loops forever; fix: allow enough time to start before probing.
- **Ignoring the termination signal** — in-flight requests are dropped on every rollout; fix: drain gracefully within the grace period.
- **Treating restarts as normal** — a chronic fault hides behind a healthy-looking service; fix: alert on restart counts and evictions.
- **Scraping state from the nodes** — it disappears when a pod is rescheduled; fix: collect metrics, logs and traces from the pods themselves.

## Go deeper

- **Configuration and secrets** (`cloud-devops/kubernetes/03-configuration-and-secrets`) — what a pod needs so that the health checks in this child are about work rather than setup.
- **Kubernetes** (`cloud-devops/kubernetes`) — the platform whose automation these signals explain.
- **Monitoring & Observability (Prometheus / Grafana)** (`cloud-devops/monitoring-observability-prometheus-grafana`) — the metrics, logs and traces this child stops short of.
