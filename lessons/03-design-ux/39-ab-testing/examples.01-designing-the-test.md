## Example 1 — Turning a request into a test brief

A colleague asks for two changes at once on the product page. Write the brief that can actually be read after the test: the belief, the single change, the primary measure and the threshold.

```text
Request, as written in the message
"Try a bigger buy button and shorter copy on the product page.
 It should feel more urgent."
```

### Solution

```text
We believe that moving the price next to the buy button will raise
add-to-cart, because buyers currently hunt for the price.
Change: one — the price moves. Button size and copy stay as they are.
Primary measure: add-to-cart per visitor.
Threshold: +2 percentage points, or revert.
Duration: two full weeks, starting Monday.
```

The brief names one change, so a lift can be attributed and a flat result can be diagnosed; the threshold is written before launch, so the outcome cannot be read backwards into a success. The usual mistake is testing both ideas together, which produces a number nobody can act on and hides which change did the work.

## Example 2 — Setting the sample and the assignment rule

The brief is agreed; the change has not been built yet. Work out how long the test must run, then write the rule for who sees which variant.

```text
Traffic and baseline (illustrative)
Baseline add-to-cart:          4.0% per visitor
Smallest lift worth acting on: 1.0 point
Traffic:                       3,000 visitors a day
```

### Solution

```text
Sample needed per variant: about 6,000 visitors
Split two ways at 3,000 a day: two full weeks, stop at the end of day 14

Assignment rule
unit:       visitor id, hashed on the first visit
stable:     a returning visitor keeps the variant first seen
stop date:  set from the arithmetic above, not from a sprint boundary
```

Deriving the stop date from the lift worth having keeps the duration honest, and assigning by visitor stops one person meeting both variants and contaminating both. The usual mistake is launching on the traffic you have and checking the primary measure daily, which ends the test on its noisiest day.
