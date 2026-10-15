## Example 1 — Order the chain so nothing runs too early

A server has a public health route, a protected orders route, request logging, body parsing and a central error handler. The draft below mounts the check after the routes it protects and lets a thrown error escape. Put each piece where the next one can rely on it.

```js
app.use(express.json());
app.get('/orders', listOrders);
app.post('/orders', createOrder);
app.use(requireAuth);            // too late: they already ran
```

### Solution

```js
const app = express();
app.use(logRequests);
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use(express.json());         // only the routes below read a body
app.use(requireAuth);            // before the routes it protects
app.get('/orders', listOrders);
app.post('/orders', createOrder);
app.use((err, req, res, next) => {
  res.status(500).json({ code: 'internal_error' });
});
```

An unauthenticated request is now rejected before its body is parsed, and the four-argument handler sits last, so a thrown error reaches it instead of becoming a stack trace. The order is the design: each link may rely only on what ran before it. What usually goes wrong is mounting the check after the route, as above, and an asynchronous route that lets its errors escape, so the handler never sees them.

## Example 2 — A handler thin enough to test without a server

The order route reads the body, validates it, computes the total and writes to the database, all in one place. Extract the decisions into a function of plain data and leave the handler to translate between the request and that function.

```js
app.post('/orders', async (req, res) => {
  const items = req.body.items;
  if (!items.length) return res.status(422).json({ code: 'empty_order' });
  let total = 0;
  for (const item of items) total += item.price * item.quantity;
  const order = await db.orders.insert({ items, total });
  res.status(201).json(order);
});
```

### Solution

```js
// create-order.js — no request, no response, called directly by a test
function buildOrder(body) {
  const items = body.items || [];
  if (!items.length) return { error: 'empty_order' };
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return { order: { items, total } };
}

// routes.js
app.post('/orders', async (req, res) => {
  const { error, order } = buildOrder(req.body);
  if (error) return res.status(422).json({ code: error });
  res.status(201).json(await db.orders.insert(order));
});
```

The rules and the arithmetic now live in a function of ordinary values, so a test calls it without binding a port, while the handler keeps only what needs the framework: the parsed body, the injected dependency and the status code. What usually goes wrong is testing through a real server, or assuming a field such as the authenticated user was attached when the route is mounted without the middleware that sets it.
