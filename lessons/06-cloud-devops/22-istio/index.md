---
title: Istio
type: skill
topic: 06-cloud-devops
tier: small
status: drafted
aliases: []
prereqs: ["06-cloud-devops/14-kubernetes", "06-cloud-devops/10-networking-fundamentals-http-dns-tls"]
related: []
---

## What it is

Istio is a service mesh: a set of proxies, one beside each workload, that carry the traffic between services and enforce policy on it. Applications talk to each other as before, but the proxy in between can route, retry, time out, encrypt and measure every call. It takes the concerns that would otherwise be scattered through application code and libraries and moves them into the platform.

## Why it matters

Once a system is many services, several problems stop having a good answer in the application: how to send a small share of traffic to a new version, how to encrypt traffic between services without changing every one of them, how to retry a failed call without repeating a payment. A mesh answers these uniformly and centrally, and it answers them for services written in different languages. The cost is a proxy on every request path, a new control plane to operate, and a debugging experience that now includes a layer the application team did not write. That is a large price, and it is only worth paying when many services share the same need.

## Core ideas

### A sidecar proxy carries the traffic

Each workload gets a proxy that intercepts its inbound and outbound calls. The application's code is unchanged; the mesh's control plane configures every proxy with routing rules, retry policy and encryption settings. This is what makes the mesh language-agnostic, and also what makes it opaque: the latency and the failures now have a component in them that appears in no application's source.

```text
service A -> [proxy] --mTLS--> [proxy] -> service B
             configured centrally: routes, retries, timeouts, metrics
```

### Traffic splitting makes a gradual rollout easy and a rollback trivial

Routing rules can send a percentage of requests to one version and the rest to another, or route by header so testers reach the new version while everyone else does not. With the proxies already in place, changing the split is a configuration change rather than a deployment. Rolling back is pointing the rule back. This is the feature most teams adopt a mesh for.

### Mutual TLS arrives without touching the code

Encrypting and authenticating service-to-service calls usually means changing every service and distributing certificates to each. The mesh issues identities to the proxies and encrypts between them, so a service can require that its callers present a valid identity even if the service itself knows nothing about TLS. The certificate lifecycle is the control plane's problem.

### Every hop adds latency and a new failure mode

Adding a proxy adds a hop, and the control plane adds a dependency: when it is unavailable, configuration changes stop taking effect and the mesh's behaviour becomes whatever the proxies last knew. Retries configured in the mesh can also amplify load, turning a struggling service into an overwhelmed one. These are ordinary distributed-system costs, but they arrive at once, on the request path.

### Policy and observability come for free, once the proxies are there

Because every call passes through a proxy, metrics on latency and error rate per route exist without instrumenting applications, and policies such as allowing only certain identities to call a service are configurable centrally. This is the part that is hardest to replicate by other means.

### Adopt when the need is shared, not for a single service

If one service needs a gradual rollout, a load balancer or an ingress controller can do it. A mesh pays off when many services need the same routing, encryption and telemetry. Starting with the mesh and hoping to grow into it means paying the operational cost before the benefit, which is the common way these projects stall.

## Practice

### Split traffic between two versions

Deploy two versions of a service and route a fixed share of requests to each, then change the share without redeploying anything.

Done when: the observed request counts match the configured split and only a routing rule changed.

### Require an identity between two services

Configure a policy so that one service accepts calls only from a named caller identity, and confirm that a call from elsewhere is refused.

Done when: the permitted call succeeds, the other is rejected, and no application code was changed.

## Common mistakes

- **Adopting a mesh for a single service** — the operational cost arrives before any benefit; fix: use the platform's routing until several services share the need.
- **Adding retries without a budget** — retries multiply load on a service that is already struggling; fix: bound retries and combine them with timeouts and circuit breaking.
- **Forgetting the control plane is a dependency** — configuration stops changing when it is unavailable; fix: monitor it and know which behaviour degrades.
- **Debugging latency without accounting for the proxies** — the extra hop appears in no application's traces; fix: include the mesh in tracing and dashboards.
- **Encrypting inside the mesh and assuming the outside is covered** — traffic leaving the mesh is a different problem; fix: treat ingress and egress as separate policy decisions.

## Go deeper

- **Kubernetes** (`06-cloud-devops/14-kubernetes`) — the platform this mesh runs on, so read it first.
- **Networking Fundamentals (HTTP / DNS / TLS)** (`06-cloud-devops/10-networking-fundamentals-http-dns-tls`) — the protocols the mesh is intercepting; worth reading before adopting it.
- **Monitoring & Observability (Prometheus / Grafana)** (`06-cloud-devops/18-monitoring-observability-prometheus-grafana`) — where the per-route metrics the proxies emit become useful.
