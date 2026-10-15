---
title: GDPR & Data Privacy
type: skill
topic: security
tier: medium
status: drafted
aliases: ["GDPR"]
prereqs: []
related: []
---

## What it is

Data privacy law sets conditions on handling personal data: you need a lawful basis for processing it, you must tell people what you do with it, you may keep it only as long as you need it, and people can ask what you hold and have it erased. This entry is about the engineering consequences — what a system must be able to do — not about interpreting the regulation in a specific case, which is a lawyer's work.

## Why it matters

The obligations are not administrative: they constrain the data model. If the system cannot find all the data belonging to one person, it cannot answer a subject access request. If it cannot delete rows without breaking referential integrity, it cannot honour erasure. Teams discover this six months in, when the request arrives and the answer is a spreadsheet exercise across four systems. Designing for it at the start costs a table of identifiers and a deletion path.

## In this track

1. **Lawful basis, consent and retention** (`security/gdpr-data-privacy/01-lawful-basis-consent-and-retention`) — why you are allowed to hold the data, how you asked, and when you must let it go.
2. **The right to be forgotten, in a database** (`security/gdpr-data-privacy/02-the-right-to-be-forgotten-in-a-database`) — what an erasure request actually requires of a schema, a backup and an analytics pipeline.

## Prerequisites

None.

## Go deeper

- **Data Ethics** (`security/data-ethics`) — what you should collect and infer, beyond what is legal.
- **Secrets Management** (`security/secrets-management`) — protecting the personal data you do hold from the commonest leak paths.
- **Google Analytics 4 (GA4)** (`design-ux/google-analytics-4-ga4`) — the consent boundary in an analytics tool.
- **Hotjar** (`design-ux/hotjar`) — where recorded sessions meet the same obligations.
