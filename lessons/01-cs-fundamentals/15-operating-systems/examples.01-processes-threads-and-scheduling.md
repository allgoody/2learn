## Example 1 — Thirty-two workers that were slower than four

A batch job processes a fixed set of CPU-bound items on a machine with 4 hardware threads — 4 places where instructions execute at the same moment — and the whole job takes 100 000 000 steps of work. The table is the wall time for that same job at different worker counts. Say what limits the speed-up, and why the last row is worse than the third.

```text
workers   wall time    speed-up against one worker
   1        400 s       400 / 400 = 1.0
   4        108 s       400 / 108 = 3.7
   8        104 s       400 / 104 = 3.8
  32        170 s       400 / 170 = 2.4
```

### Solution

```text
1 -> 4   three and a half times faster: four runnable threads on four hardware threads
4 -> 8   108 s against 104 s, 4 % gained: the hardware threads are already busy,
         so the extra 4 workers only take turns
8 -> 32  170 s against 104 s, 66 s lost: 32 threads on 4 hardware threads is 8 threads per
         hardware thread, and each switch hands the core to a thread whose data was evicted
         from the on-core cache while the other 7 ran

the switching itself is not the cost: even 1 000 000 switches at 2 µs each is
  1 000 000 * 2 µs = 2 000 000 µs = 2 s, against the 66 s the 32-worker run lost
  µs = microsecond, a millionth of a second
```

With one runnable thread per hardware thread the scheduler rarely has to choose, so the work divides almost perfectly and 400 s of single-threaded work finishes in 108 s. Once the hardware threads are saturated, extra threads buy a few per cent and then cost: each switch puts a thread back on a core whose cache now holds another thread's data, so every slice begins cold. The trap is that the limit is the hardware thread count and what the threads are waiting on — not the size of the pile of work, which is what makes "add more workers" look free.

## Example 2 — A lock held across the wrong call

Three request handlers update a shared cache, and each handler takes the lock before making a network call that takes 300 ms. The trace shows what happens to the other two. Say why unrelated requests slow down, then rewrite the handler.

```text
handler A: lock(cache) -> fetch from upstream (300 ms) -> unlock
handler B: lock(cache) -> blocked for 300 ms
handler C: lock(cache) -> blocked for 300 ms

ms = millisecond, a thousandth of a second, so 300 ms = 0.300 s
one handler holds the lock for 300 ms, so three handlers take 3 * 300 ms = 900 ms in turn
throughput through this lock: at most 1 / 0.300 s = 3.3 requests per second
```

### Solution

```text
the lock is held while waiting on I/O, so every thread touching the cache waits for the
slowest network call: 300 ms for B and 300 ms for C, 900 ms of pure queueing.

fix: fetch first, then lock only to apply the result
  value = fetch(key)                          # no lock held, 300 ms of network overlap freely
  cache.withLock(() => cache.set(key, value)) # the lock covers about 1 µs of memory writes

µs = microsecond, a millionth of a second; 1 000 µs = 1 ms
after the fix: three handlers wait 3 * 1 µs = 3 µs between them, against 900 ms before
900 ms = 900 000 µs, so 900 000 / 3 = 300 000 times less waiting
```

A blocking read turns one thread into a waiting one and lets the core run something else, which is why waiting on I/O is normally cheap; here the lock makes the wait contagious, so a thread that only wanted an unrelated key queues behind the network. Moving the fetch outside the critical section leaves the lock covering only the in-memory update, which takes microseconds: `900 000 / 3 = 300 000` times less waiting. The trap is that the code is correct and the lock is doing its job — it is simply far too wide, and the symptom appears as latency in endpoints that share nothing with this one.
