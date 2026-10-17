## Example 1 — A sleep standing in for an unknown amount of work

An end-to-end test pauses for 3 s after saving, then asserts on the confirmation. It passes on a laptop and fails in the pipeline. Say what the delay is guessing at, then replace it and state what the replacement costs on each machine.

```ts
await page.getByRole("button", { name: "Save" }).click();
await page.waitForTimeout(3000);                       // a guess: 3 s, done or not
await expect(page.getByText("Saved")).toBeVisible();
// quiet laptop: the write takes 0.4 s -> passes, 3 - 0.4 = 2.6 s wasted
// pipeline:     the write takes 3.2 s -> fails, because 3 s < 3.2 s
```

### Solution

```ts
await page.getByRole("button", { name: "Save" }).click();
await expect(page.getByText("Saved")).toBeVisible({ timeout: 15_000 });
// returns at 0.4 s on the quiet machine and at 3.2 s on the loaded one
// fails at 15 s, naming "Saved" as missing, only if the state never arrives
```

A fixed sleep is a guess at how long work takes, and it fails on exactly the slower machines where the result matters. Waiting for the condition is faster as well as more reliable: it spends 0.4 s on the quiet run instead of 3 s, spends 3.2 s on the loaded run rather than failing, and reports what was missing when the state never appears. Modern browser tooling waits automatically for its own actions, but any state your application produces still needs an explicit assertion to wait on. The usual mistake is to read "it works locally" as proof the sleep is correct — the machine it breaks on is the one you never test on.

## Example 2 — A run that depends on the previous run's data

Tests sign in as a user seeded once in the shared test environment. Run 4 of them in parallel and 3 read a display name another has just changed, and when a retry covers the failure it saves no evidence either. Make the suite independent and its failures diagnosable.

```text
seed:  test-user@example.test / password            one row shared by every run
test A: renames the display name to "Ada"
tests B, C, D: assert the display name is "Test User"   -> 3 failures, all caused by A
on failure: retry -> green on the second attempt -> nothing saved
```

### Solution

```text
run id: e2e-20260301-7f3a
every account this run creates carries the id:  test-user+e2e-20260301-7f3a@example.test
  -> 4 parallel tests, 4 accounts, 0 collisions
on every failure: screenshot + trace + server log, uploaded under the run id
  -> the retry no longer erases the evidence
```

Data unique to the run is what makes two runs independent, whether they execute in parallel or in any order, and the run identifier makes cleanup one prefix match and a failure easier to trace. The retry is the second half of the problem: a test that needs one twice a week is 2 * 52 = 104 unexplained failures a year, and capturing a screenshot, a trace and the server log on every failure turns each of those 104 into something diagnosed in about 10 minutes rather than reproduced over roughly 4 hours. The usual mistake is to fix only the seed and leave the retry: the suite then goes green while the race is still there, unseen.
