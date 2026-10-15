---
title: Kubernetes and managed platforms
prereqs: ["06-cloud-devops/04-google-cloud-platform-gcp/01-data-and-machine-learning"]
---

## What it is

GCP's container platform is a managed Kubernetes service: the open-source orchestrator, with the control plane run by the provider, plus integrations for logging, identity and networking. Around it sit services built on the same foundation — a managed runtime for containers that removes the cluster entirely, and serverless functions. This is the family of products that turned Kubernetes from a project you operate into a platform you consume.

## Why it matters

Kubernetes is powerful and operationally expensive. Owning the control plane means patching it, upgrading it, securing its interface and keeping it available — work that has nothing to do with your application. A managed service removes exactly that work while keeping the API you already write manifests against, so the same configuration runs locally and in the cloud. Because the provider of the open-source project also sells the managed version, its integration is unusually close: upgrades, identity and monitoring are features of the platform rather than projects.

## Core ideas

### The control plane is the part worth not owning

The cluster's brain — the scheduler, the API server, the controllers — is critical, stateful and security-sensitive. Managed, it is upgraded on the provider's schedule and reachable only through authenticated endpoints. What remains is the worker capacity, which is the part that scales with your workload and that you can reason about.

```text
provider: control plane (upgraded, monitored, authenticated)
you:      node pools, workloads, quotas, network policy
```

### Managed runtimes go one rung further

Above managed Kubernetes sits a runtime that takes a container image and runs it without exposing a cluster at all: no nodes, no upgrades, scaling to zero. It gives up configuration surface — custom operators, host access, particular networking setups — in exchange for removing the last operational work. Choosing between them is a question about what your workload actually needs, not about what is more modern.

### Identity reaches into the cluster

A workload running in the cluster can be given a platform identity and use it to reach other services without a stored credential. This closes the loop with the data services: the same identity model covers a query job, a container and a function, so permissions are managed once.

### Autoscaling has two independent axes

Pods scale with demand and nodes scale with pods. Configuring one without the other leaves either idle capacity or unschedulable work: requests set too high waste nodes, and too low lets pods be evicted under pressure. Setting requests from measurement rather than hope is the single highest-value tuning step.

### Portability is real but partial

The Kubernetes API is portable, so the manifests move; the integrations around it — load balancers, identity, storage classes, monitoring — are provider-specific and do not. Expect to move the application and rewrite the seams.

## Practice

### Choose the right rung

Take a small HTTP service and decide between a managed cluster, a managed runtime and a virtual machine. For each, name the operational work you keep.

Done when: you can justify the middle choice on a requirement rather than on fashion, or justify ruling it out.

### Set requests from measurement

Take a container's observed memory use, set a request above it and a limit above the request, and explain what happens when the limit is exceeded.

Done when: you can state the restart behaviour at the limit and why the request was not set to the limit's value.

## Common mistakes

- **Operating the control plane yourself out of habit** — the upgrade and security work has no product value; fix: use the managed control plane unless a requirement forbids it.
- **Setting requests equal to limits** — the workload cannot burst and nodes are sized for a peak that never occurs; fix: separate the guaranteed request from the hard limit.
- **Scaling pods without scaling nodes** — demand rises and work sits unscheduled; fix: configure both axes together.
- **Storing credentials in the workload** — the cluster is not a safe place for long-lived secrets; fix: give the workload an identity and obtain tokens at runtime.
- **Expecting full portability** — the manifests move but the integrations do not; fix: plan the seam work as part of any migration.

## Go deeper

- **Data and machine learning** (`06-cloud-devops/04-google-cloud-platform-gcp/01-data-and-machine-learning`) — the other half of this provider's strongest ground.
- **Google Cloud Platform (GCP)** (`06-cloud-devops/04-google-cloud-platform-gcp`) — the provider these platforms belong to.
- **Kubernetes** (`06-cloud-devops/14-kubernetes`) — the underlying system, worth knowing before adopting a managed version of it.
