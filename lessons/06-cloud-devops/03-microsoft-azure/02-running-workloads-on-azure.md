---
title: Running workloads on Azure
prereqs: ["06-cloud-devops/03-microsoft-azure/01-enterprise-identity-and-active-directory"]
---

## What it is

A workload on Azure is assembled from the same categories as anywhere else: compute (virtual machines, containers, functions), storage (disks, blobs, managed databases), networking, and platform services that wrap the three. What distinguishes the assembly is how thoroughly the identity layer runs through it — a web application, its database and its secrets are all reachable only through directory-issued identities, so the permissions diagram and the architecture diagram are the same picture.

## Why it matters

The services are largely feature-comparable with the other major providers, and comparing them line by line is rarely the deciding factor. What does decide is how much of the surrounding enterprise estate a workload can reuse: the deployment pipeline the operations team already runs, the monitoring the security team already reads, the licence the finance team already pays for. Learning the assembly also teaches the general shape — compute plus state plus identity plus network — so that the next provider is mostly a vocabulary exercise.

## Core ideas

### Managed identity removes credentials from the workload

A workload managed by the platform can be given a directory identity and use it to obtain tokens, with no secret stored in configuration or code. The consequence is that "where is the password" stops being a question, and rotating credentials stops being a task. It is the same principle as roles elsewhere, expressed in this platform's own identity system.

```text
web app -> managed identity -> token -> storage / database / key vault
nothing secret in configuration
```

### Resource groups are the unit of ownership

Resources are grouped for lifecycle rather than for type: everything one application needs, deployed and deleted together. A resource group becomes the natural boundary for permission, for cost reporting and for cleanup, which is why putting unrelated resources in one group is the mistake that makes all three harder.

### The platform offers infrastructure and platform shapes together

The same problem can be solved with a virtual machine, a container platform or a managed function. Each rung removes operations and adds constraints, so the useful exercise is to name what you would stop operating and what you would stop controlling, exactly as with any provider.

### Hybrid is a first-class case

Azure expects that some systems will stay on-premises, and provides the networking, identity and management pieces to treat both estates as one. For an organisation mid-migration this is often the actual deciding factor: the same directory governs a server in a rack and one in a region, and the tooling does not care which.

### Cost is per resource and per group

Because resource groups mirror ownership, they are also the natural place to read cost. Tagging plus grouping gives both an owner and a number, which is what makes the monthly review a short exercise rather than an investigation.

## Practice

### Assemble one workload without a secret

Sketch a web application with a database and a storage account, and describe how each connection authenticates without a stored password.

Done when: you can name every credential in the design and show that none is a long-lived secret.

### Plan a resource group's lifecycle

Take a small application and list everything it needs in a single resource group, then describe what deleting the group would remove.

Done when: the list contains no resource shared with another application, and deletion is safe by construction.

## Common mistakes

- **Putting unrelated resources in one resource group** — permissions, cost and cleanup cannot be scoped; fix: group by application and lifecycle.
- **Storing credentials in application configuration** — secrets leak and rotation becomes a project; fix: use a managed identity and obtain tokens at runtime.
- **Using one subscription for everything** — environment boundaries disappear and a sandbox mistake reaches production; fix: separate subscriptions by environment.
- **Treating hybrid as a temporary nuisance** — the migration stalls without a network and identity plan; fix: design the connection deliberately from the start.
- **Comparing services feature-by-feature** — the decision is made on an irrelevant axis; fix: decide on the estate, then choose the equivalent service.

## Go deeper

- **Enterprise identity and Active Directory** (`06-cloud-devops/03-microsoft-azure/01-enterprise-identity-and-active-directory`) — the identity layer this workload authenticates through.
- **Microsoft Azure** (`06-cloud-devops/03-microsoft-azure`) — the provider context for this assembly.
- **Cloud-Native Computing** (`06-cloud-devops/13-cloud-native-computing`) — the design habits that make a workload portable between providers.
