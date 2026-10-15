---
title: OpenShift
type: skill
topic: 06-cloud-devops
tier: small
status: drafted
aliases: []
prereqs: ["06-cloud-devops/14-kubernetes"]
related: []
---

## What it is

OpenShift is Red Hat's distribution of Kubernetes with the operational gaps filled in: a built-in registry, a web console, integrated pipelines, monitoring and logging, and a stricter security model by default. The API is Kubernetes, so the objects you know still work; what changes is how much of the surrounding platform arrives already assembled and how much is decided for you.

## Why it matters

A bare Kubernetes cluster is a kernel, not a product: you must choose and operate an ingress layer, an identity integration, a registry, a monitoring stack and a policy engine, then keep them compatible across upgrades. OpenShift sells that assembly as a supported whole, with a vendor to call when it breaks. For an organisation that needs a supported platform, a predictable upgrade path and a compliance story, that is a genuine purchase. For a team already comfortable assembling the parts, it is a large amount of platform they did not ask for.

## Core ideas

### The security model is restrictive by default

Containers run as non-root with a randomised user identifier, and a policy engine enforces what a workload may do. Images that assume they can run as root or write anywhere in the filesystem must be adapted. This is the most common friction point when moving an existing workload onto OpenShift, and it is also why the default posture is safer than most hand-built clusters.

```text
image expects uid 0 and a writable /  ->  rejected
image runs as arbitrary uid with a mounted writable path  ->  accepted
```

### Routes and ingress are part of the platform

Rather than leaving exposure to a separately installed controller, OpenShift provides its own routing object with TLS handled for you. The consequence is fewer choices and less assembly. Knowing that the underlying Kubernetes ingress exists is still useful when something needs a feature the route object does not expose.

### Identity and projects come pre-integrated

The platform ships with a project concept tied to the cluster's role-based access control, and it expects an external identity provider to be configured. Where that integration is done well, users get namespaces and permissions without a bespoke process. Where it is done badly, teams create local users and lose the benefit.

### Pipelines live inside the cluster

A build and deployment pipeline can run as cluster workloads, so the build has the same access model and the same observability as everything else. This is convenient and it concentrates risk: a compromised pipeline can reach whatever the cluster can. The alternative — a separate pipeline system — has its own trade-offs in the same direction.

### Upgrade discipline is the reason to buy it

The distribution is tested and upgraded as a unit, which is the part most teams underestimate: keeping a do-it-yourself cluster's dozens of components mutually compatible across Kubernetes versions is continuous work. Paying for that coordination is often the real purchase, and it should be the reason, not the console.

## Practice

### Adapt an image to the restricted model

Take a container that runs as root and writes to a directory it owns by default, and adjust it so it runs as an arbitrary user with a mounted writable path.

Done when: the image starts under the restricted policy and writes only to the mounted path.

### Compare the assembled platform with a bare cluster

List every component a bare Kubernetes cluster needs to match what OpenShift provides, and note which of them your team would have to operate itself.

Done when: you can name the components you would happily give up and the ones whose loss of control you would miss.

## Common mistakes

- **Shipping images that require root** — the default policy refuses them; fix: build for an arbitrary user identifier and a writable mount.
- **Bypassing the platform's routing with a custom controller** — you lose the supported upgrade path; fix: use the provided routing object and raise a case if a feature is missing.
- **Creating local users instead of integrating the directory** — accounts multiply and offboarding becomes manual; fix: connect the external identity provider.
- **Treating the cost as licence only** — the value is the tested upgrade path; fix: evaluate it against the operational work of assembling the same platform.
- **Giving the in-cluster pipeline cluster-wide access** — a build compromise reaches the cluster; fix: scope the pipeline's service account to what it deploys.

## Go deeper

- **Kubernetes** (`06-cloud-devops/14-kubernetes`) — the system this distribution packages, so read it first.
- **Helm** (`06-cloud-devops/21-helm`) — the packaging tool most distributions, including this one, rely on.
- **Terraform** (`06-cloud-devops/07-terraform`) — declaring the cluster and its surrounding resources reproducibly.
