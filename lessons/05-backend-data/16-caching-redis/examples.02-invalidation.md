## Example 1 — The read that repopulates a stale value

A product price is cached under one key, deleted whenever the price changes. Under load the delete is not enough: a reader that fetched the old price just before the write stores it after the delete, and the copy stays wrong until its expiry. Replace the key so the old value becomes unreachable.

```text
t0  reader  get product:7        -> miss
t1  reader  read source         -> price 19.99
t2  writer  update price        -> 24.99
t3  writer  del product:7
t4  reader  set product:7 = 19.99, ttl 300
t5  reader  get product:7        -> 19.99    stale for up to 300s
```

### Solution

```js
const version = row.updated_at.getTime();     // changes with every write
const key = `product:${id}:v${version}`;

await cache.set(key, JSON.stringify(row), "EX", 300);
// best effort: the writer also deletes the previous version's key

// t0..t1  reader fetches version 3 (19.99)
// t2      writer updates, version becomes 4, deletes product:7:v3
// t4      reader writes product:7:v3       (nobody will look it up again)
// t5      reader looks up product:7:v4     -> miss -> fresh 24.99
```

The version makes the old entry unreachable rather than absent, so the read that lost the race writes a key no later request will compute, and the short expiry bounds the damage if a write is missed. The delete is still sent, but as an optimisation rather than the correctness mechanism. The usual mistake is relying on the delete alone, which has no upper bound on staleness when it fails.

## Example 2 — A delete that clears more than the write changed

Updating one product's price invalidates the whole product namespace, which on a busy catalogue empties the cache and sends every read to the database until it refills. Narrow the invalidation to the keys the write actually affects, and keep the listing honest some other way.

```text
update products set price = 2499 where id = 7;

DEL product:*
```

### Solution

```js
// the price change affects one product's current version only
await cache.del(`product:${id}:v${newVersion}`);

// the featured listing stores identifiers, not prices, so this write does not
// touch it; its own short expiry is what keeps it honest
await cache.set("products:featured", ids, "EX", 60);
```

A patterned delete scans the whole keyspace, can block other operations, and here destroys the hit rate that justified the cache. Invalidation should be derived from what changed: a price affects one product key, and a listing that holds only identifiers is not affected by a price at all, so its sixty-second expiry is enough. What usually goes wrong is clearing the namespace to feel safe, trading a small correctness risk for a large performance one.
