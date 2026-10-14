---
title: Operating Systems
type: skill
topic: cs-fundamentals
tier: medium
status: drafted
aliases: ["OS"]
prereqs: ["cs-fundamentals/data-structures"]
related: []
---

## What it is

An operating system is the layer that shares one machine between many programs. It gives each program the illusion of owning the processor and all the memory, while deciding behind the scenes who runs next, what stays in memory and what is written to disk. Processes, threads, virtual memory, the page cache and the filesystem are the parts a working developer meets directly.

## Why it matters

Almost every mysterious performance number in production belongs to this layer. A service that is fast alone and slow under load is competing for cores. A process killed out of nowhere has been read by the kernel's memory accounting, not by your code. A file write that returns instantly is in the page cache and not yet durable. None of this is visible in application source, so without a model of it the only tool left is guessing. A rough picture of processes, scheduler and cache turns those surprises into things you can name and measure.

## In this track

1. **Processes, threads and scheduling** (`cs-fundamentals/operating-systems/01-processes-threads-and-scheduling`) — what a process owns, what threads share, and how the scheduler divides the processor.
2. **Memory and filesystems** (`cs-fundamentals/operating-systems/02-memory-and-filesystems`) — virtual memory, paging, the page cache, and how files reach the disk.

## Prerequisites

- **Data Structures** (`cs-fundamentals/data-structures`)

## Go deeper

- **Concurrency & Async Programming** (`cs-fundamentals/concurrency-async-programming`) — the same sharing problems seen from inside the program rather than below it.
- **Computer Networks** (`cs-fundamentals/computer-networks`) — sockets are file descriptors, and the network path joins this layer at the syscall.
- **Database Internals** (`cs-fundamentals/database-internals`) — a storage engine is a set of bets about how this layer behaves.
