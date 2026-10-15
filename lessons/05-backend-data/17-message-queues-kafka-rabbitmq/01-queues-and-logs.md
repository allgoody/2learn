---
title: Queues and logs
prereqs: ["05-backend-data/17-message-queues-kafka-rabbitmq"]
---

## What it is

Two models sit under the brokers that carry asynchronous work. A queue delivers each message to one consumer and considers it done once acknowledged, so the message disappears after it is handled. A log appends every message to an ordered, durable sequence that consumers read at their own position, so the message remains available to be read again by the same or another consumer.

## Why it matters

The choice decides what the system can do later. A queue is the simpler mental model and it suits work that must happen exactly once per item: send this email, charge this card. A log retains the history and lets several independent consumers read the same events, which is what makes it possible to add a consumer later and replay what it missed. Choosing a queue when the history matters means the events are gone; choosing a log for a one-off task means managing positions for no benefit.

## Core ideas

### A queue is work to be done; a log is a record of what happened

A queue's message is an instruction addressed to whoever is available, and its lifetime ends with the acknowledgement. A log's record is a fact appended to a sequence, and its lifetime is the retention period. Reading the intended meaning of the message tells you which model is appropriate more reliably than any performance comparison.

```text
queue:  [task] -> one consumer -> acknowledged -> gone
log:    [event0][event1][event2] ... retained, each consumer has its own position
```

### Ordering guarantees are per partition, not global

A queue with several consumers delivers each message once but makes no promise about the order two different consumers see. A log guarantees order within a partition, so all messages sharing a key are ordered relative to each other and messages with different keys are not. Where order matters, the key must be chosen so that related messages land together.

### A consumer position is state that must be managed

In a log, each consumer group tracks how far it has read. Committing a position too early loses messages if the consumer then fails; committing too late reprocesses them. The usual approach is to commit after the work is done, which means duplicate delivery is possible and therefore the handler must be idempotent.

### Delivery is at-least-once in practice, so handlers must be repeatable

Any broker that guarantees no loss will redeliver when an acknowledgement is not received, and a lost acknowledgement is indistinguishable from a lost message. The consequence is that a handler can see the same message twice and must produce the same result: record that the work was done, keyed on the message, before or with the change. Exactly-once delivery is a property of the whole pipeline rather than a broker setting.

### Fan-out is natural in a log and needs a mechanism in a queue

Several independent consumers reading the same events is the default in a log, since each has its own position. In a queue, delivering one message to several consumers requires a topic with subscriptions or an explicit exchange configuration, and the semantics differ. Where several systems must react to the same event, this is the deciding factor.

### Retention is a design parameter, not a cleanup detail

How long messages are kept decides whether a new consumer can replay history and whether a failure can be recovered by rewinding. A retention shorter than the time it takes to notice a bug means the data needed to repair it is gone. This is a decision to make deliberately, in both models.

## Practice

### Choose a model for two workloads

Take a task that must be performed once per order and an event that three systems must react to, and choose a queue or a log for each with a reason.

Done when: each choice names whether re-reading the same item by another consumer is required.

### Read one event twice

Publish a message, consume it, and then consume it again from the retained position without republishing.

Done when: the same message is processed twice and you can name the record that made the second processing harmless.

## Common mistakes

- **Using a queue where a later consumer will need the history** — the events are gone; fix: use a log when the record itself has value.
- **Assuming global ordering with several consumers** — only per-partition order is guaranteed; fix: choose a key so related messages share a partition.
- **Committing a position before the work is done** — a failure loses messages; fix: commit after processing and make the handler idempotent.
- **Expecting exactly-once delivery from the broker** — redelivery is normal; fix: make the handler safe to run twice.
- **Setting retention without considering recovery** — the evidence needed to repair a bug has expired; fix: choose retention from the recovery window.

## Go deeper

- **Message Queues (Kafka / RabbitMQ)** (`05-backend-data/17-message-queues-kafka-rabbitmq`) — the brokers these two models are implemented by, so read it first.
- **Retries, ordering and back-pressure** (`05-backend-data/17-message-queues-kafka-rabbitmq/02-retries-ordering-and-back-pressure`) — the mechanics that follow from this choice.
- **Microservices** (`05-backend-data/12-microservices`) — the architecture this asynchrony usually serves.
