## Example 1 — Thirty-two workers that were slower than four

A batch job processes a fixed set of CPU-bound items on a four-core machine. The table is the wall time for the same work at different worker counts. Say what limits the speed-up, and why the last row is worse than the third.

```text
workers   wall time
   1        400 s
   4        108 s
   8        104 s
  32        170 s
```

### Solution

```text
1 -> 4  : near-linear; four runnable threads on four hardware threads
4 -> 8  : almost nothing gained; the cores are already saturated
8 -> 32 : slower — more threads than cores means more context switches
          and a colder cache per unit of work
```

With one runnable thread per core the scheduler rarely has to choose, so the work divides almost perfectly. Once the cores are saturated, extra threads only add switching and cache pressure, and each switch saves and restores registers into a cold cache, so the wall time rises instead of falling. The trap is that the limit is the hardware thread count and what the threads are waiting on — not the size of the pile of work, which is what makes "add more workers" look free.

## Example 2 — A lock held across the wrong call

Two request handlers update a shared cache, and the handler below takes the lock before making a network call. The trace shows what happens to the other requests. Say why unrelated requests slow down, then rewrite the handler.

```text
handler A: lock(cache) -> fetch from upstream (300 ms) -> unlock
handler B: lock(cache) -> blocked for 300 ms
handler C: lock(cache) -> blocked for 300 ms
```

### Solution

```text
the lock is held while waiting on I/O, so every thread touching the cache
waits for the slowest network call. Blocking frees the core, but these
threads are not blocked on a core — they are blocked on the lock.

fix: fetch first, then lock only to apply the result
  value = fetch(key)                       # no lock held
  cache.withLock(() => cache.set(key, value))
```

A blocking read turns one thread into a waiting one and lets the core run something else, which is why waiting on I/O is normally cheap; here the lock makes the wait contagious, so a thread that only wanted an unrelated key queues behind the network. Moving the fetch outside the critical section leaves the lock covering only the in-memory update, which takes microseconds. The trap is that the code is correct and the lock is doing its job — it is simply far too wide, and the symptom appears as latency in endpoints that share nothing with this one.
