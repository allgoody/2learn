---
title: Threads, locks and races
prereqs: []
---

## What it is

Two threads sharing a value are two independent sequences of reads and writes with no agreement about their order. A race is what happens when the result depends on that order. A lock removes the choice: only one thread at a time may hold it, so the code inside the critical section runs as if it were alone. Everything difficult about shared-state concurrency follows from how much you put in that section and in what order locks are taken.

## Why it matters

Races do not fail loudly. The program runs correctly a million times and then produces a wrong total, with nothing unusual in the log. Worse, the compiler and processor may reorder operations that look sequential in source, so a fix that works on your machine can be broken on another. Locks are also the usual cause of the other failure: a program that stops entirely because two threads each hold what the other needs. Knowing the rules lets you choose small, provable patterns instead of hoping the timing works out.

## Core ideas

### A race is a missing ordering

Reads and writes to shared memory are only ordered when something forces them to be. Without that, another thread may observe a partial update: a list where the length was incremented before the element was stored. The bug is not slowness but that another thread could look in the middle. The fix is to make the whole update appear as one step to everyone else.

```text
shared list, length 0
thread 1: store element   (length still 0)
thread 2: read length 0 -> loop ends before the element is visible
```

### A lock makes a section atomic

Holding a mutual-exclusion lock guarantees that no other thread runs the same section at the same time, and that its writes are visible to the next holder. The size of the section is the design decision: too small and you split an operation that belongs together, too large and you serialise work that could have overlapped. Everything that must be seen together goes in; everything slow — a network call, a disk read — stays out.

```text
lock(mutex)
  count = count + 1     # read and write are one step here
unlock(mutex)
```

### Deadlock comes from lock ordering

If thread A holds lock one and wants lock two, while thread B holds two and wants one, neither ever moves. The condition is a cycle in the wait graph, and it needs all four of mutual exclusion, holding while waiting, no preemption and a cycle. Break any one: acquire locks in one global order, use a single lock where possible, or use a try-lock that gives up instead of waiting.

```text
A: holds m1, wants m2
B: holds m2, wants m1        <- cycle, both wait forever
```

### Immutable data needs no lock

The cheapest synchronisation is the one you do not need. A value never modified after it is published can be read by any number of threads safely. This is why concurrent code so often passes immutable messages between tasks rather than mutating a shared structure. Where mutation is unavoidable, confining the data to one thread — or to one owner that everyone else messages — removes the race by construction.

### Bounded queues instead of shared structures

A queue between producer and consumer threads is the workhorse pattern. A bounded queue gives back-pressure for free: when full, the producer waits and the system slows instead of running out of memory. The queue's synchronisation is written once and tested; the code around it never touches shared state directly.

```text
producers -> [ bounded queue ] -> workers
full queue blocks the producer, which is the signal to slow down
```

## Practice

### Break it, then fix it

Write a program that starts four threads, each incrementing a shared counter a hundred thousand times, and prints the total. Run it several times.

Done when: the total is wrong and varies between runs, and after adding a lock around the increment it is exactly right every time.

### Reproduce a deadlock

Write two threads that take two locks in opposite orders, with a short sleep between the acquisitions. Run it and observe the hang, then make one thread take the locks in the same order as the other.

Done when: the first hangs reliably, the second always completes, and you have written down the ordering rule that fixed it.

## Common mistakes

- **Reading a shared value outside the lock** — it may be a half-finished update; fix: read and write inside the same critical section, or make the value immutable.
- **Holding a lock across a network call** — every other thread queues behind the slowest request; fix: fetch first, then take the lock to apply the result.
- **Assuming the compiler keeps source order** — reordering is legal where no synchronisation forbids it; fix: rely on locks or atomics, not statement order.
- **Taking two locks in different orders** — the deadlock appears only when both paths run at once; fix: define one global lock order and follow it everywhere.
- **Sharing a mutable collection between threads** — the internals are safe but your sequence of calls is not; fix: guard the sequence, or hand ownership to one thread at a time.

## Go deeper

- **Async, promises and event loops** (`cs-fundamentals/concurrency-async-programming/02-async-promises-and-event-loops`) — the other way to overlap work, where the unit is a callback rather than a thread.
- **Operating Systems** (`cs-fundamentals/operating-systems`) — threads, scheduler and the memory model these locks are built on.
- **Debugging** (`cs-fundamentals/debugging`) — how to make a timing-dependent fault reproducible before you try to fix it.
