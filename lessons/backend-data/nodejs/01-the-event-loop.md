---
title: The event loop
prereqs: ["backend-data/nodejs"]
---

## What it is

The event loop is the mechanism that lets a single thread appear to do many things at once. When your code asks for a file or a network response, it registers a callback and returns; the loop continues, and when the operation finishes it schedules the callback to run. Work is never interrupted mid-function, so the only thing that stalls the process is code that computes for a long time without yielding.

## Why it matters

This one model explains almost every performance characteristic of a server-side JavaScript application. It is why a service handles thousands of concurrent connections with modest memory, and why a single badly written regular expression or a synchronous file read can make the whole process unresponsive to every other user. Understanding it converts a class of mysterious latency into an obvious diagnosis, and it guides the two standard remedies: make the work asynchronous, or move it to a separate process.

## Core ideas

### Operations are registered, not waited on

Reading a file, sending a request or querying a database all follow the same shape: the call starts the operation and returns immediately, and a callback runs when it completes. The thread is free between those two moments to serve other connections. A synchronous version of the same call blocks the thread for its whole duration, which is why the asynchronous form exists even when the synchronous one looks simpler.

```text
read a file asynchronously:  start -> return -> ... other work ... -> callback
read a file synchronously:   start -> [thread blocked] -> value
```

### The loop has phases, and microtasks jump the queue

Timers, input and output callbacks and other phases are processed in order, and promises are resolved in a queue between them, so a resolved promise runs before the next timer. That ordering is why `await` in a loop can be either efficient or a bottleneck depending on whether the operations are independent, and it is why code after an `await` is a separate turn of the loop rather than an immediate continuation.

### Long computation blocks everything

Because nothing pre-empts your function, a loop over a large array, a heavy regular expression or a synchronous compression call stops the loop for its whole duration. Every in-flight request waits. The response is to move such work to a worker thread or a separate process, or to break it into chunks that yield between them. Adding more memory or CPU does not fix a blocked loop.

### Errors must be handled at every asynchronous boundary

An exception thrown inside a callback does not propagate to the caller that started the operation; it reaches the process's unhandled-error handler, which by default ends the process. Every asynchronous operation needs its own error path, whether through a callback parameter, a rejected promise or a `try` block around an `await`. A crash rather than a 500 is the usual symptom of a missing one.

### Backpressure and concurrency limits are your responsibility

Starting an unbounded number of asynchronous operations — one per item in a large list — exhausts file descriptors, connections and memory at once. Concurrency must be limited deliberately, and a queue that fills faster than it drains needs a policy rather than an ever-growing buffer. The runtime imposes no cap of its own.

### The thread pool is a hidden shared resource

Some asynchronous operations are performed by a small pool of background threads, so an apparently non-blocking call can still queue behind others if the pool is saturated. Recognising which operations use the pool explains why some asynchronous calls stall under load while the loop itself looks idle.

## Practice

### See the loop block

Write a small server with one endpoint that computes in a tight loop and another that returns immediately. Call the slow endpoint and then the fast one from two clients at the same time.

Done when: you can describe the delay the fast request suffered and point at the line that caused it.

### Bound the concurrency of a batch

Take a script that starts an asynchronous operation for every item in a list of thousands and change it to process them with a fixed limit.

Done when: the peak number of simultaneous operations never exceeds your limit and the script completes without exhausting descriptors.

## Common mistakes

- **Using a synchronous call in a request path** — the whole process stops for every other user; fix: use the asynchronous form or move the work off the loop.
- **Assuming `await` blocks nothing** — a long loop between awaits still blocks; fix: yield periodically or move the computation to a worker.
- **Starting unbounded concurrent operations** — descriptors and memory are exhausted; fix: set a concurrency limit and handle the queue.
- **Letting an error escape a callback** — the process exits instead of returning a response; fix: handle errors at every asynchronous boundary.
- **Debugging latency as if threads were involved** — the cause is a blocked loop, not contention between threads; fix: look for blocking work on the main thread first.

## Go deeper

- **Node.JS** (`backend-data/nodejs`) — the runtime whose behaviour this loop explains, so read it first.
- **Modules and the runtime** (`backend-data/nodejs/02-modules-and-the-runtime`) — the tools available to structure code around this loop.
- **Concurrency & Async Programming** (`cs-fundamentals/concurrency-async-programming`) — the general model this is one implementation of.
