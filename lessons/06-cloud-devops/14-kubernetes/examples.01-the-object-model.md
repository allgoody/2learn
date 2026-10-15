## Example 1 — A service that fronts nothing

A deployment and a service were applied together. The pods are running, yet requests to the service time out. Find the binding that is missing and correct it.

```yaml
# service
spec:
  selector:
    app: api

# deployment
spec:
  template:
    metadata:
      labels:
        app: api-server
```

### Solution

```yaml
# service
spec:
  selector:
    app: api-server
```

```text
$ kubectl get endpoints api
NAME   ENDPOINTS   AGE
api    <none>      4m

$ kubectl get pods --show-labels
NAME         READY   STATUS    LABELS
api-6c9f9    1/1     Running   app=api-server
```

Nothing in Kubernetes contains a pointer to anything else; the service finds pods only where a label equals its selector, so the mismatched value left the service with an empty endpoint list. The typo is the usual mistake, and the healthy pod beside the empty endpoints is the evidence that distinguishes it from a crashed application.

## Example 2 — An edit that disappears

A developer fixes a misconfiguration by editing the running pod, sees the change take effect and closes the ticket. Later the value is back. Explain what happened and move the change where it survives.

```bash
$ kubectl edit pod api-6c9f9
pod/api-6c9f9 edited
```

### Solution

```yaml
# the deployment's pod template, not a running pod
spec:
  template:
    spec:
      containers:
        - name: api
          env:
            - name: LOG_LEVEL
              value: debug
```

```text
$ kubectl get pods
NAME         READY   STATUS    AGE
api-7d4b2    1/1     Running   12s
```

A pod is the unit of execution but not the unit you write: a controller owns it and recreates it from the template, so a hand-edited pod is a drift the controller is designed to correct. The replacement pod was built from the unchanged template, which is why the value returned. Put the change in the owning object, because the file that was applied is not the state that is running.

Substitute your own object names and cluster details where these sketches use placeholders.
