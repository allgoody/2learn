---
title: Maze
type: skill
topic: design-ux
tier: small
status: drafted
aliases: []
prereqs: ["design-ux/usability-testing"]
related: []
---

## What it is

Maze is a tool for unmoderated testing: you publish a prototype and a set of tasks, share a link, and collect results from participants who complete it on their own, with no moderator present. It reports automatic metrics — completion rate, drop-off per screen, time on task, and heatmaps of where people clicked.

## Why it matters

Unmoderated testing scales in a way moderated sessions cannot: participants can be anywhere, at any hour, and the numbers accumulate without a facilitator's diary. For questions with a countable answer — can people find this, where do they stop, which of two paths is more direct — it is far cheaper per participant than a moderated session.

## Core ideas

### Reach for it when the task is simple and the answer is countable

Unmoderated works best when the task needs no encouragement and the metric is unambiguous. The more the task depends on explaining, encouraging or probing, the worse the fit.

```text
Good fit                              Poor fit
can you find the returns link          why did you look there first
which of these two labels works        what were you expecting to happen
where do people stop in this flow      is this idea worth building
```

### The cost of losing the moderator is the whole story

With no moderator there is nobody to say "keep going", nobody to notice the moment of confusion, and nobody to ask why the participant clicked the wrong thing. You get the what and never the why. Treat an unmoderated study as a locator: it tells you where to run a moderated session.

### Write tasks as short, plain instructions

No context, no encouraging language, no route. The participant reads the task alone, so ambiguity in the wording becomes noise in the data.

```text
Weaker   "Try to find where you would change your delivery address."
Better   "You have moved house. Update your delivery address."
```

### Read the screen-level drop-off before the headline

Completion rate is an average over the whole flow. The useful figure is where people stop: a screen that loses half the participants is the finding, and the rate for the whole task hides it.

### Say what the data cannot tell you

Unmoderated metrics cannot distinguish a participant who misunderstood the task from one who found a genuine flaw. State that limit in the report, and book a moderated follow-up for the step where the drop-off happened.

## Practice

### Launch a three-task unmoderated test

Write three plain tasks for one flow, publish them with a link, and collect at least ten completions.

Done when: you can name the screen with the largest drop-off and how many participants reached it.

### Follow the drop-off with two moderated sessions

Take the worst screen from the unmoderated run and run two moderated sessions on it.

Done when: you can explain in one sentence why people stopped, which the unmoderated metrics alone could not tell you.

## Common mistakes

- **Using it for "why" questions** — you get paths and no reasons; fix: use it to locate, then moderate to explain.
- **Vague or encouraging task wording** — participants interpret the task differently and the rates are noise; fix: write plain, context-free instructions.
- **Reading only the completion rate** — the failing screen hides inside the average; fix: read the per-screen drop-off.
- **No participant quality screen** — anyone with the link answers, including people outside the target group; fix: add a short screening question and report the sample.
- **Treating the sample as representative** — a link-shared sample is self-selecting; fix: describe who answered and avoid market-size claims.

## Go deeper

- **Usability Testing** (`design-ux/usability-testing`) — read this first; the moderated form, whose method this abbreviates.
- **Analysis and severity** (`design-ux/usability-testing/02-analysis-and-severity`) — turning the drop-off into a ranked finding.
- **Running the session** (`design-ux/usability-testing/01-running-the-session`) — the moderation skill the unmoderated tool removes.
- **Google Analytics 4 (GA4)** (`design-ux/google-analytics-4-ga4`) — the same question asked of real traffic instead of invited participants.
