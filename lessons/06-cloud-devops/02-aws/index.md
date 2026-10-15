---
title: AWS
type: skill
topic: 06-cloud-devops
tier: large
status: drafted
aliases: ["Amazon Web Services"]
prereqs: ["06-cloud-devops/01-cloud-computing"]
related: []
---

## What it is

AWS is the largest public cloud, and its catalogue is the reason "the cloud" is hard to describe in one sentence. It sells raw building blocks — virtual machines, block storage, virtual networks, identity — and separately sells managed services that wrap those blocks into something with fewer decisions left to you. Learning AWS means learning which layer to stand on, because for almost every need there is an unmanaged option, a managed option and a serverless option.

## Why it matters

AWS sets the vocabulary the other providers are described in, and its documentation is the deepest of the three, which makes it the cheapest place to learn the concepts. It is also the provider most likely to be already in place, because it was first and largest. The risk is cost and sprawl: the catalogue is huge, the free tier ends, and an unattended account can accumulate expensive resources nobody remembers creating. Understanding the account structure, not just the services, is what keeps that from happening.

## In this track

1. **Compute and EC2** (`06-cloud-devops/02-aws/01-compute-and-ec2`) — virtual machines and the managed compute around them, and how to size one.
2. **Storage and databases** (`06-cloud-devops/02-aws/02-storage-and-databases`) — object, block and managed database storage, and which to reach for.
3. **Networking and VPC** (`06-cloud-devops/02-aws/03-networking-and-vpc`) — the virtual network, subnets, security groups and load balancing.
4. **Identity and cost** (`06-cloud-devops/02-aws/04-identity-and-cost`) — roles, policies and least privilege, plus how consumption becomes a bill.

## Prerequisites

- **Cloud Computing** (`06-cloud-devops/01-cloud-computing`)

## Go deeper

- **Cloud Computing** (`06-cloud-devops/01-cloud-computing`) — the concepts this provider implements, so read it first.
- **Terraform** (`06-cloud-devops/07-terraform`) — once you are creating infrastructure by hand, this is how you make it reproducible.
- **Cloud Cost Management** (`06-cloud-devops/11-cloud-cost-management`) — the practices that keep the account the next track covers from growing a bill nobody chose.
