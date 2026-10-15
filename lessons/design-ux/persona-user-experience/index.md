---
title: Persona (User Experience)
type: skill
topic: design-ux
tier: small
status: drafted
aliases: ["Persona"]
prereqs: ["design-ux/user-research"]
related: []
---

## What it is

A persona is a named, evidence-based profile of a user group, used to keep a design decision anchored to a real set of people. Evidence-based is the operative phrase: the persona is a compressed summary of research, not a character invented to make the deck friendlier.

## Why it matters

Design discussions drift toward the person in the room: the fastest connection, the most experienced user, the loudest stakeholder. A persona gives the team a named stand-in built from data, so "would this work for Priya?" is a question with a factual answer. It also prevents the opposite failure of designing for everyone at once, which produces a screen that suits nobody. Used honestly, it keeps the sample size, the source and the date attached to the profile.

## Core ideas

### Build it from a cluster, not an archetype

Group the people you studied by behaviour and goal, not by demographic. Two groups with the same age and different workarounds are two personas; two groups with different jobs and the same behaviour are one.

```text
Cluster A: reorder weekly, know the catalogue, want speed
Cluster B: order twice a year, search by name, want certainty
Same demographic, different jobs -> two personas.
```

### Include only fields that change decisions

Add a field only if someone could act on it. Goals, context, current workaround, and one quote earn their place; favourite music and a stock photo do not.

```text
Name:     Priya, warehouse shift lead
Goal:     get the next pick without leaving the aisle
Context:  gloves, daylight glare, 40-second gaps
Today:    walks to a terminal, writes the line on a clipboard
Quote:    "I only need one number and it costs me a minute."
```

### State the evidence and the date

One line beneath the profile naming how many sessions it rests on and when. A persona whose evidence line reads "4 interviews, March" can be challenged and updated; one without is a character sketch.

### Say when a persona is a waste of time

If nobody will make a decision against it, do not write it. Personas written to decorate a requirements document, or to represent a group nobody will design for, cost a week and harden assumptions. The honest move is to skip them and keep the raw session notes.

### Keep them alive or retire them

Print them where design decisions are made. Re-check them after a research cycle; a persona whose evidence is a year old and contradicted by new sessions should be rewritten or deleted, not archived.

## Practice

### Write one persona from your own sessions

Cluster your last study's participants by behaviour and goal. Write one profile: goal, context, workaround, one verbatim quote, evidence line.

Done when: every statement in the profile traces to a session note, and a colleague can name a design decision the persona would change.

### Test a persona against a live decision

Take the next design debate and argue both options against the persona. Note where the persona does not help.

Done when: you have either changed the decision or written the field the persona was missing.

## Common mistakes

- **Inventing the persona** — a stock photo, a name and unverifiable interests; fix: build it only from session notes and quote the evidence line.
- **Demographic clustering** — age and job title rarely predict a design decision; fix: cluster on behaviour and goal.
- **Too many personas** — six profiles mean the team designs for the average; fix: keep two or three and retire the rest.
- **Writing personas nobody decides against** — a week of work for a document that is never referenced; fix: check that each persona changes at least one live decision, or skip it.
- **Never revisiting them** — an outdated profile quietly steers new work; fix: date the evidence and rewrite after the next cycle.

## Go deeper

- **User Research** (`design-ux/user-research`) — read this first; a persona is a compression of what that research found.
- **Jobs-to-be-Done** (`design-ux/jobs-to-be-done`) — the situation-based framing that complements grouping people.
- **Journey Mapping** (`design-ux/journey-mapping`) — the map a persona is attached to.
- **From findings to decisions** (`design-ux/user-research/04-from-findings-to-decisions`) — keeping the persona tied to evidence and to action.
