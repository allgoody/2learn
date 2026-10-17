---
title: Sorting, searching and traversal
prereqs: ["01-cs-fundamentals/14-algorithms-big-o/01-how-cost-grows-big-o"]
---

## What it is

Three families of procedure solve most of the algorithmic work in ordinary software. Searching finds a value in a collection of `n` values, sorting puts that collection in order so later questions get cheap, and traversal visits everything reachable through a set of connections. Each family has a small number of standard members, and each member carries a cost you can count before writing it: a scan reads up to all 10 values of a ten-value list, a halving search finds the value 23 in that same list in 3 comparisons, and on 1 000 000 values the halving search needs at most 20 comparisons, because `2^20 = 1 048 576` covers 1 000 000 while `2^19 = 524 288` does not.

## Why it matters

Recognising these procedures saves you from writing a slower version of something that already exists. Sorting is a decision, not a utility call: stability, memory use and the shape of the input all change which sort is right. A merge sort of 1 000 000 values needs a second array of 1 000 000 slots — `1 000 000 * 4 = 4 000 000` bytes if each value is 4 bytes — while a quicksort needs none but degrades from `1 000 000 * 20 = 20 000 000` comparisons to `500 000 000 000` on sorted input. Traversal is the one that bites silently: on the graph `A -> B`, `B -> C`, `C -> A`, a walk that never records where it has been follows 3 edges per lap and never finishes, so a missing visited check turns a small graph into a hung process in production.

## Core ideas

### Linear search versus binary search

A linear scan inspects values until it finds a match, so it costs up to `n` comparisons for `n` values — 10 values, 10 comparisons at worst. Binary search works only on a sorted collection: it looks at the middle value, and one comparison tells it which half cannot contain the target, so each step halves what remains. `n = 1 000 000` values therefore take 20 comparisons, because `2^19 = 524 288` is fewer than 1 000 000 while `2^20 = 1 048 576` is at least that: 20 halvings are enough, 19 are not.

```text
sorted list of 10 values, indexes counted from 0
index   0   1   2    3    4    5    6    7    8    9
value   2   5   8   12   16   23   38   56   72   91

target = 23      the value being searched for
low = 0          the index of the first value still in range
high = 9         the index of the last value still in range
mid = low + (high - low) / 2, rounded down

step 1  mid = 0 + (9 - 0) / 2 = 4;   value at index 4 is 16;  23 > 16 -> low = 5
step 2  mid = 5 + (9 - 5) / 2 = 7;   value at index 7 is 56;  23 < 56 -> high = 6
step 3  mid = 5 + (6 - 5) / 2 = 5;   value at index 5 is 23;  23 = 23 -> found at index 5

3 comparisons, against the 6 a scan makes: it reads index 0 (2), 1 (5), 2 (8), 3 (12), 4 (16), 5 (23)
```

The trade is explicit, and it can be counted. Sorting 1 000 000 values costs about `n * log2 n = 1 000 000 * 20 = 20 000 000` comparisons; each later binary search costs 20 instead of the up-to-1 000 000 of a scan, so sorting pays for itself after about `20 000 000 / 1 000 000 = 20` searches on that collection. Twenty searches, not one: for a single lookup, scanning is the cheaper plan.

### Comparison sorts and what they cost

A comparison sort decides order by asking "is a before b", and no such sort can beat about `n * log2 n` comparisons: at `n = 1 000 000` that is `1 000 000 * 20 = 20 000 000`. The well-known sorts all sit in that class and differ in what they pay besides comparisons. Merge sort is stable — records with equal keys keep their input order — and needs a second array of `n` slots, `1 000 000 * 4 = 4 000 000` bytes for 4-byte values. Quicksort sorts in place, needs no second array, and is usually the fastest, but with a naive pivot it falls to `n * n / 2 = 1 000 000 * 1 000 000 / 2 = 500 000 000 000` comparisons on sorted input. Heapsort guarantees about `2 * n * log2 n = 2 * 20 000 000 = 40 000 000` comparisons whatever order the input arrives in, which is twice the work but with no bad input at all.

```text
input [5, 2, 9, 1], n = 4 values, split into halves until each holds one value
split:  [5, 2]  ->  [5], [2]        [9, 1]  ->  [9], [1]
sort each pair by one comparison:   [2, 5] and [1, 9]
merge the two sorted halves into [1, 2, 5, 9], one comparison per output value:
  1 < 2 -> 1     2 < 9 -> 2     5 < 9 -> 5     then 9 is all that remains
comparisons = 1 + 1 + 3 = 5, against n * log2 n = 4 * 2 = 8 for the bound
```

### Hash-based and counting approaches

When a comparison sort is not required, the cost can drop below `n * log2 n`. If you only need the distinct values of 1 000 000 values, a hash set does one hash and one insertion per value — about `2 * 1 000 000 = 2 000 000` steps, against the 20 000 000 comparisons a sort would make to answer the same question. If the values are small integers in a known range, counting them sorts in linear time: a table with one counter per possible value, one increment per input value, then one emission per value in order.

