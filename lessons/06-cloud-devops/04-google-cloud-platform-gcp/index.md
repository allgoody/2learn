---
title: Google Cloud Platform (GCP)
type: skill
topic: 06-cloud-devops
tier: medium
status: drafted
aliases: ["GCP"]
prereqs: ["06-cloud-devops/01-cloud-computing"]
related: []
---

## What it is

Google Cloud Platform is Google's public cloud. It offers the usual compute, storage and networking, but its centre of gravity is different from the other two large providers: it grew out of running Google's own data systems, so its strongest services are for analysing large datasets, training and serving machine learning models, and running containers. It is the cloud behind Kubernetes, and it acts like it.

## Why it matters

Where Azure is chosen for the estate and AWS for the catalogue, GCP is chosen for the workload: a data pipeline that would be assembled from several products elsewhere is one product here, and a Kubernetes platform is managed rather than improvised. That focus is an advantage when it matches the problem and a cost when it does not, because the surrounding enterprise tooling is less complete than its competitors'. Knowing which of those two situations you are in is the whole decision.

## In this track

1. **Data and machine learning** (`06-cloud-devops/04-google-cloud-platform-gcp/01-data-and-machine-learning`) — the analytical and model-serving services that are its strongest ground.
2. **Kubernetes and managed platforms** (`06-cloud-devops/04-google-cloud-platform-gcp/02-kubernetes-and-managed-platforms`) — container platforms and the services built on them.

## Prerequisites

- **Cloud Computing** (`06-cloud-devops/01-cloud-computing`)

## Go deeper

- **Cloud Computing** (`06-cloud-devops/01-cloud-computing`) — the concepts this provider implements, so read it first.
- **AWS** (`06-cloud-devops/02-aws`) — the largest provider, and the one whose vocabulary most comparisons borrow.
- **Kubernetes** (`06-cloud-devops/14-kubernetes`) — the open-source system GCP's container platform is built on.
