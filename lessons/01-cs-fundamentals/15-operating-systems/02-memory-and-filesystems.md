---
title: Memory and filesystems
prereqs: ["01-cs-fundamentals/15-operating-systems/01-processes-threads-and-scheduling"]
---

## What it is

Virtual memory is the operating system's promise that each process has the whole address space to itself, backed by physical memory it does not own outright: the virtual address 4 096, written `0x1000` in hexadecimal, means one thing in process A and something else entirely in process B, and neither can touch the other's bytes. The filesystem is the other half of the same illusion: paths and files that look like one tidy tree, sitting on devices that store fixed-size blocks — 4 096 bytes each, the unit the kernel reads and writes. Between them lie the page cache, paging and the durability rules that decide whether your write survives a power cut.

## Why it matters

This layer explains the two most misleading measurements in software. The first is the file write that returns in a microsecond — a millionth of a second — when the device would have taken about a millisecond, a thousandth of a second, which is a factor of 1 000 slower: the bytes went into memory, not to disk. The second is the program that uses a little memory and one day is killed for using too much, because the pages it touched are still holding physical memory: on a machine with 400 MB of memory — `400 * 1 048 576 = 419 430 400` bytes — a process whose working set, the pages it touches again and again, is 500 MB can hold only 102 400 of its 128 000 pages and faults on the other 25 600. It also explains why the first read of a 400 MB file is slow and the second is fast: the same 419 430 400 bytes come from the device and then from memory, about `1.9 / 0.2 = 9.5` times faster the second time. And it explains why a machine that is paging is slower than one that is simply busy. None of these facts live in your application code.

## Core ideas

### Each process gets its own address space

Virtual addresses are translated to physical ones by tables the kernel maintains, so the same address means different things in different processes. That is what makes process isolation real rather than conventional. Translation moves whole pages, so only the part of an address that names a byte inside its page — the offset — is carried through unchanged.

```text
page size = 4 096 bytes, so page 0 covers the addresses 0x0000 to 0x0fff
hexadecimal: 0x1000 = 1 * 4 096 + 0 = 4 096; 0x7ff0 = 7 * 4 096 + 4 080 = 32 752

process A virtual 0x1000 = 4 096  -> physical 0x7ff0 = 32 752: page 7, offset 4 080
process B virtual 0x1000 = 4 096  -> physical 0x2c10 = 11 280: page 2, offset 3 088

32 752 / 4 096 = 7 and 11 280 / 4 096 = 2, so the two addresses land in different pages
and the 4 080 offset survives the move: 7 * 4 096 + 4 080 = 32 752
```

The same tables let the kernel hand out more address space than there is physical memory, by keeping the parts a process is not using somewhere else and paging them back when they are touched. A page that is not resident is either still on disk or was written there to make room; the process never learns the difference except by the delay.

### Paging moves work to disk

Physical memory is divided into frames, one frame per page, and only some of a process's pages are resident at any time. Touching a page that is not resident triggers a fault: the kernel finds or makes room for it, which may mean writing an older page out first. A fault is expensive because it reaches the device rather than memory, and a few of them are normal: what matters is the working set, the pages a process touches again and again.

```text
frames = 4, resident pages = a, b, c, d, each holding one 4 096-byte page
touch e, which is not resident: evict the least recently used page, a, and load e

resident pages: [a][b][c][d]   touch e ->
evict least recently used: [b][c][d][e] -> [a]

cost of a resident page:  about 100 ns         ns = nanosecond, a billionth of a second
cost of one loaded from disk: about 100 µs     µs = microsecond, a millionth of a second
100 µs / 100 ns = 1 000 times as much
```

When the working set no longer fits, every pass evicts pages the next pass needs, and the machine spends its time moving pages instead of computing. That condition is thrashing, and no amount of application optimisation survives it.

```text
physical memory 400 MB = 400 * 1 048 576 = 419 430 400 bytes
working set     500 MB = 524 288 000 bytes
frames available = 419 430 400 / 4 096 = 102 400
pages the working set needs = 524 288 000 / 4 096 = 128 000
pages that do not fit = 128 000 - 102 400 = 25 600, faulted on again in every pass
at 100 µs a fault, 25 600 faults cost 25 600 * 100 µs = 2 560 000 µs = 2.56 s per pass
```

