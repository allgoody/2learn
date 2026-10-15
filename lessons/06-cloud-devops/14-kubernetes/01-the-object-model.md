---
title: The object model
prereqs: ["06-cloud-devops/06-docker"]
---

## What it is

Kubernetes is a set of declarative objects, each with a kind, a name and a specification. The ones that matter first are the pod, the smallest unit of execution; the deployment, which keeps a number of identical pods running; and the service, which gives a stable address to whichever pods are currently healthy. Reading a manifest is mostly a matter of seeing how those three relate.

## Why it matters

The object model is the interface you actually program against: a workload is a directory of manifests, a rollback is pointing at an earlier version, and adding a replica is editing a number. Because the model is declarative, the cluster is always reconciling toward what you declared, which is why a deleted pod reappears without intervention. Understand the objects and the rest of the platform — configuration, scaling, ingress, policies — becomes variations on a theme rather than new vocabulary.

## Core ideas

### The pod is the unit of execution, and usually not the unit you write

A pod is one or more containers sharing a network namespace and a lifetime. Running one pod directly is a debugging move; production workloads are managed by a controller that recreates pods when they die. Understanding that pods are ephemeral — their names change, their addresses change — is what makes the higher-level objects necessary.

```text
deployment (wants 3 replicas)
  pod -> pod -> pod       (names and addresses are not stable)
service: one stable name and virtual address fronting the healthy pods
```

### The deployment describes what should run, not what is running

A deployment declares an image, a replica count and a template for its pods. Change the image and the deployment performs a rolling update, starting new pods and retiring old ones under a policy you choose. That policy is how downtime is avoided, so its defaults deserve to be read rather than assumed.

### The service is an abstraction over changing pods

Because pods come and go, clients cannot address them directly. A service provides a stable name and virtual address, and selects pods by label. Labels are therefore load-bearing: a typo in a selector produces an empty service, which looks exactly like a broken application.

### Labels and selectors are the binding mechanism

Nothing in Kubernetes contains a pointer to anything else; objects bind through labels matched by selectors. This is what allows a service to front a set of pods, a network policy to name them, and a monitoring tool to discover them, all without knowing each other. It is also why the objects are hard to read statically, and why a manifest review must check the selectors.

### Namespaces divide one cluster into scopes

A namespace groups objects for names, permissions and quotas. It is not a security boundary by itself, but it is the unit most teams use to separate environments or applications inside a shared cluster. Default resource quotas per namespace are what stop one team from consuming the whole cluster.

### Declaring is not the same as knowing the result

The applied object is not necessarily what is running: a controller may add defaults, a policy may reject the object, or another controller may modify status. Reading the live object and its events is the way to see the difference, and the habit of checking the live state rather than the file on disk prevents a large class of confusion.

## Practice

### Read one deployment end to end

Take a deployment manifest, a service and a set of pods from a running cluster, and trace how the selector on the service finds the pods, and what happens to the service when a pod is deleted.

Done when: you can predict the new pod's name, and show that the service's address did not change.

### Break a selector deliberately

Change the service's selector so it matches nothing and describe the symptom, then restore it.

Done when: you can name the two pieces of evidence — the empty endpoints and the healthy pods — that distinguish a selector mistake from a crashed application.

## Common mistakes

- **Running a bare pod in production** — nothing recreates it when the node fails; fix: manage pods through a controller such as a deployment.
- **Editing a pod by hand** — the controller replaces it and the change vanishes; fix: edit the owning object's template.
- **Mismatching labels and selectors** — the service silently fronts nothing; fix: check the selector against the pod labels when a service reports no endpoints.
- **Assuming the applied file is the running state** — defaults and other controllers change the object; fix: read the live object and its events.
- **Putting everything in the default namespace** — names collide and quotas cannot be applied; fix: give each application or environment its own namespace.

## Go deeper

- **Docker** (`06-cloud-devops/06-docker`) — the image these pods run, so read it first.
- **Kubernetes** (`06-cloud-devops/14-kubernetes`) — the platform these objects are the vocabulary of.
- **Scheduling and scaling** (`06-cloud-devops/14-kubernetes/02-scheduling-and-scaling`) — what happens when the declared replica count meets a finite set of nodes.
