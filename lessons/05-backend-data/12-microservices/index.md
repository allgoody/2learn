---
title: Microservices
type: skill
topic: 05-backend-data
tier: medium
status: drafted
aliases: []
prereqs: ["05-backend-data/06-restful-api"]
related: []
---

## What it is

A microservice architecture splits a system into services that are independently deployable, each owning its own data and communicating over the network. The defining property is not size but independence: a team can change and release one service without coordinating a release of the others. Everything else — small services, separate repositories, containers — is a consequence rather than the definition.

## Why it matters

The benefit is organisational as much as technical. When several teams must release together, the release becomes a meeting, and the pace of the slowest team sets the pace of all of them; separate deployability removes that coupling. The cost is that a network call replaces a function call, so latency, partial failure and versioning arrive at once, and the operations that were implicit inside a process become explicit infrastructure. For a small team working on one product, that cost is usually paid for a benefit nobody collects — which is why knowing when not to split is half of this entry.

## In this track

1. **Boundaries and ownership** (`05-backend-data/12-microservices/01-boundaries-and-ownership`) — where to draw the lines between services, and who owns what.
2. **The operational cost** (`05-backend-data/12-microservices/02-the-operational-cost`) — deployment, versioning and failure isolation once the system is distributed.

## Prerequisites

- **Restful API** (`05-backend-data/06-restful-api`)

## Go deeper

- **Restful API** (`05-backend-data/06-restful-api`) — the interface style these services usually expose, so read it first.
- **Message Queues (Kafka / RabbitMQ)** (`05-backend-data/17-message-queues-kafka-rabbitmq`) — the asynchronous alternative to calling another service directly.
- **Software Architecture** (`01-cs-fundamentals/25-software-architecture`) — the general discipline of boundaries and coupling that this entry is a special case of.
