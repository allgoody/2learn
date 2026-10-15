---
title: Containers and declarative configuration
prereqs: ["06-cloud-devops/06-docker"]
---

## What it is

A container packages an application with its dependencies so it runs the same way anywhere. Declarative configuration describes the state you want — this many copies of this image, reachable on this port — and leaves the platform to work out how to get there. Together they are the foundation of cloud-native design: the artifact is immutable, and the desired state is the thing under version control.

## Why it matters

Immutability is what makes replacement cheap. If an instance is built from an image that never changes after it is published, then a new version is a new image and a restart, not a patch applied by hand to a machine nobody can reproduce. Declarative configuration is what makes that replacement automatic: the platform compares the desired state with the actual one and acts, whether the difference is a new version or a crashed pod. The combination is why a rolling deployment can be a normal event rather than a project.

## Core ideas

### An image is a build artifact, and it should be immutable

Each build produces a tag or a digest that identifies exactly one set of bytes. Deploying means pointing at a new tag; rolling back means pointing at the previous one. Overwriting an existing tag destroys that property, because two different builds now answer to the same name and the cluster may hold either.

```text
registry: myapp:1.4.2  (built once, never reused)
deploy:   desired image -> myapp:1.4.2
rollback: desired image -> myapp:1.4.1
```

### Configuration arrives from the environment

The image carries the code; the environment carries what differs between deployments: endpoints, feature settings, credentials. Secrets come from the platform's secret store rather than being baked into the image, so the same artifact can run in every environment. This is what stops the promotion of a build from being a rebuild.

### Desired state is the interface

You declare replicas, resource requests, ports and health checks; the platform reconciles reality to match, continuously. That means a manually restarted or deleted instance is not a special event — it is a drift the platform corrects. It also means a mistake in the declaration is applied faithfully and repeatedly, so configuration deserves review as much as code.

### Health checks decide whether the system heals

A liveness check answers "is this process still able to work?", and a readiness check answers "is it ready to receive traffic yet?". Getting them wrong is how a self-healing system turns into a self-restarting loop: a liveness check that depends on a slow external service will kill a healthy process under load. Distinguishing the two is a small decision with large consequences.

### The build pipeline is part of the design

Because the artifact is built once and promoted, the pipeline must build, test and publish an image, then deploy that exact image. Rebuilding for each environment reintroduces the drift the container was meant to remove. The pipeline is where immutability is either preserved or quietly abandoned.

## Practice

### Package a service as an immutable artifact

Take a small service, write a container definition that installs its dependencies at build time, and tag the result with a version. Then run it twice with different environment values and confirm the image is unchanged.

Done when: the same image digest runs against two sets of configuration and no file inside the image differs.

### Separate liveness from readiness

For that service, write a liveness check that depends only on the process, and a readiness check that includes its dependencies. Describe what happens when a dependency is slow.

Done when: the slow dependency makes the service unready but does not get it restarted.

## Common mistakes

- **Overwriting image tags** — two builds share one name and rollback becomes guesswork; fix: publish immutable tags or digests.
- **Baking configuration into the image** — a rebuild is needed per environment and drift returns; fix: pass configuration through the environment.
- **Using an external dependency as a liveness check** — a healthy process is killed when the dependency is slow; fix: keep liveness local and put dependencies in readiness.
- **Editing a running instance to fix something** — the next reconciliation removes the change; fix: change the declaration and redeploy.
- **Rebuilding per environment** — the artifact that was tested is not the artifact that ships; fix: build once and promote the same image.

## Go deeper

- **Docker** (`06-cloud-devops/06-docker`) — how the image itself is built, so read it first.
- **Cloud-Native Computing** (`06-cloud-devops/13-cloud-native-computing`) — the wider design this packaging enables.
- **Elasticity and managed services** (`06-cloud-devops/13-cloud-native-computing/02-elasticity-and-managed-services`) — what to do about the state this design pushes out of the container.
