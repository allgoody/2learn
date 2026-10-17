---
title: Processes, threads and scheduling
prereqs: ["01-cs-fundamentals/02-data-structures"]
---

## What it is

A process is a running program with its own address space, its own table of open files and its own identity number. A thread is a unit of execution inside a process, sharing that address space and those files with its siblings. Threads are what the scheduler actually runs: a machine with 8 hardware threads — 8 places where instructions execute at the same moment — can hold 400 runnable threads, each given a slice of time and then switched aside, so one thread receives `8 / 400 = 0.02` of the machine, about 2 %. Everything the operating system charges for is the price of that switching and of keeping 400 such threads apart.

## Why it matters

The difference between a process and a thread decides where your data can be corrupted. Threads share memory, so two of them updating one counter can read the same old value before either writes, and two threads doing 1 000 000 increments each can finish with a counter well below `2 * 1 000 000 = 2 000 000`. Processes share nothing, so they pay for a message instead: sending 1 MB — 1 MB is 1 048 576 bytes — through a pipe copies it into a kernel buffer and out again, `2 * 1 048 576 = 2 097 152` bytes moved, plus one system call. The scheduler explains the shape of production latency too: adding workers stops helping once they outnumber the hardware threads, a blocking call parks its thread for the full duration of the call, and a context switch costs about 2 microseconds: invisible once, and `1 000 000 * 2 = 2 000 000` microseconds, or 2 seconds, a million times over.

## Core ideas

### A process owns an address space

Starting a process gives it a private view of memory, a table of open files and a process id. Its file descriptors are the small integers naming the files and sockets it holds, and nothing another process does can write into its memory through an ordinary pointer, which is why process isolation is such a strong safety guarantee. The cost is coordination: two processes share work only by passing data through a pipe, a socket or a file, and every byte crosses a boundary the kernel controls.

```text
process A                process B
  address space            address space     each sees addresses from 0 upward as its own
  fd 0, 1, 2 ...           fd 0, 1, 2 ...    fd = file descriptor, a small integer naming an open file
        \                   /
         +--- pipe / socket ---+             bytes pass through a buffer the kernel owns

sharing 1 MB between them: 1 048 576 bytes copied in, 1 048 576 copied out = 2 097 152 bytes moved
the same 1 MB is read by a second thread in a process with no copy at all
```

### Threads share the address space

Threads inside one process see the same globals, the same heap and the same file descriptors, so a pointer is a pointer and passing data between them costs nothing. That is also the source of every race condition. Two threads incrementing one counter can both read the old value before either writes, so one increment disappears, and three things every thread keeps to itself decide what it is doing: a program counter, its registers, and a stack for its local variables, each reserved when the thread is created.

```text
counter = 0                  shared, so both threads see the same variable

thread 1: read 0 -> write 1
thread 2: read 0 -> write 1  one increment lost: two increments, counter ends at 1

each thread's own copy: program counter (which instruction runs next), registers, stack
each thread's stack is reserved at creation, 1 048 576 bytes by default in many languages
```

### The scheduler decides who runs

There are always more runnable threads than hardware threads, so the scheduler gives each one a slice of time, saves its registers at the end of the slice, and loads another's. A thread waiting on I/O is parked instead: it holds no slice and costs no processor time until its data arrives. The slice is short enough to feel instant and long enough to be worth switching for.

```text
8 hardware threads, 400 runnable threads
slice = 4 ms                                  ms = millisecond, a thousandth of a second
threads per hardware thread = 400 / 8 = 50
a thread therefore waits between runs = 50 * 4 ms = 200 ms
switch = 2 µs                                 µs = microsecond, a millionth of a second
1 000 000 switches = 1 000 000 * 2 = 2 000 000 µs = 2 s

core 0: [A 4ms][B 4ms][C 4ms][A 4ms] ...
ready queue: B, C, D, E, ...
switch: save A's registers, load B's, resume B
```

### States, blocking and back-pressure

At any moment a thread is running, runnable, or waiting on something. A blocking read turns a running thread into a waiting one and frees the core, which is why blocking on I/O is not wasteful — but blocking while holding a lock stalls every thread that needs that lock, and a lock held across a 300 ms network call makes each of the 3 threads behind it wait the full 300 ms. Adding workers helps only until the hardware threads are busy or a shared resource queues.

```text
4 hardware threads, one CPU-bound task of 100 000 000 steps
 1 worker:  1 hardware thread busy  = 25 % of the machine
 4 workers: 4 hardware threads busy = 100 %, and the task takes about a quarter of the time
 8 workers: 2 threads per hardware thread — the same 100 %, plus twice the switches and colder caches
```

Past saturation, more concurrency means more switching and more waiting rather than more work done, which is why a thread pool is sized to the hardware threads and the kind of work, not to the requests that might arrive.

## Practice

### Watch the threads on your machine

Start a program that does nothing but sleep for 10 seconds, then inspect the process list and count its threads. Run a second instance and compare the process ids, the memory figures and the processor time.

Done when: you can point at the columns showing separate address spaces for the two processes and shared memory between the threads of one, and you can report that the sleeping process holds its memory — say 20 MB resident — while using 0 % of the processor over the whole 10 seconds.

### Oversubscribe on purpose

Run a fixed CPU-bound task on one thread, then on four, then on thirty-two, and time each. Time the one-thread run once and call it `T`; on a machine with 4 hardware threads the four-thread run should take about `T / 4`.

Done when: the four-thread run is at least 3 times faster than the one-thread run, and you can explain why the thirty-two-thread run is not 8 times faster again — 32 threads on 4 hardware threads means 8 threads per core, so each one gets 8 slices of the time a single thread would have had, plus the switching in between.

## Common mistakes

- **Sharing mutable state between threads without synchronisation** — two threads doing 1 000 000 increments each can end with a counter below `2 * 1 000 000 = 2 000 000`, and the corruption appears only under load and never in a debugger, because a debugger stops the other thread; fix: protect the value with a lock, or give each thread its own copy and combine at the end.
- **Blocking on I/O while holding a lock** — a lock held across a 300 ms network call makes the 3 threads behind it wait 300 ms each, so a request that needed no network at all waits 900 ms; fix: read the data first, then take the lock only to update shared state, which takes microseconds.
- **Spawning a thread per request without a limit** — 10 000 concurrent requests, each thread reserving 1 048 576 bytes of stack, reserve `10 000 * 1 048 576 = 10 485 760 000` bytes, about 10 GB, and the machine dies of memory rather than of work; fix: use a bounded pool sized to the hardware threads and the workload.
- **Assuming a thread starts immediately** — creating a thread returns in microseconds while the new thread waits for its first 4 ms slice, so a flag it sets may appear long after the call that created it; fix: make the ordering explicit with a synchronisation primitive rather than a sleep.
- **Measuring on an idle machine and shipping to a busy one** — one worker on 4 hardware threads uses 25 % of the machine, so contention is invisible until the other 75 % is taken; fix: benchmark with the concurrency the service will actually see.

## Go deeper

- **Data Structures** (`01-cs-fundamentals/02-data-structures`) — the queues and schedulers here are data structures with a policy attached, so read this first.
- **Memory and filesystems** (`01-cs-fundamentals/15-operating-systems/02-memory-and-filesystems`) — the address space these threads share, and what happens to the pages of it that no longer fit.
- **Concurrency & Async Programming** (`01-cs-fundamentals/05-concurrency-async-programming`) — locks, races and async models, from inside the program rather than below it.
