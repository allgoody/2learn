## Example 1 — The smallest request that delays the first paint

A page feels slow to show anything. Sorting the request list by size puts a third-party analytics script at the bottom, so it was ruled out. Read the waterfall instead and name the resource that actually matters. The panel state below is illustrative.

```text
panel state (illustrative, throttled cold load)
index.html    ███
vendor.js        ██████████████       3 KB transferred, 140 ms of parse
app.css               ██              1.2 KB transferred
first paint                        ↑
```

### Solution

```text
the reading
vendor.js starts after the HTML and is parsed before the first paint
it is tiny on the wire but blocks for 140 ms -> size is not the cost here
app.css cannot be applied until vendor.js has finished

the change: defer vendor.js so the first paint is not waiting on it
```

A request's position on the timeline usually matters more than its size: a small script that blocks everything behind it costs more than a large image fetched in parallel. The waterfall answers what was blocking what and when, which is where render-blocking resources and late discoveries appear, while the main-thread track answers what was expensive. Checking the transferred size, the format and the cache status is the second pass; the first pass is start time and dependencies.

## Example 2 — An interaction that goes missing

A menu takes visibly longer to open than the code suggests it should. The recording shows one long block on the main thread. Say what the block proves and how to read it, then name what to change. The numbers are illustrative, not a measurement of your own pages.

```text
panel state (illustrative, CPU throttled)
main thread
[ task 210 ms ]        ← includes 180 ms of "script", then 12 ms layout, 4 ms paint
  └── function hydrateWidgets()   self 96 ms
```

### Solution

```text
the reading
a task over ~50 ms delays any input that arrives during it -> the click waits behind 210 ms
script dominates the block, and hydrateWidgets carries the most self-time
layout appears once, so this is not the read-then-write loop

the change: make hydrateWidgets smaller, or split it so the browser can paint and handle input
```

Expanding the block shows the function names and their self-time, which is usually enough to identify the cause without adding a single log statement. Repeated layout events after each style write would point at a loop that reads a layout property and forces a recalculation; script time dominating an interaction points at doing too much synchronously in a handler. Throttle the CPU and record a cold load before drawing any conclusion.
