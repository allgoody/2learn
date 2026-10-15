---
title: Testing a solution cheaply
prereqs: ["product-process/product-discovery/01-finding-a-problem-worth-solving"]
---

## What it is

Testing a solution cheaply means building the least finished thing that can tell you whether the approach works, then deciding from the result. In discovery the artefact is often not software: a landing page, a concierge service run by hand, a prototype, a change to an existing screen.

## Why it matters

The expensive failure is a solution that was never wrong in principle but was over-built before anyone checked. Concierge and prototype tests cost days and answer the same question as a release, provided the question is stated first. The discipline also protects against the opposite mistake — testing something so unlike the real product that a positive result means nothing.

## Core ideas

### Name the riskiest assumption, then test only that

A solution has several assumptions: that people want it, that they can use it, that it does not break a legal constraint, that it is affordable. Pick the one most likely to be wrong and most expensive if it is.

```text
Assumption   repeat buyers will accept storing card details
Alternative  they want to avoid re-typing, and any means will do
Test         offer to remember details for the next purchase (no storage)
             -> if it converts, storage was never the point
```

That test costs a week and can remove a quarter of work.

### Concierge before automation

Do the job by hand for the first customers. If nobody wants it done by hand, nobody wants it automated, and if they do, the manual run teaches you what the automation must do.

### Prefer behaviour to opinion

A click, a payment or a booked call is evidence; "I would use that" is not. Where the only available signal is opinion, treat it as weak and say so.

### Define the decision rule with the test

Write the threshold and the resulting action together. A test without a pre-agreed decision becomes a discussion about whether the result was good.

### Timebox, and keep the result either way

A fortnight, then decide. A negative result recorded properly saves the next team the same fortnight, and it is the cheaper half of the learning.

## Practice

### Test one assumption this week

Write the assumption, the cheapest test that would falsify it, the threshold and the decision. Run the test.

Done when: the result is in, the decision has been made, and both are written in one paragraph.

### Run a concierge test

Offer the outcome to three real users and deliver it by hand, then write down every manual step you would have to automate.

Done when: three users have received the outcome and you can list the steps the automation must cover.

## Common mistakes

- **Testing the easiest assumption** — the result is pleasant and uninformative; fix: test the riskiest one.
- **Opinion collected instead of behaviour** — the evidence cannot support a decision; fix: make the test require an action.
- **No decision rule agreed** — the outcome is debated rather than acted on; fix: write the threshold and the action before running.
- **A test unlike the real thing** — a positive result means nothing; fix: keep the test cheap but faithful in the one dimension that matters.
- **Negative results discarded** — the next team repeats the fortnight; fix: record what was tested and what happened.

## Go deeper

- **Finding a problem worth solving** (`product-process/product-discovery/01-finding-a-problem-worth-solving`) — the sized problem this test answers for.
- **Product Discovery** (`product-process/product-discovery`) — the track this chapter closes.
- **Lean UX** (`design-ux/lean-ux`) — turning the result into the next cycle's hypothesis.
- **Prototyping** (`design-ux/prototyping`) — choosing the fidelity of a prototype test.
