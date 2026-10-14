---
title: Arrays, lists and hash maps
prereqs: []
---

## What it is

These are the three structures a working program reaches for first. An array stores elements side by side in one block of memory and finds the nth one by arithmetic. A linked list stores each element somewhere in memory with a pointer to the next. A hash map stores values under keys and computes where each key belongs. Almost every other structure is built from these.

## Why it matters

The difference is not academic. Looking a value up in an unordered array of ten thousand records costs ten thousand comparisons; a hash map costs about one. Appending to a linked list is instant while appending to a full array has to copy everything — yet iterating a linked list of ten thousand nodes can be slower than iterating the array, because each node is a jump to a random place in memory. Getting this wrong produces code that is functionally correct and mysteriously slow.

## Core ideas

### Contiguous memory is the fast path

An array of integers of the same size can be indexed with one multiplication: `address = base + index * width`. Reading the next element pulls the whole cache line with it, so scanning forward is fast even for millions of entries. The price is that the block must be found free and contiguous, and that inserting in the middle requires shifting everything after it.

```text
array of 5: [10][20][30][40][50]
read index 3  -> base + 3 * width   (one step)
insert at 1   -> shift 20,30,40,50 right, then write
```

### Dynamic arrays grow by doubling

A "list" in most languages is a dynamic array: a contiguous block with a length and a capacity. When it fills, the runtime allocates a block twice the size and copies the elements across. A single append that triggers a copy is expensive, but spread over the appends that filled the block the average is constant. This is amortised cost: occasional spikes, flat average.

```text
capacity 4, length 4 -> append -> allocate 8, copy 4, write 1
next 3 appends      -> no allocation at all
```

### Linked lists trade locality for cheap splicing

A linked list only needs a node to be free, never a contiguous run, and inserting after a node you already hold is a couple of pointer writes. The cost is that there is no arithmetic shortcut: the thousandth element means following a thousand pointers into a thousand cache lines. Linked lists win when elements are added and removed constantly and rarely traversed, and lose badly otherwise.

```text
node A -> node C -> node F
insert B after A:  A.next = B; B.next = C
```

### Hash maps turn a key into a slot

A hash function converts a key into a number that selects a slot in an array. Two keys can land in the same slot, so the map needs a collision strategy: chaining onto a list, or probing for a free slot. As the map fills, collisions get more common, so it rehashes into a larger table past a load-factor threshold. Iteration order follows the hash and the table size, which is why it is documented as unspecified.

```text
hash("alice") -> 4  -> bucket 4: ["alice" -> 30]
hash("bob")   -> 7  -> bucket 7: ["bob"   -> 41]
lookup("bob"): hash, jump to bucket 7, compare keys
```

### Read the operation you do most

Write down the three or four operations the code performs most. If it is lookup by key, take the map. If it is indexed or scanned in order, take the array. If it is removing from the middle while holding a reference, a linked structure earns its place. Reach for something exotic only when those conflict.

## Practice

### Count the cost of your own lookup

Take a function you wrote this week that searches a collection. Find its type, count the elements it holds in production, and count the comparisons one lookup costs.

Done when: you can state the cost in terms of the element count and say whether one lookup is doing a scan or a jump.

### Replace a scan with a map

Find a loop that scans a list to find one item by id. Build a map keyed on that value once, then replace the scan with a lookup.

Done when: the function gives identical results and the scan is gone from the hot path.

## Common mistakes

- **Assuming a list is an array** — a linked list and a dynamic array share a name in many languages but have opposite performance; fix: check the type your language provides and how it grows.
- **Using a linear scan inside a loop** — the code is quadratic and looks like ordinary iteration; fix: build a map once and look up instead of scanning.
- **Relying on hash map iteration order** — the order changes with the hash and the table size, so output shuffles between runs; fix: sort the keys explicitly when order matters.
- **Using a mutable object as a hash key** — mutating it changes its hash and the value becomes unreachable; fix: key on an immutable value such as an id string.
- **Deleting from the middle of a dynamic array in a loop** — each removal shifts the tail, so the loop becomes quadratic; fix: filter into a new collection, or iterate backwards.

## Go deeper

- **Algorithms & Big-O** (`cs-fundamentals/algorithms-big-o`) — how to describe the costs you have just met without hand-waving.
- **Trees, heaps and graphs** (`cs-fundamentals/data-structures/02-trees-heaps-and-graphs`) — what to use when the data is ordered or connected.
- **Pseudocode** (`cs-fundamentals/pseudocode`) — sketching the access pattern before committing.
