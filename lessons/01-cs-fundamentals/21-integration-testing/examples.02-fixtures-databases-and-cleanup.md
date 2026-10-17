## Example 1 — A global fixture every test is coupled to

The setup file inserts fifty customers so that whatever a test needs is already there. A new test changes one of them, and an unrelated test two files away starts failing. Show the fixture's real cost, then replace it.

```ts
// setup.ts — runs 1 time for the whole suite
beforeAll(async () => {
  for (let i = 0; i < 50; i++) await createCustomer({ id: i, tier: "basic" });
});
// 50 rows exist, and the test bodies between them mention 1 or 2 of them

// a test quietly mutates row 3
test("upgrades a customer", async () => {
  await upgrade(3);
  expect(await tierOf(3)).toBe("gold");
});
// the next test that reads row 3 now fails, and it names neither `upgrade` nor this file
```

### Solution

```ts
const customer = await createCustomer({ tier: "gold" });   // 1 row, created by this test

test("upgrades a customer", async () => {
  await upgrade(customer.id);
  expect(await tierOf(customer.id)).toBe("gold");
});

afterEach(async () => { await rollback(); });   // 1 unconditional hook resets the world
```

Fifty rows that no test body names couple every test to all fifty, so a change to any one of them can fail a test that never mentioned it, and the failure arrives 2 files away from the cause. The small factory inserts 1 row, plus the fields this case cares about, which keeps the data visible where it is used and keeps each test's blast radius to itself. The rule is not "less data" but "only this test's data", created in the test and removed afterwards whether it passed or failed. What usually goes wrong is deleting rows from the shared fixture by id, one at a time, as each coupling is discovered: the fixture stays shared, and the next test written against it reintroduces the same failure.

## Example 2 — Cleanup that only runs on the way out

A test inserts rows and then asserts. When the assertion fails, the rows survive, and the next run sees both its own data and the previous run's. Fix the teardown and the connection string beside it.

```ts
const db = await connect("postgres://admin@shared-db.internal/app");

test("creates an invoice", async () => {
  await db.insert("invoices", invoice);
  expect(await db.count("invoices")).toBe(1);
});
// run 1: 1 row      run 2: 2 rows, expected 1      run 3: 3 rows, expected 1
```

### Solution

```ts
const url = process.env.TEST_DATABASE_URL ?? "postgres://localhost/app_test";
const db = await connect(url);

beforeEach(async () => {
  await db.exec("drop schema public cascade; create schema public;");
});

// registered outside the assertion, so it runs on the failing run as well as the passing one
afterEach(async () => {
  await db.exec("drop schema public cascade; create schema public;");
});

test("creates an invoice", async () => {
  await db.insert("invoices", invoice);
  expect(await db.count("invoices")).toBe(1);
});
```

The count of 3 on the third run is not a fact about invoices at all: it is the number of times the suite has been run, which is why the red points at the test that inserts rather than at the test that broke. Cleanup has to be unconditional, because the failing test is the one that leaves state behind, and a teardown written after the assertion never runs on the run that mattered. Building the schema from scratch also applies the real migrations, so a broken migration fails here instead of during a release. What usually goes wrong is putting the connection string in the file: `admin@shared-db.internal` is 1 copy-paste away from writing to something that matters, and the safe target should be the default that the environment overrides.
