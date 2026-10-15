---
title: User Acceptance Testing
type: skill
topic: 04-product-process
tier: small
status: drafted
aliases: ["UAT"]
prereqs: ["04-product-process/05-requirements-engineering"]
related: []
---

## What it is

User acceptance testing is the client or the intended user confirming that the built thing meets the need that was agreed. It is a check against the agreed requirements, run by the people who asked for the work, with a clear pass or fail per item.

## Why it matters

It is the last cheap place to catch a misunderstanding between what was specified and what the requester meant — while the team still has the context to fix it and before the release makes the wrong behaviour a habit. It also transfers ownership: a signed-off increment is the requester's, and the conversation about what it should have been happens before delivery rather than after. The failure mode deserves saying plainly: when acceptance criteria are vague, UAT becomes a second round of requirements written by the client as they use the system, on the team's time, after the schedule has been committed.

## Core ideas

### Test against the agreed criteria, not against the client's mood

Each item is a check that either passes or fails. Run them from the requirements that were signed, not from a fresh reading of the built system.

```text
REQ-PAY-014  refunds must not exceed the original payment amount
  Check      refund €120 on a €100 payment -> rejected, error shown
  Result     pass
REQ-PAY-020  refund status visible to the customer within 5 minutes
  Check      refund, wait, reload the order page
  Result     fail — status appeared after 22 minutes
```

A single ambiguous sentence at this point costs a round of rework and a schedule conversation.

### Write the scripts before the build finishes

Acceptance scripts are derived from the requirements, so they can exist while the code is still being written. Written early, they also catch specification gaps while the team is still in the work.

### The requester runs it, the team observes

The client performs the steps; the team watches and records. If the team drives the session, they will unconsciously avoid the steps that fail.

### Separate failed checks from new requests

The commonest failure of UAT is scope creep dressed as a defect. Anything not traceable to an agreed requirement is a new request with its own priority, written down and dated, not fixed on the spot.

```text
Failed check  status not visible within 5 minutes      -> defect, fix now
New request   "can it also email the customer?"        -> new item, backlog
```

### A sign-off is a record, not a ceremony

Name what passed, what failed and what was deferred, with a date. That record is what the next phase is planned against.

## Practice

### Write acceptance scripts from the requirements

Take five agreed requirements and write a scripted check for each, including at least one failure case from each.

Done when: someone who did not write the requirements can run the scripts and reach a verdict without consulting the author.

### Run one acceptance session and classify the findings

Have the requester run the scripts and record every outcome as passed, failed or new request.

Done when: every failed check names the requirement it failed, and every new request is in the backlog with a date rather than being fixed in the session.

## Common mistakes

- **Vague acceptance criteria** — UAT becomes undisciplined requirements gathering after the build; fix: test against the criteria agreed before the work started.
- **The team driving the session** — the failing steps are skipped; fix: the requester performs the steps.
- **New requests treated as defects** — the schedule absorbs scope nobody agreed; fix: classify them separately and put them in the backlog.
- **Scripts written after the build** — specification gaps are discovered too late to fix cheaply; fix: write them while the code is still being written.
- **No written sign-off** — nobody can say what was accepted or deferred; fix: record what passed, failed and was deferred, with a date.

## Go deeper

- **Requirements Engineering** (`04-product-process/05-requirements-engineering`) — read this first; there is nothing to accept without agreed, testable requirements.
- **Reviewing and tracing requirements** (`04-product-process/05-requirements-engineering/02-reviewing-and-tracing-requirements`) — the trace that makes each check traceable to a requirement.
- **Usability Testing** (`03-design-ux/33-usability-testing`) — a different activity: watching real users attempt tasks, not confirming a contract.
- **Stakeholder Management** (`04-product-process/07-stakeholder-management`) — the people whose confirmation this sign-off records.
