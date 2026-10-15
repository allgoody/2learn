---
title: Caching (Redis)
type: skill
topic: 05-backend-data
tier: medium
status: drafted
aliases: ["Redis"]
prereqs: ["05-backend-data/07-sql-relational-databases"]
related: []
---

## What it is

A cache keeps a copy of data that is expensive to produce in a place that is fast to read. Redis is an in-memory key-value store commonly used for that purpose, and also for sessions, counters, rate limits and queues. Because the data lives in memory, reads and writes are far faster than a database's, at the cost that the store is small and its contents are not the source of truth.

## Why it matters

Most applications have a small number of reads that happen far more often than the underlying data changes: a product page, a feature flag, a user's permissions. Serving those from memory removes most of the load from the database and most of the latency from the request, which is often the largest available performance improvement and requires no schema change. The complication is that there are now two copies of the data, and the second one can be wrong; managing that is the entire discipline.

## In this track

1. **Caching patterns** (`05-backend-data/16-caching-redis/01-caching-patterns`) — where the cache sits, how it is filled, and what is stored.
2. **Invalidation** (`05-backend-data/16-caching-redis/02-invalidation`) — keeping the copy honest, and what to do when it is not.

## Prerequisites

- **SQL & Relational Databases** (`05-backend-data/07-sql-relational-databases`)

## Go deeper

- **SQL & Relational Databases** (`05-backend-data/07-sql-relational-databases`) — the source of truth this cache is a copy of, so read it first.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — what the database is doing on the requests the cache does not answer.
- **Monitoring & Observability (Prometheus / Grafana)** (`06-cloud-devops/18-monitoring-observability-prometheus-grafana`) — how the hit rate and the error rate of a cache are watched.
