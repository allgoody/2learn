---
title: What to measure
prereqs: []
---

## What it is

Choosing a measure means picking the one number that would change your mind, then defining it precisely enough that it can be counted the same way twice. Funnels, drop-off, task success and time on task are the four workhorses; each answers a different question and each has a way of misleading you.

## Why it matters

A team that measures everything gets a dashboard nobody reads and a number for every argument. A team that measures one thing badly gets a confident answer to the wrong question — a "conversion rate" whose numerator and denominator were quietly redefined between releases. Deciding the measure before the build also stops the outcome being chosen after the result arrives.

## Core ideas

### A funnel names the steps and the unit

Write the ordered steps and say what counts as a unit at each one. Ambiguity here is what makes two reports of the same funnel disagree.

```text
Funnel: add to basket -> open checkout -> enter address -> pay -> confirmed
Unit:   one person, first attempt only, 24-hour window
Reports: counts per step, and the step-to-step rate
```

Counting sessions instead of people inflates the top of the funnel on shared devices; counting repeat attempts hides the second attempt's failure rate.

### Drop-off locates, it does not explain

The biggest fall is where to look, not what to fix. Pair it with five sessions on that step before changing anything.

```text
Step            Users   Step rate
open checkout    900      -
enter address    720     80%
pay              300     42%   <- look here
confirmed        285     95%
```

### Task success is binary and needs a definition

"Did they complete it?" must be answered by a rule written in advance: within the time limit, without help, on the intended path. Anything softer becomes a judgement about how hard they tried.

### Time on task needs a start and a stop you control

From the first click of the task to the confirmation, not from page load to the last click. Report the median rather than the mean; a few people who left the tab open will drag the average.

### One primary measure per question

Everything else is diagnostic. Name the primary measure, the guardrail measures that must not get worse (errors, support contacts, abandonment), and ignore the rest until the question changes.

## Practice

### Define one funnel

Pick the flow you care about most. Write its steps, the unit, the window and the guardrail, then count it once by hand from raw events.

Done when: your written definition lets a colleague reproduce your count within a few percent, and you can name the largest drop-off.

### Write the decision rule first

For one question, write the number that would make you act and the number that would make you leave it alone — before looking at any data.

Done when: both thresholds are written down with a date, and neither was changed after the numbers arrived.

## Common mistakes

- **Measuring everything** — the dashboard is unread and the primary measure is unclear; fix: one primary measure per question, with guardrails.
- **Redefining the measure between releases** — an apparent improvement is only a definition change; fix: write the definition down beside the chart and version it.
- **Counting sessions as people** — shared devices inflate the figures; fix: state the unit explicitly and keep it stable.
- **Treating drop-off as a diagnosis** — the team fixes the symptom and the rate stays flat; fix: watch sessions on that step before changing it.
- **Reporting averages for time on task** — a handful of abandoned tabs skew the number; fix: report the median and the spread.

## Go deeper

- **Quantitative UX Research** (`design-ux/quantitative-ux-research`) — the track this chapter opens.
- **Instrumenting and reading the numbers** (`design-ux/quantitative-ux-research/02-instrumenting-and-reading-the-numbers`) — collecting these measures reliably.
- **Google Analytics 4 (GA4)** (`design-ux/google-analytics-4-ga4`) — building the funnel in the tool that holds the events.
- **A/B Testing** (`design-ux/ab-testing`) — when watching is not enough and you change one thing to compare.
