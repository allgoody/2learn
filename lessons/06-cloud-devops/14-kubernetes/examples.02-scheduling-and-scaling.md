## Example 1 — A pod that never schedules

A pod is pending and the on-call engineer proposes adding nodes. The manifest below is what was applied. Find out what actually refused the pod, and change the smallest thing that lets it run.

```yaml
spec:
  nodeSelector:
    disk: ssd
  containers:
    - name: api
      image: myapp:1.4.2
```

### Solution

```yaml
spec:
  nodeSelector:
    disk: hdd
  containers:
    - name: api
      image: myapp:1.4.2
```

```text
$ kubectl describe pod api-7d4b2
Events:
  Warning  FailedScheduling  4m
  0/3 nodes are available: 3 node(s) didn't match node selector.
```

Constraints narrow the search before resource fit is ever considered, so this pod was refused on the first check and no amount of capacity would have helped. The event says exactly which constraint failed, which is why the pod's events are read before machines are added; the usual mistake is treating every pending pod as a capacity problem.

## Example 2 — Requests that decide who survives pressure

A node comes under memory pressure and one container is killed while its neighbour on the same node keeps running. The two containers differ only in the fields below. Say which one is chosen first and correct the vulnerable one.

```text
victim:    memory: (no request, no limit)
survivor:  resources: { requests: { memory: 256Mi, cpu: 250m },
                        limits:   { memory: 256Mi, cpu: 250m } }
```

### Solution

```text
victim:    resources: { requests: { memory: 192Mi, cpu: 200m },
                        limits:   { memory: 384Mi, cpu: 800m } }
survivor:  resources: { requests: { memory: 256Mi, cpu: 250m },
                        limits:   { memory: 256Mi, cpu: 250m } }
```

A request is what the scheduler reserves; a limit is the ceiling the container may not exceed, and memory above it causes the process to be killed. The cluster evicts pods with no requests first and pods whose requests equal their limits last, so the unset container was the obvious victim. Leaving requests unset is the usual mistake, and it also hides the workload's real cost.

Substitute your own image names, node labels and measurements where these sketches use placeholders.
