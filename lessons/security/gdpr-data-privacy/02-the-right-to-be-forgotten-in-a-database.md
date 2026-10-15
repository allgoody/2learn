---
title: The right to be forgotten, in a database
prereqs: ["security/gdpr-data-privacy/01-lawful-basis-consent-and-retention"]
---

## What it is

An erasure request means locating everything a system holds about one person and removing or anonymising it, without corrupting the records the organisation is still obliged to keep. In practice it is a schema problem: you need a way to find every row belonging to a person, and a way to remove the personal fields while leaving the aggregated or legally required ones intact.

## Why it matters

Systems are rarely built with a single handle on a person. The user id appears in some tables, an email address in others, an IP address in logs and a device identifier in analytics, and the joins are not always recorded anywhere. The result is an erasure request that becomes a week of forensic work, done while the clock is running. Designing for it costs one identifier and a deletion routine; retrofitting it is the expensive version of the same work.

## Core ideas

### Keep one identifier that reaches everything

A stable subject identifier, propagated to every store that holds personal data, including the copies that are easy to forget: queues, search indexes, analytics exports, cached pages and the data warehouse.

```text
users.id            the subject identifier
orders.user_id      reference it, never copy the email
events.subject_id   same identifier in analytics
logs.subject_id     structured logging carries it alongside the IP
```

Copying an email or a name into a second table creates a second thing to find and delete, and the copy is usually the one that gets forgotten.

### Decide per field: delete, anonymise or keep

Erasure does not mean deleting the order. The order is needed for accounting; the personal fields inside it are not. Replace them with a tombstone and keep the aggregate.

```text
delete      the profile row, the email, the phone number, the address
anonymise   the order's customer reference -> "erased-<hash>"
keep        the order total, the date, the line items (legal retention)
```

### Separate the identifier from the person

A hash of the user id lets you keep a link for analytics without keeping personal data, provided the mapping is not held elsewhere. This is a design decision that has to be made when the schema is written, not after a request arrives.

### Plan for the immutable copies

Backups, append-only logs and event streams cannot be edited in place. The usual approach is to make erasure effective at restore time — keep the tombstone list and apply it after restoring — and to bound how long the copies live.

### Prove it once, then repeat it

Write the erasure routine as a script with a test, so the answer to the second request is an execution rather than a project.

## Practice

### Map one person across the system

Take a test account and find every store that holds data about it: primary database, logs, analytics, queue, search index, backups.

Done when: you have a written list naming the store and the field for each, and you know which ones cannot be edited.

### Write and test the erasure routine

Implement a script that takes one identifier and performs the delete, anonymise and keep decisions, then run it against the test account.

Done when: re-running your mapping finds no personal data except the rows you deliberately kept, and the routine is repeatable.

## Common mistakes

- **One request handled by hand** — the second request starts the forensic work again; fix: write and test a routine.
- **Deleting the order as well as the person** — records needed for accounting or dispute resolution are lost; fix: anonymise the reference and keep the transaction.
- **Missing the copies** — logs, queues, search and the warehouse retain the data; fix: propagate one identifier to every store and include them in the routine.
- **Forgetting immutable backups** — the data returns after a restore; fix: apply the tombstone list at restore time and bound retention.
- **No proof of erasure** — nobody can demonstrate the request was honoured; fix: record the run, the identifier and what was deleted or anonymised.

## Go deeper

- **Lawful basis, consent and retention** (`security/gdpr-data-privacy/01-lawful-basis-consent-and-retention`) — the record this routine is executed against.
- **GDPR & Data Privacy** (`security/gdpr-data-privacy`) — the track this chapter closes.
- **Data Ethics** (`security/data-ethics`) — deciding what should have been collected at all.
- **Secrets Management** (`security/secrets-management`) — keeping these stores reachable only by those who need them.
