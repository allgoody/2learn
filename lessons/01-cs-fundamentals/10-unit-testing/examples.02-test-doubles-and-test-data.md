## Example 1 — A test that pins the call sequence

The test below uses a mock and asserts which repository methods ran. Say what it will do the next time the unit is restructured, then replace the mock with a fake and assert on the result.

```ts
test("saves a new order", async () => {
  const repo = { insert: vi.fn(), update: vi.fn(), findByKey: vi.fn() };
  const service = new OrderService(repo);

  await service.place(makeOrder({ key: "abc" }));

  expect(repo.findByKey).toHaveBeenCalledWith("abc");
  expect(repo.insert).toHaveBeenCalledTimes(1);
  expect(repo.update).not.toHaveBeenCalled();
});
```

### Solution

```ts
class InMemoryOrders {
  rows: Order[] = [];
  findByKey(key: string) { return this.rows.find((r) => r.key === key) ?? null; }
  insert(order: Order) { this.rows.push(order); return order; }
  update(order: Order) { Object.assign(this.rows[0], order); return order; }
}

test("stores a placed order under its key", async () => {
  const repo = new InMemoryOrders();

  await new OrderService(repo).place(makeOrder({ key: "abc" }));

  expect(repo.findByKey("abc")).not.toBeNull();
});
```

The mock version describes the current implementation: reorder the lookup and the insert and it fails even though the order is stored. A fake with real, tiny behaviour lets the test ask the question a caller would ask — is the order retrievable under its key — so the three call expectations collapse into one outcome assertion. The trap is that a mock is quicker to write than a fake, so call assertions accumulate until the test file itself becomes the reason nobody refactors.

## Example 2 — A fixture copied five times

The order literal below is repeated in five tests, with one field changed in each. Say what a schema change costs here, then replace it with a factory that states only what each test cares about.

```ts
const order = {
  id: 4471, key: "abc", currency: "GBP", total: 2500,
  customer: { id: 9, email: "a@b.test", tier: "gold" },
  lines: [{ sku: "book", price: 1000, qty: 2 }],
  status: "draft",
};   // also copied with totals 900, 0, 5000 and 1200
```

### Solution

```ts
const makeOrder = (overrides: Partial<Order> = {}): Order => ({
  id: 4471, key: "abc", currency: "GBP", total: 2500,
  customer: { id: 9, email: "a@b.test", tier: "gold" },
  lines: [{ sku: "book", price: 1000, qty: 2 }],
  status: "draft",
  ...overrides,
});

// each test now states only its own case
const order = makeOrder({ total: 900 });
```

One definition holds the canonical example, so a new required field is one edit rather than five, and every test reads as a statement of what matters to it. The trap is the shallow spread: overriding `customer` replaces the whole nested object, so a test changing one nested field must repeat its siblings — keep nested literals out of overrides unless the test is genuinely about all of them.
