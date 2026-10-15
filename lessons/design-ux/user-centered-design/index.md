---
title: User Centered Design
type: skill
topic: design-ux
tier: small
status: drafted
aliases: ["User-Centred Design"]
prereqs: ["design-ux/design-thinking"]
related: []
---

## What it is

User centered design is the habit of deriving decisions from the user's task and constraints rather than from the organisation chart, the team's preferences or the technology already in place. The spelling varies — user-centred, user-centered, user-centric — and the idea does not: treat them as one skill.

## Why it matters

Every system quietly encodes the shape of the organisation that built it. A form asks for information because the database has a column, not because the person filling it in has it to hand; a menu is grouped by department because each department owns a team. The user experiences that as work they did not ask for. Deriving the structure from the task instead removes steps, and the earlier it happens the less code has to be rewritten. It is also the cheapest insurance against building something technically correct that nobody can finish.

## Core ideas

### Start from the task, not the feature list

Write the steps a person takes to reach their goal, in their words, before looking at any existing screen. Features then attach to steps rather than to teams.

```text
Task: reorder the same parts as last month
1. find the previous order
2. confirm the parts are still available
3. copy it, adjust one quantity
4. confirm the delivery address
```

Anything the interface asks for that is not on that list is a candidate for deletion.

### Constraints are part of the design, not obstacles to it

Note the conditions the task happens in: one hand free, glare on the screen, interruptions every few minutes, a shared device, a slow connection. Designs that ignore them are tested in the wrong room and pass.

```text
Context card — warehouse picker
Conditions: gloves, daylight glare, 40-second gaps between picks
Implication: 44px minimum targets, high contrast, no swipe-only gestures
```

### The org chart leaks into the interface

Group navigation by what the user is trying to do, not by which team owns the code. Test: read your menu aloud as a user's goal; if it reads as a list of departments, it has leaked.

### Validate in the user's words

Ask someone to complete the task and say out loud what they are looking for. When their words and your labels differ, the label is wrong — even if it is correct in the domain.

## Practice

### Rewrite one flow from the task backwards

Pick a flow you own that takes more than three steps. Write the user's task list first, then list every field and link the current screen shows. Mark each item as needed, movable or removable.

Done when: you have deleted or deferred at least two items and can say which task step each remaining field serves.

### Check one design against the task list

Take the same task list to someone who has never seen the product. Ask them to complete it while narrating.

Done when: you have written down the first place their words differ from the interface's words.

## Common mistakes

- **Designing for the average user** — nobody is average, and the average of two groups fits neither; fix: design for the people in your evidence and name the group.
- **Letting the data model drive the form** — the interface mirrors tables and asks for facts the user must go and look up; fix: order and require fields by the task step.
- **Testing with internal users** — colleagues know the vocabulary and the workarounds; fix: test with someone from the group you are designing for.
- **Treating accessibility as a later pass** — retrofitting contrast, target size and keyboard order costs more than building them in; fix: write the constraints into the context card before layout.
- **Confusing "the user asked for it" with evidence** — a request is one person's proposed solution; fix: trace it back to the task step it serves.

## Go deeper

- **Design Thinking** (`design-ux/design-thinking`) — the wider loop this habit sits inside.
- **User Research** (`design-ux/user-research`) — gathering the evidence this approach depends on.
- **Information Architecture** (`design-ux/information-architecture`) — organising content around tasks rather than teams.
- **Usability** (`design-ux/usability`) — what "easily reaches their goal" means as a measurable quality.
