## Example 1 — A read-through cache with an honest expiry

The product detail page reads the same few rows far more often than they change, and every read currently reaches the database. Put a cache beside the read, fill it on a miss, and choose an expiry that states how stale a product page is allowed to be.

```js
async function getProduct(id) {
  return db.query("select * from products where id = $1", [id]);
}
```

### Solution

```js
async function getProduct(id) {
  const key = `product:${id}`;
  const cached = await cache.get(key);
  if (cached) return JSON.parse(cached);

  const product = await db.query("select * from products where id = $1", [id]);
  const ttl = 300;                    // seconds: the most a price may lag a write
  await cache.set(key, JSON.stringify(product), "EX", ttl);
  return product;
}
```

The read path touches the source only on a miss, so the cache fills with the data that is actually requested. Five minutes is a real decision: it bounds how long a stale price can be served even if an invalidation is missed. The database remains the only source of truth, so a lost key costs one query. What usually goes wrong is caching with no expiry at all, which looks faster and turns a missed invalidation into unbounded staleness.

## Example 2 — An expiry that arrives under load

The homepage reads one featured-product key with a fixed one-hour expiry. At the top of each hour every request misses it at the same moment, so the database receives the burst the cache was meant to remove. Change the arrangement so the source sees one read rather than every request.

```js
const key = "product:featured";
const ttl = 3600;                      // one fixed hour
await cache.set(key, body, "EX", ttl);
```

### Solution

```js
const key = "product:featured";
const ttl = 3600 + Math.floor(Math.random() * 300);  // expiries spread apart

// for a key still too hot to let expire under load, one caller refills
// it while the others read the copy when it appears:
const gotLock = await cache.set("lock:product:featured", "1", "NX", "EX", 10);
if (gotLock) {
  const body = await db.query("select * from products where featured = true");
  await cache.set(key, JSON.stringify(body), "EX", ttl);
}
```

Spreading the expiry keeps the keys written in the same second from expiring in the same second, and the short lock lets one caller pay for the refill while the rest wait for the copy. The lock carries its own expiry so a crashed refiller cannot hold it forever. What usually goes wrong is treating the cache as protection without asking what happens on a miss: a popular key that expires under load makes an outage worse rather than better.
