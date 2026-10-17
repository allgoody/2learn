---
title: Threads, locks and races
prereqs: []
---

## What it is

Two threads sharing a value are two independent sequences of reads and writes with no agreement about their order. A race is what happens when the result depends on that order: two threads that each increment a shared counter once leave it at 1 instead of 2 whenever both read the value 0 before either writes the 1. A lock removes the choice — only one thread at a time may hold it, so the code inside the critical section runs as if it were alone, and its writes are visible to the next holder. Everything difficult about shared-state concurrency follows from how much you put in that section and in what order the locks are taken.

## Why it matters

A race does not fail loudly. Four threads each incrementing a shared counter 100 000 times owe a total of 4 * 100 000 = 400 000; let one pair of increments interleave — both threads read 41 before either writes 42 — and the run ends at 399 999, with nothing unusual in the log and no crash to point at. The same binary on the same input then prints 400 000 on one run and 399 998 on the next, because the interleaving depends on when the scheduler switches between threads, not on the data, which is why "it passed on my machine" is worth nothing here. Locks bring a second failure mode of their own: two threads that each hold a lock the other one wants wait for each other forever, so the whole program stops rather than one total. Knowing the rules behind both turns an unreproducible incident into something you can reason about on paper.

## Core ideas

### A race is a missing ordering

Reads and writes to shared memory are ordered only when something forces them to be. An increment is not one step: it reads the shared value into the thread's own register, adds 1 there, and writes the register back, and nothing obliges one thread's read to happen before another thread's write.

```text
shared counter, four threads, each incrementing it 100 000 times
total owed = 4 * 100 000 = 400 000 increments

one interleaved pair, taken when the counter stands at 41:
  thread A reads 41        <- A's read, before either write
  thread B reads 41        <- B's read, still before either write
  thread A writes 42       <- A's increment lands
  thread B writes 42       <- B's increment lands, and A's is overwritten

400 000 increments, 2 of them counted once: 400 000 - 1 = 399 999
```

The defect is the missing ordering, not the arithmetic. The same thing happens to a list whose count is written a step before its element: a reader that trusts the count looks in a slot that is still empty. The fix is to make the whole update one step for everyone else, never to move one line above the other, because a compiler or a processor is free to put it back.

### A lock makes a section atomic

A mutual-exclusion lock — a mutex — has two operations, lock and unlock, and gives two guarantees: no other thread runs the section between them at the same time, and everything the last holder wrote is visible to the next holder. The size of that section is the design decision. Everything that must be seen together goes inside it, and everything slow — a network call, a disk read — stays outside, because a lock held across a 200 ms call makes every other thread wait those 200 ms too.

```text
four threads, counter = 0, each incrementing it 100 000 times

without the lock:  read, add, write                   400 000 increments, some pairs
                                                     collapse into one
with the lock:     lock, read, add, write, unlock   400 000 every run

the work inside the section does not change; the lock adds 2 operations per increment,
2 * 400 000 = 800 000 operations over the 400 000 increments, and no pair can interleave
```

### Deadlock comes from lock ordering

A thread waiting for a lock it cannot have is ordinary; deadlock is the case where each thread in a set waits for a lock held by another member of the set, so none of them can move. It takes four conditions at once — mutual exclusion, holding one lock while waiting for another, no way to take a lock back, and a cycle in the wait graph — and breaking any one of the four is a fix. The cheapest to break is the cycle: give the locks an order and take them in that order everywhere.

```text
three accounts, numbered 1, 2 and 3; transfer(from, to) locks both

thread A: transfer(3, 1) -> lock account 3, then wants account 1
thread B: transfer(1, 3) -> lock account 1, then wants account 3
A holds 3 and waits for 1;  B holds 1 and waits for 3   <- a cycle: both wait forever

the same two transfers with the locks always taken lowest first:
thread A: transfer(3, 1) -> lock 1, then lock 3:  both free, so it completes
thread B: transfer(1, 3) -> lock 1: A holds it, so B waits once, then locks 1 and 3
a thread holding lock k only ever waits for a lock numbered above k, so no cycle forms
```