### The page cache makes reads cheap and writes unclear

Reads from disk are cached in spare memory, so a file read twice is fast the second time without any change to your code. Writes land in the same cache and are flushed to the device later, which is why a write can return long before the bytes are durable. That is exactly what you want for throughput and exactly what you must override when the data matters.

```text
write(fd, data)   lands in the page cache and returns: about 1 µs
fsync(fd)         does not return until the device holds the bytes: about 1 ms
                  1 ms = 1 000 µs, so the same 4 096 bytes take 1 000 times longer to be durable

read 400 MB, first time:     1.9 s — the bytes come from the block device
read the same 400 MB again:  0.2 s — the bytes are already in the cache
1.9 / 0.2 = 9.5 times faster, and not one line of the program changed

the two timings above are readings taken on one machine; a faster device moves both numbers down
and leaves the ratio, because one is a device read and the other a memory read
```

### Files are named blocks plus metadata

A file is a set of blocks plus metadata — size, owner, permissions, timestamps — reached through a directory entry. Appending is cheap because the blocks need not be contiguous: the new block goes into the next free block and none of the existing ones moves. Renaming within a directory is atomic, one of the few atomic operations you get for free, and it is the basis of the standard "write a temporary file, then rename it into place" pattern that makes a half-written file impossible to observe.

```text
append 4 096 bytes to a 1 GB file
  1 GB = 1 073 741 824 bytes = 1 073 741 824 / 4 096 = 262 144 blocks, already on the device
  the new block goes into the next free block; none of the 262 144 existing blocks moves

/tmp/report.new  --write-->  fsync  --rename-->  /data/report.json

rename swaps one directory entry in a single atomic step, so a reader sees either the whole old
file or the whole new one, never a file that is half of each
```

## Practice

### Prove the cache to yourself

Create a file of 400 MB, which is `400 * 1 048 576 = 419 430 400` bytes. Time reading it, discard nothing, then read it again immediately and time that. Then read it once more after clearing the system caches.

Done when: the second read is several times faster than the first, a third read after clearing the caches is back near the first timing, and you can explain which layer made the difference — the block device the first time, the page cache the second. On the machine measured in this entry the three readings were 1.9 s, 0.2 s and 1.8 s.

### Make a write durable

Write a 4 096-byte file, call the flush-to-disk operation, and delete the file. Run the same code with a deliberate crash between the write and the flush.

Done when: only the version that flushed survives, and you can name the operation that made the difference — the write alone returned after about 1 µs, while the flush waited the millisecond the device needed.

## Common mistakes

- **Treating a returned write as durable** — the write returned in about 1 µs when the device needed about 1 ms, 1 000 times longer, so a crash inside that window loses all 4 096 bytes; fix: flush explicitly when the data must survive, and only then report success.
- **Reading a large file twice and calling it free** — the second read of a 400 MB file is fast only because the first one filled the cache: in the readings above it took 0.2 s against 1.9 s, and clearing the caches brought it back to 1.8 s; fix: measure the cold case before drawing conclusions.
- **Ignoring the working set** — a 500 MB working set on a machine with 400 MB of memory faults on 25 600 of its 128 000 pages in every pass, which is 2.56 s of page movement per pass; fix: keep the hot data small, or stream it instead of holding it.
- **Assuming memory is returned when it is freed** — the allocator holds the freed pages for reuse, so a process that freed 200 MB can still show 200 MB resident, and the kernel's accounting kills it on the total, not the live part; fix: look at the resident set and the fault rate, not only at free calls.
- **Editing a file in place and trusting it** — a crash mid-write leaves one file holding new blocks where the write reached and old blocks where it did not, out of 262 144 blocks in the 1 GB example above; fix: write a new file, flush it, then rename it over the old name.

## Go deeper

- **Processes, threads and scheduling** (`01-cs-fundamentals/15-operating-systems/01-processes-threads-and-scheduling`) — the processes whose address spaces these pages back belong to, so read that first.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — a storage engine is mostly a careful set of decisions about pages, caches and flushes, and this is the layer those decisions are made against.
- **Unix Shell** (`01-cs-fundamentals/13-unix-shell`) — the command-line tools that let you watch this layer from outside a program.
