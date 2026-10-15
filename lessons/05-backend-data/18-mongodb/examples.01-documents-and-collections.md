## Example 1 — Which relationships are embedded

A user record and an order record are being designed. An order's lines are read with the order and must change with it; a user has one address; a user belongs to an organisation many users share. Decide for each relationship whether to embed or to reference, and show the documents.

```text
order -> its lines            (read together, a handful)
user  -> their address        (read together, one)
user  -> their organisation   (shared by many, updated independently)
```

### Solution

```json
// one document per order: lines change with the order, so one write is atomic
{
  "_id": 8842,
  "public_id": "ord_8842_pub",
  "customer_id": 41,
  "items": [
    { "sku": "A-1", "qty": 2 },
    { "sku": "B-7", "qty": 1 }
  ],
  "placed_at": "2026-05-01T09:12:00Z"
}

// one document per user: the address is bounded and read with the user
{
  "_id": 41,
  "name": "Sam",
  "address": { "line1": "1 Mill Lane", "city": "Leeds" },
  "organisation_id": 7      // referenced: shared, updated on its own schedule
}
```

Embedding the lines and the address means one read returns the whole record, and a change to them is atomic with the parent. The organisation is referenced because the data is shared and updated independently, so reading it costs a second query and the application enforces it. What usually goes wrong is embedding a set that can grow — an audit trail, a message list — until it hits the size ceiling.

## Example 2 — Two sessions, one lost update

An order's first line changes quantity while another session corrects the delivery city on the same order. The first code path reads the whole document, edits one nested field and writes it back, and the other change disappears. Change the write so only the field it means to change can be affected.

```js
const order = await orders.findOne({ _id: 8842 });
order.items[0].qty = 3;
await orders.replaceOne({ _id: 8842 }, order);

// meanwhile another session sets address.city on the same order;
// after this write that change is gone.
```

### Solution

```js
await orders.updateOne(
  { _id: 8842, "items.0.sku": "A-1" },
  { $set: { "items.0.qty": 3 } }      // touches only this path
);
// the city change made by either session is untouched.
```

An update reaches one path and leaves every other field as it found it, so two sessions changing different fields no longer overwrite each other; a whole-document replace is safe only when the caller holds the entire record. A write to one document is atomic, which is why fields that must change together belong in it. The usual mistake is editing a document loaded a moment earlier, because anything else in it may have changed since.
