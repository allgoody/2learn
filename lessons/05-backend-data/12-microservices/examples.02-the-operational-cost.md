## Example 1 — When the stock service slows down

The handler below calls two services with no bounds, so when the stock service starts answering slowly the orders endpoint holds its connections until it too stops answering. Rewrite it so one slow dependency cannot take the caller down, and so the request can still be followed once it spans processes.

```js
app.get("/orders/:id", async (req, res) => {
  const order = await ordersService.get(`/orders/${req.params.id}`);
  const stock = await stockService.get("/stock");
  res.json({ ...order, stock });
});
```

### Solution

```js
app.get("/orders/:id", async (req, res) => {
  const requestId = req.headers["x-request-id"] ?? crypto.randomUUID();

  async function call(service, path, { timeout, fallback }) {
    try {
      return await withTimeout(service.get(path, { requestId }), timeout);
    } catch {
      return fallback;
    }
  }

  const order = await call(ordersService, `/orders/${req.params.id}`, { timeout: 300, fallback: null });
  const stock = await call(stockService, "/stock", { timeout: 200, fallback: null });

  res.json({ ...order, stock, degraded: stock === null, requestId });
});
```

Every call now has a timeout and a defined answer when the dependency is unavailable, so a slow stock service degrades one field instead of stalling every caller in turn: the separation offered the opportunity for isolation, not the isolation itself. The correlation identifier travels with both calls, so a trace can join the spans and say where the time went, which is much cheaper to instrument before the first incident. Adding timeouts without deciding what the caller returns in the meantime only moves the failure outward.

## Example 2 — Removing a field during a rolling deployment

A response field is to be renamed and the change below deletes the old name outright, though older callers are still running when it ships. Rewrite it so both versions work through the roll-out, and say when the old name can go.

```json
{
  "current":  { "id": "ord_812", "status": "placed", "total": 42.5 },
  "proposed": { "id": "ord_812", "status": "placed" }
}
```

### Solution

```json
{
  "current": { "id": "ord_812", "status": "placed", "total": 42.5 },
  "next":    { "id": "ord_812", "status": "placed", "total": 42.5,
               "amount": { "value": 42.5, "currency": "GBP" } },
  "retire":  "total, after the older callers have migrated"
}
```

A rolling deployment, a canary and a lagging service mean several versions run at once, so version skew is a permanent condition rather than a transition state: an interface change either tolerates the previous version or becomes a scheduled migration, which the `retire` line records. Supporting both names is only affordable if this service can be deployed on its own, and that is the real test of the boundary. Releasing services together "just this once" is how the coupling comes back.
