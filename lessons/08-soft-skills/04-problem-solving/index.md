---
title: Problem Solving
type: skill
topic: 08-soft-skills
tier: small
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Problem solving here means breaking an unclear problem down until the next action is obvious. The output is not an answer but a structure: the parts of the problem, what is known, what is assumed, and the smallest next step that would settle the biggest unknown.

## Why it matters

Most time lost on a hard problem is spent on the wrong part of it. Someone starts debugging where the symptom appears, or designs a solution for a requirement nobody confirmed, and the work is technically competent and aimed at the wrong thing. Structuring the problem first turns an intimidating mess into a short list, and it exposes the assumption that would make the whole approach pointless — usually the cheapest thing to check.

## Core ideas

### Write the problem in one sentence, then split it

One sentence forces a definition. Then split into parts that can be checked independently, each with what you know and what you assume.

```text
Problem: the nightly export times out on Tuesdays only.
Parts:   (a) the data volume on Tuesdays
         (b) the job's start time and what else runs then
         (c) the timeout configuration itself
Known:   (c) unchanged for a year
Assumed: (a) volume grows through the week  <- cheapest to check
Next:    log the row count at the start of each run for two weeks
```

The assumption marked "cheapest to check" is the one to test first, not the one that seems most likely.

### Separate the symptom from the cause from the goal

The symptom is what is observed, the cause is what produces it, the goal is what the user needs. Fixing the symptom is sometimes right and should be a decision, not an accident.

### Work from both ends

Find the smallest case that reproduces it, and look at the largest picture of when it happens. The pattern across occurrences often identifies the cause faster than reading the code.

### Timebox the search, and write down what you ruled out

A bounded exploration with a written list of eliminated causes prevents the same ground being covered twice and turns a stuck afternoon into evidence.

### State the next action or say you are blocked

A structure with no next step is a description, not a plan.

## Practice

### Decompose one stuck problem

Take a problem you are currently stuck on. Write the one-sentence statement, then split it into parts with knowns, assumptions and the next check for each.

Done when: each part has a next action, and you have started the cheapest check rather than the most likely one.

### Keep an elimination log for one afternoon

Spend a bounded block on a bug and record every hypothesis and the evidence that ruled it out.

Done when: the log names what is left, and someone else could continue from it without repeating your work.

## Common mistakes

- **Starting from the most likely cause** — the cheapest test is skipped and hours go into the wrong area; fix: rank the unknowns by cost to check.
- **Solving the symptom** — the cause returns next week; fix: label the fix as a workaround or a repair, deliberately.
- **No written statement of the problem** — two people solve different problems in one conversation; fix: write one sentence and agree it.
- **Unbounded exploration** — an afternoon disappears with nothing eliminated; fix: timebox it and log what was ruled out.
- **Structuring without a next action** — a tidy description and no progress; fix: end every part with the next check.

## Go deeper

- **Debugging** (`01-cs-fundamentals/11-debugging`) — the same discipline applied to a failing program.
- **Time Management** (`08-soft-skills/05-time-management`) — protecting the block this work needs.
- **Communication** (`08-soft-skills/01-communication`) — explaining the structure to whoever has to act on it.
- **Product Discovery** (`04-product-process/04-product-discovery`) — the product-level version: finding which problem is worth solving.
