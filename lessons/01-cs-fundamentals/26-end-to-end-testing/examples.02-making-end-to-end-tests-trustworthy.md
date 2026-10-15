## Example 1 — A sleep standing in for an unknown amount of work

An end-to-end test pauses after saving, then asserts. It passes on a laptop and fails in the pipeline. Say what the delay is actually guessing at, then replace it.

```ts
await page.getByRole("button", { name: "Save" }).click();
await page.waitForTimeout(3000);                       // gamble on a fast machine
await expect(page.getByText("Saved")).toBeVisible();
// pipeline: FAIL — sometimes the write takes 3.2s
```

### Solution

```ts
await page.getByRole("button", { name: "Save" }).click();
await expect(page.getByText("Saved")).toBeVisible({ timeout: 15_000 });
// passes as soon as the state arrives; fails clearly when it never does
```

A fixed sleep is a guess at how long work takes, and it fails on exactly the slower machines where the result matters. Waiting for the condition is both faster and more reliable: it returns the moment the state appears instead of always burning the delay, and when the state never arrives it fails with a message that names what was missing. Modern browser tooling waits automatically for its own actions, but any state your application produces still needs an explicit assertion to wait on — a sleep is usually a sign that one is absent.

## Example 2 — A run that depends on the previous run's data

Tests sign in as a user seeded once in the shared test environment. In parallel they collide, and a retry hides the failure without keeping any evidence. Make the suite independent and its failures diagnosable.

```text
seed: test-user@example.test / password
test A: changes the display name to "Ada"
test B: asserts the display name is "Test User"     -> fails when run with A
retry: on failure, run again -> green -> nothing saved
```

### Solution

```text
run id: e2e-20260301-7f3a
every account this run creates contains the run id
on failure: screenshot + trace + server log, uploaded with the run id
```

Data unique to the run is what makes two runs independent, whether they execute in parallel or in any order, and the run identifier makes cleanup cheap and a failure easier to trace. The retry is the second half of the problem: a test that needs one twice a week has an unidentified race, so capture the evidence on every failure, retried or not. Treating the retry rate as an error metric — and the flakiest test as a bug to fix rather than a nuisance to quarantine — is what stops a suite's green from becoming a colour nobody believes.
