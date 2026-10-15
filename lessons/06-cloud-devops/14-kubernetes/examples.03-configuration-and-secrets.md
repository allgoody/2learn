## Example 1 — A setting that needs a restart

The service reads its endpoint once at start-up, because the value arrives as an environment variable. Releasing a new endpoint therefore means a new pod. Change how the value is delivered so the application can reload it, and state what the application must then do.

```yaml
spec:
  containers:
    - name: api
      envFrom:
        - configMapRef:
            name: api-config
```

### Solution

```yaml
spec:
  containers:
    - name: api
      volumeMounts:
        - name: config
          mountPath: /etc/api
  volumes:
    - name: config
      configMap:
        name: api-config
```

```text
config map -> mounted file -> updated in place -> the app must watch and reload
config map -> env value     -> fixed at start  -> a restart is required
```

A mounted file is refreshed in place, whereas an environment value is fixed for the lifetime of the container, so the two delivery choices decide whether a configuration change is a deployment. The usual mistake is mounting the file and assuming the process notices: nothing reloads your configuration for you, so the application has to watch the file or a restart must be accepted and reviewed as a release.

## Example 2 — A password written into the manifest

A deployment carries its database password inline, and the same file is committed to the repository alongside it. Rewrite the declaration so the value comes from the cluster, and say what has to happen to the credential that was committed.

```yaml
spec:
  containers:
    - name: api
      env:
        - name: DB_PASSWORD
          value: <written into the file by hand>
```

### Solution

```yaml
spec:
  containers:
    - name: api
      env:
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: password
```

The key now names a secret object in the cluster, which is granted access on its own and read at runtime, so the same image runs in every environment and no credential sits in the repository or in a layer of the image. The committed value must be rotated rather than merely deleted, because a secret in history is a leaked secret; encoding is not encryption either, and reading the object is enough, so access to it has to be restricted deliberately.

Substitute your own secret names and deployment details where these sketches use placeholders.
