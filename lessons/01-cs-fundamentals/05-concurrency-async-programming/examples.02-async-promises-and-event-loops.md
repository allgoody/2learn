## Example 1 — One blocking call that froze every request

An async service handles three concurrent requests, and each handler logs a start and an end time. The middle handler performs a synchronous file read lasting 500 ms. The timeline is the observed log. Say why two requests that share nothing are delayed, and where the fix belongs.

```text
12:00:00.000  A start
12:00:00.001  B start
12:00:00.002  C start
12:00:00.502  A end        <- A performs no file read at all
12:00:00.503  B end
12:00:00.504  C end

B calls: value = read_file_sync(path)   # 500 ms of waiting
```

### Solution

```text
the loop is single-threaded, so read_file_sync occupies the only thread
and no other callback runs for those 500 ms. A and C were ready at once
and waited anyway.

fix: use the asynchronous read, which yields to the loop:
     value = await read_file(path)
```

Waiting on I/O is not work, so an asynchronous read registers the operation, returns control to the loop, and wakes the continuation when the data arrives; other callbacks run meanwhile. A synchronous read occupies the one thread the loop has, and every task in progress queues behind it. The trap is the shape of the symptom: not one slow endpoint but all of them at once, which reads like a capacity problem rather than a single blocking call.

## Example 2 — A guard that ran after the value had already changed

A handler reads an order's status, awaits a payment call, and then refuses to continue if the status is no longer pending. Say why the guard protects nothing, and rewrite it so the check means something.

```text
before = order.status          # "pending"
await charge(order)            # other tasks run during this await
if order.status != "pending":
    raise Conflict()           # the intended guard
apply(order)
```

### Solution

```text
the await suspends this handler and returns control to the loop, so other
callbacks — including one that may change order.status — run before the
check. Comparing a value read before the suspension with one read after it
describes an interleaving that has already happened; it cannot prevent it.

fix: re-read and act in one step, with no suspension between them:
await charge(order)
if not order.mark_applied_if_pending():   # one atomic step
    raise Conflict()
apply(order)
```

An await is a suspension point, not a function call: the lines after it run later, possibly after other tasks have run and the captured state has changed. Copying a value before the suspension and comparing it afterwards yields a check whose result depends on the very interleaving it was meant to exclude. The trap is that it usually appears to work, because under low concurrency nothing else runs during the await.
