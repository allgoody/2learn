## Example 1 — A fake that returned rows in a different order

The unit test passes against an in-memory substitute, and the same flow run against the real engine fails. Say which assumption the fake invented, then fix the code rather than the assertion.

```ts
// the fake is a JavaScript array, so it returns rows in insertion order and this passes
test("lists orders newest first", async () => {
  const fake = { find: async () => [older, newer] };
  expect(await listOrders(fake)).toEqual([newer, older]);
});

// real engine: FAIL   expected [newer, older], received [older, newer]
// the query has no ORDER BY, so with 2 rows there are 2! = 2 * 1 = 2 possible orders
// and the engine is free to hand back either one
```

### Solution

```ts
test("lists orders newest first", async () => {
  const db = await freshDatabase();              // the real engine, an empty schema of its own
  await db.insert("orders", [older, newer]);     // 2 rows, inserted in that order
  expect(await listOrders(db)).toEqual([newer, older]);
});

// the query now states the order the assertion assumes
const rows = await db.query("select * from orders order by created_at desc");
// `order by` collapses the 2 possible orders to 1, and the assertion has 1 to check
```

A JavaScript array keeps what you pushed, and a relational store promises nothing without `ORDER BY`, so the fake held an assumption the real dependency never made — the exact class of assumption a real boundary exists to expose. It cannot be caught from inside a fake, because the fake was written from the same misunderstanding as the code. The fix belongs in the query, not the test: the test stated the contract the caller needs, and the code did not meet it. What usually goes wrong is relaxing the assertion to a set comparison so the red goes away, which removes the only check that the caller's ordering requirement is met at all.

## Example 2 — A test that depends on the wall clock

A signup service is tested through its repository. The assertion passes all afternoon and fails for whoever runs the suite after midnight. Say what is nondeterministic, then make the test stable without weakening it.

```ts
test("counts signups in the last 24 hours", async () => {
  const repo = await freshDatabase();
  const stats = new SignupStats(repo);
  await stats.record("a@example.test");
  expect(await stats.recentCount()).toBe(1);
});

// FAIL after midnight: expected 1, received 0
// the count queries `created_at >= current_date`, which is midnight of the day it runs
```

### Solution

```ts
const now = new Date("2026-03-01T12:00:00Z");    // the 1 instant every reading is taken from
const repo = await freshDatabase();
const stats = new SignupStats(repo, { now: () => now });

await stats.recordAt("a@example.test", now);     // the row is stamped with that same instant
expect(await stats.recentCount()).toBe(1);

// production passes no clock and gets the real one, so the default behaviour is unchanged
new SignupStats(repo);
```

The test writes a row at whatever o'clock the suite runs and then asks how many rows fall on or after midnight. A row written at 23:59 and counted at 00:10 is 11 minutes old: 11 * 60 * 1000 = 660 000 ms, well inside a rolling day of 24 * 60 * 60 * 1000 = 86 400 000 ms, and still before the current date, so the count returns 0. Two readings of the clock decide the result, and the test controls neither. Injecting one fixed instant makes the write and the count agree, which is the same discipline as adding `ORDER BY` before comparing rows. What usually goes wrong is freezing the clock in the test while the query keeps calling `current_date`: the application's clock and the database's clock then disagree, and the green run proves something about the test rather than about the code.
