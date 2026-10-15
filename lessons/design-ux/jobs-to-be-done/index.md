---
title: Jobs-to-be-Done
type: skill
topic: design-ux
tier: small
status: drafted
aliases: ["JTBD"]
prereqs: ["design-ux/user-research"]
related: []
---

## What it is

Jobs-to-be-Done frames a need as the job the user hires a product to do. The unit of analysis is not the person or the feature but the progress someone is trying to make in a particular situation: "when this happens, I want to achieve that, so I can move on." Read the User Research entry first if you have not yet gathered any evidence about what people actually do — a job statement invented in a meeting is a slogan.

## Why it matters

People do not buy products, they hire them to make progress, and the same person hires different things on different days. Framing by job exposes two things a feature list hides: the real competition, which is often a workaround or doing nothing, and the circumstances that make one solution fit where another fails. It also stops the drift into demographic segments, where a group is described by age and income but nobody can say what would make them switch.

## Core ideas

### The job, not the person

Two people in completely different demographics hire the same product when they are making the same progress. Describe the situation and the desired progress; leave out age, job title and personality, which rarely predict behaviour.

### Circumstances decide, not preferences

The trigger matters more than the stated preference. Ask what was happening the moment before they started looking, what they tried first, and what almost stopped them — the answers mark the moment your product becomes relevant.

```text
Trigger:    the second time this month I had to re-do an invoice by hand
Tried first: a spreadsheet template, then asking a colleague
Almost stopped: the sign-up wanted a company number I did not have yet
```

### The competition includes non-consumption

The alternative is often a manual workaround or waiting. If your product is compared only with its named competitors, the real obstacle — effort of switching — stays invisible.

```text
Hires                         Fires
a freelancer to send invoices  the accounting package they never opened
a shared spreadsheet           the tool that asks for a company number
a reminder on the fridge
```

### A job statement is a testable sentence

Write it in one of the standard shapes and keep it free of product names. If two statements describe the same job, one is a feature.

## Practice

### Write a job statement from three interviews

From three recent interviews, collect the trigger, the first alternative tried and the obstacle. Write one job statement per person, then merge them into a single statement that covers all three.

Done when: your merged statement would describe a switch a stranger could make, and it names no product.

### Build a hire-and-fire table

For one job, list everything people currently hire — including workarounds and doing nothing — and what makes them fire each one. Mark which entries your product replaces today.

Done when: the table contains at least one row that is not a named competitor.

## Common mistakes

- **Writing the job as a feature** — "I want a dashboard" names the solution and rules out better ones; fix: describe the progress and the situation, not the artefact.
- **Slipping back into personas** — the statement quietly becomes a demographic sketch again; fix: delete any words describing who someone is rather than when and why they act.
- **Ignoring the workaround** — the spreadsheet or the phone call is the incumbent and sets the bar for switching; fix: list non-consumption and manual alternatives in the same table as named products.
- **One job statement for everyone** — a statement true of everybody explains nothing; fix: keep statements specific to a situation and split when two triggers behave differently.
- **Stopping at the statement** — it becomes a wall poster with no evidence behind it; fix: tie each clause to a quote or observation from the research notes.

## Go deeper

- **User Research** (`design-ux/user-research`) — read this before writing a job statement; the statement is only as good as the evidence under it.
- **User Interviews** (`design-ux/user-interviews`) — the questioning technique that surfaces triggers and alternatives.
- **Persona (User Experience)** (`design-ux/persona-user-experience`) — the complementary view, grouping people rather than situations.
- **Journey Mapping** (`design-ux/journey-mapping`) — placing the job's trigger and obstacle on the timeline where they occur.