```text
values: 3 1 3 0 2      five integers, so n = 5
range 0..9, so the table holds 10 counters, one per possible value

count:  value 0 -> 1     value 1 -> 1     value 2 -> 1     value 3 -> 2
emit:   print 0 once, 1 once, 2 once, 3 twice, reading counters 0 to 9 in order
result: 0 1 2 3 3

comparisons made: 0
steps: 5 increments + 5 emissions = 10, against about 5 * log2 5 = 12 for a comparison sort
```

The condition is the same each time: the algorithm exploits something about the data that comparison sorting cannot assume — that keys are unique, or that values are integers below a known bound. Assume either one wrongly and the result is wrong rather than merely slow.

### Traversal costs on trees and graphs

Visiting every node of a tree costs one step per node plus one per edge, because there is exactly one route to each: a tree of 1 000 000 nodes has `1 000 000 - 1 = 999 999` edges, so a full walk takes `1 000 000 + 999 999 = 1 999 999` steps. A graph is different — it can hold a cycle, an edge path that returns to its start, and several routes to the same node — so the traversal must carry a record of where it has been.

```text
nodes: A, B, C, D         four nodes
edges: A -> B, B -> C, C -> A, A -> D      four edges

frontier = [A]     nodes found but not yet visited
visited  = {}      nodes already reached, so none is added twice

step 1  take A:   visited {A},              frontier [B, D]
step 2  take B:   A is already visited, so it is not added again
                  visited {A, B},         frontier [D, C]
step 3  take D:   D has no outgoing edge, so nothing is added
                  visited {A, B, D},      frontier [C]
step 4  take C:   its edge points back at A, which is visited, so the cycle stops
                  visited {A, B, C, D},    frontier empty

4 nodes and 4 edges, so 4 entries into the frontier and 4 edges followed: once per node
```

With that record, breadth-first search and depth-first search each run in time proportional to `nodes + edges` — 8 steps on the graph above. Taking a node from the front of the frontier is breadth-first search: it visits A, then everything one edge away (B and D), then everything two edges away (C), so the first time it reaches a node is by the fewest edges. Taking from the back is depth-first search: it follows one path to its end before trying another, which is the shape for asking whether two nodes are connected at all, or whether the graph contains a cycle. Both are the same loop with one line changed — front or back.

## Practice

### Make a search logarithmic

Take an unsorted list you search repeatedly. Sort it once and replace the scan with a binary search you write yourself, including the cases for an empty list and an absent value. On a list of `n = 1 000` values the sort costs `n * log2 n = 1 000 * 10 = 10 000` comparisons, since `2^10 = 1 024` covers 1 000; each binary search afterwards costs at most 10 comparisons instead of up to 1 000.

Done when: the search returns the right index for values at the start, middle and end, reports "absent" cleanly, and does at most ten comparisons on a list of a thousand.

### Prove a cycle to yourself

Build a directed graph containing a loop and run a depth-first search that records the nodes currently on the path, not merely the nodes already seen. On the graph `A -> B`, `B -> C`, `C -> A` the path record holds A, B and C at the moment the last edge closes the cycle, and that is what there is to print.

Done when: the first run prints a cycle of three nodes on the graph above, the second run on an acyclic graph prints nothing, and you can explain what the on-path record adds over the visited set — on this graph the visited set holds A from the start, so it can only report that the walk came back, never which nodes form the loop.

## Common mistakes

- **Binary searching an unsorted collection** — the search returns a wrong "absent" rather than failing: on `[3, 1, 2]` with `target = 3`, `low = 0` and `high = 2` give `mid = 1`, the value 1, and `1 < 3` moves `low` to 2, where the value 2 is also smaller, so the loop ends and reports the target missing though it sits at index 0; fix: sort first, or use a linear scan while the data is unordered.
- **Forgetting the visited set in a graph walk** — a walk that records nothing follows the cycle `A -> B`, `B -> C`, `C -> A` for ever, 3 edges per lap: at one call frame per edge, a runtime that allows 10 000 nested calls dies after `10 000 / 3 = 3 333` laps, having reached 3 distinct nodes; fix: record a node the moment it enters the frontier.
- **Choosing a sort without checking stability** — 10 000 records sorted by name, of which 500 carry the same name, come back in a different order each run under an unstable sort; fix: state whether stability is required and pick a stable sort when it is.
- **Sorting inside a loop** — sorting a list of `n = 1 000` values costs `1 000 * 10 = 10 000` comparisons, and repeating it 1 000 times costs `10 000 * 1 000 = 10 000 000` for an order that never changes; fix: sort once outside the loop, or keep the data ordered as you build it.
- **Trusting the average case in a latency-sensitive path** — quicksort on 1 000 000 sorted values makes `1 000 000 * 1 000 000 / 2 = 500 000 000 000` comparisons against the 20 000 000 of its average, 25 000 times as many, and sorted ids arrive exactly when traffic is highest; fix: prefer a sort with a guaranteed bound where the deadline matters.

## Go deeper

- **How cost grows (Big-O)** (`01-cs-fundamentals/14-algorithms-big-o/01-how-cost-grows-big-o`) — the notation this entry uses for every count above, so read it first.
- **Data Structures** (`01-cs-fundamentals/02-data-structures`) — the structures these procedures run on, and why a sorted array suits binary search while a heap does not.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — sorting and searching at disk scale, where a page read costs far more than the comparison that chose it.
