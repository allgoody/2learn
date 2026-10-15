## Example 1 — A unit that will not start, diagnosed from the record

After a deploy, the `api` unit will not start. Three excerpts are all you have. Name the process that is holding the port, quote the line that proves it, and state the next step that keeps the evidence intact.

```text
supervisor: api unit: start requested
supervisor: api unit: main process exited, code 1
api output: bind: address already in use
kernel:     a process is listening on port 8443 (pid 2210, worker)
```

### Solution

```text
which source answers what:
  supervisor -> the unit failed, and with which exit code
  api output -> why it failed: the port is already taken
  kernel     -> who holds it: pid 2210, the worker
next step:   stop or reconfigure pid 2210, then start the unit again
do not:      restart the unit first; the exit code and its output are the evidence
```

Each question has a source, and reading the three lines in order identifies the conflict without changing anything, which leaves the first failure's evidence on record. Time is the organising dimension here: the supervisor's restart timestamp matches the kernel's message, so the two events are the same event. The usual mistake is to restart before reading, which clears the output and makes the second failure look like a new problem.

## Example 2 — Bounding a log volume before it becomes the outage

A service writes at debug level and produced several gigabytes in one evening. Set a retention policy and state the maximum space the logs may occupy.

```text
observed (illustrative): debug level, one evening produced 9 GB
volume: /var/log sits on the root mount, which is 40G in total
```

### Solution

```text
default level: info; raise to debug only for the duration of an investigation
rotation:      rotate daily, keep 7 compressed generations, delete the eighth
maximum:       seven generations of one day's compressed volume, plus the current file
also:          ship the important lines off the host so the bound is not the only copy
```

Rotation is what keeps the logs from becoming the incident they then record: the level bounds the rate and the retention bounds the total, so the maximum occupied space is a number you can state. Shipping the important lines elsewhere means that bound costs you history rather than evidence. The usual mistake is to leave debug on in production, where a level chosen for one afternoon quietly fills the disk the application also needs.
