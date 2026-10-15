---
title: Reviewing and tracing requirements
prereqs: ["04-product-process/05-requirements-engineering/01-specifying-behaviour-testably"]
---

## What it is

A requirements review is a structured read of the document by the people who will build, test and use the system, looking for ambiguity, gaps and contradictions. Tracing is the link from each requirement to the test that verifies it and, later, to the code and the change that implements it.

## Why it matters

Defects in a specification are the cheapest to fix and the hardest to see, because they live in what is not there: the case nobody considered, the two requirements that contradict each other, the number that changed in one section and not another. Reviewing deliberately finds them; tracing proves that nothing was dropped between the agreement and the release. Where a contract or a regulator is involved, tracing is also the evidence that what was agreed is what was delivered.

## Core ideas

### Review for the four defect types, in order

Missing, ambiguous, contradictory and untestable. Reviewers who are asked for "comments" produce style notes; reviewers given the four categories produce defects.

```text
Missing       no requirement covers what happens when the batch fails
Ambiguous     "reasonable time" appears in three places, undefined
Contradictory section 4 requires email confirmation, section 7 forbids it
Untestable    "the system must be reliable under load"
```

### Use a checklist, and keep it short

A dozen questions asked of every requirement is enough: is the actor named, is the trigger stated, is there a number where a qualifier appears, is the failure case covered, is it traced to a test?

### Give each requirement a stable identifier

An id that never changes, so a later discussion can refer to it. Numbers that shift when sections are reordered make the trace worthless within a week.

```text
REQ-PAY-014  refunds must not exceed the original payment amount
  test     refund_of_more_than_paid_is_rejected
  code     payment/refund.ts:88
  change   PR-2311
```

### Trace forward and backward before release

Forward: every requirement has a test. Backward: every test traces to a requirement, so nothing was built that nobody asked for and nothing was asked for that nobody built.

### Re-baseline deliberately when requirements change

Count and date the changes. A document that changes silently is worse than one that is out of date, because everyone believes it.

## Practice

### Run a structured review on one section

Take one section and have three people review it against the four defect categories, then merge and classify the findings.

Done when: every finding is labelled as missing, ambiguous, contradictory or untestable, and the untestable ones have been rewritten.

### Build a trace table for one feature

For one feature, list every requirement with its test and its change.

Done when: no requirement is without a test and no test is without a requirement, or the gaps are recorded with an owner.

## Common mistakes

- **Asking for general comments** — the review produces typo corrections; fix: review against named defect categories.
- **Reviewing alone** — the author reads what they meant; fix: include at least one person who has not seen the document.
- **Renumbering requirements** — traces break within days; fix: assign stable identifiers that never change.
- **Tracing forward only** — work nobody asked for stays invisible; fix: trace backward from tests as well.
- **Silent changes** — everyone trusts a document that no longer matches the agreement; fix: version and date every change.

## Go deeper

- **Specifying behaviour testably** (`04-product-process/05-requirements-engineering/01-specifying-behaviour-testably`) — the writing standard this review enforces.
- **Requirements Engineering** (`04-product-process/05-requirements-engineering`) — the track this chapter closes.
- **User Acceptance Testing** (`04-product-process/16-user-acceptance-testing`) — the trace's final checkpoint.
- **Technical Writing** (`04-product-process/08-technical-writing`) — structure and editing for the document itself.
