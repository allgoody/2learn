## Example 1 — A pool that always finishes

An import job walks a list of orders and calls a slow lookup for each one. The first version starts a goroutine per order and returns as soon as the list has been walked, so the process can exit with half the work done. Produce a version with a fixed number of workers that returns only after every order has been handled.

```go
for _, o := range orders {
	go enrich(o)          // nothing waits for these
}
return nil
```

### Solution

```go
jobs := make(chan Order)
var wg sync.WaitGroup
for i := 0; i < workers; i++ {
	wg.Add(1)
	go func() {
		defer wg.Done()
		for o := range jobs {
			enrich(o)
		}
	}()
}
for _, o := range orders {
	jobs <- o
}
close(jobs)               // the sender closes, never the receiver
wg.Wait()
```

Closing the channel is what tells each worker that no more orders are coming, and the wait group is what tells the caller the work is finished, so the function returns only after the last order. The first version starts one goroutine per order with no record of them, and each unfinished one holds its stack. What usually goes wrong is the receiver closing the channel, which makes the next send panic.

## Example 2 — Deciding who waits when the queue fills

A reader produces events faster than the writer can store them. A buffer was added to smooth the bursts, and memory climbs until the process is killed. Choose the buffer and the policy for when it is full, and write the version that applies them.

```go
var events []Event
for e := range source {
	events = append(events, e)   // grows without bound
	write(e)
}
```

### Solution

```go
// 32 events are absorbed without waiting, then the producer is slowed.
queue := make(chan Event, 32)
go writeAll(queue)

for e := range source {
	queue <- e          // when full, this send waits
}
close(queue)
```

A buffer of a stated size decouples arrival from processing up to that size; past it the send waits and the reader is held to the writer's rate, which is the deliberate choice over dropping events. The unbounded slice is not a bigger buffer — it is memory growth with no ceiling. What usually goes wrong is sizing the buffer to hide a load spike instead of deciding, and writing down, what happens once it is full.
