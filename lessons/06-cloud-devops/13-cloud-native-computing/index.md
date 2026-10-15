---
title: Cloud-Native Computing
type: skill
topic: 06-cloud-devops
tier: medium
status: drafted
aliases: []
prereqs: ["06-cloud-devops/01-cloud-computing", "06-cloud-devops/06-docker"]
related: []
---

## What it is

Cloud-native is a way of building software that assumes the infrastructure is elastic, disposable and programmable. Instead of moving a server-shaped application onto rented machines, you design for the platform: package the application in a container, describe the desired state in configuration, let the platform place and restart it, and treat every instance as replaceable. The phrase is often used as a synonym for "modern", which hides that it names concrete design decisions with concrete costs.

## Why it matters

An application that was written for a single long-lived server does not become resilient just by being deployed to a cluster. It still keeps state on its local disk, still needs to be patched by hand, still cannot be restarted without a maintenance window. Cloud-native design is what makes the platform's promises — scaling, healing, rolling updates — actually apply. The cost is real too: more moving parts, a distributed system to debug, and configuration that has to be managed. It pays off when the workload needs to change often or scale unpredictably, and it is overhead when neither is true.

## In this track

1. **Containers and declarative configuration** (`06-cloud-devops/13-cloud-native-computing/01-containers-and-declarative-configuration`) — packaging the application and describing the state it should be in.
2. **Elasticity and managed services** (`06-cloud-devops/13-cloud-native-computing/02-elasticity-and-managed-services`) — designing for restart, scale and the services that hold the state.

## Prerequisites

- **Cloud Computing** (`06-cloud-devops/01-cloud-computing`)
- **Docker** (`06-cloud-devops/06-docker`)

## Go deeper

- **Cloud Computing** (`06-cloud-devops/01-cloud-computing`) — the concepts this way of building assumes, so read it first.
- **Docker** (`06-cloud-devops/06-docker`) — the packaging step, which is the entry point to this design style.
- **Kubernetes** (`06-cloud-devops/14-kubernetes`) — the orchestrator that implements most of these ideas at scale.
