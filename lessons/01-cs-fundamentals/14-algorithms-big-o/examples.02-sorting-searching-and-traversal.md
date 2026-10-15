## Example 1 — Binary search, and the list it must not be given

A list of ids is searched thousands of times per request, and the function below scans it. Say why that shape is wrong for the workload, then write the binary search.

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

// sorted [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], target 23
// mid 4 (16) -> mid 7 (56) -> mid 5 (23): found in 3 comparisons
```

Halving the range finds a target among a million sorted ids in about twenty comparisons, so the cost stops mattering as the list grows — but the function now requires sorted input, and an unsorted list returns a wrong answer silently. The trap is the boundary updates: `low <= high` with `mid + 1` and `mid - 1` is what guarantees progress, and weakening either loops forever on an absent target.

## Example 2 — A walk that loops forever

A dependency checker walks a graph of modules. The run below is against a graph containing a cycle. Say which set is wrong, and why recording a node when it is reached differs from recording it on entry.

```ts
function walk(start: Node, seen: Set<Node> = new Set()): void {
  for (const next of start.dependencies) {
    if (seen.has(next)) continue;
    seen.add(next);
    walk(next, seen);
  }
}

// graph: a -> b, b -> c, c -> a
// walk(a) -> walk(b) -> walk(c) -> walk(a) -> ...
```

### Solution

```ts
function walk(start: Node, seen: Set<Node> = new Set([start])): void {
  for (const next of start.dependencies) {
    if (seen.has(next)) continue;
    seen.add(next);        // record as it enters
    walk(next, seen);
  }
}

// walk(a): a is already recorded, so c -> a is skipped and the walk ends.
```

The original set is only updated once a node has been reached, so `a` is entered a second time before anything records it and the cycle recurses until the stack overflows. Seeding the set with the start node and recording each neighbour before descending visits every node at most once. The trap is that the original terminates on an acyclic graph, which is the only shape a small test contains.
