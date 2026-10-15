## Example 1 — A global fixture every test is coupled to

The setup file inserts fifty customers so that anything a test needs is already there. A new test changes one of them and another test starts failing. Show the fixture's real cost, then replace it.

```ts
// setup.ts — runs once for the whole suite
beforeAll(async () => {
  for (let i = 0; i < 50; i++) await createCustomer({ id: i, tier: "basic" });
});

// a test quietly mutates row 3
test("upgrades a customer", async () => {
  await upgrade(3);
  expect(await tierOf(3)).toBe("gold");
});
// a later, unrelated test reads row 3 and now fails
```

### Solution

```ts
const customer = await createCustomer({ tier: "gold" });   // only what this case needs

test("upgrades a customer", async () => {
  await upgrade(customer.id);
  expect(await tierOf(customer.id)).toBe("gold");
});

// teardown is unconditional, so the next test starts from the same place
afterEach(async () => { await rollback(); });
```

Fifty rows that no test body mentions couple every test to all of them, and the failure appears somewhere other than the change that caused it. A small factory that inserts one row with sensible defaults, plus the fields the case cares about, keeps the data visible where it is used and the blast radius of any test to itself. The rule is not "less data" but "only this test's data", created in the test and removed afterwards whether it passed or failed.

## Example 2 — Cleanup that only runs on the way out

A test inserts rows, then asserts. When the assertion fails the rows survive, and the next run sees the previous run's data. Fix the teardown, and the connection string beside it.

```ts
const db = await connect("postgres://admin@shared-db.internal/app");

test("creates an invoice", async () => {
  await db.insert("invoices", invoice);
  expect(await db.count("invoices")).toBe(1);   // FAIL: it is 3 by day three
});
```

### Solution

```ts
const url = process.env.TEST_DATABASE_URL ?? "postgres://localhost/app_test";
const db = await connect(url);

beforeEach(async () => { await db.exec("drop schema public cascade; create schema public;"); });
afterEach(async () => { await db.exec("drop schema public cascade; create schema public;"); });

test("creates an invoice", async () => {
  await db.insert("invoices", invoice);
  expect(await db.count("invoices")).toBe(1);
});
```

Cleanup has to be unconditional, because the failing test is precisely the one that leaves state behind — a teardown written after the assertion never runs on the run that mattered. Building the schema from scratch each time also exercises the real migrations, so a broken migration fails here rather than during a release. And the connection string belongs in configuration with a safe local default: a hard-coded shared host is one copy-paste away from writing to something that matters.
