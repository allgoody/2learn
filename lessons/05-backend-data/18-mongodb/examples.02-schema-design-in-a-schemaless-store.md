## Example 1 — A collection shaped by its reads

A catalogue collection must serve three reads: a product page returning one product with its tags and price, a search filtered by category and paged in name order, and a price feed that updates prices alone. Write the document shape, the indexes, and the field that records the shape version.

```text
product page: read one product with its tags and price
search:       filter by category, page in name order
price feed:   update the price field only
```

### Solution

```js
{
  _id: 91,
  schema_version: 2,
  name: "Kettle",
  category: "kitchen",
  price_pence: 2499,
  tags: ["steel", "1.7l"]
}

// indexes, each traceable to one read
db.products.createIndex({ category: 1, name: 1 });   // the search, including its sort
// the product page and price feed address the document by _id (indexed already).
```

The design starts from the reads: the product page fetches the whole record once, so the tags are embedded and bounded, and the search's filter and sort are covered by one compound index. The version field tells a reader which shape it holds, so a new shape can roll out while old documents remain. What usually goes wrong is designing around the entity diagram, so the common read needs several round trips.

## Example 2 — Rejecting the write that does not match the shape

The same catalogue now takes writes from a feed, an admin form and a script written last year. The feed has started sending the price as a formatted string, so readers cope with two shapes. Validate at the boundary and give every write a version.

```js
await products.insertOne({
  name: "Kettle",
  price: "2499",                 // a string this time
  category: "kitchen"
});                              // accepted: the store has no schema to violate
```

### Solution

```js
const fields = {
  name: (v) => typeof v === "string" && v.length > 0,
  category: (v) => typeof v === "string",
  price_pence: (v) => Number.isInteger(v) && v >= 0,
};

function validate(doc) {
  for (const [k, ok] of Object.entries(fields))
    if (k in doc && !ok(doc[k])) throw new Error(`bad field: ${k}`);
  return { ...doc, schema_version: 3 };
}

await products.insertOne(
  validate({ name: "Kettle", price_pence: 2499, category: "kitchen" })
);
// a version 2 document without price_pence is mapped on read
```

A missing schema is not the same as no schema: the shape exists in the readers' assumptions, so declaring it at the boundary turns an accidental variant into a rejected request, and the version field makes a shape change deliberate. Old and new documents then coexist. What usually goes wrong is treating the missing schema as no schema: every reader copes with every historical shape.
