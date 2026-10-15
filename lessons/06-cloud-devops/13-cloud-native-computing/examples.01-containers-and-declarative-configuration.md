## Example 1 — A tag that names exactly one build

Your release script rebuilds and pushes the same tag every time, so the developer's machine and the cluster can disagree about which bytes `myapp:latest` holds. Rework the script so a deployment points at one immutable tag and a rollback is a change of that value.

```bash
docker build -t myapp:latest .
docker push myapp:latest
kubectl set image deployment/api api=myapp:latest
```

### Solution

```bash
docker build -t myapp:1.4.2 .
docker push myapp:1.4.2
kubectl set image deployment/api api=myapp:1.4.2
# rollback
kubectl set image deployment/api api=myapp:1.4.1
```

Each build now publishes a tag that identifies one set of bytes, so the image under test is the image that ships and the previous tag is a whole rollback path. The usual mistake is overwriting a tag for convenience: two builds then answer to one name, the cluster may hold either, and the rollback is no longer reproducible.

## Example 2 — A liveness check that restarts a healthy process

The service below answers on its own port but calls an inventory service for every request. Both health checks hit the same endpoint, which queries that dependency. Describe what happens when the dependency is merely slow, and split the checks.

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
readinessProbe:
  httpGet:
    path: /health
    port: 8080
```

### Solution

```yaml
livenessProbe:
  httpGet:
    path: /live
    port: 8080
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
```

The liveness check now depends only on the process, while the readiness check keeps the dependency and takes the pod out of service while it is unavailable. Previously a slow dependency failed liveness and got a healthy process restarted, turning a brief slowdown into an endless restart loop.

Substitute your own host names and cluster details where these sketches use placeholders.
