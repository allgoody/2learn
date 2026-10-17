---
title: Concurrency & Async Programming
type: skill
topic: 01-cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Concurrency is arranging for a program to make progress on several things at once. Async programming is one way of doing that without dedicating a thread to each task: the work is started, its result is represented by an object you can wait on, and control returns to a loop that runs whatever is ready next. Four one-second waits started this way finish in about one second rather than 1 + 1 + 1 + 1 = 4, because the waiting happens in the operating system while the thread does other work. Both halves of this track exist to keep a machine busy while it waits, and both create the same class of bugs whenever the sharing rules are left unclear.

## Why it matters

Concurrency is where correct-looking code fails intermittently, and where the failure is hardest to reproduce. Four threads each incrementing a shared counter 100 000 times owe 4 * 100 000 = 400 000; let one pair of increments interleave and the run prints 399 999, and the next run prints 400 000, from the same binary on the same input. Attach a debugger and the fault goes away, because a breakpoint serialises the threads and destroys the interleaving that caused it. Async code adds a second failure mode: the lines around an `await` do not run in the order written, so a check performed before a suspension can find the state already changed after it. Learning the small set of rules behind both turns a whole family of unreproducible incidents into something you can reason about on paper.

## In this track

1. **Threads, locks and races** (`01-cs-fundamentals/05-concurrency-async-programming/01-threads-locks-and-races`) — shared state, mutual exclusion, deadlock, and the patterns that avoid both.
2. **Async, promises and event loops** (`01-cs-fundamentals/05-concurrency-async-programming/02-async-promises-and-event-loops`) — non-blocking I/O, waiting on a value that does not exist yet, and what the loop actually runs.

## Prerequisites

None.

## Go deeper

- **Operating Systems** (`01-cs-fundamentals/15-operating-systems`) — the scheduler and address space that make threads cheap and races possible.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — how to reproduce a fault that appears once in a long run of runs.
- **Computer Networks** (`01-cs-fundamentals/03-computer-networks`) — waiting for the network is the case that made async programming necessary.
