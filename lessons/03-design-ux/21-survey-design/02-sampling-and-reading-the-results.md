---
title: Sampling and reading the results
prereqs: ["03-design-ux/21-survey-design/01-writing-neutral-questions"]
---

## What it is

Sampling is deciding who receives the survey and reading the results knowing who came back. The number a survey reports is a statement about the people who answered it, and those people are almost never a clean sample of everyone you care about.

## Why it matters

Response bias is systematic, and it runs in the same direction as satisfaction. People who completed a task are more likely to answer than people who abandoned it, and happy customers answer more often than unhappy ones. A 90% satisfaction score across 40 self-selected respondents can be worse evidence than five interviews, because it wears the authority of a statistic. Reading the response rate alongside the score is what keeps the number honest.

## Core ideas

### State the population, then the sample

Write down who you wanted to hear from — everyone who started the checkout last month — and who actually received the link, and who answered. Those are three different groups and the gap between them is the finding.

```text
Wanted:       all 4,120 people who started checkout in March
Reached:      1,880 who had an email and had not unsubscribed
Answered:      212  (11% of reached, 5% of wanted)
Note:         people who abandoned before entering an email are absent
```

### Weight the response rate against the claim

A high score on a low response rate is a hypothesis, not a result. If the population includes an easily missed group, the score is likely optimistic in the direction of that group's experience.

### Report counts, not only percentages

"68% of 22 respondents" is a different object from "68% of 5,400 respondents". Percentages hide sample size, and small samples swing wildly between weeks.

```text
Reported badly:  "68% found reordering easy."
Reported well:   "68% of 212 respondents (11% response rate, fielded 3-10 March)."
```

### Compare segments before the headline

Split by the segment that matters — first-time against returning, mobile against desktop — before quoting the total. A flat total often hides two groups moving in opposite directions.

### Pair the number with behaviour

A survey result that matches an analytics funnel is credible; one that contradicts the funnel is a prompt to find out why. The contradiction is worth more than either number alone.

## Practice

### Audit the last survey your team ran

Find the population, the reachable set, the respondents and the response rate. Write the sentence the result actually supports at that response rate.

Done when: your sentence is narrower than the one originally reported, and names who is missing from the sample.

### Field a survey and segment it

Run one short survey, then report it twice: once as a headline figure and once split by the single most relevant segment.

Done when: you can say whether the segments agree, and which segment is over-represented among respondents.

## Common mistakes

- **Reading a percentage with no denominator** — 80% of eleven people reads as a finding; fix: always report the count and the response rate with the percentage.
- **Ignoring who could not answer** — people who left before entering an email never received the survey; fix: name the missing group next to the result.
- **Comparing surveys of different samples** — the change between two waves may only reflect who responded; fix: hold the sampling method steady between waves.
- **Quoting the total when the segments disagree** — an average of two opposite movements describes neither; fix: segment before reporting.
- **Stopping at the number** — the result is filed without a decision; fix: attach the change and its owner before circulating it.

## Go deeper

- **Writing neutral questions** (`03-design-ux/21-survey-design/01-writing-neutral-questions`) — the wording this sampling depends on.
- **Survey Design** (`03-design-ux/21-survey-design`) — the track this chapter closes.
- **From findings to decisions** (`03-design-ux/05-user-research/04-from-findings-to-decisions`) — how to turn a segmented result into an owned change.
- **Quantitative UX Research** (`03-design-ux/24-quantitative-ux-research`) — the other measures to read beside the survey.
