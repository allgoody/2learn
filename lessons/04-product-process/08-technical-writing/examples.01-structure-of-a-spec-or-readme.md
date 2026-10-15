## Example 1 — Rewrite a README's first screen

A small tool's README opens with the history of the project. Rewrite the first screen so the what, the why and the run instruction all appear before any scrolling, and move the reference material into a table.

```text
# Order Exporter

The finance team has had a nightly export for some years. It has been
reworked twice. This document describes the current implementation and
the decisions behind it. The team also maintains other tools, and a full
history can be found below...

(installation and configuration follow, three screens down)
```

### Solution

```text
# Order Exporter
Copies orders to a CSV for the finance nightly job. Runs on a schedule.
Owner: Priya, support platform. Written September 2026.

Run it locally
  ...
Configuration    variable | meaning | default
Common failures  symptom | cause | fix
Design notes     why it is shaped this way
```

The what and the why are the first two sentences, a reader knows who to ask and when it was written, and everything looked up sits in a table. The usual mistake is leading with the context the author had rather than the orientation the reader needs.

## Example 2 — State the answer in the heading, and bound the scope

The refund specification uses topic headings, so a scanning reader cannot tell what any section concludes, and nothing says what the work does not cover. Fix both.

```text
Heading ideas for the specification
  Considerations
  Refund mechanics
  Open questions
```

### Solution

```text
# Refund Specification
Owner: PM. Written September 2026.
Problem: refunds take 1.5 days; 6% are re-issued incorrectly.

Use the ledger as the record of truth      (was: Considerations)
Requirements   REQ-REF-01 ... one testable line each
Out of scope   multi-currency, partial refunds, gift-card refunds
Constraints    the existing ledger stays the record of truth
Open questions who owns the reconciliation report?
```

The heading now states the section's conclusion, so a reader who only scans finds the decision; the out-of-scope list prevents more argument than any other section. The usual mistake is a heading that names a topic — "Considerations" tells the reader nothing about what it decided.
