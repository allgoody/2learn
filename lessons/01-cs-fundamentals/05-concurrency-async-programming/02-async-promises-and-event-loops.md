---
title: Async, promises and event loops
prereqs: ["01-cs-fundamentals/05-concurrency-async-programming/01-threads-locks-and-races"]
---

## What it is

A thread that waits for the network is a thread doing nothing while still holding everything that belongs to it: its stack, its bookkeeping in the scheduler, its place in the connection table. Async programming replaces that arrangement with a promise — a placeholder for a value that does not exist yet, plus a continuation to run when it arrives — and with a runtime that keeps a list of waiting operations and runs whichever one is ready. One thread can then be responsible for thousands of open connections, because the memory a connection costs is the buffer it was given, not a thread sized for the worst case.

## Why it matters

This is the model behind nearly every modern server and user interface, and it fails in a way that looks nothing like a race. A handler that calls a synchronous 500 ms file read inside the loop freezes every other task for those 500 ms; at 200 requests per second, the 0.5 s the read takes admits 200 * 0.5 = 100 requests, and all 100 are late although not one of them touched the slow file. Errors travel differently too: a rejected promise that nobody handles can vanish with no log line, where a thrown exception would at least have ended the task that threw it. Knowing which callback the loop runs next, and what a callback is allowed to do, turns "the service is slow" into "line 12 blocks here for half a second".

## Core ideas

### One thread can hold many waits

Waiting on I/O is not work of its own: the data is not ready, and no amount of processor time changes that. The loop hands the operating system a set of sockets and asks to be told when any of them becomes readable, then sleeps; when one does, the runtime marks that operation complete and queues its continuation. Nothing is spent on a connection that stays silent, so what an idle connection costs is the buffer it holds and the entry it owns in a list.

```text
10 000 connections, kept two ways

one thread per connection:
  10 000 threads, each reserving its own stack — 1 MB each in the Java runtime
  10 000 * 1 MB = 10 GB of stack for connections that are mostly idle

one event loop:
  1 thread and 1 list of 10 000 pending operations; each operation holds the buffer it
  was given and a reference to its continuation, nothing more

the loop, in full:
  ready = wait_for_any(open_operations)    # sleeps until one of them can progress
  for operation in ready:
    run its continuation
```

### The loop runs one callback at a time

The loop is single-threaded, so a callback that is running is never interrupted by another one. That is a real benefit: any state touched between two synchronous lines stays as it was for the whole of those two lines, and async code has no data race inside one task. The price is that anything slow inside a callback delays every callback queued behind it, and the delay is exactly the time the slow call takes.

```text
three callbacks of 10 ms each, A then B then C, run on one loop

one after another:   A 0-10 ms,     B 10-20 ms,     C 20-30 ms,     total 30 ms
a 500 ms call inside A:
                     A 0-500 ms,    B 500-510 ms,   C 510-520 ms,   total 520 ms
  of those 520 ms, 10 + 10 = 20 ms is the work B and C do themselves; each of them
  started 500 ms later than it would have, and the 500 ms came from one line in A
```

### An await is a suspension point, not a function call

When a function awaits a promise, it stops at that line and returns control to the loop; the rest of the function becomes a continuation registered on the promise. The lines after the await therefore run later — after other tasks have run, and after the state the function captured may have changed. Reading a shared value before an await and testing it after is the async equivalent of a race, which is why a value that must still hold later should be copied, or re-read and acted on in one step with no suspension between.

```text
before = state.value     # state.value is 5 here, so before = 5
await fetch()            # this task suspends; other tasks run until the fetch settles
if (state.value !== before):
    ...                  # 5 was read before the suspension and state.value is read
                         # after it: the change the test meant to catch has already
                         # happened, so the test cannot prevent it
```

### Async is concurrency, not parallelism

Concurrency means several tasks are in progress at once; parallelism means several instructions run at the same instant, on several cores. An event loop gives you the first on one thread, which is all that waiting work needs and none of what computation needs, because a computation never yields the thread back. The usual answer is to hand heavy work to a pool of workers and keep the loop free to coordinate.

```text
four tasks, each 1 second of pure computation, on a 4-core machine

thread pool of 4:     4 tasks start together, one on each core: total 1 second
event loop, 1 thread: 1 + 1 + 1 + 1 = 4 seconds
  no task yields, so the loop finishes one before it starts the next
```

### Cancellation and timeouts are explicit

A promise does not stop because you stopped waiting for it. Cancellation is a mechanism you build into the operation — a flag it checks between steps, or a channel it is told to close — and a timeout is usually a race between the operation and a clock. Because a failure travels as a rejection rather than as an exception thrown at the call site, every chain needs a defined path for failure; without one, a single failing task disappears without a trace.

```text
a 2 second timeout on an operation that will take 10 seconds

at 2 seconds:  the timeout rejects, and the caller's chain recovers or stops
at 10 seconds: the operation finishes anyway and its result is thrown away
  10 - 2 = 8 of the 10 seconds of work ran after nobody was listening;
  a cancellation signal is what stops the operation at the 2 second mark
```

## Practice

### Feel the loop stall

Write a program that starts ten sleeps of one second each at the same moment and prints as each one finishes. Then give the first callback one second of synchronous computation before it prints, and run it again.

Done when: the first version prints all ten lines about one second after the start, the second prints them about two seconds after the start, and you can point at the line that delayed the nine others by a second.

### Handle one failure

Take a chain of three awaited operations in which the middle one rejects after 300 ms. Run it once without handling the rejection, and once with a catch that logs which step failed and returns a fallback.

Done when: the unhandled version reports nothing about the failure and leaves the final state missing, while the handled version names step two, reports the fallback, and leaves the final state as you intended.

## Common mistakes

- **Calling a blocking API inside async code** — one 500 ms call stops every other task for those 500 ms, and at 200 requests per second that is 100 delayed requests; fix: use the asynchronous version of the API, or move the call to a worker.
- **Reading state before an await and trusting it after** — the read and the check are separated by every task that ran during the suspension, 1 task or 1 000 of them; fix: copy the value, or re-read it after resuming and act in the same step.
- **Dropping rejected promises** — the error vanishes and the caller waits for a result that will never arrive; fix: attach a handler to every chain and to every fire-and-forget call.
- **Treating async code as parallel** — 4 CPU-bound tasks of 1 second each still take 1 + 1 + 1 + 1 = 4 seconds on one loop, whatever order they are started in; fix: offload computation to a worker pool.
- **Assuming a task stops when you stop waiting** — an operation with a 2 second timeout keeps running for the remaining 8 seconds of its 10; fix: pass a cancellation signal into the operation.

## Go deeper

- **Threads, locks and races** (`01-cs-fundamentals/05-concurrency-async-programming/01-threads-locks-and-races`) — the shared-state model this one replaces, and the one it still needs for CPU work.
- **Computer Networks** (`01-cs-fundamentals/03-computer-networks`) — the waiting for the network that this style of programming was invented to avoid.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — isolating a stall that happens only when one particular task runs long.
