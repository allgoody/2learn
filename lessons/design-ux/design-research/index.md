---
title: Design Research
type: skill
topic: design-ux
tier: small
status: drafted
aliases: []
prereqs: ["design-ux/user-research"]
related: []
---

## What it is

Design research studies users, their context and the products they already use in order to frame the design problem. Where interface research asks whether a design works, design research asks what the design should be about: who is involved, what they are trying to do, what already exists, and which constraints are fixed. It happens before there is anything to test.

## Why it matters

Framing decides everything downstream. A team that frames the problem as "our search is slow" builds a faster search; a team that frames it as "people do not know what to search for" builds something else entirely, and the second framing costs the same to reach if the research was done at the start. Design research is also how a team avoids rebuilding a solution that already exists in the market in a form its users are happy with.

## Core ideas

### Study the context, not just the user

What surrounds the task matters as much as the task: the room, the device, the shift pattern, the person waiting behind them, the paper form the process still depends on. Context is where the constraints come from.

```text
Context notes — equipment inspection
- tablet held in one hand, gloves on, outdoors in winter
- the checklist is laminated and lives clipped to the machine
- the previous system was a paper form; nobody replaced the clipboard
Constraint: the digital version must survive below 5°C and wet hands.
```

### Survey the existing landscape

Collect the products, spreadsheets, workarounds and habits already in play. For each, note what it does well — the incumbent is the bar your design has to clear, not a straw man.

```text
Existing          Works because                 Gap
paper form        survives weather, never crashes  no history, no search
colleague's macro runs overnight, familiar       breaks when she leaves
vendor portal     has the manuals              three logins, desktop only
```

### Interview around artefacts

Ask people to bring the thing they actually use: the printout, the notebook, the screenshot. Concrete artefacts turn vague accounts of process into specific steps and expose the unofficial tools that keep the service running.

### Look for the workaround

A workaround is the strongest evidence of a real need — somebody cared enough to build a bad solution rather than go without. Follow it back to the underlying task.

### Distinguish the problem from the stated request

Stakeholders arrive with solutions; the job is to find the task underneath. "We need an export button" may be "I need this number on a slide by Monday".

## Practice

### Write a context brief for an unfamiliar domain

Spend a day studying a domain you know nothing about. Produce one page: the people involved, the physical and organisational context, the tools in use today, and the constraints you would treat as fixed.

Done when: you can list three constraints that would invalidate an interface designed for a tidy office setting.

### Map the existing landscape

For a problem you are about to work on, list every product, workaround and manual process already serving it, with what each does well and where it falls short.

Done when: the list contains at least one non-software entry and one home-made tool.

## Common mistakes

- **Jumping to the product category** — the study starts from competitors and never asks what the task is; fix: describe the task first, then look at who serves it.
- **Studying users away from their context** — the office meeting room hides every physical constraint; fix: observe in the place where the work happens.
- **Treating the incumbent as a straw man** — the design then clears no real bar; fix: write down what the existing solution does well before criticising it.
- **Interviewing without artefacts** — the account drifts toward the ideal process rather than the real one; fix: ask people to bring what they use.
- **Ignoring the workaround** — the strongest signal of need gets filed as an exception; fix: follow every workaround back to the task it serves.

## Go deeper

- **User Research** (`design-ux/user-research`) — read this first; design research is the framing end of the same discipline.
- **Choosing a method** (`design-ux/user-research/01-choosing-a-method`) — how to pick a method for a framing question.
- **Journey Mapping** (`design-ux/journey-mapping`) — turning context notes into an end-to-end picture.
- **Jobs-to-be-Done** (`design-ux/jobs-to-be-done`) — framing what you find as the progress people are trying to make.
