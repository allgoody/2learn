---
title: Cloud Computing
type: area
topic: cloud-devops
tier: small
status: drafted
aliases: ["Cloud Infrastructure", "Cloud Development", "Cloud Applications", "Cloud Deployment", "Application Deployment"]
prereqs: []
related: []
---

## What it covers

Cloud computing is renting compute, storage and services instead of owning the machines that provide them. The five other names this page absorbs are not five skills but one field described from different angles: the infrastructure, the applications built for it, and the act of putting those applications into service. The distinction matters only when you are deciding who owns which part.

## Why it matters

Renting capacity turns a capital expense into an operating one and a two-month procurement into a two-minute API call. That speed is the real change: a team can create an environment for a branch, throw it away and create another. It also moves risk rather than removing it. The provider runs the hardware, but you still choose the region, the network layout, the identity model and the bill. Teams that treat the cloud as "someone else's computer" inherit the failure modes of both.

## Included skills

- **AWS** (`cloud-devops/aws`) — the largest provider and the reference vocabulary for the others.
- **Microsoft Azure** (`cloud-devops/microsoft-azure`) — strongest where enterprise identity already lives.
- **Google Cloud Platform (GCP)** (`cloud-devops/google-cloud-platform-gcp`) — strongest in data, machine learning and Kubernetes.
- **Serverless Computing** (`cloud-devops/serverless-computing`) — functions and managed runtimes where you pay per use.
- **Cloud-Native Computing** (`cloud-devops/cloud-native-computing`) — building for the cloud instead of moving a server-shaped app there.

## Where to start

Read one provider end to end rather than skimming all three; AWS is the largest and its vocabulary transfers. Then read Serverless Computing and Cloud-Native Computing, which are decisions about shape rather than about a vendor. Cost management is the remaining small entry, best read once you have something that costs money.
