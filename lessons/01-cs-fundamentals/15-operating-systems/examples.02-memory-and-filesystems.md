## Example 1 — A write that returned before the disk had it

A program writes a 4 096-byte report into `/tmp/report.json` and then announces success. The two runs below are the same code, once without a flush and once with one, and a power loss arrives a moment after the announcement. Say what the microsecond-long write actually did, and which line makes the difference.

```bash
run 1: printf '%s' "$REPORT" > /tmp/report.json    # 4 096 bytes
       echo "saved"                                # returns in about 1 µs
       ... power loss ...
       after reboot: /tmp/report.json is missing

run 2: printf '%s' "$REPORT" > /tmp/report.json
       sync /tmp/report.json                       # waits about 1 ms for the device
       echo "saved"
       ... power loss ...
       after reboot: /tmp/report.json holds all 4 096 bytes

µs = microsecond, a millionth of a second;   ms = millisecond, a thousandth of a second
the flush waited 1 ms where the write returned in 1 µs: 1 ms / 1 µs = 1 000 times longer
```

### Solution

```bash
write(fd, data)   # copies the 4 096 bytes into the page cache, which is memory: about 1 µs
fsync(fd)         # does not return until the device holds those 4 096 bytes: about 1 ms

# run 1 issued only the write, so "saved" was a claim about memory, not about the disk.
# The 4 096 bytes were still dirty in the cache when the power went, so all of them are gone.
```

A write returns once its data is in the page cache, which makes writes fast but makes "saved" a claim about memory; only the flush waits for the device, and it waits about `1 000` times longer for the same `4 096` bytes. Putting the flush before the success message is what makes the claim true, and it is the step a database takes before reporting a commit. The trap is that both runs look identical on a healthy machine — the difference appears only when the cache is lost, and the exposure is not the 1 ms of a flush but the whole time the bytes sit dirty in the cache.

## Example 2 — Fast the second time, and a process that keeps growing

Three readings of the same 400 MB file — `400 * 1 048 576 = 419 430 400` bytes — taken twice in a row and then again after the caches were cleared, plus a parser on a machine with 1 GB of physical memory that reads a growing file into one list. Say which readings measure the disk and which measure the cache, and what happens to the parser.

```text
read 1, cold:                            1.9 s
read 2, immediately afterwards:         0.2 s
read 3, after the caches were cleared:  1.8 s

400 MB = 400 * 1 048 576 = 419 430 400 bytes
read 2 / read 1 = 0.2 / 1.9 = 0.105, so read 2 took a tenth of the time
read 3 / read 1 = 1.8 / 1.9 = 0.95, so read 3 is back within 5 % of the cold reading

parser, one list holding the whole file, on a 1 GB machine (1 GB = 1 024 MB)
   100 MB file -> process holds 180 MB        180 / 100 = 1.8 times the file
   400 MB file -> process holds 700 MB        700 / 400 = 1.75 times the file
   800 MB file -> process holds 1 400 MB, then killed
                                               1 400 / 800 = 1.75 times the file
```

### Solution

```text
read 1 and read 3 are measurements of the device: neither set of bytes was in memory.
read 2 is a measurement of memory: read 1 filled the page cache with those 419 430 400 bytes,
so the identical code read them from RAM instead.

the parser holds about 1.75 bytes of memory for every byte of file, so its need grows with the
input: 1.75 * 800 MB = 1 400 MB against 1 024 MB of physical memory,
leaving 1 400 - 1 024 = 376 MB of live pages that never fit,
and it faults on every one of them as it walks the file again.
```

Reads come from the page cache once the file is in memory, so a second read measures memory rather than the device, and clearing the caches restores the cold number — read 2 at 0.2 s against read 3 at 1.8 s, nine times apart, with no line of the program changed. The parser reads the whole file into one list, so its resident set grows with the input; past the point where the hot pages fit in physical memory, every fault forces another eviction and the machine moves pages instead of parsing, until the kernel's accounting kills the process. The trap is that both sets of numbers look like facts about the file, when they are facts about the layers between your code and the device.
