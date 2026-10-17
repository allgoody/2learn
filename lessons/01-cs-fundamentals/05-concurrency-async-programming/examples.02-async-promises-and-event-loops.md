## Example 1 — One blocking call that froze every request

An async service handles three concurrent requests, and each handler logs a start time and an end time. The handler for request B performs a synchronous file read lasting 500 ms; requests A and C read no file at all. The timeline below is the observed log. Say why two requests that share nothing are delayed, and where the fix belongs.

```text
12:00:00.000  A start
12:00:00.001  B start
12:00:00.002  C start
12:00:00.502  A end        <- A performs no file read at all, and still took 502 ms
12:00:00.503  B end
12:00:00.504  C end

B runs: value = read_file_sync(path)   # 500 ms of waiting, 0 ms of work

all 3 requests started within 2 ms of one another and all 3 ended within 2 ms of one
another; the 500 ms of waiting accounts for all but about 2 ms of each request
```

### Solution

```text
the loop is single-threaded, so read_file_sync occupies the only thread the loop has
and no other callback runs for those 500 ms. A and C were ready at once and waited
anyway: 502 - 500 = 2 ms of each request is its own work, and 500 ms is B's read.

fix: use the asynchronous read, which yields to the loop:
     value = await read_file(path)
```

Waiting on I/O is not work, so an asynchronous read registers the operation, returns control to the loop, and wakes the continuation when the data arrives; other callbacks run in the meantime. A synchronous read occupies the one thread the loop has, and every task in progress queues behind it. The trap is the shape of the symptom: not one slow endpoint but all of them at once, which reads like a capacity problem rather than a single blocking call.

## Example 2 — A guard that ran after the value had already changed

A handler reads an order's status, awaits a 200 ms payment call, and then refuses to continue if the status is no longer `pending`. Say why the guard protects nothing, and rewrite it so that the check means something.

```text
before = order.status          # "pending"; before = "pending"
await charge(order)            # this handler suspends for the 200 ms the charge takes
if order.status != "pending":
    raise Conflict()           # the intended guard, read after the 200 ms
apply(order)
```

### Solution

```text
the await suspends this handler and returns control to the loop, so during the 200 ms
of the charge other callbacks run, including one that may change order.status — and
they all run before the check. Comparing a value read before the suspension with one
read after it describes an interleaving that has already happened; it cannot prevent it.

fix: re-read and act in one step, with no suspension between them:
await charge(order)                        # 200 ms, other tasks run here
if not order.mark_applied_if_pending():    # one atomic step
    raise Conflict()
apply(order)
```

An await is a suspension point, not a function call: the lines after it run later, possibly after other tasks have run and the captured state has changed. Copying a value before the suspension and comparing it afterwards yields a check whose result depends on the very interleaving it was meant to exclude. The trap is that it usually appears to work, because at low concurrency nothing else runs during the 200 ms that the await is open.
