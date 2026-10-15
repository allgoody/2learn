## Example 1 — An image that needs a privileged exception

A service image was written for a hand-built cluster: it starts as root and writes to a directory created at build time. The platform rejects it, and an administrator has offered a privileged exception instead. Change the image so it needs no exception.

```dockerfile
FROM app-base
WORKDIR /app
COPY . .
RUN mkdir /app/cache && chmod -R 777 /app/cache
USER root
ENTRYPOINT ["start-service"]
```

### Solution

```dockerfile
FROM app-base
WORKDIR /app
COPY . .
RUN mkdir -p /var/data && chgrp -R 0 /var/data && chmod -R g=u /var/data
USER appuser
ENTRYPOINT ["start-service"]
# the cluster assigns the running uid; the process only needs a path it may write to
```

```text
mount a writable path at /var/data and run as an arbitrary user
the exception is withdrawn, so the workload keeps upgrading with the platform
```

Building for an arbitrary user with a mounted writable path is what the restricted model expects. Withdrawing the exception matters as much: an exempt workload can no longer be upgraded as part of the platform. The usual mistake is to grant the exception, which works today and strands the service at the next upgrade.

## Example 2 — A pipeline with cluster-wide rights

The build and deployment pipeline runs as a workload inside the cluster, which gives it the same observability as everything else. Its service account was bound with a cluster-wide role so that it could deploy anywhere, and access is granted through local accounts created by hand. Scope both.

```yaml
kind: RoleBinding
metadata: { name: pipeline, namespace: shop }
roleRef:  { kind: ClusterRole, name: cluster-wide-deploy }
subjects: [{ kind: ServiceAccount, name: pipeline }]
```

### Solution

```yaml
kind: RoleBinding
metadata: { name: pipeline, namespace: shop }
roleRef:  { kind: Role, name: deploy-workloads }   # project-scoped only
subjects: [{ kind: ServiceAccount, name: pipeline }]
```

```text
pipeline users arrive from the external identity provider and inherit the project's roles
local accounts are disabled, so offboarding happens in the directory
```

Running the pipeline in the cluster means a compromised build inherits whatever the cluster can do, so the service account is scoped to the objects it deploys and to its own project. Taking identities from the directory rather than creating local users is what makes projects and permissions work. The usual mistake is to leave cluster-wide rights because the first deploy needed them somewhere else.
