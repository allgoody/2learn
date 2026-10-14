---
title: Serverless Computing
type: skill
topic: cloud-devops
tier: medium
status: drafted
aliases: []
prereqs: ["cloud-devops/cloud-computing"]
related: []
---

## What it is

Serverless computing is running code on a managed runtime that starts it when a request arrives and stops it when the request is done. There is no machine to patch and nothing to pay for while the code is idle; the provider sizes, starts and retires the runtime. The name is misleading — there are servers, they are simply not your problem — and the useful mental model is "a function plus the managed services it calls", because a function by itself does very little.

## Why it matters

For spiky and intermittent work, serverless is dramatically cheaper: a task triggered a few times a day costs nothing the rest of the time, where a server would run all month. It also removes an entire class of operational work, which matters most to small teams without a platform group. The trade is that you inherit the platform's constraints — timeouts, memory ceilings, cold starts, no local disk worth speaking of — and that debugging is harder when you cannot log into the machine. It is a good fit for glue, event handling and bursty APIs, and a poor fit for long-running computation or anything needing unusual system access.

## In this track

1. **Functions and managed runtimes** (`cloud-devops/serverless-computing/01-functions-and-managed-runtimes`) — what a function is, and the services it is actually assembled with.
2. **Designing for serverless** (`cloud-devops/serverless-computing/02-designing-for-serverless`) — the constraints that decide whether it fits, and the patterns that work within them.

## Prerequisites

- **Cloud Computing** (`cloud-devops/cloud-computing`)

## Go deeper

- **Cloud Computing** (`cloud-devops/cloud-computing`) — the concepts this model is one end of, so read it first.
- **Cloud-Native Computing** (`cloud-devops/cloud-native-computing`) — the wider design habits serverless is a special case of.
- **CI/CD** (`cloud-devops/ci-cd`) — how a function gets built, tested and deployed along with everything else.
