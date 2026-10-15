## Example 1 — Review against the four defect types

A section of the refund specification comes back with "looks fine, a couple of typos" against it. Run the structured review instead: read each line for missing, ambiguous, contradictory and untestable defects, and label every finding.

```text
REQ-REF-01  Refunds are processed quickly.
REQ-REF-02  A refund must not exceed the original payment.
REQ-REF-03  Refund confirmations are sent by email.
REQ-REF-04  Refund confirmations are sent by post only.
REQ-REF-05  The refund process is reliable under load.
```

### Solution

```text
REQ-REF-01  ambiguous     "quickly" has no duration — give a number
REQ-REF-02  passes        testable as written
REQ-REF-03  contradictory clashes with REF-04 — pick one channel
REQ-REF-04  contradictory name the exception where post is used
REQ-REF-05  untestable    state a load figure and the failure behaviour
Missing     no requirement covers the provider refusing a refund
```

Asking for named defect categories produced defects; asking for "comments" produces typo notes. The missing case is the most valuable finding and only appears because missing is on the checklist. The usual mistake is reviewing alone: the author reads what they meant and passes REQ-REF-01 as obvious.

## Example 2 — Trace forward and backward before release

Before the release, build the trace table for the refund feature and read it in both directions — every requirement has a test, and every test traces to a requirement. Two gaps are hiding in the list below.

```text
Requirements   Tests                      Code
REQ-REF-01     refund_within_90_days      payment/refund.ts
REQ-REF-02                                payment/refund.ts
REQ-REF-03     refund_email_sent          notify/email.ts
REQ-REF-04     refund_post_only           notify/post.ts
               refund_recalc_totals       payment/recalc.ts
```

### Solution

```text
REQ-REF-01  refund_within_90_days   payment/refund.ts:41
REQ-REF-02  GAP — no test           payment/refund.ts:88
REQ-REF-03  refund_email_sent       notify/email.ts:12
REQ-REF-04  refund_post_only        notify/post.ts:7

refund_recalc_totals  GAP — traces to no requirement

REQ-REF-02's test is written before release; the recalculation is
either given a requirement or removed from scope.
```

Forward tracing catches the untested requirement; backward tracing catches the recalculation that nobody asked for. Stable identifiers such as REQ-REF-02 are what make the table survive a section being reordered. The usual mistake is renumbering requirements on every edit, after which the trace is worthless within a week.
