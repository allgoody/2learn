---
title: Roles and ceremonies
prereqs: []
---

## What it is

Scrum defines three accountabilities — product owner, scrum master, developers — and four ceremonies: sprint planning, the daily stand-up, the sprint review and the retrospective. Each ceremony has one artefact it produces. If a ceremony produces nothing, it has become a status meeting.

## Why it matters

Naming the accountabilities removes two of the commonest sources of paralysis: nobody can decide what to build, and everybody is accountable for everything. The ceremonies are the mechanism that keeps the sprint boundary honest — but only while each one still produces its artefact. Ceremonies are also where Scrum's failure mode appears: they are easy to keep and easy to hollow out.

## Core ideas

### Three accountabilities, three different decisions

The product owner decides what and in what order; the developers decide how and how much; the scrum master removes obstacles and holds the process. Overlap is where the framework stops working.

```text
Product owner   "Refunds before the export feature this sprint."
Developers      "We can do that if the refund item is split; the audit log
                 part will not fit."
Scrum master    "The audit-log dependency is blocking two sprints; I will
                 chase the decision this week."
```

Note that none of the three is a manager of the others.

### Sprint planning produces a sprint goal, not a task list

The outcome is one sentence naming what the sprint achieves, plus a forecast of items. A task-by-task plan made in planning is discarded by day two.

```text
Sprint goal: a customer can request a refund and see its status.
Forecast: 6 items, 2 stretch.
```

### The daily stand-up is for the team

Fifteen minutes, about the work, not about people. Each person answers what changed toward the goal and what is in the way. An update delivered to a manager is a status report wearing the same name.

### The review is where the product is inspected

Show the increment running to the people who can react — users, stakeholders, support. Collect what to do next, and make it visible in the backlog immediately.

### The retrospective must produce one change

Two or three items, one owned by a named person, checked next time. A retrospective with no action is a complaint session, and the team learns to bring no complaints.

## Practice

### Label one ceremony's artefact

For each of the four ceremonies, write the artefact it produced the last time it ran, and who consumes it.

Done when: every ceremony has a named artefact and a consumer, and you have identified the one that produced neither.

### Close one retrospective loop

Take the single change your last retrospective agreed, write its owner and date, and check it at the start of the next retrospective.

Done when: the item is either done or has an owner and a new date, and the team can see the loop closing.

## Common mistakes

- **The stand-up becoming a status report** — the team optimises for looking busy; fix: keep it about the goal and the obstacles, with no manager asking for updates.
- **Sprint planning as a task breakdown** — the plan is stale by day two; fix: produce a sprint goal and a forecast.
- **No sprint goal** — the sprint is a container for unrelated items and cannot be evaluated; fix: write one sentence naming the achievement.
- **A review with no one who can react** — no decisions come back and the increment is demonstrated to itself; fix: invite users and stakeholders who can decide.
- **Retrospectives without actions** — the team stops raising anything; fix: one owned change per retrospective, checked next time.

## Go deeper

- **Scrum (Software Development)** (`product-process/scrum-software-development`) — the track these accountabilities and ceremonies belong to.
- **The backlog and sprint flow** (`product-process/scrum-software-development/02-the-backlog-and-sprint-flow`) — what the ceremonies operate on.
- **Agile Methodology** (`product-process/agile-methodology`) — the values a ceremony is supposed to serve.
- **Kanban** (`product-process/kanban`) — what a team does instead when it wants fewer fixed ceremonies.
