---
title: Interpreting the result
prereqs: ["design-ux/ab-testing/01-designing-the-test"]
---

## What it is

Interpreting a test result means deciding whether the difference you measured is real, whether it is caused by your change, and whether it will persist. Significance is only the first of those three questions, and the least interesting.

## Why it matters

A test produces a number for every measure you recorded, which is why so many teams find a winner in every test and ship changes that do not help. Reading a result properly protects the decision: it separates a real effect from noise, a real effect from a novelty bump, and a segment's result from a sample too small to say anything.

## Core ideas

### Start with the primary measure and the brief

Open the brief first. Compare the pre-agreed primary measure and the pre-agreed threshold. Everything else on the report is diagnostic, and reading the diagnostics first is how a null result becomes a win.

```text
Brief said: completion, +2 percentage points, two weeks, revert below +0.
Result:     completion +0.4 points (not significant), time-on-task -12%
Reading:    primary failed. The speed gain is a hint for the next test,
            not a reason to keep the variant.
```

### Significance is the floor, not the goal

A result that clears its interval is unlikely to be noise; that is all. It does not say the effect is large or that it will hold. Report the interval, not just the point estimate.

### Suspect the novelty effect on visible changes

People click what is new. A change that wins in week one and drifts back to baseline by week three has measured curiosity. Look at the trend within the test, not only the total.

```text
Week 1  variant B +5.1%
Week 2  variant B +1.2%
Reading: a decaying effect is novelty until proven otherwise.
```

### Do not go looking for the winning segment

Testing five segments guarantees one will look significant by chance. Segments named in the brief are hypotheses; segments discovered afterwards are the start of the next test, not the conclusion of this one.

### Ship, revert, or test again — and write it down

A result with no decision wastes the traffic. Record the outcome where the team will find it: what was tested, the measure, the interval, the decision and the date.

## Practice

### Read one result against its brief

Take a finished test. Check the primary measure against the threshold, then check the interval, then plot the two weeks separately.

Done when: you can say whether the effect is real, whether it decayed, and what the pre-agreed decision is.

### Write the outcome record

Write half a page: the hypothesis, the measure and interval, the decision, the owner and the date. Store it where the next person can find it.

Done when: the record lets someone plan a follow-up test without opening the analytics tool.

## Common mistakes

- **Reading the report before the brief** — the best-looking secondary measure becomes the headline; fix: check the pre-agreed primary and threshold first.
- **Treating significance as a win** — a real but tiny effect is shipped as a success; fix: compare the interval against the size worth acting on.
- **Ignoring a decaying effect** — novelty is shipped as a durable improvement; fix: plot week by week and re-measure after a month.
- **Mining segments** — a post-hoc subgroup is reported as the finding; fix: treat discovered segments as the next hypothesis.
- **No recorded decision** — the same test is run again by another team next quarter; fix: publish a short outcome record with the owner and date.

## Go deeper

- **Designing the test** (`design-ux/ab-testing/01-designing-the-test`) — the brief this reading is checked against.
- **A/B Testing** (`design-ux/ab-testing`) — the track this chapter closes.
- **Lean UX** (`design-ux/lean-ux`) — turning the outcome into the next cycle's hypothesis.
- **User Research** (`design-ux/user-research`) — explaining why the variant won or lost.
