---
title: Kubernetes
type: skill
topic: cloud-devops
tier: large
status: drafted
aliases: ["k8s"]
prereqs: ["cloud-devops/docker"]
related: []
---

## What it is

Kubernetes is an orchestrator: you declare how many copies of a container should run, how they should be reachable and what resources they need, and it works continuously to make reality match. It schedules containers across a pool of machines, restarts what fails, replaces what disappears and rolls out new versions gradually. It is a platform for running other people's software, and most of what it does is failure handling.

## Why it matters

Running containers by hand on a handful of machines stops working as soon as a machine dies, a version must be rolled out without downtime, or demand changes faster than someone can log in. Kubernetes automates exactly those problems, and it does so with a declarative interface: the desired state lives in version control, and the cluster is a reconciliation loop away from matching it. The cost is substantial — a cluster is a distributed system with its own vocabulary, failure modes and operational burden — so it pays off when the workload is genuinely dynamic or the team needs a uniform deployment target, and it is heaviness when a single container on a single host would do.

## In this track

1. **The object model** (`cloud-devops/kubernetes/01-the-object-model`) — pods, deployments and services, and how they compose.
2. **Scheduling and scaling** (`cloud-devops/kubernetes/02-scheduling-and-scaling`) — how work is placed on nodes and how capacity grows and shrinks.
3. **Configuration and secrets** (`cloud-devops/kubernetes/03-configuration-and-secrets`) — separating the image from the environment it runs in.
4. **Self-healing and observability** (`cloud-devops/kubernetes/04-self-healing-and-observability`) — what the cluster does when things break, and how you find out.

## Prerequisites

- **Docker** (`cloud-devops/docker`)

## Go deeper

- **Docker** (`cloud-devops/docker`) — the packaging step this orchestrator builds on, so read it first.
- **Helm** (`cloud-devops/helm`) — how groups of manifests are packaged and versioned once there are many of them.
- **Cloud-Native Computing** (`cloud-devops/cloud-native-computing`) — the design habits that make a workload a good fit for this kind of platform.
