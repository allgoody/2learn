## Example 1 — Two blocks that look like duplication

A reviewer proposes merging the two calculations below into one function that takes a rate. Say what each constant actually means, and whether merging them is safe.

```ts
const retail = base * 1.20;     // shop price, set by marketing
const wholesale = base * 1.07;  // trade price, negotiated per contract
```

### Solution

```text
same shape, different rules: the retail markup is a marketing decision and
the wholesale margin is a contract term, so a change to either has no
reason to change the other.

keep them apart. What would justify one function is a third occurrence of
the same rule — the trade price appearing in an invoice and a quote, where
both must always agree.
```

The two lines share their arithmetic and nothing else: the numbers have different owners, change for different reasons and are reviewed by different people. Merging them would create a function every future pricing decision must route through, which costs more than two readable constants. The trap is that the code looks identical, so the merge seems obviously right — the question is not whether the lines match but whether they will always change together.

## Example 2 — A helper with a flag for one caller

The shared function below grew a boolean so that one caller could skip validation. Say what that costs the other six callers, then rewrite it.

```ts
function saveOrder(order, options: { skipValidation?: boolean } = {}) {
  if (!options.skipValidation) validate(order);
  return db.insert(order);
}

saveOrder(order);                                    // six callers
saveOrder(importedOrder, { skipValidation: true });  // one caller
```

### Solution

```ts
function saveValidatedOrder(order: Order) {
  validate(order);
  return db.insert(order);
}

function saveImportedOrder(order: Order) {
  return db.insert(order);       // already validated at the boundary
}

// the six callers use saveValidatedOrder; the importer uses the other one
```

A flag turns one function into a switch, and every caller must now know what the flag means and which value is right for it — the six callers that pass nothing carry a decision they never make. Two named functions put each behaviour behind its own name, so a call site says what it does without opening the helper. The trap is that the flag felt like the smaller change at the time, and the second flag is always easier to add than the first was to justify.
