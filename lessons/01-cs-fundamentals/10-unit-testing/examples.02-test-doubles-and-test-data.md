## Example 1 — A test that pins the call sequence

The test below replaces the repository with three mocks and asserts which of them ran. The case is one order with the key `abc`: the service looks the key up, finds nothing, and stores one new row. Say what these assertions will do the next time the unit is restructured, then replace the mocks with a fake and assert on the result.

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
  rows: Order[] = [];   // the stored rows, held in an array in this process

  findByKey(key: string) {
    return this.rows.find((r) => r.key === key) ?? null;
  }
  insert(order: Order) {
    this.rows.push(order);
    return order;
  }
  update(order: Order) {
    this.rows[0] = order;      // the one row this test stores
    return order;
  }
}

test("stores a placed order under its key", async () => {
  const repo = new InMemoryOrders();

  await new OrderService(repo).place(makeOrder({ key: "abc" }));

  expect(repo.findByKey("abc")).not.toBeNull();
});
```

The mock version describes the current implementation rather than the outcome: store the new order with one `insertMany` call instead of `insert`, or answer the key from a cache, and all three expectations fail, although exactly one row ends up stored under `abc` and a caller can still find it. Three mocks are also three `vi.fn()` stubs to declare and keep in step with the repository, against one small class here. The fake keeps real and tiny behaviour — one array, and a lookup that scans its rows — so the test can ask the question a caller asks: is this order retrievable under its key. The trap is that a mock is quicker to write than a fake, so call expectations accumulate until the test file itself becomes the reason nobody refactors the service.

## Example 2 — A fixture copied five times

The order literal below appears in five tests, with one field changed in each: the totals are 2 500, 900, 0, 5 000 and 1 200 pence, and the other fields are identical everywhere. Say what a schema change costs here, then replace the literal with a factory that leaves each test stating only what it cares about.

```ts
const order = {
  id: 4471, key: "abc", currency: "GBP", total: 2500,
  customer: { id: 9, email: "a@b.test", tier: "gold" },
  lines: [{ sku: "book", price: 1000, qty: 2 }, { sku: "pen", price: 500, qty: 1 }],
  status: "draft",
};
// total = 2 * 1000 + 1 * 500 = 2000 + 500 = 2500 pence
// the same literal is copied four more times with totals 900, 0, 5000 and 1200
```

### Solution

```ts
const makeOrder = (overrides: Partial<Order> = {}): Order => ({
  id: 4471, key: "abc", currency: "GBP", total: 2500,
  customer: { id: 9, email: "a@b.test", tier: "gold" },
  lines: [{ sku: "book", price: 1000, qty: 2 }, { sku: "pen", price: 500, qty: 1 }],
  status: "draft",
  ...overrides,
});

// the test that was about the total now states just that: 900 pence
const order = makeOrder({ total: 900 });
```

One definition holds the canonical order — id 4471, two lines summing to 2 500 pence, status `draft` — so a new required field is one edit rather than five, and each test reads as a statement of what matters to its own case. The trap is the shallow spread: overriding `customer` replaces the whole nested object, so a test that changes one nested field must repeat its siblings, and `{ customer: { tier: "silver" } }` silently drops the id and the email the other tests rely on. Keep nested literals out of overrides unless the test is genuinely about all of the nested fields.
