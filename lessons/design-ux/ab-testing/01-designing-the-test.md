---
title: Designing the test
prereqs: []
---

## What it is

Designing a test means writing the hypothesis, choosing the single change, deciding the primary measure and the sample size, and agreeing the decision rule — all before the first visitor is assigned to a variant.

## Why it matters

Almost every unreadable test result was unreadable by design: two things changed at once, the measure was chosen after the fact, or the test stopped the moment it looked good. None of these are analysis problems; they are decisions made too late. An hour spent designing turns a month of traffic into a clear answer.

## Core ideas

### Write the hypothesis with a direction and a threshold

State what you believe will happen, to which measure, by how much, and by when. A hypothesis without a threshold can only be declared a winner in hindsight.

```text
We believe that making the phone number optional on the address step
will raise checkout completion, because new buyers abandon when asked
for a number they are still applying for.
Primary measure: checkout completion per visitor.
Threshold: at least a 2 percentage-point lift, or revert.
Duration: two full weeks, starting Monday.
```

### Change one thing

Two changes at once cannot tell you which one worked, and a null result is uninterpretable. If you must ship two ideas, test them in sequence or use a factorial design deliberately — not by accident.

### Decide the sample before you look

Work out roughly how many visitors per variant you need for the lift you care about, then let that set the duration. Traffic too thin for the smallest lift worth having is a signal to test something bigger or to test another way.

```text
Baseline 9.0%. Want to detect 2 points -> need roughly 3,500 per variant.
At 250 conversions a week split two ways, run two full weeks and stop.
```

### Randomise the right unit and keep it stable

Assign by visitor, not by page view, or a person can see both variants and contaminate both. Keep the assignment stable for the duration so returning users stay in their variant.

### Fix the guardrails alongside the primary

Decide up front what must not get worse: error rate, support contacts, page performance, revenue per visitor. A completion lift bought with a slower page is not a win.

## Practice

### Write a test brief

For one change you are about to ship, write the hypothesis, the single change, the primary measure, the guardrail, the required sample and the stop date on one page.

Done when: a colleague can read the brief and say what result would make you revert.

### Compute the sample before building

Take your baseline rate and the smallest lift you would act on. Work out the required sample per variant and the calendar duration that traffic implies.

Done when: your stop date is set from the arithmetic rather than from a sprint boundary, and you have written it down.

## Common mistakes

- **Two changes at once** — a winner cannot be attributed and a loser cannot be diagnosed; fix: one change per test, one test at a time on the same funnel.
- **Stopping when it looks good** — the earliest results are the noisiest and the winner regresses; fix: set the duration before launch and do not peek at the primary measure.
- **Choosing the measure afterwards** — several measures guarantee one will look significant; fix: name the primary measure in the brief.
- **Randomising by page view** — the same person sees both variants; fix: assign by visitor and keep the assignment stable.
- **No guardrail** — a local win ships with a hidden cost elsewhere; fix: name the measures that must not degrade before starting.

## Go deeper

- **A/B Testing** (`design-ux/ab-testing`) — the track this design step belongs to.
- **Interpreting the result** (`design-ux/ab-testing/02-interpreting-the-result`) — what the numbers mean once the test stops.
- **Quantitative UX Research** (`design-ux/quantitative-ux-research`) — defining the measures this test compares.
- **Lean UX** (`design-ux/lean-ux`) — fitting a test inside a short cycle and deciding what to do next.
