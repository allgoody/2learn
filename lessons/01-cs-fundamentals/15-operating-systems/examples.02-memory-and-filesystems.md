## Example 1 — A write that returned before the disk had it

A program writes a report and then reports success. The runs below are the same code with and without a flush, interrupted by a power loss. Say what the microsecond-long write actually did, and which line makes the difference.

```bash
run 1: write report.json, print "saved", power loss, reboot
  after reboot: report.json is missing

run 2: write report.json, flush to device, print "saved", power loss, reboot
  after reboot: report.json is complete
```

### Solution

```bash
write(fd, data)     # lands in the page cache; returns in microseconds
fsync(fd)           # does not return until the device holds the bytes

# run 1 missed the flush: the bytes were still in memory
```

A write returns once its data is in the page cache, which makes writes fast but makes "saved" a claim about memory, not the disk; only the flush waits for the device. Putting the flush before the success message is what makes the claim true, and it is the step a database takes before reporting a commit. The trap is that both runs look identical on a healthy machine — the difference appears only when the cache is lost.

## Example 2 — Fast the second time, and a process that keeps growing

The measurements below are the same 400 MB file read twice, plus a parser that reads a growing file into a list. Say which readings test the disk and which test the cache, and what happens to the parser.

```text
read 1:                            1.9 s
read 2 immediately afterwards:     0.2 s
read 3 after the caches were cleared: 1.8 s

parser:  100 MB file -> process 180 MB
         400 MB file -> process 700 MB
         800 MB file -> process 1.4 GB, then killed
```

### Solution

```text
read 2 is fast because read 1 filled the page cache, not because the file
became cheaper — read 3 shows the cold cost again.

the parser's resident set tracks the file size, so once the working set no
longer fits, the kernel evicts and re-reads pages constantly.
```

Reads come from the page cache once the file is in memory, so a second read measures memory rather than the device, and clearing the caches restores the cold number. The parser reads the whole file into one list, so its resident set grows with the input; past the point where the hot pages fit in physical memory, every fault forces another eviction and the machine moves pages instead of parsing. The trap is that both sets of numbers look like facts about the file, when they are facts about the layers between your code and the device.
