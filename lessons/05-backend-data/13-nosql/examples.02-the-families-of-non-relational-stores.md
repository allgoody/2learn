## Example 1 — A query rebuilt on top of a key-value store

Session data lives in a key-value store, which is right, and the download catalogue was put there too. The function below answers one query by reading the whole collection, which is slower than the database it replaced. Rewrite the query against a store that can answer it, and say what the key-value store should be kept for.

```js
async function downloadsAtResolution(resolution) {
  const found = [];
  for (const key of await store.keys("item:*")) {
    const value = JSON.parse(await store.get(key));
    if (value.kind === "download" && value.detail.resolution === resolution) {
      found.push(value);
    }
  }
  return found;
}
```

### Solution

```js
async function downloadsAtResolution(resolution) {
  return collection.find({ kind: "download", "detail.resolution": resolution });
}
```

A key-value store knows only that a key exists and has a value, so every question beyond lookup-by-key has to be built in the application — and here the scan reimplements, worse, exactly the machinery that was being avoided. A document store indexes fields inside the document and answers the query itself, leaving the key-value store for the uses that genuinely are one key: session state, caches and simple counters. Keeping the catalogue in the document store also makes a record readable as a whole, which is how an entry is used. The mistake is choosing the smaller interface and then rebuilding a query layer over it.

## Example 2 — What each workload needs from a read

Two counters are being moved to a store that distributes data across machines. For each, say whether a read may return a value a moment out of date and why, and name the cost that follows from adopting a store with its own interface.

```text
shopping cart    a read must not lose a line the user has just added
follower count   a read a few seconds behind changes nothing anyone notices
```

### Solution

```text
shopping cart   no  -> require agreement before the write is acknowledged
follower count  yes -> acknowledge at once and propagate afterwards

cost of the choice: the product's own query interface sits in the data access code
```

Distributing data forces a choice between requiring agreement before a write is acknowledged and acknowledging immediately and propagating after; the honest answer follows from what the user would notice, which is why a bank balance and a follower count differ. The cost counted least is portability: a standard relational query often runs unchanged on another relational product, while each non-relational store has its own interface, so a spread-out data access layer ties the application to the product. Confining it to a small layer keeps changing store a decision rather than a rewrite.
