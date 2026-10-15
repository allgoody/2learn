---
title: Processes, threads and scheduling
prereqs: ["01-cs-fundamentals/02-data-structures"]
---

## What it is

A process is a running program with its own address space, file descriptors and identity. A thread is a unit of execution inside a process, sharing that address space and those descriptors with its siblings. Threads are what the scheduler actually runs. A machine with a handful of cores runs hundreds of threads by switching between them, and everything the operating system charges for is the price of that switching.

## Why it matters

The difference between a process and a thread decides where your data can be corrupted. Threads share memory, so two of them can update the same value at the same moment and produce a result neither intended; processes do not, so they pay for a message instead. Understanding the scheduler explains the shape of production latency: why adding workers stops helping at some point, why a blocking call stalls everything on the same thread, and why a context switch is cheap in isolation and expensive in a loop. These are the facts behind every concurrency bug you will meet.

## Core ideas

### A process owns an address space

Starting a process gives it a private view of memory, a table of open files and a process id. Nothing another process does can write into its memory through an ordinary pointer, which is why process isolation is such a strong safety guarantee. The cost is coordination: two processes share work only by passing data through a pipe, a socket or a file, and each byte crosses a boundary the kernel controls.

```text
process A                process B
  address space            address space
  fd 0,1,2 ...             fd 0,1,2 ...
        \                   /
         +--- pipe / socket ---+
```

### Threads share the address space

Threads inside one process see the same globals, the same heap and the same file descriptors. Sharing is cheap — a pointer is a pointer — and it is also the source of every race condition. Two threads incrementing the same counter can both read the old value before either writes, so one increment disappears. The address space is shared; the program counter, stack and registers are not.

```text
counter = 0
thread 1: read 0 -> write 1
thread 2: read 0 -> write 1     # one increment lost
```

### The scheduler decides who runs

There are always more runnable threads than cores. The scheduler gives each one a slice of time, then saves its registers and switches to another. A hardware thread that is busy is a core at work; a thread that is waiting for I/O is parked and costs nothing until its data arrives. Context switches are microseconds each, which is invisible once and significant millions of times.

```text
core 0: [A 4ms][B 4ms][C 4ms][A 4ms] ...
ready queue: B, C, D, E, ...
switch: save A's registers, load B's, resume B
```

### States, blocking and back-pressure

At any moment a thread is running, runnable, or waiting on something. A blocking read turns a running thread into a waiting one and frees the core, which is why blocking on I/O is not wasteful — but blocking while holding a lock stalls every thread that needs that lock. Adding workers helps only until the cores are saturated or a shared resource queues; past that point more concurrency means more switching and more waiting.

## Practice

### Watch the threads on your machine

Start a program that does nothing but sleep, then inspect the process list and count its threads. Run a second instance and compare the process ids and memory figures.

Done when: you can point at the columns that show separate address spaces for the two processes and shared memory for the threads inside one.

### Oversubscribe on purpose

Run a fixed CPU-bound task on one thread, then on four, then on thirty-two, and time each.

Done when: the four-thread run is clearly faster, and you can explain why the thirty-two-thread run is not four times faster again.

## Common mistakes

- **Sharing mutable state between threads without synchronisation** — the corruption appears only under load and never in a debugger; fix: protect the value with a lock, or give each thread its own copy and combine at the end.
- **Blocking on I/O while holding a lock** — every thread that needs the lock waits for the slowest network call; fix: read the data first, then take the lock only to update shared state.
- **Spawning a thread per request without a limit** — the machine spends its time switching and dies of memory rather than work; fix: use a bounded pool sized to the cores and the workload.
- **Assuming a thread starts immediately** — the scheduler may run it long after it was created; fix: make the ordering explicit with a synchronisation primitive rather than a sleep.
- **Measuring on an idle machine and shipping to a busy one** — contention is invisible when nothing else is running; fix: benchmark with the concurrency the service will actually see.

## Go deeper

- **Data Structures** (`01-cs-fundamentals/02-data-structures`) — the queues and schedulers here are data structures with a policy attached, so read this first.
- **Memory and filesystems** (`01-cs-fundamentals/15-operating-systems/02-memory-and-filesystems`) — the address space these threads share, and what happens when it does not fit.
- **Concurrency & Async Programming** (`01-cs-fundamentals/05-concurrency-async-programming`) — locks, races and async models, from inside the program.
