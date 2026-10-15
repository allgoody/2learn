## Example 1 — A UAT table that mixes defects and wishes

A requester ran an acceptance session against the agreed requirements. The notes below blur failed checks and new ideas. Rewrite the record so every failed check names its requirement and every new idea is classified separately.

```text
Session notes
  refund worked fine
  the status took ages to show, like 20+ minutes
  can it also email the customer?
  gift card refund was blocked, good
  would be nicer if the buttons were green
```

### Solution

```text
REQ-PAY-014  refunds must not exceed the original payment amount
  Check   refund a gift-card payment -> rejected, error shown
  Result  pass
REQ-PAY-020  refund status visible to the customer within 5 minutes
  Check   refund, wait, reload the order page
  Result  fail - status appeared after 22 minutes
New request  email the customer on refund -> backlog item, dated
New request  green buttons -> rejected as out of scope, dated
```

Testing against the agreed criteria rather than the requester's mood turns "took ages" into a specific failure with a requirement number, which is what the team can act on and trace. Classifying the email idea as a new request keeps it out of the defect count and off the schedule, where the commonest UAT failure — scope creep dressed as a defect — would otherwise hide. The trap is fixing the new request on the spot; it then has no priority and no agreed owner.

## Example 2 — A sign-off with nothing written down

The team ran the session, closed the tickets and told the requester it was accepted, but nothing records what happened. The notes are below. Produce the written sign-off, and say when the scripts should have been written.

```text
Session
  5 requirements run, requester performed the steps
  4 passed; 1 failed (status too slow); 2 new ideas raised
  team said "looks good, we'll deploy"
```

### Solution

```text
Sign-off  date 2026-08-14
  Passed     REQ-PAY-014, REQ-PAY-017, REQ-PAY-019, REQ-PAY-021
  Failed     REQ-PAY-020 (status after 22 minutes) - fix then re-test
  Deferred   none
  New        email on refund; green buttons - both in backlog, dated
```

The sign-off is a record the next phase is planned against: it names what passed, what failed and what was deferred, with a date, so nobody has to remember the session. The scripts behind it should have existed before the build finished, because derived from the requirements they can catch a specification gap while the code is still being written rather than after the schedule is committed. The trap is the requester never running the steps — if the team drives, the failing steps are skipped unconsciously.
