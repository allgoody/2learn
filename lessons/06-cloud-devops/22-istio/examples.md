## Example 1 — A tenth of the traffic to the new version

A new checkout version has been deployed beside the old one, and the team wants a fixed share of live requests to reach it with an instant way back. Changing the share must not require a deployment. The rule below is what is in place.

```yaml
apiVersion: networking.istio.io/v1
kind: VirtualService
metadata: { name: checkout }
spec:
  hosts: ["checkout"]
  http:
    - route:
        - destination: { host: checkout, subset: old }
```

### Solution

```yaml
  http:
    - route:
        - destination: { host: checkout, subset: old }
          weight: 90
        - destination: { host: checkout, subset: new }
          weight: 10
```

```text
request reaching checkout after the change: GET /checkout/quote
routed by the proxy beside each workload — no application code changed, no workload restarted
rollback: point the weights back at the old subset
```

Because a proxy beside each workload carries the calls, the split is a configuration change rather than a release, and moving both weights back is the whole rollback. The same rule can route by header instead, so testers reach the new subset while everyone else does not. The usual mistake is to deploy the new version under the service's existing name, which leaves no way to choose between them.

## Example 2 — Retries that multiply the load

Checkout became slow, so five retries were configured on every failed call to it. It now fails harder under load, and one slow dependency drags down every caller. The rule below is what is in place. Bound the retries and give the call a deadline.

```yaml
  http:
    - route:
        - destination: { host: checkout }
      retries: { attempts: 5 }
```

### Solution

```yaml
  http:
    - route:
        - destination: { host: checkout }
      timeout: 2s
      retries:
        attempts: 2
        perTryTimeout: 800ms
        retryOn: 5xx
```

Every hop through a proxy adds a component that can fail and a place where configuration now lives, and retries issued by the mesh amplify load on a service that is already struggling. A bounded attempt count with a per-try timeout is what keeps one slow dependency from becoming an outage for everyone. This policy belongs in the mesh only because every call already passes through a proxy; for a single service the platform's own routing would do it. The usual mistake is to add attempts with no per-try timeout, so each retry waits as long as the original request.
