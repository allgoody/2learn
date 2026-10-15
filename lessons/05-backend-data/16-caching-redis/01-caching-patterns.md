---
title: Caching patterns
prereqs: ["05-backend-data/16-caching-redis"]
---

## What it is

Where a cache sits and how it is filled. It can sit beside the application, in front of the database, or be consulted by the application itself; it can be filled when a read misses, when data is written, or ahead of time by a background job. Each arrangement answers a different question about what is stored, who fills it and what happens when it is empty.

## Why it matters

The arrangement determines the failure behaviour as much as the performance. A cache that is consulted on every read and never filled will be correct and useless; one that is filled on write and never expires will be fast and eventually wrong; one that the application bypasses on a miss will be fast until the moment traffic spikes, when every miss reaches the database at once. Deciding these up front is cheap; discovering them during an incident is not.

## Core ideas

### Cache beside the read, and fill it on a miss

The common pattern reads the cache, and on a miss reads the source, stores the result with an expiry and returns it. It is simple, needs no coordination with writes, and self-populates only with data that is actually requested. Its weakness is that the first request after an expiry pays the full cost, and that a burst of simultaneous misses for the same key all reach the source.

```text
read cache -> hit? return
           -> miss -> read source -> store with ttl -> return
```

### Guard against the thundering herd

When a popular key expires, every concurrent request misses it at once and the source receives a burst exactly when it is least able to absorb one. Serving one caller and letting the rest wait, or adding a small random variation to the expiry so keys do not expire together, prevents it. This is the most common way a cache makes an outage worse rather than better.

### Expiry is the primary safety mechanism, and it must be a real choice

A time to live bounds how long a stale value can survive even if invalidation is missed. Choosing it is a statement about how much staleness the application tolerates: seconds for a price, hours for a country list. A cache with no expiry is a copy that can diverge forever, and the divergence is discovered at the worst time.

### Store the shape the reader needs

Caching the row as fetched and caching the rendered response are different decisions. A rendered response removes more work and can only be reused when nothing about the requester varies; a cached entity can be reused more widely and still needs to be assembled into a response.

### A cache is not a database and must never be the only copy

The store is in memory, and a restart or an eviction can remove any key at any time. Any write that exists only in the cache is a write that will be lost. Where a value must survive, it belongs in a store that persists it, with the cache as a copy. Confusing the two turns a performance tool into a data-loss incident.

The proportion of requests answered from the cache tells you whether it is doing anything. A low hit rate means the keys are not reused, the entries expire too quickly, or the cache is being bypassed — each a different fix.

### Sessions and counters are a different use of the same store

Storing a session in the cache gives every application instance a shared view of who is logged in, and an expiry gives the session a natural end. Counters and rate limits use an atomic increment, which is the reason a store with operations rather than plain values is convenient. These are legitimate uses that happen not to be caching at all.

## Practice

### Add a cache and measure the hit rate

Put a cache in front of an expensive read, add an expiry, and record the hit rate over a period of realistic traffic.

Done when: you can state the hit rate and what fraction of requests now reach the source, and you have one number showing the latency change.

### Make an expiry burst safe

Take a popular key and describe what happens when it expires under load, then change the expiry so simultaneous misses are avoided.

Done when: you can explain why the source does not receive a burst when the key expires.

## Common mistakes

- **Caching with no expiry** — the copy can diverge indefinitely; fix: set a time to live that matches the tolerated staleness.
- **Letting every request miss at once after an expiry** — the source receives a burst at the worst moment; fix: serve one caller and let the others wait, or jitter the expiry.
- **Treating the cache as the only copy** — a restart loses data that was never persisted; fix: write to the source of truth first.
- **Caching a response that varies per user without including the user in the key** — one user's data is served to another; fix: make the key depend on everything the response varies with.
- **Never measuring the hit rate** — the cache may be adding risk and cost for nothing; fix: instrument the hit rate and review it.

## Go deeper

- **Caching (Redis)** (`05-backend-data/16-caching-redis`) — the store and the discipline these patterns belong to, so read it first.
- **Invalidation** (`05-backend-data/16-caching-redis/02-invalidation`) — the harder half of keeping a copy honest.
- **SQL & Relational Databases** (`05-backend-data/07-sql-relational-databases`) — the source of truth these patterns copy from.
