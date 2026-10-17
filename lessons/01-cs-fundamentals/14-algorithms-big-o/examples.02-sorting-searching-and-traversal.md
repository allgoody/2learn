## Example 1 — Binary search, and the list it must not be given

A request handler searches a list of `n = 10 000` ids about 1 000 times per request, and the function below scans the list. A scan compares until it hits the target, so one search costs up to `n = 10 000` comparisons and 1 000 of them cost `1 000 * 10 000 = 10 000 000`. Say what the cost becomes if the list is sorted first, then write the search that gets it.

```ts
function findIndex(ids: number[], target: number): number {
  for (let i = 0; i < ids.length; i++) {
    if (ids[i] === target) return i;
  }
  return -1;
}
```

### Solution

```ts
function findIndex(sorted: number[], target: number): number {
  let low = 0, high = sorted.length - 1;
  while (low <= high) {
    const mid = low + ((high - low) / 2 | 0);
    if (sorted[mid] === target) return mid;
    sorted[mid] < target ? low = mid + 1 : high = mid - 1;
  }
  return -1;
}

// sorted list of 10 ids, indexes counted from 0
// index   0   1   2    3    4    5    6    7    8    9
// value   2   5   8   12   16   23   38   56   72   91
// target = 23, low = 0, high = 9, mid = low + (high - low) / 2 rounded down
//   step 1: mid = 0 + (9 - 0) / 2 = 4, value 16; 23 > 16 -> low = 5
//   step 2: mid = 5 + (9 - 5) / 2 = 7, value 56; 23 < 56 -> high = 6
//   step 3: mid = 5 + (6 - 5) / 2 = 5, value 23; equal -> found at index 5
// found in 3 comparisons
//
// at n = 10 000: at most 14 comparisons,
//   because 2^14 = 16 384 covers 10 000 while 2^13 = 8 192 does not
// 1 000 searches: 1 000 * 14 = 14 000 comparisons, against 1 000 * 10 000 = 10 000 000
```

Halving the range finds a target among 10 000 sorted ids in at most 14 comparisons instead of up to 10 000, which is `10 000 000 / 14 000 = 714` times less work for the 1 000 searches above, so the search stops mattering as the list grows. The price is written into the signature: the function now requires sorted input, and an unsorted list returns a wrong answer silently rather than failing. The trap is the boundary updates — `low <= high` together with `mid + 1` and `mid - 1` is what guarantees each step narrows the range, and weakening either one loops forever on a target that is absent.

## Example 2 — A walk that loops forever

A dependency checker walks the graph of modules. The version below records a module only after the whole subtree beneath it has been walked, and the run is against the cycle `a -> b`, `b -> c`, `c -> a`. Say how many calls the walk has made by the time it reaches `a` for the fourth time, and what the recording order has to be instead.

```ts
function walk(start: Node, seen: Set<Node> = new Set()): void {
  for (const next of start.dependencies) {
    if (seen.has(next)) continue;
    walk(next, seen);
    seen.add(next);        // recorded only on the way back out
  }
}

// graph: a -> b, b -> c, c -> a
// walk(a) -> walk(b) -> walk(c) -> walk(a) -> walk(b) -> walk(c) -> walk(a) -> ...
// seen is still empty when the cycle comes round, so nothing stops the fourth call
```

### Solution

```ts
function walk(start: Node, seen: Set<Node> = new Set([start])): void {
  for (const next of start.dependencies) {
    if (seen.has(next)) continue;
    seen.add(next);        // record as it enters, before the descent
    walk(next, seen);
  }
}

// walk(a): the set already holds a, so c -> a is skipped and the walk ends
// 3 calls for the 3 nodes a, b, c, one call per node
```

Because a node enters the set only after its subtree returns, and a cycle never returns, the whole cycle is unrecorded at every lap: the walk makes `3` calls per lap — `a`, `b`, `c` — so the fourth call to `a` is call number `3 * 3 + 1 = 10`, and no call ever returns. One frame is kept per call, so a runtime that allows 10 000 nested calls dies after about `10 000 / 3 = 3 333` laps instead of finishing. Seeding the set with the start node and recording each neighbour before descending visits every node at most once. The trap is that the broken version terminates on an acyclic graph, which is the only shape a small test contains: on `a -> b`, `b -> c` it makes 3 calls for 3 nodes and returns, exactly as the fixed version does.
