---
title: Structure of a spec or README
prereqs: ["04-product-process/08-technical-writing"]
---

## What it is

A structure is the order in which a document answers its reader's questions: what is this, should I care, how do I use it, what do I do when it breaks, and where does the detail live. A README and a specification answer slightly different questions, but both fail in the same way — by putting the context the author had at the top, instead of the orientation the reader needs.

## Why it matters

Readers arrive with a task, not with patience. They scan for the section that answers it and leave. A document whose first three paragraphs are background is a document that gets replaced by a question in a chat channel. The section order is therefore the design decision, and it is testable: give the document to someone and see where they stop reading.

## Core ideas

### A README starts with the one-line what and why

Then how to run it, then how to use it, then where to get help. A reader who is evaluating whether to use the thing needs the first two sentences and nothing else.

```text
Order Exporter
Copies orders to a CSV for the finance nightly job. Runs on a schedule.

  Run it locally
  Configuration      table: variable, meaning, default
  Common failures    symptom -> cause -> fix
  Design notes       why it is shaped this way
```

### A specification starts with the problem, then the behaviour

What is being solved, who for, then the requirements in testable form, then the constraints and what is out of scope. The out-of-scope section prevents more argument than any other.

```text
  Problem and goal
  Requirements        REQ-PAY-014 ... (one per line, testable)
  Out of scope        multi-currency, partial refunds
  Constraints         the existing ledger must remain the record of truth
  Open questions      who owns the reconciliation report?
```

### Put the answer before the reasoning

Readers who need the reasoning can read on; readers who need the answer should not have to. Headings that state the answer — "Use the ledger as the source of truth" — are worth more than headings that name a topic.

### Use tables and lists for reference material

Configuration, error codes, endpoints and parameters belong in a table with one row per item. Prose is for reasoning; structure is for lookups, which is what most visits to a document are.

### Say when it was written and who owns it

A date and a name at the top. Without them the reader cannot judge whether the document is current, and will either trust it wrongly or ignore it.

## Practice

### Rewrite one README's first screen

Take a README and rewrite the first ten lines so the what, the why and the run instruction all appear before any scrolling.

Done when: a colleague who has never seen the project can say what it does and how to start it after reading only the first screen.

### Add an out-of-scope section

Take one specification and add an explicit out-of-scope list of five items.

Done when: someone reading the document can name two things they should not expect from this work.

## Common mistakes

- **Background before the answer** — the reader leaves before reaching the useful part; fix: lead with the what and the why.
- **Topic headings** — "Considerations"; the reader cannot tell what the section concludes; fix: state the answer in the heading.
- **Reference material in prose** — configuration buried in paragraphs cannot be scanned; fix: tables and lists for anything looked up.
- **No out-of-scope section** — expectations expand until the work cannot meet them; fix: list what this deliberately does not cover.
- **No date or owner** — the reader cannot judge currency; fix: put a name and a date at the top.

## Go deeper

- **Technical Writing** (`04-product-process/08-technical-writing`) — the track this structure opens.
- **Editing for the reader** (`04-product-process/08-technical-writing/02-editing-for-the-reader`) — cutting the first draft down.
- **Requirements Engineering** (`04-product-process/05-requirements-engineering`) — the testable form a specification's requirement section uses.
- **Jira & Confluence** (`04-product-process/13-jira-confluence`) — where most of these documents are written and kept.
