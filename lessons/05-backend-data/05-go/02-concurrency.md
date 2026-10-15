---
title: Concurrency
prereqs: ["05-backend-data/05-go/01-the-toolchain"]
---

## What it is

Go's concurrency model is built from goroutines, which are functions running independently on a pool of operating-system threads, and channels, which are typed conduits used to pass values between them. The language's guidance is to prefer passing data between goroutines over sharing memory, and the tools for both — channels, mutexes, wait groups, contexts — are in the standard library and the language itself.

## Why it matters

Concurrency is how a Go service serves many requests at once, and it is also where the hardest bugs live: races, deadlocks and goroutines that never finish. Goroutines are cheap enough that starting one is an ordinary act rather than a considered one, which makes it easy to start a goroutine per request and lose track of them. Channels, contexts and the race detector exist to make the interaction explicit and checkable, and using them deliberately is what keeps a concurrent program debuggable.

## Core ideas

### A goroutine is cheap, but not free

Starting a goroutine costs little and it grows its own stack as needed, so thousands are unremarkable. What is not free is the bookkeeping: a goroutine that blocks forever holds its stack and whatever it references, so a leak appears as slowly growing memory. Every goroutine needs a defined end, whether it finishes its work or is cancelled.

```text
go handle(req)          -> runs independently
defer wg.Done()         -> lets a waiter know it finished
```

### Channels carry values, and close signals completion

A channel of a typed value is the ordinary way to hand work to a goroutine and results back. Sending and receiving synchronise the two sides, which means a channel both transfers data and orders events. Closing a channel signals that no more values will be sent, and receivers observe that; closing is the sender's job, and closing twice or sending after closing is a panic.

### Unbuffered and buffered channels differ in who waits

An unbuffered channel makes the sender wait until a receiver is ready, which is a rendezvous. A buffered channel of size n lets n sends proceed before the sender waits, which decouples arrival from processing and therefore requires a policy for what happens when it fills. An unbounded buffer is not the answer; the choice is between slowing the producer and dropping work.

```text
unbuffered: sender waits for receiver      -> tight synchronisation
buffered n: sender waits only when full    -> a queue, with the same back-pressure question
```

### Sharing memory is allowed, with mutual exclusion

A mutex protects a section of code so that only one goroutine runs it at a time. It is the correct tool when the shared structure is the point and passing it through channels would be awkward — a cache, a counter, a connection pool. The discipline is that every read and write of the protected data happens inside the lock, and that the lock is held briefly.

A built-in detector reports concurrent accesses to the same memory where at least one is a write and no synchronisation orders them. Running the test suite with it enabled catches races that pass by luck in ordinary runs. No amount of careful reasoning substitutes for it, and every shared-memory project should run with it in continuous integration.

### Contexts carry cancellation and deadlines

A context propagates a cancellation signal and a deadline down a call tree so that work can be abandoned when the caller no longer needs it or the deadline passes. Passing a request's context through every call, and checking it in loops and before blocking operations, is what stops a cancelled request from continuing to consume resources.

### Deadlocks and leaks follow from unconsidered blocking

A goroutine blocked on a channel nobody will send to, or waiting for a lock already held by a caller, never finishes. The patterns that avoid this are a defined owner for each channel, a known direction of data flow, and cancellation that reaches every blocking operation.

## Practice

### Fan out and collect with a bounded pool

Write a program that processes a list of items concurrently with a fixed number of workers, using a channel for work and a wait group to know when all are done.

Done when: the number of simultaneously running workers never exceeds the limit and the program exits only after every item is processed.

### Find a race with the detector

Introduce a deliberate unsynchronised counter incremented from two goroutines, run the tests with the race detector enabled, and read the report.

Done when: you can identify the two conflicting accesses in the output and fix them with a mutex or a channel.

## Common mistakes

- **Starting a goroutine with no way to stop it** — it leaks when its work becomes irrelevant; fix: give every goroutine a cancellation path.
- **Closing a channel from the receiver** — a send after close panics; fix: let the sender close it.
- **Using an unbounded queue to avoid back-pressure** — memory grows until the process dies; fix: bound the buffer and decide what happens when it is full.
- **Reading shared state outside the lock** — the race is invisible until it corrupts data; fix: protect every access and run the race detector.
- **Ignoring the context in a long loop or blocking call** — cancelled work keeps consuming resources; fix: check the context before blocking and inside loops.

## Go deeper

- **The toolchain** (`05-backend-data/05-go/01-the-toolchain`) — the testing and race-detection commands this child relies on.
- **Go** (`05-backend-data/05-go`) — the language this concurrency model is built into.
- **Concurrency & Async Programming** (`01-cs-fundamentals/05-concurrency-async-programming`) — the general concepts of races, deadlocks and cancellation.
