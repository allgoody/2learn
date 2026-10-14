---
title: Retries, ordering and back-pressure
prereqs: ["backend-data/message-queues-kafka-rabbitmq/01-queues-and-logs"]
---

## What it is

The mechanics that decide whether asynchronous work is reliable: what happens when a handler fails, how failed messages are retried and where they go when they keep failing, what ordering the consumers observe, and what happens when messages arrive faster than they can be processed. These are configuration and design decisions in the broker and in the handler, and they determine the system's behaviour under stress.

## Why it matters

Asynchronous systems fail quietly. A message that cannot be processed either disappears, blocks everything behind it, or is retried forever, and each of those outcomes is a choice that was made somewhere. Back-pressure decides whether a burst is absorbed and drained or accumulates until the broker fills. Getting these right is what allows the queue to keep its promise of decoupling; leaving them to defaults is how a queue becomes the place where work silently vanishes.

## Core ideas

### Retry with backoff, and cap the attempts

An immediate retry of a failure caused by an unavailable dependency fails again and multiplies the load on it. Delaying each attempt, with a growing interval and some randomness, gives the dependency time to recover and avoids all consumers retrying at the same instant. A maximum attempt count stops a permanently failing message from being retried forever.

```text
attempt 1 -> wait ~1s -> attempt 2 -> wait ~2s -> attempt 3 -> dead-letter
```

### A dead-letter destination is what makes failure visible

After the attempts are exhausted the message must go somewhere an operator can inspect, and that location must be monitored. A queue with no dead-letter path either drops the message or blocks its partition; both are worse than a growing pile someone can see. The dead-letter queue's size is one of the most useful operational signals in the system.

### Poison messages block a partition

A message that always fails will, in a queue that preserves order, stop every later message from being processed. Detecting that a message has failed repeatedly and moving it aside is what keeps one bad record from halting a stream. This is the most direct link between the retry policy and the ordering guarantee.

### Ordering and parallelism are in direct tension

Processing messages in order prevents a later message from overtaking an earlier one, and processing in parallel is what gives the throughput. A log resolves the tension by ordering within a partition, so parallelism is achieved across partitions and the key must be chosen so that messages requiring order share one. Increasing consumers beyond the partition count adds no parallelism.

### Back-pressure is a policy, not a lack of capacity

When messages arrive faster than they are consumed, something must give: the broker buffers, the producer slows, or the work is shed. Buffering delays the decision and, if the buffer is unbounded, converts a throughput problem into a memory and latency problem. The policy should be chosen deliberately — pause the producer, drop low-priority work, or shed with a recorded failure — and it should be visible in the lag metric.

The distance between the newest message and the consumer's position shows whether the system is keeping up or falling behind, and it is the single most useful number to alert on. A lag that grows steadily is a throughput problem; one that spikes and recovers is a burst being absorbed; one that is flat and high means consumers are stuck.

### Idempotence is what makes all of this safe

Every mechanism here — retry, redelivery, dead-letter replay, a consumer restarting from an earlier position — can cause the same message to be processed more than once. A handler that records the message identifier before applying its effect survives all of them; one that does not produces duplicate side effects on every recovery path.

## Practice

### Configure a retry and a dead-letter path

Take a consumer whose handler can fail and give it bounded retries with backoff and a dead-letter destination, then make it fail deliberately.

Done when: the message is retried the configured number of times and ends up in the dead-letter destination rather than being lost or blocking the stream.

### Watch lag under a burst

Publish a burst larger than the consumer can process and record the consumer lag over time, then describe what happens when the buffer is exhausted.

Done when: you can point at the metric showing the queue draining and state the policy that applies when it does not.

## Common mistakes

- **Retrying immediately and indefinitely** — the failing dependency is hammered and the message never leaves; fix: back off, add randomness and cap the attempts.
- **Having no dead-letter destination** — failures are dropped or block the stream; fix: route exhausted messages somewhere observable.
- **Adding consumers beyond the number of partitions** — no additional parallelism is gained; fix: increase partitions, choosing the key so related messages stay ordered.
- **Letting the buffer absorb an overload silently** — a throughput problem becomes a latency and memory problem; fix: choose a back-pressure policy and watch the lag.
- **Writing a non-idempotent handler** — every redelivery duplicates the effect; fix: record the message identifier before applying the change.

## Go deeper

- **Queues and logs** (`backend-data/message-queues-kafka-rabbitmq/01-queues-and-logs`) — the models whose guarantees these mechanics preserve.
- **Message Queues (Kafka / RabbitMQ)** (`backend-data/message-queues-kafka-rabbitmq`) — the brokers these settings belong to.
- **Monitoring & Observability (Prometheus / Grafana)** (`cloud-devops/monitoring-observability-prometheus-grafana`) — where consumer lag becomes an alert rather than a discovery.