The other standard answer is a try-lock: take it if it is free, give it back and retry if it is not. That removes "no way to take a lock back" instead of the cycle, and lets a thread back out of a wait it would otherwise keep forever.

### Immutable data needs no lock

The cheapest synchronisation is the one you do not need. A value that is fully built before it is shared and never written afterwards can be read by any number of threads at the same time, because there is no order left to agree on. That is why concurrent code so often passes immutable messages between tasks instead of mutating one shared structure.

```text
a config record of 5 fields, built at start-up and never written afterwards:
  200 request handlers read it, spread over 4 threads
  0 writers, so there is nothing to serialise: 200 readers, 0 locks

the same record made mutable:
  each write to 1 of the 5 fields must exclude the other 199 readers, or a reader
  sees 3 fields from the new version beside 2 from the old one — a mix that never
  existed in the program
```

Where mutation is unavoidable, confining the data to one thread — or to one owner that every other thread messages — removes the race by construction rather than by discipline.

### Bounded queues instead of shared structures

A queue between producer threads and consumer threads is the workhorse pattern, and a bound on it is a feature rather than a limitation. The queue is the only shared object, so its synchronisation is written once and tested once, and the code around it never touches shared state at all. A full queue blocks the producer, which is back-pressure: a signal to slow down, delivered at the point where the work is produced.

```text
queue capacity 100 items; the consumer takes 10 items per second

unbounded: the producer sends 1 000 000 items while the consumer is stalled
  the queue stores all 1 000 000 and the process runs out of memory first
bounded: the same 1 000 000 items
  items 1 to 100 fill the queue; item 101 blocks the producer until the consumer
  has taken one item, so the queue never holds more than 100

the producer then runs at the consumer's speed of 10 items per second, and the
backlog stays at 100 items instead of growing with the input
```

## Practice

### Break it, then fix it

Write a program that starts four threads, each incrementing a shared counter 100 000 times, and prints the total. The total owed is 4 * 100 000 = 400 000. Run it twenty times and write down every total you see.

Done when: at least one of the twenty totals differs from 400 000, and after putting a lock around the read, the add and the write it is exactly 400 000 on all twenty runs.

### Reproduce a deadlock

Write two threads that take two locks in opposite orders, with a 50 ms sleep between the two acquisitions — long enough that the first thread has taken its second lock before the other asks for it. Run it, watch the hang, stop the program, then make one thread take the locks in the same order as the other.

Done when: the first version hangs on every run and the second completes all its iterations, and you have written down the ordering rule that fixed it.

## Common mistakes

- **Reading a shared value outside the lock** — the read can land between the two halves of an update, so a pair of increments can leave a counter at 1 instead of 2; fix: read and write inside the same critical section, or make the value immutable.
- **Holding a lock across a network call** — with a 200 ms call inside the section and 5 threads waiting, the fifth waits 5 * 200 = 1 000 ms before it starts any work; fix: fetch first, then take the lock to apply the result.
- **Assuming the compiler keeps source order** — the three steps of an increment have no lock between them, so they may be reordered or held in a per-core cache, leaving a thread reading 41 long after another wrote 42; fix: rely on locks or atomics, not on statement order.
- **Taking two locks in different orders** — the wait graph gets a cycle, so the program hangs instead of failing, and only when both paths are in flight at the same moment; fix: define one global lock order and follow it everywhere.
- **Sharing a mutable collection between threads** — the collection's own operations are atomic but your sequence of two is not: between `if (map.has(key))` and `map.set(key, value)` another thread can run 1 000 of the same pairs; fix: guard the sequence with one lock, or hand ownership to one thread at a time.

## Go deeper

- **Async, promises and event loops** (`01-cs-fundamentals/05-concurrency-async-programming/02-async-promises-and-event-loops`) — the other way to overlap work, where the unit the runtime schedules is a callback rather than a thread.
- **Operating Systems** (`01-cs-fundamentals/15-operating-systems`) — the scheduler, the stack a thread holds and the memory model these locks are built on.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — how to make a fault that appears once in a long run of runs appear on demand.
