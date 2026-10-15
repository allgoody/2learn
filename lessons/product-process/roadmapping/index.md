---
title: Roadmapping
type: skill
topic: product-process
tier: small
status: drafted
aliases: []
prereqs: ["product-process/product-management"]
related: []
---

## What it is

A roadmap is a sequence of outcomes and themes over time, at a level of detail that stays true as the work is learned. It says what the product should be able to do, and in roughly what order, without committing to specific features on specific dates.

## Why it matters

The fixed feature list is the alternative, and its failure is predictable: it becomes a promise to everyone outside the team, so the organisation optimises against a document written when the least was known. The team then either ships the list and misses the goal, or changes the list and loses credibility. Outcome roadmaps keep the commitment at the level that can actually be held — the change you are trying to cause — and leave the features to be chosen as evidence arrives. The failure mode of this approach is equally real: an outcome roadmap with vague themes and no dates is not credible either, and reads as evasion. The fix is to be specific about the outcome and honest about the uncertainty, not to avoid both.

## Core ideas

### Commit to the outcome, forecast the work

Say what must be true for the business, and by when; show the work as a current best guess.

```text
Committed  Cut order-to-shipment from 4 days to 2 by the end of Q3.
Forecast   Q2: automate the packing slip; remove the manual stock check.
           Q3: same-day courier option, if the volume supports it.
Not in it  multi-currency, dashboard redesign, mobile app
```

Note the explicit "not in it" line: what the roadmap excludes is read more closely than what it includes.

### Use now, next, later

Three horizons with declining certainty. Dates only in the first, and only for the outcome.

```text
Now     in progress, named, dates known
Next    decided direction, not yet started, no dates
Later   themes and bets, revisited each quarter
```

### Themes answer a question, not a feature name

"Reduce the cost of returns" is a theme; "returns portal" is a feature. Themes survive their first idea being wrong, which is why they belong on a roadmap and features do not.

### Say what the roadmap is not

A roadmap is not a contract, not a delivery schedule and not a prioritisation list. Say so on the document, or someone will treat it as all three.

### Revisit on a fixed cadence, not on pressure

Quarterly, with the evidence. Between cadences, changes are exceptions with a stated reason.

## Practice

### Write a three-horizon roadmap

Take your current list of work and sort it into now, next and later, with one outcome per horizon and an explicit exclusion list.

Done when: every entry is an outcome or a theme, no entry is a feature with a date beyond the now horizon, and the exclusions are written down.

### Test one roadmap line against evidence

Take a committed outcome and ask what evidence would show it is unreachable this year, then check whether that evidence exists.

Done when: the line is either narrowed or confirmed, and the reason is recorded on the roadmap.

## Common mistakes

- **A feature list with dates** — it becomes a contract written when least is known; fix: commit to outcomes and forecast the work.
- **Themes so vague they commit to nothing** — the roadmap reads as evasion; fix: pair each theme with a measurable outcome.
- **No exclusions** — stakeholders read absence as an oversight and ask for it anyway; fix: state what the roadmap deliberately excludes.
- **Dates on everything** — false precision invites renegotiation; fix: dates only in the now horizon.
- **Rewriting the roadmap on every escalation** — it stops being a plan; fix: revise on a fixed cadence with evidence.

## Go deeper

- **Product Management** (`product-process/product-management`) — read this first; the roadmap communicates that role's ordering over time.
- **The decision role** (`product-process/product-management/01-the-decision-role`) — the goal every roadmap line serves.
- **Prioritization Frameworks (RICE / MoSCoW)** (`product-process/prioritization-frameworks-rice-moscow`) — ordering the items inside the now horizon.
- **Product Discovery** (`product-process/product-discovery`) — the evidence that moves work between horizons.
