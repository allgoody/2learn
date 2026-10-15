---
title: Docker
type: skill
topic: 06-cloud-devops
tier: medium
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Docker packages an application together with everything it needs to run — libraries, runtime, configuration defaults — into an image. The image is built once and produces identical containers wherever it runs, which removes the oldest excuse in software: that it worked on the developer's machine. A container is not a lightweight virtual machine; it is a process on the host with its filesystem and view of the system fenced off.

## Why it matters

The gap between "runs here" and "runs there" is where a large share of delivery time is lost: a missing library, a different runtime version, a setting that exists in one environment and not another. Packaging the application with its dependencies closes it, and the same artifact can then move from a laptop to a test machine to a production cluster unchanged. Containers also made the orchestration systems possible, because a scheduler needs a unit it can start and replace without knowing what is inside it.

## In this track

1. **Images and layers** (`06-cloud-devops/06-docker/01-images-and-layers`) — how an image is assembled, why layers matter, and how to keep builds fast.
2. **Running containers and persisting data** (`06-cloud-devops/06-docker/02-running-containers-and-persisting-data`) — running an image, networking between containers, and the volume problem.

## Prerequisites

None.

## Go deeper

- **Kubernetes** (`06-cloud-devops/14-kubernetes`) — the orchestrator that runs containers at scale, once one container is not enough.
- **Cloud-Native Computing** (`06-cloud-devops/13-cloud-native-computing`) — the design habits that make a containerised application actually replaceable.
