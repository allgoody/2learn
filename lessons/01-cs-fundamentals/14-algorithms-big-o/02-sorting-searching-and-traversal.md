---
title: Sorting, searching and traversal
prereqs: ["01-cs-fundamentals/14-algorithms-big-o/01-how-cost-grows-big-o"]
---

## What it is

Three families of procedure solve most of the algorithmic work in ordinary software. Searching finds a value in a collection, sorting puts a collection in order so that later questions become cheap, and traversal visits everything reachable through a set of connections. Each family has a small number of standard members, and each member carries a known cost that tells you where it belongs.

## Why it matters

Recognising these procedures saves you from writing a slower version of something that already exists. Sorting is a decision, not a utility call: stability, memory use and the shape of the input all change which sort is right, and the wrong choice is invisible until the data grows. Traversal is the one that bites silently — a missing visited check turns a walk over a small graph into an infinite loop in production.

## Core ideas

### Linear search versus binary search

Scanning a list for a value inspects elements until it finds a match, so the cost rises with the number of elements. If the list is sorted, binary search halves the remaining range at every step and finds a million items in about twenty comparisons. The trade is explicit: sorting first costs one linearithmic pass, and every later search is logarithmic — worth it above a handful of searches, not for one.

```text
sorted: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
target 23
low 0, high 9 -> mid 4 (16) -> 23 > 16 -> low 5
low 5, high 9 -> mid 7 (56) -> 23 < 56 -> high 6
low 5, high 6 -> mid 5 (23) -> found in 3 steps
```

### Comparison sorts and what they cost

A comparison sort decides order by asking "is a before b". The best possible comparison sort needs about n log n comparisons, and the well-known sorts — merge sort, quicksort, heapsort — all sit in that class with different constant factors and failure modes. Merge sort is stable but needs extra memory. Quicksort sorts in place and is usually fastest, but degrades to quadratic on hostile input unless the pivot is chosen carefully. Heapsort guarantees the bound regardless of input order.

```text
input: [5, 2, 9, 1]
merge sort: split, sort each half, merge
  [5, 2] -> [2, 5]      [9, 1] -> [1, 9]
  merge -> [1, 2, 5, 9]
```

### Hash-based and counting approaches

When a comparison sort is not required, the cost can drop below n log n. If you only need the distinct values, a hash set does one linear pass. If the values are small integers in a known range, counting them sorts in linear time. The condition is the same each time: the algorithm exploits something about the data that comparison sorting cannot assume.

```text
values in 0..9: count each value into a table of ten,
then emit each value as many times as it was counted.
```

### Traversal costs on trees and graphs

Visiting every node of a tree costs one step per node, because there is exactly one route to each. A graph is different: it can contain cycles and several routes to the same node, so the traversal must record where it has been. With that record, breadth-first and depth-first search run in time proportional to nodes plus edges; without it, the work never ends. Breadth-first finds shortest paths in unweighted graphs; depth-first detects cycles and produces a topological order.

```text
visited = set()
stack = [start]
while stack not empty:
  node = stack.pop()
  if node in visited: continue
  visited.add(node)
  stack.extend(node.neighbours)
```

## Practice

### Make a search logarithmic

Take an unsorted list you search repeatedly. Sort it once and replace the scan with a binary search you write yourself, including the cases for an empty list and an absent value.

Done when: the search returns the right index for values at the start, middle and end, reports "absent" cleanly, and does fewer than ten comparisons on a list of a thousand.

### Prove a cycle to yourself

Build a directed graph containing a loop and run a depth-first search that records nodes currently on the path. Print the cycle, then run the same code on an acyclic graph.

Done when: the first run prints a cycle and the second prints nothing, and you can explain what the on-path record adds over the visited set.

## Common mistakes

- **Binary searching an unsorted collection** — the search silently returns the wrong answer on some inputs rather than failing; fix: sort first, or use a linear scan while the data is unordered.
- **Forgetting the visited set in a graph walk** — a cycle turns the traversal into an infinite loop; fix: record a node the moment it enters the frontier.
- **Choosing a sort without checking stability** — records with equal keys come back in a different order each run; fix: state whether stability is required and pick a stable sort when it is.
- **Sorting inside a loop** — reordering the same data each iteration multiplies the cost for nothing; fix: sort once outside the loop, or keep it ordered as you build it.
- **Trusting the average case in a latency-sensitive path** — the occasional quadratic input arrives when traffic is highest; fix: prefer a guaranteed bound where the deadline matters.

## Go deeper

- **How cost grows (Big-O)** (`01-cs-fundamentals/14-algorithms-big-o/01-how-cost-grows-big-o`) — the notation this entry uses throughout, so read it first.
- **Data Structures** (`01-cs-fundamentals/02-data-structures`) — the structures these procedures run on, and why each one suits a different algorithm.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — sorting and searching at disk scale, where the constants stop being ignorable.
