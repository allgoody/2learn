---
title: Heuristic Evaluation
type: skill
topic: 03-design-ux
tier: small
status: drafted
aliases: []
prereqs: ["03-design-ux/11-usability"]
related: []
---

## What it is

A heuristic evaluation is an expert review of a design against a set of established usability rules, carried out before or alongside user sessions. A small number of reviewers inspect the interface independently, list every rule violation they find, and the lists are merged and rated. It is a fast way to catch the obvious faults without recruiting anyone.

## Why it matters

Some problems do not need a participant to discover: a disabled button with no explanation, two different words for one thing, an error message that names no remedy. Experts find these in an hour, and finding them before a session means the session's time is spent on the problems only users can reveal. The method also gives a shared vocabulary — reviewers start saying "that is a consistency failure" rather than "I do not like it".

## Core ideas

### Review against named rules, not general taste

Use a published set of heuristics and quote the rule for each violation. A finding tied to a rule is arguable; a finding tied to preference is not.

```text
Visibility of status   no indication the form is submitting
Match with the world   "authentication token" shown to the user
Consistency            "Sign in" here, "Log in" on the next screen
Error prevention       destructive action with no confirmation
Help and documentation error message with no remedy or next step
```

### Review alone, then merge

Individually, each reviewer finds different problems; the union of three independent passes is far larger than one combined discussion. Merge afterwards and keep only what two reviewers found, or what one can demonstrate.

### Separate violations from severity

List everything, then rate. Reviewers who rate while listing stop reporting small things and the list shrinks.

### Rate severity by effect on the task

The same scale as a usability session: blocking, serious, minor, cosmetic. An unexplained disabled control on the only path to the goal is blocking even if it looks tidy.

### Use it to complement sessions, never to replace them

An expert cannot predict which of two clear labels users will understand, or where they will look first. Heuristics find violations of known rules; only users reveal the mismatches with their own mental model.

## Practice

### Run a three-reviewer evaluation

Take a flow, recruit two colleagues who did not design it, and have each list violations against a named rule set individually. Merge the lists and rate by severity.

Done when: you have a merged list with a rule and a severity for each item, and at least two items found by more than one reviewer.

### Check one flow against five rules

Pick one flow and inspect it against five heuristics only — status, language, consistency, error prevention and help — listing one violation per rule where you find one.

Done when: each violation names the rule, the screen and the element, and you can say what a session should now test.

## Common mistakes

- **Reviewing on taste** — findings cannot be argued and the review is dismissed; fix: tie every violation to a named rule.
- **One reviewer** — a single pass finds a fraction of the problems; fix: two or three independent reviewers, merged afterwards.
- **Reviewing as a group** — the first confident voice sets the list and the others stop reporting; fix: review alone, merge later.
- **Rating while listing** — small but real violations are dropped; fix: list first, rate second.
- **Treating it as a substitute for sessions** — rule violations are found and user mismatches are missed; fix: run both, and use the evaluation to sharpen the session's tasks.

## Go deeper

- **Usability** (`03-design-ux/11-usability`) — read this first; an evaluation measures violations of the same quality.
- **Usability Testing** (`03-design-ux/33-usability-testing`) — the user session that complements this review.
- **Interaction Design** (`03-design-ux/44-interaction-design`) — the states and feedback most violations concern.
- **UX Writing & Microcopy** (`03-design-ux/07-ux-writing-microcopy`) — fixing the language and error-message violations.
