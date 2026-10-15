## Example 1 — An integration that only happens before release

A six-person team merges to trunk once a fortnight, the day before the release. The log below is one iteration's merges. Say what the integration interval is and rewrite the practice so the pipeline proves the build every day.

```text
Iteration 7, merges to trunk
  day 1    -
  day 3    feature/refunds   (4 days of work behind it)
  day 4    -
  ...
  day 10   feature/export    (6 days of work behind it)
  day 10   release cut; two integration failures found here
```

### Solution

```text
Longest gap  10 working days between merges
Change       commit to trunk at least daily, each behind the pipeline
Pipeline     tests run in under ten minutes; green trunk is the default
Review       changes small enough to review within an hour, same day
```

Merging daily makes a conflict visible the day it appears, while both authors still hold the context to fix it; the fortnightly merge hides it until release, when nobody can tell which change broke what. The thing that usually goes wrong is keeping the daily merge but letting changes grow — a branch that lives for four days integrates smoothly and then blocks two reviewers for a day. Keep the change small and the merge frequent, or the interval shrinks on paper only.

## Example 2 — The specification nobody maintains

A refund rule lives in a document written at kick-off and never edited. The team wants the rule to survive as a test and a one-line decision record. Produce both artefacts for the rule below.

```text
Requirement  gift cards cannot be refunded
Document     written at kick-off, last edited eleven months ago
Behaviour    changed twice since; document still states the old rule
```

### Solution

```text
Test     gift_card_refund_is_rejected
Record   reason = chargeback liability; a gift card has no card to
         refund to. Decided 2026-03-11.
```

The test states the behaviour in a form that fails the moment the rule stops being true, which is exactly what the stale document failed to do, and the record keeps the reason beside it. That is what a durable specification means: the acceptance test carries the behaviour, the decision record carries the why, and neither waits for someone to remember an edit. The trap is keeping the document as well and still treating it as the truth. Mark it obsolete the day the test lands.
