## Example 1 — From a nested loop to one pass

The function below reports whether two lists share any value. Say how its cost grows with the size of the lists, then rewrite it with a set.

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
  const seen = new Set(a);
  for (const y of b) {
    if (seen.has(y)) return true;
  }
  return false;
}

//    100 elements:    10 000 nested  ->    100 with the set
//  1 000 elements: 1 000 000         ->  1 000
// 10 000 elements: 100 000 000       -> 10 000
```

The nested version does one comparison per pair, so its cost is the product of the two lengths; the set version pays one pass and one lookup per element, so its cost rises with the input, not its square. At ten thousand elements that is four orders of magnitude, which is why the nested form is fine in a test and fatal in production. The trap is that both are correct and the small case looks identical, so the growth rate must be reasoned about rather than measured.

## Example 2 — The input that turns the average into the worst case

A sort partitions around the first element. The timings below are for random input and for already-sorted input. Say which class each run is in, and what the fix is.

```ts
function quickSort(xs: number[]): number[] {
  if (xs.length < 2) return xs;
  const [pivot, ...rest] = xs;
  const lower = rest.filter((x) => x < pivot);
  const higher = rest.filter((x) => x >= pivot);
  return [...quickSort(lower), pivot, ...quickSort(higher)];
}

// random input, 10 000 elements:   12 ms
// sorted input, 10 000 elements:  480 ms
// sorted input, 20 000 elements: 1 900 ms
```

### Solution

```text
random input: linearithmic — partitions split the list roughly in half
sorted input: quadratic — the first element is always smallest, so every
              partition is 0 and n-1 and the recursion runs n deep

fix: choose a pivot that is not positional — the middle, or a random one
```

Partitioning on the first element only looks safe on shuffled data: sorted input makes every partition maximally lopsided, and doubling the size multiplies the work four times, as the last two timings show. The trap is that the average case is what a benchmark shows, while the pathological input is what production already holds — sorted ids, appended timestamps, a list straight out of a database.
