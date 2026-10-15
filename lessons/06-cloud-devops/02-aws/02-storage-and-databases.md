---
title: Storage and databases
prereqs: ["06-cloud-devops/02-aws/01-compute-and-ec2"]
---

## What it is

Storage on AWS comes in three shapes that are easy to confuse because all three are called "storage" in conversation. Block storage behaves like a disk attached to one machine. Object storage is a flat store of named blobs reached over the network. Managed databases are a service that runs a familiar database engine for you, with backups, replication and failover handled by the provider. The choice between them is decided by how the data is read and written, not by how much of it there is.

## Why it matters

Where data lives is the hardest thing to change later. Moving a service to a new compute platform is a deployment; moving its database is a migration with downtime, dual writes and a rollback plan. Storage also drives cost and durability more than any other part of the system: object storage is cheap and effectively unbounded, block storage is priced by provisioned size whether or not you fill it, and a managed database costs more than running the engine yourself and buys you the operational work you did not do. This is the decision most likely to be regretted, so it deserves more than a default.

## Core ideas

### Match the access pattern, not the volume

Block storage is a disk: low-latency reads and writes for one machine, priced by the size you reserve. Object storage is a namespace of immutable blobs, priced by what you store and move, reachable from anywhere. A database is a query engine with transactions and indexes. Ask what the reader does — random small reads, sequential scans, or requests for whole files by name — and the answer usually names one of the three.

```text
disk attached to one machine   ->  block storage
whole files fetched by name    ->  object storage
queries, joins, transactions   ->  a database
```

### Durability and availability are different promises

Durability is the chance your data still exists; availability is the chance you can read it right now. Object storage is extremely durable and can spread copies across regions. A single-instance database is neither durable nor available during a failure unless you configure replicas. Reading the provider's claims with those two words separated stops most storage surprises.

### Managed databases trade money for operations

Running the engine yourself means owning patching, backups, replication, failover and capacity. A managed service takes those over, and in exchange costs more per hour and gives you fewer knobs. For most teams the trade is worth it, because the operational work is the part they are least able to do well. The mistake is paying for a managed service and then operating it as though it were self-hosted.

### Backups are only real when restored

Every storage decision includes a restore path. A backup that has never been restored is a hope, not a backup: encryption keys, permissions and the restore procedure all have to work at the moment you need them. Object storage lifecycle rules are the cheapest way to keep backups for years, provided something regularly proves they can be read back.

### Cost accumulates in the quiet parts

Requests, retrievals, cross-region transfer and early deletion all have prices. Object storage is cheap per gigabyte but charges for getting data out, so an archive that is read often is not cheap. Deleting a database replica removes the cost and the standby at the same time. Watching the storage line of the bill is the fastest way to find resources nobody is using.

## Practice

### Choose storage for three workloads

Take a photo library, a session store for a web application, and a ledger with balances and transfers. For each, pick block, object or managed database and write one sentence on the access pattern that decided it.

Done when: each choice names the read or write pattern that made the other two wrong.

### Restore a backup

Create an object store with a lifecycle rule, put a file in it, delete the original and restore it from the retained copy.

Done when: you have read back the restored file and can name every permission and key the restore needed.

## Common mistakes

- **Putting a database on block storage and calling it durable** — one machine, one copy, no failover; fix: use a managed engine or configure replication deliberately.
- **Treating object storage as a filesystem** — renaming or editing a blob rewrites the whole object; fix: treat objects as immutable and version rather than mutate.
- **Choosing a managed database and then operating it by hand** — you pay for automation you do not use; fix: let the service handle patching and failover.
- **Assuming a backup exists because the service took one** — the restore path was never tested; fix: restore on a schedule and record what it required.
- **Ignoring retrieval and transfer charges** — storage is cheap but reading it is not; fix: match the storage class to how often the data is actually read.

## Go deeper

- **Compute and EC2** (`06-cloud-devops/02-aws/01-compute-and-ec2`) — the machines that read and write this storage.
- **AWS** (`06-cloud-devops/02-aws`) — the account and catalogue these services sit in.
- **Networking and VPC** (`06-cloud-devops/02-aws/03-networking-and-vpc`) — how the storage endpoints are reached from your network.
