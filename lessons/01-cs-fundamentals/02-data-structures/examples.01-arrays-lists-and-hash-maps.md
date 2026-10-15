## Example 1 — The real cost of one insert

A service keeps recent order ids in a dynamic array. A new requirement inserts a priority order at the front. The trace below is a five-element example as that insert runs. Say how many elements move, and what changes when the array is full.

```text
capacity 5, length 5,  [A][B][C][D][E]
insert X at index 0
  step 1: full -> allocate 10, copy 5
  step 2: shift E,D,C,B,A right by one
  step 3: write X at index 0
  result: [X][A][B][C][D][E]  length 6, capacity 10
```

### Solution

```text
elements moved: 5 (the whole tail), plus a 5-element copy to grow
result:         [X][A][B][C][D][E], capacity 10
cost:           insert at the front O(n); append O(1) amortised
```

The insert cannot park `X` anywhere: the block is contiguous, so every element after the insertion point shifts right by one slot. That shift is proportional to the length, so inserting at the front of a two-hundred-element array moves two hundred elements; the growth copy is worse, but doubling keeps the average append constant. The trap is the operation you do most — if the code both inserts and reads at the front, a queue or a reversed read removes the shift.

## Example 2 — A scan that should be a map

A function looks up the order each line item belongs to by scanning the whole list of orders. The loop below is the shape of it. Rewrite the lookup so it does not scan, and say what changes for ten thousand orders and ten thousand items.

```text
orders = [ {id: 1, ...}, {id: 2, ...}, ... ]     # 10 000 entries
for item in line_items:                          # 10 000 items
    for order in orders:                         # scan every time
        if order.id == item.order_id:
            item.order = order
```

### Solution

```text
by_id = {}
for order in orders:
    by_id[order.id] = order          # one pass, before the loop

for item in line_items:
    item.order = by_id[item.order_id]   # one step per item
```

Building the map costs one pass; each lookup then hashes the key and compares it inside a single bucket instead of walking the list. The original runs ten thousand comparisons per item, about a hundred million in total, while the map does ten thousand plus ten thousand. The trap is that the scan is invisible while the list is short — the code is correct either way, and only the element count separates them.
