---
title: Notion
type: skill
topic: 03-design-ux
tier: small
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Notion is a document and lightweight database tool: pages that can contain other pages, and databases that can be viewed as a table, a board or a calendar. In a design team it usually holds the research repository, the spec documents and the wiki of decisions.

## Why it matters

Research that lives in a folder of session notes is research nobody can find twice. The same decision is argued three times because the first argument was in a chat thread that scrolled away. A wiki with a small number of databases — studies, findings, decisions — makes the team's accumulated knowledge searchable, which is what turns individual sessions into an organisational memory.

## Core ideas

### Reach for it when you need to find a decision in six months

The test is retrieval, not storage. If nobody will search for it, a document elsewhere is fine; if the team will ask "why is it like this?", it belongs in the wiki with the evidence attached.

### One database per kind of thing

A study, a finding and a decision are different objects with different fields. Mixing them into one long page destroys the ability to filter and cross-reference.

```text
Studies    owner, date, method, participants, question, link to notes
Findings   study, screen, count, severity, status
Decisions  finding, change, owner, date, status
```

Cross-references let a decision show the finding and the study behind it, which is how the evidence survives the person who collected it.

### Keep a template for each object

A study page with the same sections every time — question, method, participants, findings, decisions — is what makes a repository usable and a comparison possible.

### Distinguish the source from the summary

Store the raw notes in a child page and the summary on the parent, and never edit the raw notes. When a finding is challenged, the evidence is one click away.

### Write the status, and keep it true

Draft, active, decided, superseded. A repository full of undated, unstatused pages is worse than none, because it is trusted.

## Practice

### Build a three-database research repository

Create the studies, findings and decisions databases with their fields and templates, and enter the last study you ran.

Done when: opening the decision record shows the finding, the study and the raw notes without leaving the tool.

### Write one decision record

For a decision made recently, record the change, the owner, the date, the evidence and what was rejected.

Done when: a colleague can read the record and know why the alternative was not chosen.

## Common mistakes

- **A folder of unstructured notes** — nothing can be filtered or found twice; fix: one database per object type, with fields.
- **One giant page per project** — search returns the page rather than the answer; fix: split into a page per study, finding and decision.
- **Editing the raw notes** — the evidence is lost and findings become unverifiable; fix: keep raw notes immutable and summarise above them.
- **No status or date** — stale pages are trusted as current; fix: give every record a status and a date and keep them true.
- **Using it as the place work happens** — tickets and code live elsewhere, and the wiki drifts; fix: keep it as the record, not the workspace.

## Go deeper

- **User Research** (`03-design-ux/05-user-research`) — the studies this repository holds.
- **From findings to decisions** (`03-design-ux/05-user-research/04-from-findings-to-decisions`) — the finding and decision records these databases are shaped around.
- **Content Strategy** (`03-design-ux/08-content-strategy`) — the same maintenance question for user-facing content.
- **Miro** (`03-design-ux/13-miro`) — where the session's notes come from before they land here.
