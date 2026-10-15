## Example 1 — A message that fails twice

A payment consumer calls a gateway that has started refusing connections. The consumer is configured with three attempts and a dead-letter destination. Trace this message through its attempts and say where it ends up.

```text
retry policy
  attempts: 3
  back-off: about 1s, then about 2s, with jitter
  exhausted -> payments.dead-letter

attempt 1  failed: connection reset
```

### Solution

```text
attempt 1  08:00:00  failed  connection reset
            back-off about 1s, with jitter
attempt 2  08:00:02  failed  connection reset
            back-off about 2s, with jitter
attempt 3  08:00:05  failed  connection reset
            attempts exhausted -> routed to payments.dead-letter

08:00:05  payments.dead-letter  depth 1   <- an operator can see and alert on this
times and durations are illustrative
```

Back-off keeps the third attempt from arriving at the same instant as the first and gives a recovering gateway room, while the attempt cap stops a permanently failing message from being retried forever. The third attempt is also the point of no return: with a dead-letter destination the message lands somewhere an operator can inspect, instead of being dropped or blocking every message behind it. What usually goes wrong is retrying immediately and without a cap, which turns one bad message into a partition that never drains.

## Example 2 — Ordering that does not survive round-robin

Three events for one order — created, paid, shipped — are published with no key across four partitions and four consumers. The consumer log shows shipped being handled before created, which the downstream state machine rejects. Preserve the order of related events without giving up parallelism.

```text
partitions: 4   consumers: 4   key: none (round-robin)
order.8842.created  -> partition 2
order.8842.paid     -> partition 0
order.8842.shipped  -> partition 3
observed: shipped handled before created for some orders
```

### Solution

```text
partitions: 4   consumers: 4   key: order id

partition 0: order.8842.created -> order.8842.paid -> order.8842.shipped
partition 2: order.8843.created -> order.8843.paid

consumers: 4   (a fifth adds no parallelism until partitions are added)
the key is what makes related events share a partition, and order within a
partition is the only order the log promises.
```

Ordering is guaranteed per partition, so the fix is a key that puts every event for one order in the same stream, while different orders still run in parallel across partitions. The number of useful consumers is capped by the number of partitions, so throughput comes from adding partitions rather than consumers. What usually goes wrong is adding consumers beyond the partition count and expecting more parallelism, which buys idle processes and leaves the ordering bug in place.
