---
title: Invalidation
prereqs: ["05-backend-data/16-caching-redis/01-caching-patterns"]
---

## What it is

Invalidation is deciding when a cached copy stops being used. It can happen when the source changes, when a timer expires, or when a version identifier makes the old copy unreachable. It is the part of caching that is genuinely difficult, because the cache has no way to know that the data it holds is no longer true.

## Why it matters

A stale cache produces the worst class of bug: the system looks healthy, every request succeeds, and the data is wrong. There is no error to alert on and no stack trace to read, and the symptom is usually reported by a user who has tried the action three times. Because the failure is silent and intermittent, invalidation deserves more design attention than the caching itself, and the honest default is to prefer expiry over cleverness.

## Core ideas

### Expiry is the fallback that makes every other mechanism optional

A time to live guarantees that a missed invalidation is corrected within a bounded period. Every other mechanism is then an optimisation on top of it rather than a correctness requirement. Systems that rely on explicit invalidation alone have no bound on how long a wrong value can be served, and the bug is only visible when the invalidation path is missed — which is exactly the case nobody tests.

### Invalidate on write, and accept that it can fail

Deleting or updating the cached entry when the source changes keeps the window short. The operation can fail, though — the cache may be unavailable, or the process may crash between the write and the invalidation — so this is a best-effort mechanism and expiry is still the backstop. Treating the invalidation call as guaranteed is a common and unfounded assumption.

```text
write source -> delete cache key (may fail) -> ttl bounds the staleness
```

### Versioned keys make the old value unreachable

Instead of removing a cached entry, a change can alter the key so that the old entry is never looked up again: a version number, a hash of the source row's updated timestamp, or a generation counter. The stale value remains until it expires but is unreachable, which removes the race between a write and a concurrent read that repopulates the cache with the old value.

A read misses, fetches the old value, and stores it; a write happens in between and invalidates; the fetch then stores the stale value that the invalidation was meant to remove. It is a narrow window and it produces long-lived staleness. Versioned keys avoid it by construction, and short expiries bound it.

### Never invalidate by scanning

Removing keys that match a pattern looks convenient and is expensive on a large cache, and it can block other operations while it runs. A set of related keys, or a version that makes a whole group unreachable, keeps the operation constant-time. Designing keys so a group can be invalidated as a unit is worth the small extra thought at design time.

### Invalidate only what the write actually affects

A write that touches one row does not require clearing everything derived from its table. The temptation to clear broadly is understandable and it destroys the hit rate, which removes the reason the cache existed. The set of affected keys should be derived from what changed, and where that is genuinely hard to determine, a shorter expiry for those keys is usually better than a broad delete.

### The cache is not the source and never decides correctness

Because the source of truth is the database, the correct fallback when the cache is unavailable or wrong is always to read the source. An application that refuses a request because the cache is down has a cache in the critical path, which is a design error rather than an availability problem.

## Practice

### Bound the staleness of one entry

Take a cached value and state how long it may be wrong after a change if the invalidation is missed entirely.

Done when: the answer is a finite time derived from its expiry, and you can say whether that is acceptable for a user of the feature.

### Make an invalidation total

Take a cache key that is invalidated on a write and add a version component so a concurrent read cannot repopulate it with the old value.

Done when: you can describe the interleaving that would have produced staleness and show that the new key makes it unreachable.

## Common mistakes

- **Relying on explicit invalidation with no expiry** — a missed call means unbounded staleness; fix: always set a time to live.
- **Assuming the invalidation call cannot fail** — a failed delete leaves the old value in place; fix: treat it as best effort and bound the damage with expiry.
- **Deleting keys by pattern** — the operation is expensive and can block the store; fix: invalidate a known set or use a version in the key.
- **Clearing a whole cache on one write** — the hit rate collapses and the cache stops helping; fix: invalidate only what the change affects.
- **Treating a cache failure as a request failure** — the cache becomes a single point of failure; fix: fall back to the source of truth.

## Go deeper

- **Caching patterns** (`05-backend-data/16-caching-redis/01-caching-patterns`) — where the cache sits and how entries are created.
- **Caching (Redis)** (`05-backend-data/16-caching-redis`) — the store and the discipline this child belongs to.
- **SQL & Relational Databases** (`05-backend-data/07-sql-relational-databases`) — the source of truth that decides what is stale.
