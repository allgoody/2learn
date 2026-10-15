---
title: Async, promises and event loops
prereqs: ["01-cs-fundamentals/05-concurrency-async-programming/01-threads-locks-and-races"]
---

## What it is

A thread that waits for the network is a thread doing nothing while holding memory. Async programming replaces that with a promise: a placeholder for a value that does not exist yet, plus a callback to run when it arrives. The runtime keeps a collection of waiting operations and a loop that executes whichever one is ready, so a single thread can be responsible for thousands of open connections.

## Why it matters

This is the model behind nearly every modern server and user interface, and it fails in ways that look nothing like a race. Code that blocks inside the loop stalls every other task, so one slow call makes the whole service unresponsive — and the symptom is not a slow endpoint but all endpoints at once. Errors also travel differently: a rejected promise that nobody handles may be swallowed entirely. Knowing the loop explains why the fix is almost always "do not block here" rather than "add a thread".

## Core ideas

### One thread can hold many waits

Waiting on I/O is not work. The loop hands the kernel a set of file descriptors and asks to be told when any becomes ready, then sleeps. When data arrives, the runtime marks the corresponding operation complete and queues its continuation. One thread therefore manages thousands of connections, because the expensive part — waiting — costs nothing.

```text
loop:
  ready = wait_for_any(open_ops)    # sleeps until something happens
  for op in ready:
    run its continuation
```

### The loop runs one callback at a time

The loop is single-threaded, so a running callback is never interrupted by another. That is a real benefit: state touched between two synchronous lines cannot change underneath you, so async code is free of data races within a task. The cost is that anything slow inside a callback blocks the loop. A synchronous file read, a long computation or a blocking lock acquisition freezes every other task for the duration.

```text
callback A runs to completion -> callback B -> callback C
nothing interleaves a callback with another callback
```

### An await is a suspension point, not a function call

When a function awaits a promise, it stops at that line and returns control to the loop; the rest of the function is a continuation registered on the promise. The lines after the await run later, possibly after other tasks have run and after the state the function captured has changed. Reading a shared value before an await and using it after is the async equivalent of a race, and it is why a value that must be consistent should be copied or re-read around the suspension.

```text
before = state.value
await fetch()          # other tasks run here; state may change
if (state.value !== before) ...   # the check is meaningless
```

### Async is concurrency, not parallelism

Concurrency means several tasks are in progress; parallelism means several are executing at the same instant. An event loop gives you the first on one thread. For CPU-bound work it gives you nothing, because a computation does not yield. The usual answer is to move heavy work to a pool of workers, where it can genuinely run in parallel, and keep the loop free for coordination.

### Cancellation and timeouts are explicit

A promise does not stop because you stopped waiting for it. Cancellation is a separate mechanism you must build into the operation, and a timeout is usually just a race between the operation and a clock. Because errors travel through rejection rather than throwing at the call site, every promise chain needs a defined path for failure — otherwise a single failing task disappears without a trace.

## Practice

### Feel the loop stall

Write a program that starts ten sleeps of one second each and prints as they finish. Then add one synchronous busy loop of one second in the middle of the program and run it again.

Done when: the first version finishes in about a second and the second takes noticeably longer, and you can point at the line that blocked the loop.

### Handle one failure

Take a chain of three awaited operations and make the middle one reject. Run it once without handling the rejection and once with a catch that logs and recovers.

Done when: the unhandled version reports nothing useful, the handled version reports the failing step, and the final state is what you intended.

## Common mistakes

- **Calling a blocking API inside async code** — the loop freezes and every concurrent task waits; fix: use the asynchronous version of the API, or move the call to a worker.
- **Reading state before an await and trusting it after** — other tasks ran in between; fix: copy the value, or re-check it after resuming.
- **Dropping rejected promises** — the error vanishes and the caller waits forever; fix: attach a handler to every chain and to every fire-and-forget call.
- **Treating async code as parallel** — CPU-heavy work still occupies the loop; fix: offload computation to a worker pool.
- **Assuming a task stops when you stop waiting** — the work continues and its result is discarded; fix: pass a cancellation signal into the operation.

## Go deeper

- **Threads, locks and races** (`01-cs-fundamentals/05-concurrency-async-programming/01-threads-locks-and-races`) — the shared-state model this one replaces, and the one it still needs for CPU work.
- **Computer Networks** (`01-cs-fundamentals/03-computer-networks`) — the waiting this style of programming was invented to avoid.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — isolating a stall that happens only when one particular task runs long.
