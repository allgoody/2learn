---
title: Hotjar
type: skill
topic: design-ux
tier: small
status: drafted
aliases: []
prereqs: ["design-ux/google-analytics-4-ga4"]
related: ["security/gdpr-data-privacy"]
---

## What it is

Hotjar records real traffic: session recordings of what people actually did, heatmaps of where they clicked and scrolled, and on-site surveys shown to a sample of visitors. It sits on the qualitative side of behavioural analytics, where Google Analytics counts events and Hotjar shows the individual session behind them.

## Why it matters

A funnel tells you that 40% of people leave on the address step; a recording shows one of them typing, deleting, scrolling, then leaving. The tool answers the "why" that aggregate analytics cannot, with the real population rather than an invited sample, and it does so continuously rather than in a study window. That combination — real users, real behaviour, no recruitment — is why it earns a place next to the analytics tool rather than replacing it.

## Core ideas

### Reach for it when you have traffic and a specific question

It is a poor tool for exploration: watching sessions without a question is a way to spend an afternoon. Bring a step, a segment or a funnel and filter to it.

```text
Question: why do people abandon the address step?
Filter:   sessions that reached checkout and did not confirm
Watch:    first 5 matching recordings, note the repeat action
```

### Recordings for mechanism, heatmaps for attention, surveys for intent

Each answers a different question. Use recordings to see the sequence of actions, heatmaps to see what draws the eye and whether people scroll, surveys to ask the person directly while they are on the page.

### Watch five, not fifty

A handful of recordings on the filtered set will show the repeated pattern. Watching more rarely changes the conclusion and always costs an hour.

### Treat consent as part of the design

Session recordings capture personal data, including anything typed into a form. They may only run inside the consent the user gave, and forms that collect sensitive data should be excluded from recording by configuration. The GDPR and Data Privacy entry covers the wider obligations.

```text
Allowed when    consent for analytics is granted
Excluded        payment fields, health or identity data, message text
Retention       defined and short; delete recordings once reviewed
```

### Never present a recording as representative

One session is an anecdote that illustrates a mechanism. Pair it with the count from the funnel before it goes into a decision.

## Practice

### Watch five recordings of one step

Filter recordings to sessions that reached one step and did not complete it. Watch five, writing the repeat action or hesitation each one shows.

Done when: you can name the action at least three of the five have in common, with the funnel count beside it.

### Add one on-site survey question

Ask one closed question where the abandonment happens — for example, what stopped them — and read the free-text answers after a week.

Done when: you have at least twenty responses and can group them into three reasons.

## Common mistakes

- **Watching sessions with no question** — an afternoon disappears and nothing is learned; fix: filter to one step and one segment first.
- **Recording before consent** — a privacy breach and a compliance problem; fix: run only inside granted consent and exclude sensitive fields.
- **Treating one recording as evidence** — an anecdote becomes a redesign; fix: pair it with the aggregate count.
- **Ignoring the scroll and click heatmaps** — attention and reach are cheap to check; fix: read the heatmap for the same page before drawing conclusions.
- **Keeping recordings indefinitely** — the data outlives its purpose; fix: set a retention period and delete after review.

## Go deeper

- **Google Analytics 4 (GA4)** (`design-ux/google-analytics-4-ga4`) — read this first; the counted traffic these recordings illustrate.
- **GDPR and Data Privacy** (`security/gdpr-data-privacy`) — the consent and retention rules that govern this data.
- **Usability Testing** (`design-ux/usability-testing`) — the invited-participant counterpart, with a moderator to ask why.
- **Maze** (`design-ux/maze`) — unmoderated testing on a prototype rather than on live traffic.
