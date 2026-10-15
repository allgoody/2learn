---
title: Mapping the current process
prereqs: []
---

## What it is

Mapping the current process means writing down how the work actually flows today: the steps, who does each one, which system or document carries it, how long each waits, and where it deviates. The artefact is a process map with the exceptions on it, not the tidy version from the procedure manual.

## Why it matters

The procedure manual describes the intended process; the work follows the actual one, and the difference is where the cost lives. The informal approval by email, the spreadsheet that reconciles two systems, the step that exists because a form was printed in 2011. Those are the findings that decide whether a new system is worth building, and they are only visible by walking the process with the people who do it.

## Core ideas

### Walk the process, do not interview about it

Sit with the person doing the work and follow one real case end to end, from request to outcome. Ask to see the actual screens, forms and spreadsheets. Interviews produce the process as people believe it works.

```text
Case: customer refund, order 88213
09:12  support reads the ticket, opens the order in the shop system
09:18  cannot refund a gift-card payment there, so opens the accounts system
09:26  copies the amount by hand into a spreadsheet of manual refunds
09:31  emails finance, waits
14:50  finance confirms, support records it in the ticket
```

The hand-copy at 09:26 and the 5-hour wait are the process, not the exception.

### Record who, what, and how long

Every step gets an actor, a system and a duration. Time spent waiting is usually larger than time spent working, and it is the part a system cannot see.

### Put the exceptions on the map with their frequency

"It is usually fine, unless the payment was a gift card" is a sentence that hides a whole second process. Note how often each variation happens.

### Mark the hand-offs and the re-entry of data

Every hand-off is a queue and an opportunity for error. Every place data is re-typed is a defect waiting for a busy day.

### Time-box the mapping and say what decision it informs

A map is done when it is good enough to choose between options. Write the decision at the top of the page.

## Practice

### Map one real case end to end

Follow one instance of a process from request to outcome, recording each step, actor, system and wait.

Done when: the map includes at least one workaround and one waiting period longer than the working time, and it names the decision it informs.

### Count one hand-off

Pick the most frequent hand-off on your map and count, for a week, how often it fails or is delayed.

Done when: you have a number for the hand-off and can say what it costs per occurrence.

## Common mistakes

- **Interviewing instead of following a case** — the map describes the intended process; fix: walk one real case with the person doing the work.
- **Omitting waits** — the map looks efficient and explains nothing; fix: record duration for every step, including the pauses.
- **Leaving out exceptions** — variations are treated as noise when they are often most of the volume; fix: map the common variations with their frequency.
- **A map with no timebox** — the analysis runs past the decision it was for; fix: state the decision and the deadline at the top.
- **Ignoring re-typed data** — the error source stays invisible; fix: mark every place a value is entered by hand.

## Go deeper

- **Business Analysis** (`04-product-process/06-business-analysis`) — the track this mapping opens.
- **Gap analysis and options** (`04-product-process/06-business-analysis/02-gap-analysis-and-options`) — what to do with the map.
- **Service Design** (`03-design-ux/38-service-design`) — the customer-facing view of the same process.
- **Stakeholder Management** (`04-product-process/07-stakeholder-management`) — the roles the map reveals.
