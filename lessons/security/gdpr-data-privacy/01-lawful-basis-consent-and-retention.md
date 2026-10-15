---
title: Lawful basis, consent and retention
prereqs: []
---

## What it is

Before storing personal data, three questions have to have written answers: on what basis are we allowed to process it, what did we tell the person and how did they agree, and how long will we keep it. The artefact is a record per data category — a small table that survives an audit and, more usefully, survives a team change.

## Why it matters

Consent is the basis teams choose by default and the hardest to rely on, because it can be withdrawn and must be freely given. Contract and legitimate interest are often the honest answers for data the service genuinely cannot run without. Getting this wrong means the system is built around an assumption that later fails: consent collected before a form was filled in, no record of when or how, and no way to honour a withdrawal. Retention is the part that quietly costs money and risk — every year of logs is a year of liability with no product value.

## Core ideas

### One row per data category, not one row per system

Write what is collected, why, the basis, where it lives, who can see it and how long it is kept. This table is the artefact; everything else is derived from it.

```text
Data            Purpose          Basis             Location     Retention
email           account + login  contract          users table  account life
IP address      abuse prevention legitimate        logs         30 days
marketing prefs promotions       consent           users table  until withdrawn
order history   fulfilment       contract          orders       legal minimum
```

Note that the same person's data appears in several rows with different bases and different lifetimes.

### Record consent with its evidence

Store the date, the version of the text shown, and which purpose was agreed. A boolean column cannot answer "what did they agree to?", and consent for one purpose does not cover another.

### Make withdrawal as easy as giving

A withdrawal path that requires an email to support is not compliant and, more practically, produces a backlog of manual work. The toggle that set it must be able to unset it.

### Set retention from a purpose, and enforce it with a job

Every retention period needs a mechanism: a scheduled deletion, a partition drop or an anonymisation job. A policy statement with no job drifts into keeping everything.

### Minimise before you protect

The cheapest data to protect, delete, export and audit is the data you never collected. Ask of every field whether a decision actually depends on it.

## Practice

### Write the data table for one system

List every category of personal data in one system with its purpose, basis, location and retention, and mark the rows where the retention is enforced by a job.

Done when: every row is filled in, and at least one row has either a retention job or a written reason why it has none.

### Test one retention job

Take the shortest retention on the table, verify in staging that the job deletes or anonymises as stated, and check the count before and after.

Done when: the rows older than the period are gone or anonymised, and the count matches your expectation from before the run.

## Common mistakes

- **Consent chosen as the default basis** — it is the easiest to lose and the hardest to prove; fix: use contract or legitimate interest where the service genuinely requires the data.
- **No record of consent** — you cannot show what was agreed; fix: store the date, the text version and the purpose.
- **Retention with no mechanism** — the policy exists and the data accumulates; fix: enforce each period with a scheduled job.
- **Withdrawal that needs a human** — the toggle cannot be unset by the user; fix: make withdrawal as easy as consent.
- **Collecting first and justifying later** — a field with no purpose carries risk and cost; fix: ask what decision depends on each field before adding it.

## Go deeper

- **GDPR & Data Privacy** (`security/gdpr-data-privacy`) — the track this chapter opens.
- **The right to be forgotten, in a database** (`security/gdpr-data-privacy/02-the-right-to-be-forgotten-in-a-database`) — what the record has to support.
- **Data Ethics** (`security/data-ethics`) — the questions legality does not settle.
- **Secrets Management** (`security/secrets-management`) — protecting the data this table describes.
