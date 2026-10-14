---
title: How cost grows (Big-O)
prereqs: ["cs-fundamentals/data-structures"]
---

## What it is

Big-O describes the shape of a cost curve, not a stopwatch reading. It says how the number of operations changes as the input grows, with constant factors thrown away. The notation is deliberately coarse: an algorithm that takes three passes over the data and one that takes one are both linear, because the difference between them stays the same size while the difference between linear and quadratic explodes.

## Why it matters

You cannot benchmark every design at production scale, and you should not have to. Writing down the growth rate lets you rule out a doomed approach on paper, before anyone has invested in it. It also explains surprises you have already met: a nightly job that was fine at a thousand rows and takes six hours at a million, or an endpoint whose latency doubled when the page size doubled. The habit of asking "how does this grow?" is what separates code that was only ever tested on toy data from code that keeps working.

## Core ideas

### Count the operation that dominates

Find the step that happens most often as the input grows, and count that. If a loop does a fixed amount of work per element, the cost rises with the element count. If it does that inside another loop over a second collection, the cost rises with the product. Adding a constant number of other steps does not change the growth rate, which is why the notation ignores them.

```text
for each row in rows:            # n rows
  total = total + row.amount    # fixed work per row
# cost grows with n -> linear

for each row in rows:           # n rows
  for each other in rows:       # n rows each
    compare(row, other)         # n * n comparisons -> quadratic
```

### The growth classes you will actually meet

Constant means the work does the same regardless of size — a hash lookup, an array index. Logarithmic means each step discards a fraction of what remains, as binary search does, so a million items cost about twenty steps. Linear means one pass, which is the floor for anything that must read every element. Linearithmic is the cost of a good comparison sort. Quadratic is where loops nest, and exponential is where a problem branches into every possibility.

```text
n = 1,000,000
constant     1 step
logarithmic  ~20 steps
linear       1,000,000 steps
quadratic    1,000,000,000,000 steps
```

### Best, average and worst case

The same algorithm can sit in different classes depending on the input. Quicksort is linearithmic on average and quadratic on input that is already sorted with a naive pivot choice. A hash map is constant on average and linear in the worst case when every key collides. Say which case you mean. In production the worst case is the one that wakes you up, so a good average with a terrible worst case is a decision you make deliberately, not by accident.

### Amortised cost hides occasional spikes

Some operations are usually cheap and occasionally expensive. A dynamic array append is constant until the array is full, then copies everything; spread over the appends that filled it, the average is constant. Amortised cost describes that average and is honest about the spike. What it does not promise is a low worst-case latency — which matters when the code runs inside a request that has a deadline.

## Practice

### Predict, then measure

Write a function that checks whether two lists share any element, using a nested loop. Predict its growth rate for lists of 100, 1,000 and 10,000 elements, then time it. Rewrite it with a set and time it again.

Done when: your predicted growth matches the measured shape at all three sizes, and the two implementations diverge by more than an order of magnitude at the largest size.

### Find the hidden loop

Take a function from your own codebase and count its loops over the same collection, including loops hidden inside library calls such as filtering inside a map.

Done when: you can name the cost of the slowest path through the function and point at the line responsible.

## Common mistakes

- **Reading O(n) as a speed** — the notation describes growth, so a linear algorithm can beat a constant one on small input; fix: state the input size you are reasoning about.
- **Ignoring the constant factor where it dominates** — a hash map has setup and hashing costs that a five-element array scan does not; fix: use the notation to rule designs out, then measure the survivors.
- **Assuming the average case is the only case** — a pathological input turns the average into the worst; fix: name the worst case and decide whether your data can produce it.
- **Nesting a scan inside a loop** — the quadratic cost is invisible in the source but quadratic in the data; fix: hoist the scan into a map or set built once.
- **Counting only the lines you wrote** — serialisation, logging and library calls inside the loop are part of the cost; fix: count everything the loop body actually does.

## Go deeper

- **Data Structures** (`cs-fundamentals/data-structures`) — growth rates are really statements about the structure holding your data, so read this first.
- **Sorting, searching and traversal** (`cs-fundamentals/algorithms-big-o/02-sorting-searching-and-traversal`) — the standard algorithms, with their costs attached.
- **Database Internals** (`cs-fundamentals/database-internals`) — what it means when the cost is dominated by disk rather than by operations.
