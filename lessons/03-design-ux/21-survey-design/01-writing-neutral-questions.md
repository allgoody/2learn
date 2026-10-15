---
title: Writing neutral questions
prereqs: []
---

## What it is

A neutral question asks one thing, in words every respondent reads the same way, with an answer space that includes their answer. Neutrality is not politeness; it is the removal of everything in the question that hints at the answer you would like.

## Why it matters

The effect is measurable and large. Loading a question with praise for the concept, or offering only agree/disagree, can move the result by more than the difference the survey was run to detect. Because the output is a percentage, the bias is invisible afterwards: nobody can tell from 78% agreement that the question made agreement the easy answer.

## Core ideas

### Remove the lead

Words that evaluate — "easy", "helpful", "improved", "problem" — carry the desired answer inside them. Ask for the behaviour and let the judgement be derived from it.

```text
Leading:   "How easy was it to find what you needed?"
Neutral:   "How long did it take you to find what you needed?"
Options:   under 30 seconds / 30s-2 min / 2-5 min / over 5 min / did not find it
```

The neutral version has a fact as its answer, so it can be checked against analytics.

### Split anything with an "and"

A double-barrelled question averages two answers and reports neither. "Was the page clear and fast?" cannot be answered by someone who found it clear but slow.

```text
Double: "Was the checkout clear and quick?"
Split:  "How clear were the steps?"      very / fairly / not very / not at all
        "How long did the payment take?"  under 10s / 10-30s / 30s-1min / over 1min
```

### Cover the full answer space

Forced choice between two options manufactures a result. Include a neutral midpoint when one exists, an "I do not know" where the respondent may genuinely not, and a "prefer not to say" for anything personal.

### Do not ask for what they cannot know

Attitudes about a product they have never used, recollection of a specific date months ago and estimates of their own future behaviour all return noise. Ask about the most recent instance, with a bounded window: "in the last seven days".

### Order for flow, not for opinion

Earlier questions prime later ones. Put general and non-threatening questions first, keep unrelated scales apart, and randomise option order where the order itself carries meaning.

## Practice

### Rewrite three leading questions

Take three questions from a live survey in your organisation. For each, write the leading words you removed, the neutral replacement, and the answer options that cover the whole space.

Done when: a colleague reading only your three rewrites cannot tell which answer you expect, and each rewrite has an answer option that fits a respondent who had a bad experience.

### Run the read-aloud test

Read each question aloud to one person and write down what they answer before any options are shown. Then show the options.

Done when: for every question, their spoken answer fits one of the options and the option they choose matches what they said.

## Common mistakes

- **Evaluative wording** — "how easy", "how helpful" and "how satisfied" pre-load the answer; fix: ask about the behaviour or the duration instead.
- **Double-barrelled questions** — two ideas produce one unusable average; fix: split them and count the split.
- **Forced choice with no midpoint** — respondents pick a side they do not hold; fix: add the neutral and the "not applicable" options.
- **Leading answer order** — the first option attracts the clicks; fix: randomise where order is arbitrary.
- **Asking about the future** — predictions are not data; fix: ask about the most recent instance inside a short window.

## Go deeper

- **Survey Design** (`03-design-ux/21-survey-design`) — the track this chapter opens.
- **Sampling and reading the results** (`03-design-ux/21-survey-design/02-sampling-and-reading-the-results`) — what the answers do and do not represent.
- **User Interviews** (`03-design-ux/20-user-interviews`) — the method to run before writing questions you will scale up.
- **Quantitative UX Research** (`03-design-ux/24-quantitative-ux-research`) — placing survey numbers beside behavioural measures.
