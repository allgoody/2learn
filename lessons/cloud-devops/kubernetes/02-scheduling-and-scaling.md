---
title: Scheduling and scaling
prereqs: ["cloud-devops/kubernetes/01-the-object-model"]
---

## What it is

Scheduling is the cluster deciding which node each pod runs on; scaling is the cluster changing how much work is running in response to demand. Both are driven by the resources you declare a pod needs. A pod that requests a quarter of a CPU and 256MB of memory is telling the scheduler what it must reserve, and every scaling decision downstream inherits that statement — accurate or not.

## Why it matters

Resource declarations are the most commonly neglected part of a manifest and the most consequential. Set requests too high and nodes fill with pods that are idle, so the cluster costs more than the workload warrants. Set them too low and pods are packed onto nodes that cannot actually hold them, and under pressure the kernel starts terminating processes. The difference between a cluster that behaves and one that mysteriously evicts pods is usually two numbers per container, chosen from measurement rather than convenience.

## Core ideas

### Requests reserve capacity, limits cap it

A request is what the scheduler guarantees for the pod; a limit is the ceiling the container may not exceed. CPU above the limit is throttled, memory above the limit causes the process to be killed. Setting requests and limits equal gives predictable performance at the cost of elasticity; leaving requests far below limits invites overcommit and eviction. Both extremes are defensible; guessing is not.

```text
requests: cpu 250m, memory 256Mi   -> scheduled with this reserved
limits:   cpu 1000m, memory 512Mi  -> may burst, killed if memory exceeded
```

### Quality of service follows from how requests compare with limits

Pods whose requests equal their limits are evicted last; pods with no requests at all are evicted first. That ordering is the cluster's rule for choosing victims under pressure, and it is why a critical workload should not be left with unset resource fields.

### Constraints narrow the search before resource fit is considered

Node selectors, affinities, taints and tolerations decide which nodes are even eligible — by label, zone, or dedicated purpose. Only then does the scheduler weigh resource fit and other scores. A pod that is unschedulable is therefore a question about constraints first and capacity second, and the pod's events say which one refused it.

### Clusters scale on two axes

Pods scale with demand through a controller that reads a metric; nodes scale with the pods that cannot fit. Configuring the second without the first leaves capacity that never gets used, and the first without the second leaves pods pending forever. The scale-down side of both needs a stabilisation window, because shrinking on a momentary lull causes the cluster to oscillate.

### Scale on a signal that arrives before the load does

CPU reacts after work has queued; queue depth, request rate or a custom metric can react earlier. Whichever is chosen, scale up eagerly and scale down cautiously, and cap the rate of change so a surge cannot overwhelm the dependencies the workload is about to call.

## Practice

### Derive requests from measurement

Run a workload, observe its CPU and memory under realistic load, and set requests slightly above the sustained figure and limits above the peak.

Done when: you can state the observed peak, the headroom you left, and what will happen to the container if it exceeds the limit.

### Find out why a pod will not schedule

Create a pod that requests more memory than any node has, then read its events.

Done when: you can quote the event that reports insufficient resources and describe the smallest change that would let it schedule.

## Common mistakes

- **Leaving requests unset** — the pod is the first eviction victim under pressure and its cost is invisible; fix: set requests from measurement.
- **Setting limits far above requests for a memory-hungry service** — the node is overcommitted and processes are killed; fix: keep the gap justified and monitored.
- **Debugging scheduling as a capacity problem when a constraint refused the pod** — the nodes were never eligible; fix: read the pod's events before adding machines.
- **Scaling pods without scaling nodes** — demand rises and work sits pending; fix: configure both axes together.
- **Scaling down on a momentary lull** — the cluster oscillates and capacity churns; fix: add a stabilisation window to the scale-down rule.

## Go deeper

- **The object model** (`cloud-devops/kubernetes/01-the-object-model`) — the pods whose resource declarations this child is about.
- **Kubernetes** (`cloud-devops/kubernetes`) — the platform these scheduling rules belong to.
- **Configuration and secrets** (`cloud-devops/kubernetes/03-configuration-and-secrets`) — the other half of what a pod needs before it can start.
