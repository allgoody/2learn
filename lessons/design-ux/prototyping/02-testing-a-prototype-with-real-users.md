---
title: Testing a prototype with real users
prereqs: ["design-ux/prototyping/01-prototype-fidelity"]
---

## What it is

Testing a prototype means putting the clickable or paper draft in front of someone who matches your user and setting them a task, then watching without helping. The prototype is the instrument; the session is where it produces evidence. The moderating technique itself lives in Usability Testing — this chapter is about applying it to a prototype in particular.

## Why it matters

A prototype test is the last cheap moment before code. It is also uniquely easy to waste: participants praise anything that moves, a broken link turns the session into a bug report, and the moderator's instinct to help destroys the one finding that mattered. Preparing for those three failure modes is most of the work.

## Core ideas

### Write the tasks before the prototype is finished

Tasks come from the flows the prototype supports, phrased as goals. Writing them late produces tasks that match what you built rather than what you wanted to learn.

```text
Task 1  "You want to return a pair of boots that arrived too small."
Task 2  "Find out when your last order is arriving."
Task 3  "You have moved house — update where your orders go."
```

### Pilot with one colleague

Run the whole session once against a colleague before the first real participant. Every dead link, unclear task and missing screen shows up here rather than in a paid session.

```text
shortcut: prototype links break under real use; always pilot once and
fix the paths the pilot walked before testing with participants.
```

### Rehearse the neutral answers

Have a sentence ready for "is this right?" and for "what do I click?". A moderator who improvises will help, and helping is the end of the finding.

### Note actions and quotes separately

Two columns, timed where possible. The action column holds what they clicked; the quote column holds what they said. The findings are built mostly from the action column.

### Stop the session on the same boundary

Run every participant to the same point. Cutting some sessions short and not others makes the results incomparable and usually removes the hardest step from the sample.

## Practice

### Run three prototype sessions

Write three tasks, pilot once, then run three sessions. Keep your script, your task cards and your notes in the same format across all three.

Done when: you have three sets of notes with the same tasks and can name the step where every participant hesitated.

### Count the findings

Turn the notes into counts and quotes, and write the two changes you would make first.

Done when: each of the two changes cites a count and a quote, and each names the screen it happens on.

## Common mistakes

- **No pilot** — the first session is spent on broken links and the participant's patience; fix: run one full dry run and fix the paths.
- **Helping when the participant stalls** — the useful finding is replaced by a successful path you guided; fix: rehearse the neutral reply and count to five.
- **Tasks written from the screen** — the test checks whether they followed instructions; fix: phrase every task as a goal in the participant's language.
- **Asking what they thought of the design** — you collect praise for the parts that move; fix: keep to the tasks and record behaviour.
- **Sessions ending at different points** — results cannot be compared across participants; fix: fix the end boundary in advance and hold to it.

## Go deeper

- **Prototype fidelity** (`design-ux/prototyping/01-prototype-fidelity`) — the artefact this session tests.
- **Prototyping** (`design-ux/prototyping`) — the track this chapter closes.
- **Usability Testing** (`design-ux/usability-testing`) — moderating, severity and analysis in full.
- **UI/UX Research** (`design-ux/ui-ux-research`) — the narrower comprehension and findability checks.
