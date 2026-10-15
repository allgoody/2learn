## Example 1 — A startup that gets killed before it is ready

A service takes forty seconds to warm a cache before it answers on its port. During a rolling deployment the new pods are restarted repeatedly and the rollout stalls. The probe block is below; explain the loop and correct it.

```yaml
livenessProbe:
  httpGet:
    path: /live
    port: 8080
  periodSeconds: 5
  failureThreshold: 3
```

### Solution

```yaml
startupProbe:
  httpGet:
    path: /live
    port: 8080
  failureThreshold: 30
  periodSeconds: 5
livenessProbe:
  httpGet:
    path: /live
    port: 8080
  periodSeconds: 5
  failureThreshold: 3
```

The startup probe holds the liveness check back until the process has had time to initialise, so the slow warm-up is no longer mistaken for a dead process. Both probe defaults are short enough to be wrong for real services, and a short grace period beside a process that ignores the termination signal is the standard cause of errors during a rollout.

## Example 2 — A restart count nobody looks at

The service has been up for a week and users have noticed nothing, but the pods tell a different story. Read the evidence and say what the number means and where the signal belongs.

```text
$ kubectl get pods
NAME         READY   STATUS             RESTARTS   AGE
api-7d4b2    1/1     Running            37         6d
api-91ab4    1/1     Running            41         6d
```

### Solution

```text
$ kubectl get events --field-selector reason=Unhealthy
... Readiness probe failed: context deadline exceeded
... Back-off restarting failed container

alert: container_restarts{app="api"} > 5 in 1h
```

A rising restart count is evidence, not noise: the pods are being killed and recreated often enough that a chronic fault is already present, even though the service looks healthy from outside. The platform heals the pods and thereby hides the cause, which is why restarts and evictions belong in an alert rather than in a dashboard nobody reads. Treating them as normal is the usual mistake.

Substitute your own image names, alert rules and cluster details where these sketches use placeholders.
