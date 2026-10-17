## Example 1 — From a nested loop to one pass

The function below reports whether two lists share any value. Both lists hold `n` elements — take `n = 10 000` — so the nested loop makes `n * n = 10 000 * 10 000 = 100 000 000` comparisons in the worst case, where neither list contains a shared value. Say what class that is, then rewrite the function so it takes `2 * n = 20 000` steps instead.

```ts
function sharesAny(a: number[], b: number[]): boolean {
  for (const x of a) {
    for (const y of b) {
      if (x === y) return true;
    }
  }
  return false;
}
```

### Solution

```ts
function sharesAny(a: number[], b: number[]): boolean {
  const seen = new Set(a);        // n hashes and n insertions: 10 000 steps
  for (const y of b) {            // n lookups, 1 hash each: 10 000 more
    if (seen.has(y)) return true;
  }
  return false;
}

// n = the number of elements in each list
// nested loop: n * n comparisons        set version: 2 * n steps
//      n = 100:    100 * 100 = 10 000              2 * 100 = 200
//    n = 1 000: 1 000 * 1 000 = 1 000 000       2 * 1 000 = 2 000
//   n = 10 000: 10 000 * 10 000 = 100 000 000  2 * 10 000 = 20 000
// gap at the largest size: 100 000 000 / 20 000 = 5 000 times
```

The nested version does one comparison per pair, so its cost is the product of the two lengths, written `O(n^2)`; the set version pays one pass and one lookup per element, so its cost doubles when the input doubles, written `O(n)`. At 10 000 elements the counts stand in the ratio `100 000 000 / 20 000 = 5 000`, and the ratio itself grows with `n`, which is why the nested form is fine in a test and fatal in production. The trap is that both are correct, and on the three-element lists a test usually carries they look identical, so the growth has to be reasoned about rather than measured.

## Example 2 — The input that turns the average into the worst case

The sort below partitions around the first element, and at `n = 10 000` it was timed on random input and on already-sorted input: 12 ms and 480 ms, where a millisecond is one thousandth of a second. Doubling the input to `n = 20 000` took 1 900 ms. Say which growth class each run is in, and what the fix is.

```ts
function quickSort(xs: number[]): number[] {
  if (xs.length < 2) return xs;
  const [pivot, ...rest] = xs;
  const lower = rest.filter((x) => x < pivot);
  const higher = rest.filter((x) => x >= pivot);
  return [...quickSort(lower), pivot, ...quickSort(higher)];
}

// n = 10 000 elements, random input:             12 ms
// n = 10 000 elements, already sorted:          480 ms
// n = 20 000 elements, already sorted:        1 900 ms
```

### Solution

```text
class of each run, at the size it ran at
  random,  n = 10 000: linearithmic — n * log2 n = 10 000 * 14 = 140 000 comparisons
                      14 levels because 2^14 = 16 384 >= 10 000 and 2^13 = 8 192 < 10 000
  sorted,  n = 10 000: quadratic — partitions of 0 and n - 1 give
                       n * (n + 1) / 2 = 10 000 * 10 001 / 2 = 50 005 000 comparisons
  the ratio between them: 50 005 000 / 140 000 = 357, and the timing shows 480 / 12 = 40

the doubling, sorted input, 10 000 -> 20 000 elements
  quadratic work grows by 2^2 = 4:  480 * 4 = 1 920 ms, measured 1 900 ms
  a linearithmic sort would have grown by 2 * 15 / 14 = 2.1: 480 * 2.1 = 1 008 ms

fix: choose a pivot that is not positional, such as the middle value or a random one,
     so no input order can make every partition one-sided
```

Partitioning on the first element only looks safe on shuffled data: sorted input makes every partition maximally lopsided, so the recursion runs `n = 10 000` levels deep, one saved call frame per level, instead of the `14` levels a halved range needs, and the doubling multiplies the work by 4 rather than by 2. The trap is that the average case is what a benchmark shows, while the pathological input is what production already holds — sorted ids, appended timestamps, a list straight out of a database. The two ratios also differ — `480 / 12 = 40` measured against `357` counted — because comparisons are only part of the work: every level allocates two new arrays, so the counted ratio bounds the measured one from above rather than matching it exactly.
