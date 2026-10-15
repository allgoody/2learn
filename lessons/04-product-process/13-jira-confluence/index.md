---
title: Jira & Confluence
type: skill
topic: 04-product-process
tier: small
status: drafted
aliases: ["Jira", "Confluence"]
prereqs: ["04-product-process/02-agile-methodology"]
related: []
---

## What it is

Jira is a work tracker: items with an owner, a status and a history, in a workflow that shows what is being worked on and what is stuck. Confluence is a wiki: pages that hold decisions, specifications and onboarding material, with a history of who changed what. Together they are the commonest record-keeping pair in agile teams — the tracker for things that have a state, the wiki for things that have content.

## Why it matters

The value is retrieval and shared state. When a ticket carries the discussion, the decision and the link to the change, nobody has to ask what happened to it; when a decision is written on a wiki page rather than in a chat thread, it can be found in six months. The cost is equally real, and worth stating plainly: a tracker that prescribes a workflow reshapes how a team works. If the board has eleven columns because the tool's default demanded them, the process is being designed by the tool. The honest test is whether the workflow would survive the tool being replaced.

## Core ideas

### The tracker is for things with state; the wiki is for things with content

Putting a research report in a ticket makes it unfindable; putting a bug in a wiki page makes it untrackable. Use each for what it is shaped like.

```text
Ticket   a bug, a story, a change request, a support escalation
Page     a decision record, an architecture note, a release note,
         a runbook, onboarding material
```

### Configure the workflow to match reality, then stop configuring

Every status should mean something a person can act on, and every status should have a way out. A workflow with a column nobody moves items through is a column that should be deleted.

### Write tickets for the person who will read them in six months

A title that names the outcome, a body with the reproduction or the benefit, and links to the code and the decision. The person reading it later has none of today's context.

```text
Title  Refund fails when the original payment was a gift card
Body   Steps, expected, actual, environment
Links  the decision record that says gift cards cannot be refunded
       the change that introduced the check
```

### The wiki needs an owner and a review date

Pages without an owner go stale and are then trusted, which is worse than their absence. Put a name and a date on every page that states a current fact.

### Say when the tool is shaping the process

If a ceremony exists because the tool reports on it, or an estimate field is filled in only for a dashboard, the process is being driven by the artefact. That is a decision to make explicitly rather than to inherit.

## Practice

### Audit one workflow

Open your tracker's status list and, for the last fifty items, count how many passed through each status and how long they waited.

Done when: every status has a non-zero count or has been deleted, and no status holds an item for longer than a week without a reason.

### Write one decision record on the wiki

Take a recent decision, write a page with the decision, the options considered, the evidence and the date, and link it from the ticket it affected.

Done when: someone reading the ticket in six months can reach the reasoning in one click.

## Common mistakes

- **The tool's default workflow adopted as the process** — the team works around a board that does not match reality; fix: delete statuses nobody uses.
- **Documents stored as tickets** — knowledge becomes unsearchable; fix: put content on pages and state on tickets.
- **Tickets without enough context** — the reader in six months cannot act; fix: title the outcome and include steps, links and environment.
- **Wiki pages with no owner** — stale facts are trusted; fix: a name and a review date on every page.
- **Reports built to justify the tool** — fields are filled in for a dashboard rather than for the work; fix: decide explicitly which reporting you want and stop collecting the rest.

## Go deeper

- **Agile Methodology** (`04-product-process/02-agile-methodology`) — read this first; the tracker serves these values and can easily distort them.
- **Kanban** (`04-product-process/11-kanban`) — the flow the board is usually drawn from.
- **Technical Writing** (`04-product-process/08-technical-writing`) — how to write the pages a wiki holds.
- **The backlog and sprint flow** (`04-product-process/10-scrum-software-development/02-the-backlog-and-sprint-flow`) — the backlog the tracker records.
