---
title: Message Queues (Kafka / RabbitMQ)
type: skill
topic: backend-data
tier: medium
status: drafted
aliases: ["Kafka", "RabbitMQ"]
prereqs: ["backend-data/microservices"]
related: []
---

## What it is

A message broker sits between a producer and a consumer so that the producer does not have to wait for the consumer, and does not have to know who it is. The producer publishes a message; the broker stores it; a consumer takes it when it is able. Kafka and RabbitMQ are two widely used implementations with different models underneath — one behaves like an append-only log, the other like a queue of messages to be delivered — and both are used for the same purpose: decoupled, asynchronous work.

## Why it matters

Asynchrony changes the failure model of a system in ways that are mostly improvements and occasionally worse. A slow consumer no longer holds up the producer, which makes a system resilient to bursts. But work now happens after a response has been sent, so a failure is not visible to the caller, and a message can be delivered twice or out of order. Designing with those properties rather than discovering them is the whole skill, and it is the same set of concerns across brokers.

## In this track

1. **Queues and logs** (`backend-data/message-queues-kafka-rabbitmq/01-queues-and-logs`) — the two underlying models and what each implies.
2. **Retries, ordering and back-pressure** (`backend-data/message-queues-kafka-rabbitmq/02-retries-ordering-and-back-pressure`) — the mechanics that decide whether asynchronous work is reliable.

## Prerequisites

- **Microservices** (`backend-data/microservices`)

## Go deeper

- **Microservices** (`backend-data/microservices`) — the architecture this decoupling usually serves, so read it first.
- **The operational cost** (`backend-data/microservices/02-the-operational-cost`) — the failure and observability concerns a broker inherits.
- **Software Architecture** (`cs-fundamentals/software-architecture`) — boundaries and coupling, of which a queue is one mechanism.
