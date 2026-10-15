## Example 1 — A fake that returned rows in a different order

The unit test passes against an in-memory substitute. The same flow, run against the real engine, fails. Explain which assumption the fake invented, then fix the code.

```ts
// fake: returns rows in insertion order, so this passes
test("lists orders newest first", async () => {
  const fake = { find: async () => [older, newer] };
  expect(await listOrders(fake)).toEqual([newer, older]);
});

// real engine: FAIL   expected [newer, older], received [older, newer]
// the query has no ORDER BY; the database is free to return any order
```

### Solution

```ts
// assert at the seam: what the real store returned
test("lists orders newest first", async () => {
  const db = await freshDatabase();          // real engine, own schema
  await db.insert("orders", [older, newer]);
  expect(await listOrders(db)).toEqual([newer, older]);
});

// the query now says what the test assumed
const rows = await db.query("select * from orders order by created_at desc");
```

The in-memory list preserved insertion order because a JavaScript array does; a relational store promises nothing without `ORDER BY`. That is exactly the class of assumption a real boundary exists to catch, and it cannot be caught from inside a fake that shares your misconception. The fix belongs in the query, not the test: the test stated the contract the caller needs, and the code did not meet it.

## Example 2 — A test that depends on the wall clock

A signup service is tested through its repository. The assertion passes all afternoon and fails for whoever runs the suite after midnight. Say what is nondeterministic, then make the test stable.

```ts
test("counts signups in the last 24 hours", async () => {
  const repo = await freshDatabase();
  const stats = new SignupStats(repo);
  await stats.record("a@example.test");
  expect(await stats.recentCount()).toBe(1);
});

// FAIL after midnight: expected 1, received 0
```

### Solution

```ts
const now = new Date("2026-03-01T12:00:00Z");
const repo = await freshDatabase();
const stats = new SignupStats(repo, { now: () => now });
await stats.recordAt("a@example.test", now);
expect(await stats.recentCount()).toBe(1);

// production passes nothing and gets the real clock
new SignupStats(repo);
```

Real infrastructure exposes every clock read in the code, and here the read is hidden inside the service. Injecting it makes the assertion depend on a fixed instant instead of the hour the suite happens to run, which is the same discipline as sorting rows before comparing them. A test that fails only on certain days teaches the team to re-run rather than investigate, and a distrusted suite is worth less than the one nobody wrote.
