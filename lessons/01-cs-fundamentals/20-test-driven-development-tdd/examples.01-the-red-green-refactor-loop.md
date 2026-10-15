## Example 1 — A red that failed for the wrong reason

The test below was written first, then run. The output is shown as the runner printed it. Decide whether this red is a usable red, then get to a green.

```text
FAIL  tests/discount.test.ts
  ● Test suite failed to run
    Cannot find module './discout' from 'tests/discount.test.ts'

test("applies five percent after five years", () => {
  expect(discountFor(customerWith({ years: 5 }))).toBe(0.05);
});
```

### Solution

```ts
// fixed import; now the failure is the one we wanted
import { discountFor } from "./discount";
// FAIL  discountFor is not defined            <- the expected red

// green: the simplest thing that passes
export function discountFor(customer) {
  return 0.05;   // one case only; the next test demands the rule
}
```

A red caused by a missing module proves nothing about the behaviour — it only proves the file was imported. The usable red names the thing you are about to build, so you know the assertion is wired to the code and can genuinely fail. Fixing the import first costs a minute and buys the one guarantee the whole loop rests on: this test has been seen to fail for the right reason, and it will fail again if the behaviour regresses.

## Example 2 — A unit that is hard to test

A signup service decides whether a trial has expired. Its test keeps failing depending on the hour it runs. Say what the difficulty is telling you, then change the code rather than the assertion.

```ts
export class Trial {
  isExpired(signupAt: Date) {
    const days = (Date.now() - signupAt.getTime()) / 86400000;
    return days > 14;
  }
}

// FAIL on some runs: expected false, received true
```

### Solution

```ts
export class Trial {
  constructor(private readonly now: () => Date = () => new Date()) {}

  isExpired(signupAt: Date) {
    const days = (this.now().getTime() - signupAt.getTime()) / 86400000;
    return days > 14;
  }
}

test("expires after fourteen days", () => {
  const trial = new Trial(() => new Date("2026-03-20T00:00:00Z"));
  expect(trial.isExpired(new Date("2026-03-05T00:00:00Z"))).toBe(true);
});
```

The test was not the problem: the unit reaches for the wall clock, which makes it impossible to pin down. That is design pressure, and it is the largest practical benefit of testing first. Injecting the clock fixes the test and improves the class — the dependency is now visible in the constructor instead of hidden inside a method. Refactor this while the suite is green, never while it is red.
