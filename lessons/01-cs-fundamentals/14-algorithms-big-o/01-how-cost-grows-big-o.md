---
title: How cost grows (Big-O)
prereqs: ["01-cs-fundamentals/02-data-structures"]
---

## What it is

Big-O describes the shape of a cost curve, not a stopwatch reading. It counts the operations an algorithm performs and says how that count changes as the input grows, with constant factors thrown away. Write `n` for the size of the input — for a list, the number of elements it holds — and take `n = 1 000 000`. An algorithm that makes three passes over that list performs `3 * n = 3 * 1 000 000 = 3 000 000` steps; one that makes a single pass performs `n = 1 000 000` steps. Both are written `O(n)`, "linear", because the two are not told apart by their growth: double the list to `n = 2 000 000` and they cost `6 000 000` and `2 000 000` steps, still in the ratio `3 : 1`, while the gap between linear and quadratic widens without limit.

## Why it matters

You cannot benchmark every design at production scale, and you should not have to. Writing down the growth rate rules a doomed approach out on paper, before anyone has paid for it. Take a nightly job that reconciles 1 000 rows in 0.022 s: if its cost is quadratic, it performs `(1 000 000 / 1 000)^2 = 1 000^2 = 1 000 000` times as much work on 1 000 000 rows, so it runs for `0.022 * 1 000 000 = 22 000` seconds, and `22 000 / 3 600` is about six hours. It also explains the surprises you have already met. A page that serves 20 rows in 40 ms and 40 rows in 80 ms is linear: twice the rows, twice the time, so 80 rows take 160 ms. A quadratic path on the same page starts at 40 ms for 20 rows, and every doubling of the row count multiplies the time by `2 * 2 = 4`: 40 rows take `40 * 4 = 160` ms, and 80 rows, which is 4 times 20, take `40 * 4 * 4 = 640` ms. Asking "how does this grow?" is what separates code that was ever tested on toy data from code that keeps working.

## Core ideas

### Count the operation that dominates

Find the step that happens most often as the input grows, and count that. Give the input a name and a value first: `n = 1 000 000` rows. A loop over the rows does one addition per row, so its step count is `n`. Two loops over the same rows do one comparison per pair, so the count is `n * n`.

```text
n = 1 000 000                     the number of rows, the size of the input

for each row in rows:            # 1 iteration per row, so n iterations
  total = total + row.amount     # 1 addition per iteration
# steps = n = 1 000 000                     -> linear, written O(n)

for each row in rows:            # n iterations
  for each other in rows:        # n iterations inside each of them
    compare(row, other)          # 1 comparison per pair
# steps = n * n = 1 000 000 * 1 000 000 = 1 000 000 000 000   -> quadratic, written O(n^2)
```

Adding a constant number of other steps does not change the growth: one `total = 0` before the loop makes the count `n + 1`, which is still `O(n)`, because doubling `n` from 1 000 000 to 2 000 000 still doubles the work, from `n + 1 = 1 000 001` to `2 000 001` steps.

### The growth classes you will actually meet

Each class is a formula in `n`, and each one has a price at a stated size. Read the table at `n = 1 000 000` first, then at the smaller sizes where the cheap-looking class turns expensive.

```text
n = 1 000 000                     the size of the input

class          formula       steps at n = 1 000 000
constant       1             1, whatever n is
logarithmic    log2 n        20, because 1 000 000 / 2^19 = 1.9 and 1 000 000 / 2^20 = 0.95
linear         n             1 000 000
linearithmic   n * log2 n    1 000 000 * 20 = 20 000 000
quadratic      n * n         1 000 000 * 1 000 000 = 1 000 000 000 000

log2 n means: how many times you can halve n before what remains is below 1
2^20 means 2 multiplied by itself 20 times: 2 * 2 * ... * 2 = 1 048 576

a problem that branches into every possibility, at n = 40 instead
exponential    2^n           2^40 = 1 099 511 627 776, against 40 steps for the linear pass
```

Constant means the work never looks at `n`: an array read at `index = 4 999`, with the values starting at address `start = 1 000` and each value taking `size = 4` bytes, is `start + index * size = 1 000 + 4 999 * 4 = 20 996`, one calculation and one visit, whether the array holds 10 values or 10 000 000. Logarithmic means each step discards a fraction of what remains: binary search on 1 000 000 sorted values narrows the range by half each comparison, `1 000 000 -> 500 000 -> ...`, and reaches below 1 after 20 of them. Linear is the floor for anything that must read every element — summing 1 000 000 values takes 1 000 000 additions, because the last value cannot be skipped. Linearithmic is what a good comparison sort costs: sorting 1 000 000 values takes about `n * log2 n = 1 000 000 * 20 = 20 000 000` comparisons. Quadratic is where loops nest, and exponential is where a problem branches into every possibility — choosing from 40 items, 2 choices each, is `2^40 = 1 099 511 627 776` combinations, which is why such problems are solved approximately rather than exactly.

### Best, average and worst case

The same algorithm can sit in different classes depending on the input, and the input is a value you can write down. Quicksort on `n = 10 000` elements, with the first element always chosen as the pivot, is linearithmic on shuffled input and quadratic on sorted input: sorted input gives every partition `0` elements on one side and `n - 1` on the other, so the recursion runs 10 000 levels deep instead of the 14 a halved range needs.

