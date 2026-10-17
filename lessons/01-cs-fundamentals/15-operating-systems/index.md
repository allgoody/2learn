---
title: Operating Systems
type: skill
topic: 01-cs-fundamentals
tier: medium
status: drafted
aliases: ["OS"]
prereqs: ["01-cs-fundamentals/02-data-structures"]
related: []
---

## What it is

An operating system is the layer that shares one machine between many programs. It gives each program the illusion of owning the processor and all the memory, while deciding behind the scenes who runs next, what stays in memory and what is written to disk. The machine has a fixed number of hardware threads — 4 or 8 places where instructions execute at the same moment — and runs hundreds of threads between them, each given a slice of a few milliseconds; memory is handed out in pages of 4 096 bytes; disk contents are kept in spare memory after the first read. Processes, threads, virtual memory, the page cache and the filesystem are the parts a working developer meets directly.

## Why it matters

Almost every mysterious performance number in production belongs to this layer, and each has a value attached. A service that is fast alone and slow under load is competing for hardware threads: the same job that finishes in 108 s on 4 threads takes 170 s on 32, because 8 threads per hardware thread push each other's data out of the cache between slices. A process killed out of nowhere has been read by the kernel's memory accounting, not by your code: a parser holding 1.75 bytes per byte of an 800 MB file needs 1 400 MB on a 1 GB machine and never gets it. A file write that returns in a microsecond is in the page cache and not yet durable, while the flush that would have made it durable takes a millisecond — a thousand times longer. None of this is visible in application source, so without a model of it the only tool left is guessing. A rough picture of processes, the scheduler and the cache turns those surprises into things you can name and measure.

## In this track

1. **Processes, threads and scheduling** (`01-cs-fundamentals/15-operating-systems/01-processes-threads-and-scheduling`) — what a process owns, what threads share, and how the scheduler divides the processor: 400 runnable threads across 8 hardware threads, each given a 4 ms slice and switched aside for two microseconds.
2. **Memory and filesystems** (`01-cs-fundamentals/15-operating-systems/02-memory-and-filesystems`) — virtual memory, paging, the page cache and how files reach the disk: the same virtual address `0x1000` in two processes, a hundred nanoseconds to read a resident page against a hundred microseconds to fetch it from disk, and a one-microsecond write against a one-millisecond flush.

## Prerequisites

- **Data Structures** (`01-cs-fundamentals/02-data-structures`)

## Go deeper

- **Concurrency & Async Programming** (`01-cs-fundamentals/05-concurrency-async-programming`) — the same sharing problems seen from inside the program rather than below it.
- **Computer Networks** (`01-cs-fundamentals/03-computer-networks`) — sockets are file descriptors, and the network path joins this layer at the system call that hands over the data.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — a storage engine is a set of bets about how this layer behaves, made visible as pages, caches and flushes.
