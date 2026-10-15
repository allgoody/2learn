---
title: Interview Prep & Whiteboarding
type: skill
topic: soft-skills
tier: small
status: drafted
aliases: ["Whiteboarding"]
prereqs: []
related: []
---

## What it is

Interview preparation is practising the two things an interview measures: explaining your own work clearly, and solving a problem while somebody watches. Whiteboarding is the second — a shared, visible space where the interviewer can follow your reasoning, and where saying nothing for ten minutes is the failure mode.

## Why it matters

Being good at the work and being good at being observed doing the work are different skills, and interviews measure the second. Silence while thinking is read as being stuck; a correct answer that arrives without the reasoning cannot be assessed; a wrong answer with a clear method often scores better than a lucky one. Practice is what separates these, because the pressure changes behaviour: under observation people skip the restatement, forget the edge cases and stop asking questions.

## Core ideas

### Restate the problem before solving it

Repeat it back in your own words, name the input and the output, and ask one clarifying question. This buys time, demonstrates listening, and catches the case where you have misread the task.

```text
"You want the function to return the k most frequent values.
 Clarifying: can k exceed the number of distinct values,
 and should ties break by value or by first appearance?"
```

### Work out loud, in a stated structure

Say what you are about to do before doing it, and use a visible structure: examples, approach, then code. The interviewer is grading the reasoning, and the reasoning is only visible if you narrate it.

### Start with the brute force, then improve

Say the obvious solution and its complexity first; it is a correct answer and a baseline. Then name the bottleneck and improve it, saying what changed.

```text
Brute force   for each value, count all occurrences      O(n^2)
Bottleneck    the repeated counting
Improvement   one pass into a map, then sort by count     O(n log n)
Trade-off     the map costs O(n) memory
```

### Dry-run the code on a small example, out loud

Trace your own code with a concrete input, including an empty one. This catches the off-by-one that a reader would otherwise find for you, and it shows you test your own work.

### Ask for the constraints you would ask for at work

Size of the input, whether it fits in memory, whether it is called once or repeatedly. These questions are a signal, not a weakness, and the answers often simplify the problem substantially.

## Practice

### Rehearse one problem out loud, on a shared surface

Take one problem you already know how to solve and work it through out loud — restatement, examples, brute force, improvement, dry run — timed to twenty-five minutes.

Done when: you have finished within the time and can point at the moment you would have improved the approach.

### Practice under observation

Solve a new problem while somebody watches and takes notes, with no help.

Done when: you never went more than a minute without saying what you were thinking, and your dry run caught at least one mistake in your own code.

## Common mistakes

- **Silent thinking** — the interviewer cannot assess reasoning and assumes you are stuck; fix: narrate what you are about to try and why.
- **Skipping the restatement** — you solve a different problem than the one asked; fix: repeat it back and ask one clarifying question.
- **Jumping to the optimal solution** — no baseline, no visible reasoning, and often a stall; fix: state the brute force first.
- **Not testing your own code** — the first bug is found by the interviewer and reads badly; fix: dry-run a small and an empty input out loud.
- **Treating questions as weakness** — the constraints you would ask for at work go unasked; fix: ask about size, frequency and memory.

## Go deeper

- **Data Structures** (`cs-fundamentals/data-structures`) — the technical half: which structure makes which operation cheap.
- **Algorithms & Big-O** (`cs-fundamentals/algorithms-big-o`) — the complexity vocabulary the analysis is expressed in.
- **Communication** (`soft-skills/communication`) — the explaining skill this is a timed, observed version of.
- **Portfolio Building** (`soft-skills/portfolio-building`) — the other half of the interview: talking about your own work.
