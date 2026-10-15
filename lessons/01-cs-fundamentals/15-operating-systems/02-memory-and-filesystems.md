---
title: Memory and filesystems
prereqs: ["01-cs-fundamentals/15-operating-systems/01-processes-threads-and-scheduling"]
---

## What it is

Virtual memory is the operating system's promise that each process has the whole address space to itself, backed by physical memory it does not own outright. The filesystem is the other half of the same illusion: paths and files that look like one tidy tree, sitting on devices that store blocks. Between them lie the page cache, paging and the durability rules that decide whether your write survives a power cut.

## Why it matters

This layer explains the two most misleading measurements in software. The first is the file write that returns in microseconds — it went into memory, not to disk. The second is the program that uses a little memory and then one day is killed for using too much, because pages it touched are still holding physical memory. It also explains why the first read of a large file is slow and the second is fast, and why a machine that is paging is slower than one that is simply busy. None of these facts live in your application code.

## Core ideas

### Each process gets its own address space

Virtual addresses are translated to physical ones by tables the kernel maintains, so the same address means different things in different processes. That is what makes process isolation real rather than conventional. It also lets the kernel hand out more address space than there is physical memory, by keeping the parts a process is not using somewhere else and paging them back when they are touched.

```text
process A virtual 0x1000  -> physical 0x7ff0
process B virtual 0x1000  -> physical 0x2c10
```

### Paging moves work to disk

Physical memory is divided into pages, and only some of a process's pages are resident at any time. Touching a page that is not resident triggers a fault: the kernel finds or makes room for it, which may mean writing an older page out first. A few faults are normal and cheap. When the working set no longer fits, every fault causes another eviction and the machine spends its time moving pages instead of computing. That condition is thrashing, and no amount of application optimisation survives it.

```text
resident pages: [a][b][c][d]   touch e ->
evict least recently used: [b][c][d][e] -> [a]
```

### The page cache makes reads cheap and writes unclear

Reads from disk are cached in spare memory, so a file read twice is fast the second time without any change to your code. Writes land in the same cache and are flushed to the device later, which is why a write can return long before the bytes are durable. That is exactly what you want for throughput and exactly what you must override when the data matters.

```text
write(file, data) -> page cache (returns)      ... later -> device
fsync(file)       -> does not return until the device has the bytes
```

### Files are named blocks plus metadata

A file is a set of blocks plus metadata — size, owner, permissions, timestamps — reached through a directory entry. Appending is cheap because the blocks need not be contiguous. Renaming within a directory is atomic, one of the few atomic operations you get for free, and it is the basis of the standard "write a temporary file, then rename it into place" pattern that makes a half-written file impossible to observe.

```text
/tmp/report.new  --write-->  fsync  --rename-->  /data/report.json
```

## Practice

### Prove the cache to yourself

Create a file of a few hundred megabytes. Time reading it, discard nothing, then read it again immediately and time that. Then read it once more after clearing the system caches.

Done when: the first read is clearly slower than the second, and you can explain which layer made the difference.

### Make a write durable

Write a small file, call the flush-to-disk operation, and delete the file. Run the same code with a deliberate crash between the write and the flush.

Done when: only the version that flushed survives, and you can name the operation that made the difference.

## Common mistakes

- **Treating a returned write as durable** — the bytes sat in the page cache and a crash loses them; fix: flush explicitly when the data must survive, and only then report success.
- **Reading a large file twice and calling it free** — the second read is fast only because the first one filled the cache; fix: measure the cold case before drawing conclusions.
- **Ignoring the working set** — the process grows until the kernel evicts pages constantly; fix: keep the hot data small, or stream it instead of holding it.
- **Assuming memory is returned when it is freed** — the allocator holds pages for reuse and the process looks larger than its live data; fix: look at the resident set and the fault rate, not only at free calls.
- **Editing a file in place and trusting it** — a crash mid-write leaves a truncated or mixed file; fix: write a new file, flush it, then rename it over the old name.

## Go deeper

- **Processes, threads and scheduling** (`01-cs-fundamentals/15-operating-systems/01-processes-threads-and-scheduling`) — the processes whose address spaces these pages back belong to, so read that first.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — a storage engine is mostly a careful set of decisions about pages, caches and flushes.
- **Unix Shell** (`01-cs-fundamentals/13-unix-shell`) — the command-line tools that let you watch this layer from outside a program.
