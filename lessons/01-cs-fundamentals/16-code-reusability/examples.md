## Example 1 — Two blocks that look like duplication

A reviewer proposes merging the two price calculations below into one function that takes a markup rate. Both start from the same supplier cost: `base` is 40.00 pounds, the price the supplier charges for one unit. Say what each multiplier means, who decides it, and whether one function can carry both.

```ts
const base = 40.00;            // what the supplier charges for one unit, in pounds
const retail = base * 1.20;    // shop price, set by marketing
const wholesale = base * 1.07; // trade price, negotiated per contract
```

### Solution

```text
base = 40.00       the supplier's price for one unit, in pounds

retail multiplier 1.20 = 1 + 0.20, a 20 per cent mark-up
  40.00 * 1.20 = 48.00

wholesale multiplier 1.07 = 1 + 0.07, a 7 per cent margin
  40.00 * 1.07 = 42.80

same arithmetic, two owners: marketing decides the 20 per cent that produces
48.00, a per-contract negotiation decides the 7 per cent that produces 42.80,
and neither number moves when the other does.

keep the two lines apart. What would justify one function is a third
occurrence of the same rule — the trade price in an invoice and in a quote,
where the two must always agree.
```

The two lines share the multiplication and nothing else: they differ in one value, 1.20 against 1.07, and those two values have different owners and different review. Merging them would create one function that both 48.00 and 42.80 must route through, so a marketing decision could not change the shop price without touching a contract term. The trap is that the two lines are identical in shape, so the merge looks obviously right — the question is not whether the lines match but whether the numbers behind them will ever move together.

## Example 2 — A helper with a flag for one caller

The shared function below grew a boolean so that one caller could skip validation. It has 7 call sites: 6 save an order that was just validated, and 1 saves an order validated at the boundary. Say what `skipValidation: true` costs the 6 callers that never pass it, then rewrite the function.

```ts
// skipValidation = false (or absent): run validate, then insert
// skipValidation = true:              skip validate, then insert
function saveOrder(order, options: { skipValidation?: boolean } = {}) {
  if (!options.skipValidation) validate(order);
  return db.insert(order);
}

saveOrder(order);                                    // 6 of the 7 call sites
saveOrder(importedOrder, { skipValidation: true });  // 1 of the 7 call sites
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

// 6 call sites use saveValidatedOrder, 1 uses saveImportedOrder
```

A flag turns one function into a switch: 2 behaviours behind 1 name, and every caller must now know which of the 2 it wants. The 6 callers that pass nothing carry a decision they never make, and a reader who opens the helper to check one of them has to hold both branches at once. Two named functions put each behaviour behind its own name, so a call site says what it does: `saveValidatedOrder` reads as "validate first" and `saveImportedOrder` cannot be mistaken for it. The trap is that the flag felt like the smaller change at the time, and the second flag is always easier to add than the first was to justify.