```text
quicksort on n = 10 000 elements, pivot = the first element
random input   each partition is about n / 2: 10 000 * 14 levels = 140 000 comparisons
              14 levels because 2^14 = 16 384 >= 10 000 while 2^13 = 8 192 < 10 000
sorted input   every partition is 0 and n - 1: 10 000 + 9 999 + ... + 1 comparisons
              10 000 * 10 001 / 2 = 50 005 000 comparisons, 357 times the random run

hash map holding 10 000 keys in 1 000 slots
keys spread out  1 hash + 1 comparison per lookup, whichever key you ask for
all in one slot   walking up to 10 000 entries to reach the key filed last
```

Say which case you mean. In production the worst case is the one that wakes you up, so an average of 140 000 comparisons paired with a worst case of 50 005 000 is a decision to make deliberately, not by accident.

### Amortised cost hides occasional spikes

Some operations are usually cheap and occasionally expensive. A dynamic array keeps `length`, the values it holds now, and `capacity`, the slots it reserved; an append writes into spare capacity in one step, and when the capacity is full it reserves twice as much, copies every value across, and then writes. The copies are what the occasional spike costs, and they can be counted exactly.

```text
a dynamic array doubling its capacity, after 1 048 576 appends
every value is 4 bytes, so one copied value moves 4 bytes

copies so far = 1 + 2 + 4 + ... + 524 288 = 2^20 - 1 = 1 048 575
amortised copies per append = 1 048 575 / 1 048 576, about 1

the worst single append copies 524 288 values,
  524 288 * 4 = 2 097 152 bytes moved in one step,
  against 4 bytes for an ordinary append: 524 288 times as long
```

Amortised cost is the average a program actually pays, and it is honest about the spike. What it does not promise is a low worst-case latency: one append in 1 048 576 moves `524 288 * 4 = 2 097 152` bytes, about 2 MB in one step, which matters when the code runs inside a request that has a deadline.

## Practice

### Predict, then measure

Write a function that checks whether two lists share any element, using a nested loop. Predict its growth rate for lists of 100, 1 000 and 10 000 elements, then time it. Rewrite it with a set and time it again. With both lists holding `n` elements, the nested loop does `n * n` comparisons, and the set version pays `n` insertions plus `n` lookups, so `2 * n` steps.

```text
n = the number of elements in each of the two lists
nested loop = n * n comparisons      set version = 2 * n steps
      n = 100:   100 * 100 = 10 000        2 * 100 = 200
      n = 1 000: 1 000 * 1 000 = 1 000 000  2 * 1 000 = 2 000
      n = 10 000: 10 000 * 10 000 = 100 000 000   2 * 10 000 = 20 000
      the gap at the largest size: 100 000 000 / 20 000 = 5 000 times
```

Done when: your predicted shape matches the measured shape at all three sizes, and at 10 000 elements the two implementations differ by more than a factor of 10 — the step counts above predict 5 000.

### Find the hidden loop

Take a function from your own codebase and count its loops over the same collection, including loops hidden inside library calls such as a filtering call inside a mapping call. A `filter` inside a `map` over the same collection of `n` elements is `n * n` element visits, not `n`.

Done when: you can state the size of the largest collection the function meets and name the slowest path's cost — for 10 000 elements and a filter inside a map, `10 000 * 10 000 = 100 000 000` visits, against the `10 000` a single pass would take — and point at the line responsible.

## Common mistakes

- **Reading O(n) as a speed** — the notation describes growth, not a stopwatch, so on small input a linear algorithm can beat a constant one: scanning an array of `n = 5` values costs 5 comparisons, while a hash map hashes the 5-character key first — 5 character codes added, then one division to find the slot — and compares once, about 6 steps; fix: state the input size you are reasoning about, `n = 5` here, and let the notation answer only for large `n`.
- **Ignoring the constant factor where it dominates** — at `n = 5` the map's 6 steps lose to the array's 5 comparisons, and the notation cannot tell you that because both are cheap; fix: use the notation to rule designs out, then measure the survivors at the size they will really meet.
- **Assuming the average case is the only case** — quicksort on 10 000 sorted elements performs `10 000 * 10 001 / 2 = 50 005 000` comparisons against the `10 000 * 14 = 140 000` it performs on shuffled input, 357 times as many; fix: name the worst case and decide whether your data can produce it — ids straight from a database usually do.
- **Nesting a scan inside a loop** — scanning 1 000 values once per value is `1 000 * 1 000 = 1 000 000` comparisons while the source shows one loop body; fix: build the map or set once, before the loop, which costs `1 000 + 1 000 = 2 000` steps instead.
- **Counting only the lines you wrote** — a loop that logs one 200-character line 10 000 times writes `10 000 * 200 = 2 000 000` characters, far more work than the 10 000 additions it wraps; fix: count everything the loop body actually does, including the calls you did not write.

## Go deeper

- **Data Structures** (`01-cs-fundamentals/02-data-structures`) — growth rates are statements about the structure holding your data, so read this first: the array's `start + index * size` is where the constant class comes from.
- **Sorting, searching and traversal** (`01-cs-fundamentals/14-algorithms-big-o/02-sorting-searching-and-traversal`) — the standard procedures, each with its growth class attached and its worst case named.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — what it means when the cost is dominated by a disk read rather than by a counted operation.
