---
title: Concurrency & Async Programming
type: skill
topic: cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Concurrency is arranging for a program to make progress on several things at once. Async programming is one way of doing that without dedicating a thread to each task: work is started, its result is represented by an object you can wait on, and control returns to a loop that runs whatever is ready next. Both exist to keep a machine busy while it waits, and both create the same class of bugs when the sharing rules are unclear.

## Why it matters

Concurrency is where correct-looking code fails intermittently and where the failure is hardest to reproduce. A race condition appears under load, on a particular core count, with a particular interleaving — and disappears when you attach a debugger. Async code adds a second failure mode: it looks like ordinary code but the lines around an `await` do not run in the order written, so state can change underneath you. Learning the small set of rules behind both turns a whole family of unreproducible incidents into something you can reason about on paper.

## In this track

1. **Threads, locks and races** (`cs-fundamentals/concurrency-async-programming/01-threads-locks-and-races`) — shared state, mutual exclusion, deadlock and the patterns that avoid both.
2. **Async, promises and event loops** (`cs-fundamentals/concurrency-async-programming/02-async-promises-and-event-loops`) — non-blocking I/O, waiting on a future, and what the loop actually runs.

## Prerequisites

None.

## Go deeper

- **Operating Systems** (`cs-fundamentals/operating-systems`) — the scheduler and address space that make threads cheap and races possible.
- **Debugging** (`cs-fundamentals/debugging`) — how to reproduce a fault that only happens sometimes.
- **Computer Networks** (`cs-fundamentals/computer-networks`) — waiting for the network is the case that made async programming necessary.
