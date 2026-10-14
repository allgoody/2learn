---
title: Elasticity and managed services
prereqs: ["cloud-devops/cloud-native-computing/01-containers-and-declarative-configuration"]
---

## What it is

Elasticity is the platform's ability to add and remove instances as load changes; managed services are the databases, queues, caches and stores that hold what the instances must not. The two go together, because a stateless application can only be scaled freely if its state lives somewhere designed for it. Cloud-native design is largely the discipline of deciding, for every piece of state, which managed service owns it.

## Why it matters

Scaling out is only safe when instances are interchangeable: any one can serve any request, and losing one costs nothing but capacity. An application holding sessions in memory, uploading files to its own disk or keeping a queue in a process violates that, and scaling it out produces inconsistent behaviour rather than throughput. Moving the state into managed services is what unlocks the platform's promises, and it is also what makes the workload survivable — because the service that owns the data has replication and backups that your process never will.

## Core ideas

### Statelessness is a property of the deployment, not the code

No application is literally stateless; it has a database, a cache and a session. The property that matters is that no instance holds anything that cannot be lost, so any instance can be removed at any moment without data loss. Anything that must survive belongs in a service that survives the instance.

```text
instance memory:  request cache        -> may vanish
instance disk:    uploaded files      -> must not live here
managed service:  orders, sessions    -> survives any instance
```

### Scale on a signal that leads demand

Scaling on CPU reacts after the work has arrived; scaling on queue depth, request rate or a custom metric can act before. Whichever signal is chosen, the scale-up rule should be more eager than the scale-down rule, because adding capacity late is visible to users while removing it early is not. A system that flaps between sizes is usually tuned symmetrically and should not be.

### Graceful shutdown is part of scaling

When instances are removed, they are given a signal and a period to finish. A process that ignores the signal drops in-flight requests; one that stops accepting new work, drains, and exits cleanly loses nothing. Rolling deployments depend on the same behaviour, so getting it right pays for itself twice.

### Every hop to a managed service is a failure domain

A managed database is more reliable than one you run, but it is still a network dependency with latency, connection limits and its own outages. Connection pooling, timeouts and retries with backoff are not optional extras; without them a briefly slow database becomes an unbounded pile of waiting connections. Designing for partial failure is the recurring tax on a distributed system.

### Elasticity has an economic dimension

Scaling out and in is what makes consumption track demand, which is the cost advantage of the cloud. Leaving a cluster permanently sized for the annual peak discards it. The same reasoning as right-sizing applies here, only the unit of measure is instances rather than instance size.

### Managed does not mean unattended

The service is operated for you, but the capacity, indexes, connection limits and cost are still yours to choose. Treating it as a black box leads to the familiar outcomes: an under-indexed database and a bill that grows faster than the load.

## Practice

### Move one piece of state out of the instance

Take a service that stores uploaded files on its local disk. Move the files to a managed object store and keep only a reference in the application's database.

Done when: two instances behind a load balancer can both serve a download of the same file.

### Drain on shutdown

Add a shutdown handler that stops accepting new work, waits for in-flight requests, then exits. Roll the deployment while generating load.

Done when: the load test reports no failed requests across a rolling replacement.

## Common mistakes

- **Keeping sessions in instance memory** — a user is logged out whenever they land on another instance; fix: move sessions to a shared store.
- **Storing uploads on local disk** — the file exists on exactly one instance; fix: use object storage and keep references in the database.
- **Scaling on CPU alone for a queue-driven system** — the queue grows before the CPU reacts; fix: scale on the queue's depth or the arrival rate.
- **Ignoring the shutdown signal** — rolling deployments drop in-flight requests; fix: drain and exit deliberately.
- **Calling a managed service without timeouts or pooling** — a brief slowdown exhausts connections and spreads the failure; fix: bound the calls and pool the connections.

## Go deeper

- **Containers and declarative configuration** (`cloud-devops/cloud-native-computing/01-containers-and-declarative-configuration`) — the deployment model this elasticity depends on.
- **Cloud-Native Computing** (`cloud-devops/cloud-native-computing`) — the design style these two children implement.
- **AWS** (`cloud-devops/aws/02-storage-and-databases`) — one provider's storage and database services, as concrete examples of the managed layer.
