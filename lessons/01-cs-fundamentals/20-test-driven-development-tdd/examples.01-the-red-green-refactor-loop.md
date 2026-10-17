## Example 1 — A red that failed for the wrong reason

The test below was written before any discount code existed, then run, and the runner's output is reproduced as it appeared. Decide whether this red is a usable red, then reach a green the next test can push forward.

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
// 1 character corrected in the import path: "./discout" becomes "./discount"
import { discountFor } from "./discount";

// run again: FAIL  discountFor is not defined
// the expected red: the name has no definition yet, and this time the run reached the assertion

// green: the least code that passes the 1 test, with the rate written out
export function discountFor(customer) {
  return 0.05;   // 0.05 is 5 / 100, so five per cent, and it is the only case under test
}
```

A red from a missing module proves nothing about the discount rule: the suite failed to build, so no test ran and no behaviour was exercised. The usable red names the thing you are about to build — here, `discountFor`, taking a customer with `years: 5` and returning the rate 0.05 — so you know the assertion is wired to the code and can genuinely fail. Fixing one letter of the path costs a minute and buys the guarantee the whole loop rests on. What usually goes wrong is treating the first `FAIL` on the screen as a good enough red: the message `Cannot find module` is about the file layout, and it will say the same thing whatever the discount rule turns out to be.

## Example 2 — A unit that is hard to test

A signup service decides whether a trial has expired, and its test passes all afternoon and fails for whoever runs the suite after midnight. Say what the difficulty is telling you, then change the code rather than the assertion.

```ts
export class Trial {
  isExpired(signupAt: Date) {
    const days = (Date.now() - signupAt.getTime()) / 86400000;
    return days > 14;
  }
}

// FAIL on a run after midnight: expected false, received true
```

### Solution

```ts
export class Trial {
  // 1 extra input, supplied by the caller; the default keeps production on the real clock
  constructor(private readonly now: () => Date = () => new Date()) {}

  isExpired(signupAt: Date) {
    return (this.now().getTime() - signupAt.getTime()) / 86400000 > 14;
  }
}

test("expires after fourteen days", () => {
  // 86400000 is one day in milliseconds: 24 * 60 * 60 * 1000 = 86 400 000 ms
  const trial = new Trial(() => new Date("2026-03-20T00:00:00Z"));
  // the dates below are 15 days apart: 2026-03-05 to 2026-03-20
  // 15 * 86 400 000 = 1 296 000 000 ms, and 1 296 000 000 / 86 400 000 = 15 days
  // 15 > 14, so the trial has expired and the expected value is true
  expect(trial.isExpired(new Date("2026-03-05T00:00:00Z"))).toBe(true);
});
```

The test was never the problem: the unit reads the wall clock itself, which gives it 1 input the test cannot choose, so the assertion depends on the hour the suite happens to run. Making that input a constructor argument takes the class from 1 unchosen input to 2 chosen ones — the signup date and the current instant — and the reader can now see the dependency instead of inferring it from a method body. This is design pressure, and it is the largest practical benefit of testing first, because the class still has 1 caller when the change is made. What usually goes wrong is fixing it in the test by resetting the global clock, which leaves the hidden dependency in the class and hands the same flaky run to the next caller.
